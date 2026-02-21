const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  const { build } = await import('velite')
  await build({ watch: isDev, clean: !isDev })
}

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
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
