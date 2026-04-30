/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita modo oscuro por clase
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#22223b', // para textos principales en claro
          dark: '#f2e9e4', // para textos principales en oscuro
        },
        card: {
          light: '#fff',
          dark: '#23272f',
        },
        background: {
          light: '#f8f9fa',
          dark: '#181a1b',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
