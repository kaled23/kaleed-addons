import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        admin: 'src/admin.html',
        addons: 'src/addons.html'
      }
    }
  },
  publicDir: '../public/css'
});
