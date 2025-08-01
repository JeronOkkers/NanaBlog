/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],  // your remote image host
  },
  experimental: {
    // turn off the runtime type‐check for App‐Router pages
    typedRoutes: false,
  },
  typescript: {
    // skip all TS errors (including Next’s generated ones) at build time
    ignoreBuildErrors: true,
  },
  eslint: {
    // optionally let ESLint warnings not fail your build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
