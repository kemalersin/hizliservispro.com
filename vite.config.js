import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import { minify as minifyHtml } from "html-minifier-terser";

export default defineConfig({
  root: ".",
  publicDir: "public",
  server: {
    port: 5173,
    open: true,
  },
  esbuild: {
    legalComments: "none",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    cssMinify: true,
  },
  plugins: [
    (() => {
      let originalOutDir = "";
      return {
        name: "omit-original-images",
        apply: "build",
        configResolved(config) {
          originalOutDir = resolve(config.root, config.build.outDir, "images", "original");
        },
        closeBundle() {
          rmSync(originalOutDir, { recursive: true, force: true });
        },
      };
    })(),
    {
      name: "minify-html",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        async handler(html) {
          return minifyHtml(html, {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            conservativeCollapse: false,
            decodeEntities: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            sortAttributes: true,
            sortClassName: true,
            useShortDoctype: true,
          });
        },
      },
    },
  ],
});
