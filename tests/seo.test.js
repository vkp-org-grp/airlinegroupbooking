import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_OG_IMAGE, pageSeo } from '@/lib/seo';

const appDir = path.join(process.cwd(), 'app');
const appFiles = fs.readdirSync(appDir, { recursive: true }).map((f) => f.split(path.sep).join('/'));

describe('pageSeo', () => {
  it('uses the same path for canonical and og:url', () => {
    const meta = pageSeo('/about/');
    expect(meta.alternates.canonical).toBe('/about/');
    expect(meta.openGraph.url).toBe('/about/');
    expect(meta.openGraph.images).toEqual([DEFAULT_OG_IMAGE]);
    expect(fs.existsSync(path.join(process.cwd(), 'public', DEFAULT_OG_IMAGE))).toBe(true);
  });

  it('accepts a page image and article details', () => {
    const { openGraph } = pageSeo('/blog/x/', { image: '/images/blog/x.jpg', type: 'article' });
    expect(openGraph).toMatchObject({ type: 'article', images: ['/images/blog/x.jpg'] });
  });

  it('does not set og:title or og:description, so each page supplies its own', () => {
    expect(pageSeo('/about/').openGraph).not.toHaveProperty('title');
    expect(pageSeo('/about/').openGraph).not.toHaveProperty('description');
  });
});

describe('every page sets its own canonical and og:url', () => {
  const pages = appFiles.filter((f) => /(^|\/)page\.js$/.test(f));

  it.each(pages)('app/%s', (file) => {
    // contact/page.js is a client component, so its metadata lives in layout.js
    const metaFile = file === 'contact/page.js' ? 'contact/layout.js' : file;
    const source = fs.readFileSync(path.join(appDir, metaFile), 'utf8');
    const route = file.replace(/(^|\/)page\.js$/, '');
    const expected = route.includes('[slug]')
      ? `pageSeo(\`/${route.replace('[slug]', '${params.slug}')}/\``
      : `pageSeo('/${route ? `${route}/` : ''}'`;
    expect(source).toContain(expected);
  });

  it('root layout does not give pages a shared URL', () => {
    const layout = fs.readFileSync(path.join(appDir, 'layout.js'), 'utf8');
    expect(layout).not.toMatch(/url: site\.url|canonical:/);
  });
});
