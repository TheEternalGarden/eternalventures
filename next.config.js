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
    appDir: true
  },
  // Configure webpack for media files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          name: 'static/media/[name].[hash].[ext]',
        },
      },
    });
    return config;
  }
}

module.exports = nextConfig 