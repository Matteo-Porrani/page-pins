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
        /**
         * custom colors can be used for bg & border classes
         * bg-marine border-marine
         */
        'marine': '#0652DD',
        'forest': '#009432',
        'berry': '#B53471',
      }
    },
  },
  plugins: [],
}

