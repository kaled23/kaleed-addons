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
            },
            output: {
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    },
    resolve: {
        alias: {
            '/js': '/src/js'
        }
    }
});
