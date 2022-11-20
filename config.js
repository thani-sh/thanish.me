import mdx from "@mdx-js/esbuild";
import { resolve } from "node:path";
import rehypeHighlight from "rehype-highlight";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const config = {
  meta: {
    sitename: "Thanish.me",
    subtitle: "dd if=/dev/head of=/dev/blog",
    repoLink: "https://github.com/thani-sh/thanish.me",
    socialLinks: {
      github: "https://github.com/thani-sh",
      linkedin: "https://linkedin.com/in/thani-sh/",
      twitter: "https://twitter.com/mnmtanish",
      facebook: "https://facebook.com/mnmthanish/",
      itchdotio: "https://thani-sh.itch.io/",
    },
  },

  public: resolve(__dirname, "src/public"),
  srcDir: resolve(__dirname, "src/pages"),
  dstDir: resolve(__dirname, "build"),

  /**
   * Where to find template files.
   */
  template: {
    default: resolve(__dirname, "./src/shared/templates-html/default.html"),
    minimal: resolve(__dirname, "./src/shared/templates-html/minimal.html"),
  },

  /**
   * The `entryPoints` and the `outdir` fields will be set later for each page.
   */
  esbuild: {
    bundle: true,
    format: "esm",
    external: ["react/*"],
    plugins: [
      mdx({
        rehypePlugins: [rehypeHighlight],
      }),
    ],
    assetNames: "[hash]",
    loader: {
      ".png": "file",
      ".jpg": "file",
      ".svg": "file",
    },
  },
};
