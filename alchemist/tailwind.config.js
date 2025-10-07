// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#0E0E0E',
        gold: '#9b7539',
        ivory: '#F9F6F0',
        slate: '#1C1C1C',
        neutral: '#A69E8A',
        beige:'#f4e6c0',
        gray:'#7c7c7c',
      },
      fontFamily: {
        heading: ['"Libre Baskerville"', 'serif'],
        subheading: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
