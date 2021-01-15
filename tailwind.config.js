const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900', defaultTheme.colors.gray[900]),
            a: {
              color: theme('colors.blueGray.900', colors.blueGray[900]),
              textDecoration: 'underline',
              fontWeight: '500',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      margin: ["last"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
