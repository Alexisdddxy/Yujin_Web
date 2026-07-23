import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDirectory = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(rootDirectory, "index.html"),
        basicInfo: resolve(rootDirectory, "basic-info.html"),
        microblog: resolve(rootDirectory, "microblog.html"),
        bilibili: resolve(rootDirectory, "bilibili.html"),
        others: resolve(rootDirectory, "others.html"),
      },
    },
  },
});
