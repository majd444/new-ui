/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    // Required for Docker deployment
    outputFileTracingRoot: process.env.NODE_ENV === 'production' ? '/app' : undefined,
  },
};

module.exports = nextConfig;
