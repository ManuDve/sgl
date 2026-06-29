// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.alexcontreras.cl',
  vite: {
    plugins: [tailwindcss()],
    preview: {
      allowedHosts: ['alexcontreras.cl', 'www.alexcontreras.cl'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      esbuildOptions: {
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
        },
      },
    },
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.includes('/admin/') &&
        !page.includes('/confirmacion') &&
        !page.includes('/gestionar'),
    }),
  ],
});