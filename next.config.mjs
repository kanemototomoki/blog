// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
// };

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [
//       [remarkCodeHike, { theme, showCopyButton: true, lineNumbers: true }],
//     ],
//     rehypePlugins: [],
//     // `MDXProvider`を使う場合はコメントを外すこと
//     // providerImportSource: "@mdx-js/react",
//   },
// });
// module.exports = withMDX(nextConfig);

import { withContentlayer } from 'next-contentlayer';

export default withContentlayer({
  reactStrictMode: true,
  swcMinify: true,
});
