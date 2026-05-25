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
    ssr: {
      noExternal: isProd ? ['@keystatic/astro', 'cookie', 'lodash', 'direction', 'is-hotkey'] : [],
    },
  },
});
