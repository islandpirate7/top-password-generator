/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Disable case-sensitive path resolution to fix casing issues
  webpack: (config) => {
    // This is to fix case sensitivity issues on Windows
    config.resolve.symlinks = false;
    return config;
  }
};

module.exports = nextConfig;
