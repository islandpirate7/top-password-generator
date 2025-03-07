/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable case-sensitive path resolution to fix casing issues
  webpack: (config) => {
    // This is to fix case sensitivity issues on Windows
    config.resolve.symlinks = false;
    return config;
  }
};

module.exports = nextConfig;
