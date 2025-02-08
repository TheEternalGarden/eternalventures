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
  // Add webpack configuration for media files
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
  },
  experimental: {
    staticPageGenerationTimeout: 300
  }
}

module.exports = nextConfig 