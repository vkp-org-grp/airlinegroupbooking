// Blog posts are stored in the codebase:
//   data/blogPosts.js                   title, excerpt, date, image, SEO fields
//   components/blog/articles/<slug>.jsx article body
//   public/images/blog/                 images
// To add a post: create its component, register it in
// components/blog/articles/index.js, and add its entry to data/blogPosts.js.
import { blogPosts } from '@/data/blogPosts';

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

export function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
