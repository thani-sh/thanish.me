import esbuild from "esbuild";
import glob from "glob";
import Handlebars from "handlebars";
import { cp, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { promisify } from "node:util";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { config } from "./config.js";

/**
 * Load and prepare Handlebar templates for output HTML files
 */
const templates = {
  default: Handlebars.compile(await readFile(config.template.default, "utf-8")),
  minimal: Handlebars.compile(await readFile(config.template.minimal, "utf-8")),
};

/**
 * Parses given MJS file and returns the HTML content and the path
 */
async function buildMJS(srcFile) {
  const outDir = join(config.dstDir, dirname(srcFile));
  const tmpFile = join(outDir, "index.js");
  await esbuild.build({
    ...config.esbuild,
    entryPoints: [join(config.srcDir, srcFile)],
    outdir: outDir,
  });
  const script = await readFile(tmpFile, "utf-8");
  await rm(tmpFile);
  const body = `<script type="module">${script}</script>`;
  return {
    type: "mjs",
    html: templates.minimal({ body }),
    path: join(outDir, "index.html"),
    meta: { ...config.meta },
  };
}

/**
 * Parses given MDX file and returns HTML content and the path
 */
async function buildMDX(srcFile, props = {}) {
  const outDir = join(config.dstDir, dirname(srcFile));
  const tmpFile = join(outDir, "index.js");
  await esbuild.build({
    ...config.esbuild,
    entryPoints: [join(config.srcDir, srcFile)],
    outdir: outDir,
  });
  const jsx = await import(tmpFile);
  const meta = { ...config.meta, ...jsx.meta };
  await rm(tmpFile);
  const body = renderToStaticMarkup(
    React.createElement(meta.layout, {
      meta,
      children: React.createElement(jsx.default, props),
    })
  );
  return {
    type: "mdx",
    html: templates.default({ meta, body }),
    path: join(outDir, "index.html"),
    meta,
  };
}

/**
 * Compiles given MDX file or JS file to an HTML file
 *  srcFile  Source file path relative to `config.srcDir` directory
 */
async function buildFIle(srcFile) {
  if (srcFile.endsWith(".mdx")) {
    return buildMDX(srcFile);
  }
  if (srcFile.endsWith(".mjs")) {
    return buildMJS(srcFile);
  }
}

/**
 * Returns an array of source file paths relative to `config.srcDir`
 */
async function buildHomepage(pages) {
  const sortedPages = pages.sort((a, b) =>
    a.meta.date > b.meta.date ? -1 : 1
  );
  const { html, path } = await buildMDX("./index.mdx", { pages: sortedPages });
  await writeFile(path, html);
}

/**
 * Returns an array of source file paths relative to `config.srcDir`
 */
async function collectPages() {
  return promisify(glob)("{blog,apps}/**/*.{mdx,mjs}", { cwd: config.srcDir });
}

// ---

// copy all static assets to the output directory
cp(config.public, config.dstDir, { recursive: true });

// parse all available mdx and mjs files and build them
// also collect blog post pages to build the homepage
const pages = [];
for (const srcFile of await collectPages()) {
  const { type, html, path, meta } = await buildFIle(srcFile);
  await writeFile(path, html);
  if (type === "mdx") {
    pages.push({
      meta,
      path: path.slice(config.dstDir.length),
    });
  }
}

// build the homepage
await buildHomepage(pages);
