/** @type {import('next').NextConfig} */
const nextConfig = {
  // serverRuntimeConfig: {
  //   API_URL: process.env.API_URL,
  // },
  // Will be available on both server and client
  publicRuntimeConfig: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_BACKEND_PORT: process.env.NEXT_PUBLIC_BACKEND_PORT,
  },
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
