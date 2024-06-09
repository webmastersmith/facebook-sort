import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    // target: 'esnext', // default is es5
    minify: false,
    // minify: true,
    emptyOutDir: false,
    // lib forces single file output.
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/facebook-sort.js'),
      name: 'FacebookSort',
      formats: ['iife'],
      // the proper extensions will be added
      fileName: 'facebook-sort',
    },
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`, // the same name as entryFile.
        dir: './prod',
      },
    },
  },
});
