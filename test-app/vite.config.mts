import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/bundle-analysis.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    minify: "esbuild",
  },
});
