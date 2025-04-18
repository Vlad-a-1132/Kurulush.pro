/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#000000', // Черный текст
          800: '#222222',
          700: '#444444',
          600: '#666666',
          500: '#888888',
          400: '#aaaaaa',
          300: '#cccccc',
          200: '#e5e5e5',
          100: '#f5f5f5',
          50: '#fafafa',
        },
        yandex: {
          yellow: '#ffcc00', // Основной желтый
          'yellow-hover': '#f2c200', // Чуть темнее при наведении
          red: '#ff3333', // Красный для акцентов
          black: '#000000', // Черный
          gray: '#f5f5f5', // Светло-серый фон
        },
        blue: {
          50: '#e6f1ff',
          100: '#cce3ff',
          200: '#99c7ff',
          300: '#66abff',
          400: '#338fff',
          500: '#0073ff',
          600: '#005ecc',
          700: '#004499',
          800: '#002966',
          900: '#001433',
        }
      },
      fontFamily: {
        sans: ['YS Text', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 