import { site } from '@/data/site';

// AI assistants and AI search crawlers. "*" already allows them; naming them
// makes the choice explicit. To block one, move it into its own rule with
// disallow: '/'.
export const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

export default function robots() {
  // /api/ only handles form submissions, so there is nothing to crawl there.
  // A crawler follows only the most specific group that names it, so both
  // groups need the same disallow.
  const access = { allow: '/', disallow: '/api/' };
  return {
    rules: [
      { userAgent: '*', ...access },
      { userAgent: AI_CRAWLERS, ...access },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
