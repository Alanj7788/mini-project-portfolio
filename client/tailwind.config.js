const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "primary" : "#0A192F",
        "secondary" : "#F97316",
        "tertiary" : "#991970",
        "fourth" :"#0A195F",
        'neutralSilver':"#F5F7FA",
        'neutralDGrey':"#4D4D4D",
        'brandPrimary':"#4db5ff",
        'neutralGrey':"#717171",
        'gray900':'#18191F',
        'navbg':'#cbdaf2',
        'navtext':'#cb89',
        

      }
    },
    screens: {
      
      lg: {'max': '2023px'},
      

      sm: {'max': '1000px'},
      
    },
  },
  plugins: [
    flowbite.plugin(),

  ],
}