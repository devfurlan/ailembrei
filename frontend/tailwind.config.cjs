/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.tsx'
  ],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      gray: {
        100: '#F2F2F2',
        200: '#D9D9D9',
        300: '#808080',
        400: '#333333',
        500: '#262626',
        600: '#1A1A1A',
        700: '#0D0D0D',
      },
      purple: '#8284FA',
      'dark-purple': '#5E60CE',
      blue: '#4EA8DE',
      'dark-blue': '#1E6F9F',
      red: '#E25858',
    },
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif'
      }
    },
  },
  plugins: [],
}
