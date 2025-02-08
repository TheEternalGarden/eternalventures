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
  // Configure static file handling
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });
    return config;
  },
  experimental: {
    staticPageGenerationTimeout: 300
  }
}

module.exports = nextConfig 