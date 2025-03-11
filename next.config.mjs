import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '92.113.26.84',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);