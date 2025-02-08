/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  assetPrefix: '',
  distDir: 'out',
  experimental: {
    staticPageGenerationTimeout: 300
  }
}

module.exports = nextConfig 