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
};

export default nextConfig;
