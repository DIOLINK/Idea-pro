/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita modo oscuro por clase
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2d3748', // Texto principal en claro
          dark: '#e2e8f0', // Texto principal en oscuro
        },
        card: {
          light: '#ffffff', // Fondo de tarjetas en claro
          dark: '#2d3748', // Fondo de tarjetas en oscuro (gris medio)
        },
        background: {
          light: '#f7fafc', // Fondo general en claro
          dark: '#1a202c', // Fondo general en oscuro (gris oscuro, no negro)
        },
        accent: {
          light: '#63b3ed', // Azul claro para acentos en modo claro
          dark: '#90cdf4', // Azul más claro para acentos en modo oscuro
        },
        border: {
          light: '#e2e8f0', // Bordes en modo claro
          dark: '#4a5568', // Bordes en modo oscuro
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
