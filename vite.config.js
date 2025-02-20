import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "index.html", // Ensures Vite recognizes the entry file
    },
  },
});
