/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Basic configuration for static export
  trailingSlash: true,
  assetPrefix: '',
  distDir: 'out'
}

module.exports = nextConfig 