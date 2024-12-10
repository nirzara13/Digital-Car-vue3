module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0A1128',
        'darker-blue': '#001F54',
        'deep-blue': '#034078',
        'light-blue': '#1282A2',
        'accent-yellow': '#F9D342',
      },
      fontFamily: {
        'body': ['Roboto', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
