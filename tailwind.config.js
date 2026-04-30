/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita modo oscuro por clase
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#22223b', // para textos principales en claro
          dark: '#e2e8f0', // gris claro para textos principales en oscuro
        },
        card: {
          light: '#fff',
          dark: '#4a5568', // gris oscuro para fondo de tarjetas en oscuro
        },
        background: {
          light: '#f8f9fa',
          dark: '#2d3748', // gris azulado oscuro para fondo general en oscuro
        },
        accent: {
          light: '#63b3ed',
          dark: '#f6ad55', // naranja suave para acentos en oscuro
        },
        border: {
          light: '#e2e8f0',
          dark: '#718096', // gris medio para bordes en oscuro
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
