import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "royalnano.coderash.online",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "royalnano.coderash.online",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
