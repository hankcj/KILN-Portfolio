/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export only when explicitly requested (for production builds)
  // Use: EXPORT=true npm run build
  output: process.env.EXPORT === 'true' ? 'export' : undefined,
  distDir: process.env.EXPORT === 'true' ? 'dist' : '.next',
  images: {
    unoptimized: process.env.EXPORT === 'true',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ghost.studiokiln.io',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = nextConfig;
