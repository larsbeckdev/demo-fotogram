/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      maxWidth: {
        layout: '1920px',
        content: '1440px',
      },
    },
  },
  plugins: [],
}
