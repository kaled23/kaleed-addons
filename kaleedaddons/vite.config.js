import { defineConfig } from 'vite';

export default defineConfig({
    root: 'public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'public/index.html',
                admin: 'public/admin.html',
                addons: 'public/addons.html'
            }
        }
    }
});
