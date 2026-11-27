import { site } from '@/data/site';
import { airlines } from '@/data/airlines';
import { businessClass } from '@/data/businessClass';
import { deals } from '@/data/deals';
import { destinations } from '@/data/destinations';
import { getAllPosts } from '@/lib/blog';

export default async function sitemap() {
  // lastModified is set only where a real edit date exists (the blog). Using the
  // build time would tell search engines every page changed on every deploy.
  const posts = getAllPosts();
  const latestPost = new Date(Math.max(...posts.map((p) => new Date(p.modified))));

  const staticRoutes = [
    { url: '/', priority: 1 },
    { url: '/about/', priority: 0.7 },
    { url: '/contact/', priority: 0.6 },
    { url: '/group-booking/', priority: 0.9 },
    { url: '/business-class/', priority: 0.8 },
    { url: '/deals/', priority: 0.8 },
    { url: '/destinations/', priority: 0.7 },
    { url: '/blog/', priority: 0.7 },
    { url: '/privacy-policy/', priority: 0.3 },
    { url: '/refund-policy/', priority: 0.3 },
    { url: '/terms-condition/', priority: 0.3 },
  ].map((r) => ({
    url: `${site.url}${r.url}`,
    ...(r.url === '/blog/' && { lastModified: latestPost }),
    priority: r.priority,
  }));

  const airlineRoutes = airlines.map((a) => ({
    url: `${site.url}/group-booking/${a.slug}/`,
    priority: 0.8,
  }));

  const businessRoutes = businessClass.map((b) => ({
    url: `${site.url}/business-class/${b.slug}/`,
    priority: 0.7,
  }));

  const dealRoutes = deals.map((d) => ({
    url: `${site.url}/deals/${d.slug}/`,
    priority: 0.6,
  }));

  const destinationRoutes = destinations.map((d) => ({
    url: `${site.url}/destinations/${d.slug}/`,
    priority: 0.6,
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}/`,
    lastModified: new Date(p.modified),
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...airlineRoutes,
    ...businessRoutes,
    ...dealRoutes,
    ...destinationRoutes,
    ...blogRoutes,
  ];
}
