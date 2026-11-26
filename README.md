# Airlines Group Bookings — Next.js rebuild

Next.js 14 (App Router) + Tailwind + Framer Motion. All pages, including the
blog, are built from files in this repo at deploy time. No CMS is needed.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — tested, passes clean (76 pages)
```

## Site structure (76 pages, matches the original site 1:1)

```
/                                    Home
/about  /contact
/group-booking                       index
/group-booking/[slug]                18 airline pages
/business-class                      index
/business-class/[slug]               12 premium-cabin pages
/deals                               index
/deals/[slug]                        16 seasonal/route deals
/destinations                        index
/destinations/[slug]                 10 destination pages
/blog                                blog index
/blog/[slug]                         blog post
/privacy-policy /refund-policy /terms-condition
/sitemap.xml /robots.txt             auto-generated, covers all 76 routes
```

## Editing content (no CMS needed)

Page content lives in `data/` (blog article bodies are components, see below):

| File | Powers |
|---|---|
| `data/site.js` | Phone, email, address, nav |
| `data/airlines.js` | 18 group-booking pages |
| `data/businessClass.js` | 12 premium-cabin pages |
| `data/deals.js` | 16 seasonal/deal pages |
| `data/destinations.js` | 10 destination pages |
| `data/content.js` | Home page: why-us, stats, testimonials, FAQ |

Add or edit an entry in the array → the page is generated automatically via
`generateStaticParams()`. No routing code to touch.

## Blog

| Path | Holds |
|---|---|
| `data/blogPosts.js` | Title, excerpt, dates, featured image, SEO title/description (newest first) |
| `components/blog/articles/<slug>.jsx` | One component per article body |
| `components/blog/articles/index.js` | Maps each slug to its component |
| `public/images/blog/` | Article images |

To add a post: create the component, register it in `index.js`, add the entry
to `data/blogPosts.js`, then redeploy. Use `next/link` with local paths for
internal links.

## Forms

Two forms are UI-only right now, both marked `// TODO`:

- `components/SearchWidget.jsx` (home page quote form)
- `app/contact/page.js` (contact form)

Wire these to your CRM / lead endpoint / email service.

## SEO

- `sitemap.xml` and `robots.txt` are auto-generated (`app/sitemap.js`,
  `app/robots.js`) and include blog posts.
- Every page sets its own canonical URL (with a trailing slash, matching
  `trailingSlash: true` in `next.config.mjs`). Give any new page its own
  `alternates.canonical`.
- Dynamic pages set their own title and description via `generateMetadata()`;
  airline pages include `Service` schema, blog posts include `Article` schema.
