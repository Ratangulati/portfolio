/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        sans: [{ 'baloo-bhai-2': ['"Baloo Bhai 2"', 'sans-serif'],
      },]
        
      },
    },
  },
  plugins: [],
}

