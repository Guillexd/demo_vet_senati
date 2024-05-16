/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        "vetgreen-100":"#70d6ea",
        "vetgreen-200":"#4361ee",
        "vetsky":"#9ADBEA",
        "vetbrown":"#4b4646",
        'vetorange-100':'#FAEDCD',
        "vetorange-200":"#EECDA3",
        "vetwhite":"#EDEDE9",
        "vetgreen-respaldo": "#CCD5AE",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

