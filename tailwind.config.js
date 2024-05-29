/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        auth_proceed_button_bg : "#588585",
        auth_proceed_button_text : "#044305",
      }
    },
  },
  plugins: [],
}

