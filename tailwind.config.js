/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pocket-cards.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#fbbf24',
          amber: '#f59e0b',
          dark: '#020617',
          card: '#0f172a'
        }
      }
    }
  },
  plugins: []
};
