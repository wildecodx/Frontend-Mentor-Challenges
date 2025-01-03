/** @type {import('tailwindcss').Config} */

module.exports =  {
  content: ['./src/*.jsx'],
  theme: {
    extend: {
      colors: {
        darkBg: "hsl(217, 19%, 24%)",
        cardBg: "hsl(217, 19%, 38%) ",
        highlight: "hsl(150, 100%, 75%)",
        highlightGlow: "hsl(150, 90%, 80%)",
        title: "hsl(193, 38%, 86%)",
      },

      fontFamily: {
        sans: ['Manrope', 'Arial', 'sans-serif'],
      },
    }
   
},
}


