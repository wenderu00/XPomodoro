/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scarlet: {
          50: '#fff0f0',
          100: '#ffdddd',
          200: '#ffc0c0',
          300: '#ff9494',
          400: '#ff5c5c',
          500: '#ff2424',   // base scarlet
          600: '#e01010',
          700: '#ba0a0a',
          800: '#990d0d',
          900: '#7f1313',
          950: '#460505',
        }
      }
    },
  },
  plugins: [],
}
