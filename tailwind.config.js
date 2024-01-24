/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'cmlg': '0 10px 15px 0 rgb(0 0 0 / 0.1), 0 6px 6px 0 rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [
  ],

});

