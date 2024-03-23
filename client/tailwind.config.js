/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary" : "#0A192F",
        "secondary" : "#F97316",
        "tertiary" : "#991970",
        "fourth" :"#0A195F",
      }
    },
    screens: {
      
      lg: {'max': '2023px'},
      

      sm: {'max': '1000px'},
      
    },
  },
  plugins: [],
}