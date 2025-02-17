import { defineConfig } from 'vite';

export default defineConfig({
    base: '/taylor-tan-visualization/', // Match your GitHub repo name
    root: 'src', // Use the src folder as the root
    build: {
        outDir: '../docs', // Output to the docs folder
        emptyOutDir: true, // Clear the docs folder before building
    },
});
