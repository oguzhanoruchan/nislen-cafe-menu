/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { forest: '#15452f', cream: '#f8f7f2', terracotta: '#d96d49' },
      fontFamily: { display: ['Georgia', 'serif'] }
    }
  },
  plugins: []
}
