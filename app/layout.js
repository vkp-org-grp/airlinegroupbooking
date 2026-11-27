import './globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';
import { site } from '@/data/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CallBar from '@/components/CallBar';

const display = localFont({
  src: './fonts/Outfit.woff2',
  weight: '200 700',
  variable: '--font-display',
  display: 'swap',
});

const body = localFont({
  src: './fonts/PlusJakartaSans.woff2',
  weight: '400 700',
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Bulk Air Ticket Booking | Airlines Group Travel Experts',
    template: '%s · Airlines Group Bookings',
  },
  description:
    'Book group airline tickets with Airlines Group Bookings. Negotiated fares for 10+ passengers across 18 airline partners. Get a free quote today.',
  keywords: [
    'group airline tickets',
    'bulk air ticket booking',
    'group flight booking',
    'corporate group travel',
    'school group flights',
  ],
  // canonical and Open Graph are set per page with pageSeo() from lib/seo.js
  openGraph: { siteName: site.name, type: 'website' },
  robots: { index: true, follow: true },
  verification: {
    google: '8qkMY136L68fFsYxENUziw27qeC4XCM6REL_WMZ_fk8',
  },
};

const GTM_ID = 'GTM-T8BR6W2Q';

export const viewport = { themeColor: '#0C0B1D' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* <CallBar /> */}
      </body>
    </html>
  );
}
