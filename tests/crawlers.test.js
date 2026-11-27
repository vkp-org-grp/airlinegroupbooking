import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import robots, { AI_CRAWLERS } from '@/app/robots';
import sitemap from '@/app/sitemap';
import { GET } from '@/app/llms.txt/route';
import { site } from '@/data/site';

describe('robots.txt', () => {
  const { rules, sitemap: sitemapUrl } = robots();

  it('lets search engines and AI crawlers read the site, but not /api/', () => {
    expect(rules.map((r) => r.userAgent)).toEqual(['*', AI_CRAWLERS]);
    for (const r of rules) expect(r).toMatchObject({ allow: '/', disallow: '/api/' });
  });

  it('points to the sitemap', () => {
    expect(sitemapUrl).toBe(`${site.url}/sitemap.xml`);
  });
});

describe('sitemap.xml', () => {
  it('gives dates only to blog URLs, and they are valid', async () => {
    for (const e of await sitemap()) {
      if (e.url.startsWith(`${site.url}/blog/`)) expect(Number.isNaN(e.lastModified.getTime()), e.url).toBe(false);
      else expect(e.lastModified, e.url).toBeUndefined();
    }
  });
});

describe('llms.txt', () => {
  it('is plain text and links exactly the pages in the sitemap', async () => {
    const res = GET();
    expect(res.headers.get('content-type')).toMatch(/^text\/plain/);
    const text = await res.text();
    const links = [...text.matchAll(/\]\((https?:[^)\s]+)\)/g)].map((m) => m[1]);
    const urls = (await sitemap()).map((e) => e.url);
    expect([...links].sort()).toEqual([...urls].sort());
    expect(text.startsWith(`# ${site.name}\n`)).toBe(true);
    expect(text).not.toMatch(/undefined|\[object/);
  });

  it('does not publish the phone number or street address removed from the site', async () => {
    const text = await GET().text();
    expect(text).not.toMatch(/888[-. ]?\d{3}[-. ]?\d{4}|Cobble Brook|Rancho Cordova/);
  });

  it('is not shadowed by a static file', () => {
    expect(fs.existsSync(path.join(process.cwd(), 'public', 'llms.txt'))).toBe(false);
  });
});
