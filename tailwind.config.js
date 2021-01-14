const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        cirrus: ["CirrusCumulus", ...defaultTheme.fontFamily.sans],
        ibm: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        beige: "#FFF7E5",
      },
      fontSize: {
        logoSmall: "2.25rem",
        homeNavSmall: "1.7rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
