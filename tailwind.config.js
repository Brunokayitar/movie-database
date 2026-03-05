/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'movie-dark': '#1a2634',
        'movie-darker': '#0f1b27',
        'movie-card': '#1f3142',
        'movie-accent': '#f5c518',
        'movie-secondary': '#2a3f52',
      }
    },
  },
  plugins: [],
}
