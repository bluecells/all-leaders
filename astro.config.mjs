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
      entrypoint: 'astro/assets/services/sharp'
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
            // Separate vendor chunks for better caching
            if (id.includes('node_modules')) {
              if (id.includes('gsap')) return 'gsap';
              if (id.includes('react')) return 'react-vendor';
              return 'vendor';
            }
          }
        }
      }
    },
    ssr: {
      noExternal: isProd ? ['@keystatic/astro', 'cookie', 'lodash', 'direction', 'is-hotkey'] : [],
    },
  },
});
