/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      redly: '#FF0000',
      bluely: '#0000FF',
      greenly: '#008000',
      navyly: '#000080',
      limely: '#00FF00',
      cyanly: '#00FFFF',
      orangely: '#FFA500',
      indigoly: '#4B0082',
    },
    fontFamily: {
      poppins: [
        "poppins, sans-serif"
      ]
    },
    extend: {
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a"}
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
