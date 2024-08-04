/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  theme: {
    extend: {
      keyframes: {
        'move-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        spin: 'spin 40s linear infinite',
        'move-up': 'move-up 0.3s ease-in-out',
      },
      colors: {
        'off-white': '#fcfcfc'
      }
    },
  },
  plugins: [],
}

