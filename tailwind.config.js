/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'color-bg-body': '#ffffff',
        'color-bg-body-darker': '#d3d0c2',
        'color-text-main': '#031A34',
        'color-text-muted': '#c4f4d2',
        'color-brand-primary': '#031A34',
        'color-brand-secondary': '#AB0800',
        'color-brand-tertiary': '#BEAB54',
        'color-brand-darker': '#4b595e',
        'color-brand-hover': '#1093AD',
        'color-brand-alert': '#a45429',
        'color-brand-accent': '#1093AD',
        'color-brand-muted': '#1093ad7c',
        'clair': {
          DEFAULT: '#ffffff',
          '60': 'rgba(255, 255, 255, 0.6)',
          '50': 'rgba(255, 255, 255, 0.5)',
          '40': 'rgba(255, 255, 255, 0.4)',
          '20': 'rgba(255, 255, 255, 0.2)',
        },
        'fonce': '#031A34',
        'accent': {
          DEFAULT: '#1093AD',
          '50': 'rgba(16, 147, 173, 0.5)',
          '20': 'rgba(16, 147, 173, 0.2)',
        },
        'limolo-green': {
          DEFAULT: '#4a6741',
          '10': 'rgba(74, 103, 65, 0.1)',
        },
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
