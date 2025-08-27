import tailwindcss from "lume/plugins/tailwindcss.ts";
// import brotli from "lume/plugins/brotli.ts";
import relations from "lume/plugins/relations.ts";
import date from "lume/plugins/date.ts";
import prism from "lume/plugins/prism.ts";
import nav from "lume/plugins/nav.ts";
import pagefind from "lume/plugins/pagefind.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import jsonLd from "lume/plugins/json_ld.ts";
import jsx from "lume/plugins/jsx.ts";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import { Options as SitemapOptions, sitemap } from "lume/plugins/sitemap.ts";
import { favicon, Options as FaviconOptions } from "lume/plugins/favicon.ts";
import { merge } from "lume/core/utils/object.ts";
import "npm:prismjs@1.29.0/components/prism-typescript.js";

import "lume/types.ts";

export interface Options {
  sitemap?: Partial<SitemapOptions>;
  favicon?: Partial<FaviconOptions>;
}

export const defaults: Options = {
  favicon: {
    input: "uploads/favicon.png",
  },
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site
      .use(tailwindcss())
      .use(jsx())
      // .use(brotli())
      .use(metas())
      .use(jsonLd())
      .use(basePath())
      .use(nav())
      .use(pagefind({
        ui: {
          containerId: "search",
          resetStyles: true,
          autofocus: true,
          showEmptyFilters: true,
          showImages: false,
        },
        indexing: {
          rootSelector: "main",
        },
      }))
      .use(relations({
        foreignKeys: {
          category: {
            foreignKey: "category_id",
            relationKey: "category",
            pluralRelationKey: "categories",
          },
          tutorial: {
            foreignKey: "tutorial_id",
            relationKey: "tutorial",
            pluralRelationKey: "tutorials",
          },
          howto: {
            foreignKey: "howto_id",
            relationKey: "howto",
            pluralRelationKey: "howtos",
          },
          explanation: {
            foreignKey: "explanation_id",
            relationKey: "explanation",
            pluralRelationKey: "explanations",
          },
          author: {
            foreignKey: "author_id",
            relationKey: "author",
            pluralRelationKey: "authors",
          },
        },
      }))
      .use(slugifyUrls())
      .use(sitemap(options.sitemap))
      .use(favicon(options.favicon))
      .use(date())
      .use(prism({
        theme: [
          {
            name: "tomorrow",
            cssFile: "style.css",
            placeholder: "/* dark-theme-here */",
          },
        ],
      }))
      .add("uploads")
      .add("style.css");
  };
}
