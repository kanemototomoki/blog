// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import { remarkCodeHike } from "@code-hike/mdx";
import { createRequire } from "module";
var require2 = createRequire(import.meta.url);
var theme = require2("shiki/themes/monokai.json");
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "**/*.mdx",
  bodyType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    createdAt: { type: "string", required: true },
    updatedAt: { type: "string", required: true }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "blog",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [
      [remarkCodeHike, { theme, showCopyButton: true, lineNumbers: true }]
    ],
    rehypePlugins: []
  }
});
export {
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-RUODJIYH.mjs.map
