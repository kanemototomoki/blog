// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { createRequire } from "module";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
var require2 = createRequire(import.meta.url);
var theme = require2("shiki/themes/monokai.json");
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    createdAt: { type: "string", required: true },
    updatedAt: { type: "string", required: true }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `${doc._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./blog",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkToc
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      rehypeAutolinkHeadings
    ]
  }
});
export {
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-4N2M45VZ.mjs.map
