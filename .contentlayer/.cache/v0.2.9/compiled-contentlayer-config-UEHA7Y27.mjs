var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var { remarkCodeHike } = __require("@code-hike/mdx");
var theme = __require("shiki/themes/monokai.json");
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
      remarkCodeHike,
      { theme, showCopyButton: true, lineNumbers: true }
    ],
    rehypePlugins: []
  }
});
export {
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-UEHA7Y27.mjs.map
