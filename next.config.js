/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Basic configuration for static export
  trailingSlash: true,
  assetPrefix: '',
  distDir: 'out',
  // Configure static file handling
  experimental: {
    appDir: true,
    serverActions: true
  }
}

module.exports = nextConfig 