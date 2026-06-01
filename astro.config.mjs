import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://all-leaders.fr',
  trailingSlash: 'never',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  image: {
    domains: [],
    remotePatterns: [],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    format: ['webp'],
    quality: {
      webp: 85,
    },
  },
  integrations: [
    react(),
    markdoc({
      allowHTML: true, // C'est cette option qui permet de parser les <br>
    }),
    keystatic(),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 1. ISOLER KEYSTATIC ET SES DÉPENDANCES DIRECTES
            // Keystatic utilise beaucoup de sous-modules (slate, embla, etc.).
            // On les force à s'initialiser ensemble pour éviter le "Cannot access before initialization"
            if (id.includes('@keystatic') || id.includes('keystatic')) {
              return 'keystatic-vendor';
            }

            // 2. Le reste de vos vendors existants
            if (id.includes('node_modules')) {
              if (id.includes('gsap')) return 'gsap';
              if (id.includes('react')) return 'react-vendor';
              return 'vendor';
            }
          },
        },
      },
    },
    ssr: {
      noExternal: ['@keystatic/astro', '@keystatic/core'],
    },
    optimizeDeps: {
      exclude: ['@astrojs/node', '@keystatic/core', '@keystatic/astro'],
    },
  },
});
