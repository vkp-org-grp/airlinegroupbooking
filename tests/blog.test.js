import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { blogPosts } from '@/data/blogPosts';
import { articles } from '@/components/blog/articles';
import { formatDate, getAllPosts, getPostBySlug } from '@/lib/blog';
import { airlines } from '@/data/airlines';
import { businessClass } from '@/data/businessClass';
import { deals } from '@/data/deals';
import { destinations } from '@/data/destinations';

const exists = (publicPath) => fs.existsSync(path.join(process.cwd(), 'public', publicPath));

const routes = new Set([
  '/', '/about/', '/contact/', '/group-booking/', '/business-class/', '/deals/', '/destinations/', '/blog/',
  '/privacy-policy/', '/refund-policy/', '/terms-condition/',
  ...airlines.map((a) => `/group-booking/${a.slug}/`),
  ...businessClass.map((b) => `/business-class/${b.slug}/`),
  ...deals.map((d) => `/deals/${d.slug}/`),
  ...destinations.map((d) => `/destinations/${d.slug}/`),
  ...blogPosts.map((p) => `/blog/${p.slug}/`),
]);
// next/link adds the trailing slash at build time
const withSlash = (href) => href.split(/[?#]/)[0].replace(/\/?$/, '/');

describe('blog data', () => {
  it('has posts with unique slugs, newest first', () => {
    expect(blogPosts.length).toBeGreaterThan(0);
    expect(new Set(blogPosts.map((p) => p.slug)).size).toBe(blogPosts.length);
    const times = blogPosts.map((p) => Date.parse(p.date));
    expect(times).toEqual([...times].sort((a, b) => b - a));
  });

  it('has exactly one component per post, and no stray files', () => {
    const slugs = blogPosts.map((p) => p.slug).sort();
    const files = fs
      .readdirSync(path.join(process.cwd(), 'components/blog/articles'))
      .filter((f) => f.endsWith('.jsx'))
      .map((f) => f.replace(/\.jsx$/, ''))
      .sort();
    expect(Object.keys(articles).sort()).toEqual(slugs);
    expect(files).toEqual(slugs);
  });

  it.each(blogPosts)('$slug has complete details and a local cover image', (p) => {
    for (const key of ['title', 'excerpt', 'imageAlt', 'seoTitle', 'seoDescription']) expect(p[key], key).toBeTruthy();
    expect(p.title).not.toMatch(/<[a-z]|&(amp|#\d+);/i);
    expect(Number.isNaN(Date.parse(p.modified))).toBe(false);
    expect(p.image).toMatch(/^\/images\//);
    expect(exists(p.image), p.image).toBe(true);
  });

  it('helpers return posts', () => {
    expect(getAllPosts()).toBe(blogPosts);
    expect(getPostBySlug(blogPosts[0].slug)).toBe(blogPosts[0]);
    expect(getPostBySlug('does-not-exist')).toBeNull();
    expect(formatDate('2026-05-20T06:05:26')).toBe('May 20, 2026');
  });
});

describe('blog articles', () => {
  it.each(Object.keys(articles))('%s renders with local images and working links', (slug) => {
    const html = renderToStaticMarkup(createElement(articles[slug]));
    expect(html.length).toBeGreaterThan(500);
    expect(html).not.toMatch(/cms\.airlinesgroupbookings|wp-content|<h1[\s>]/);

    for (const [tag] of html.matchAll(/<img [^>]*>/g)) {
      const src = tag.match(/ src="([^"]*)"/)[1].replace(/&amp;/g, '&');
      const file = src.startsWith('/_next/image') ? new URL(src, 'http://x').searchParams.get('url') : src;
      expect(file, tag).toMatch(/^\/images\//);
      expect(exists(file), file).toBe(true);
    }

    for (const [, href] of html.matchAll(/<a [^>]*?href="([^"]*)"/g)) {
      if (href.startsWith('/')) expect(routes.has(withSlash(href)), `broken link ${href}`).toBe(true);
      else expect(href, 'external or empty link').toMatch(/^(https:\/\/(?!(\w+\.)?airlinesgroupbookings\.com)|mailto:|tel:)/);
    }
  });
});
