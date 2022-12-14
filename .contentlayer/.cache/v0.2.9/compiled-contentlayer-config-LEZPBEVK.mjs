// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { remarkCodeHike } from "@code-hike/mdx";
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
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const regXCodeBlock = /(?<start>`{3}.*)\n.*(?<>)/;
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length,
              text: content
            };
          }
        );
        return headings;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./blog",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [
      [remarkCodeHike, { theme, showCopyButton: true, lineNumbers: true }],
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
//# sourceMappingURL=compiled-contentlayer-config-LEZPBEVK.mjs.map
