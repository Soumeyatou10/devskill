/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#1a2340',
        'teal': '#0d6e6e',
        'amber': '#e07b39',
        'green': '#2d7a4f',
        'red': '#c0392b',
        'blue': '#1a5fa8',
        'purple': '#6b3fa0',
      },
    },
  },
  plugins: [],
}