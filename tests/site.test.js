import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import nextConfig from '@/next.config.mjs';
import sitemap from '@/app/sitemap';
import { blogPosts } from '@/data/blogPosts';
import { site, footerLinks } from '@/data/site';

const root = process.cwd();
const sourceFiles = ['app', 'components', 'data', 'lib']
  .flatMap((dir) => fs.readdirSync(path.join(root, dir), { recursive: true }).map((f) => path.join(dir, f)))
  .filter((f) => /\.(jsx?|json|css)$/.test(f) && !f.endsWith('blogPosts.js'));
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

describe('no CMS or remote images left', () => {
  it('source has no CMS, WordPress or webhook references', () => {
    const hits = sourceFiles.filter((f) =>
      /cms\.airlinesgroupbookings|wp-content|wpgraphql|WORDPRESS_|REVALIDATE_SECRET|revalidate/i.test(read(f))
    );
    expect(hits).toEqual([]);
  });

  it('config and env example have no CMS settings', () => {
    for (const f of ['next.config.mjs', '.env.example']) expect(read(f)).not.toMatch(/wordpress|revalidate|cms\./i);
    expect(nextConfig.images?.remotePatterns).toBeUndefined();
  });

  it('every local image referenced in source exists, and none is remote', () => {
    const missing = [];
    const remote = [];
    for (const f of [...sourceFiles, 'data/blogPosts.js']) {
      const text = read(f);
      for (const [, p] of text.matchAll(/['"`](\/[\w./-]+\.(?:png|jpe?g|webp|svg|gif|ico))['"`]/gi)) {
        if (!fs.existsSync(path.join(root, 'public', p))) missing.push(`${f}: ${p}`);
      }
      for (const [url] of text.matchAll(/https?:\/\/[^'"`\s)]+\.(?:png|jpe?g|webp|svg|gif)/gi)) remote.push(`${f}: ${url}`);
    }
    expect(missing).toEqual([]);
    expect(remote).toEqual([]);
  });

  it('has no placeholder "#" links in footer data', () => {
    for (const l of Object.values(footerLinks).flat()) expect(l.href).toMatch(/^\//);
    expect(read('components/Footer.jsx').replace(/\/\/.*$/gm, '')).not.toMatch(/href: '#'/);
  });
});

describe('SEO and redirects', () => {
  it('uses trailing slashes and redirects www to the bare domain', async () => {
    expect(nextConfig.trailingSlash).toBe(true);
    const [rule] = await nextConfig.redirects();
    expect(rule.has).toEqual([{ type: 'host', value: `www.${site.domain}` }]);
    expect(rule.destination).toBe(`${site.url}/:path*`);
    expect(rule.permanent).toBe(true);
  });

  it('sitemap lists unique slash URLs including every blog post', async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const u of urls) {
      expect(u.startsWith(`${site.url}/`), u).toBe(true);
      expect(u.endsWith('/'), u).toBe(true);
    }
    for (const p of blogPosts) expect(urls).toContain(`${site.url}/blog/${p.slug}/`);
  });
});
