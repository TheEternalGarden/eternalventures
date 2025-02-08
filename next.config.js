/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Ensure static files are handled correctly
  trailingSlash: true,
  assetPrefix: '',
  // Configure static file serving
  distDir: 'out',
  experimental: {
    staticPageGenerationTimeout: 300,
    optimizeCss: true,
    optimizeImages: true
  }
}

module.exports = nextConfig 