/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'product-bg': "url('/assets/product-bg.png')"
      },
      colors: {
        brand: {
          300: '#FF9979',
          500: '#F57D58',
          700: '#F25C2F',
        },
        green: {
          500: '#04D361',
        },
        neutral: {
          200: '#E1E1E6',
          300: '#F9F9FB',
          800: '#202024',
          900: '#121214',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        xs: '360px',
        sm: '420px',
      },
    },
  },
  plugins: [],
}
