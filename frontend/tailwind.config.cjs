/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   black: "#000",
    //   white: "#fff",
    //   green: { DEFAULT: '#22C55E', 500: '#22C55E',  600: '#16A34A'},
    //   gray: { DEFAULT: '#6B7280', 100: '#F3F4F6', 500: '#6B7280' }
    // },
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
      },
    },
  },
  plugins: [],
}
