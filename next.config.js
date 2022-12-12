const { withContentlayer } = require('next-contentlayer');

// /** @type {import('next').NextConfig} */
module.exports = withContentlayer({
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
});
