import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // ChatGPT resolution for deprecated code?
      "@": path.resolve(__dirname, "src"),
      find: "./runtimeConfig",
      replacement: "./runtimeConfig.browser",
    },
  },
  build: {
    outDir: "build",
  },
});
