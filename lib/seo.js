import { site } from '@/data/site';

// Used when a page has no picture of its own.
export const DEFAULT_OG_IMAGE = '/images/1436491865332-7a61a109cc05.jpg';

// Canonical + Open Graph for one page, both built from the same path so they
// always match. Spread it into a page's metadata:
//   export const metadata = { ...pageSeo('/about/'), title: 'About Us' };
// og:title and og:description (and the Twitter tags) are filled by Next.js
// from the page's own title and description. Relative URLs are resolved
// against metadataBase in app/layout.js.
export function pageSeo(path, { image = DEFAULT_OG_IMAGE, ...openGraph } = {}) {
  return {
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_US',
      url: path,
      images: [image],
      ...openGraph,
    },
  };
}
