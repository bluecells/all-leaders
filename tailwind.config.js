/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'color-bg-body': '#eee7d9',
        'color-bg-body-darker': '#827e6d',
        'color-text-main': '#445361',
        'color-text-muted': '#c4f4d2',
        'color-brand-primary': '#256377',
        'color-brand-secondary': '#36524a',
        'color-brand-tertiary': '#3d3935',
        'color-brand-darker': '#023a4b',
        'color-brand-hover': '#459875',
        'color-brand-alert': '#a45429',
        'color-brand-accent': '#2c7ec4',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
