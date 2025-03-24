import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'royalnano.coderash.online',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};
 
export default withNextIntl(nextConfig);