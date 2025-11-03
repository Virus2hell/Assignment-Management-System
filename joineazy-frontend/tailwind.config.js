/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem', screens: { lg: '976px', xl: '1240px' } },
      colors: { brand: { 50: '#eef6ff', 100: '#dbecff', 500: '#1470ef', 600: '#0f5cc1', 900: '#0a3570' } }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
