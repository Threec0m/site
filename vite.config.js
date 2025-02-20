import { defineConfig } from 'vite';

export default defineConfig({
  // Default root is '.', so index.html is in the root.
  build: {
    outDir: 'dist'
  }
});
