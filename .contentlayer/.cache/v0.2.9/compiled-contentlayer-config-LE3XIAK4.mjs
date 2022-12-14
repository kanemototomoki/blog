// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { remarkCodeHike } from "@code-hike/mdx";
import { createRequire } from "module";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
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
        const regXCodeBlock = /`{3}[\s\S]+?`{3}/g;
        const str = doc.body.raw.replace(regXCodeBlock, "");
        const slugger = new GithubSlugger();
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const headings = Array.from(str.matchAll(regXHeader)).map(
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
      remarkGfm
    ],
    rehypePlugins: [
      rehypeSlug
    ]
  }
});
export {
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-LE3XIAK4.mjs.map
