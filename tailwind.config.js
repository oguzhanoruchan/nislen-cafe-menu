/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { forest: '#1f4d3a', cream: '#faf8f5', terracotta: '#d8b36a' },
      fontFamily: { display: ['Georgia', 'serif'] }
    }
  },
  plugins: []
}
