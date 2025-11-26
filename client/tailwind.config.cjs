const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*",
  ],
  theme: {
    colors: {
      ...colors, 
    },
    extend: {},
  },
  plugins: [],
};
