/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': {'raw': 'only screen and (min-device-width: 375px) and (min-device-height: 736px) and (orientation: portrait)'},
        'tblt': {'raw': 'only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait)'},
      },
    },
  },
  plugins: [],
}