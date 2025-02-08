/** @type {import('next').NextConfig} */

// Configuration for static site generation
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
}

modu