/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#A020F0',
        'neon-cyan': '#00FFFF',
        'neon-emerald': '#00FF7F',
      }
    },
  },
  plugins: [],
};
