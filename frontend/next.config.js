/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // https://nextjs.org/docs/advanced-features/output-file-tracing
  output: 'standalone',
}

module.exports = nextConfig
