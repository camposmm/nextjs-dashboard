/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Or if you're using static export:
  // output: 'export',
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs'],
  }
}

module.exports = nextConfig