/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.airlinesgroupbookings.com' }],
        destination: 'https://airlinesgroupbookings.com/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: process.env.WORDPRESS_HOSTNAME || 'airlinesgroupbookings.com' },
    ],
  },
};

export default nextConfig;
