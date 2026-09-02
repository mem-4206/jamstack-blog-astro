/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: '#F2EFE6',
        navy: {
          DEFAULT: '#37485A',
          hover: '#293644',
        },
      },
    },
  },
  plugins: [],
}