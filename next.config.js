// /** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

module.export = withContentlayer({
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
});
