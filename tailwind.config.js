/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.vue",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./views/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'marine': '#0652DD',
        'forest': '#009432',
        'berry': '#B53471',
      }
    },
  },
  plugins: [],
}

