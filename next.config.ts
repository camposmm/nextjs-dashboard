/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // CORRECT: Use serverExternalPackages instead of experimental.serverComponentsExternalPackages
  serverExternalPackages: ['bcryptjs'],
}

module.exports = nextConfig