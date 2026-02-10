module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        ethiopianGold: '#D4AF37', // Yellow/Gold
        ethiopianRed: '#DA1A32',  // Red
        paperWhite: '#F9F7F2',    // Background
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}