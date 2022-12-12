import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { remarkCodeHike } from '@code-hike/mdx';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const theme = require('shiki/themes/monokai.json');

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: '**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    createdAt: { type: 'string', required: true },
    updatedAt: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: './blog',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [
      [remarkCodeHike, { theme, showCopyButton: true, lineNumbers: true }],
    ],
    rehypePlugins: [],
  },
});
