// const defaultTheme = require('tailwindcss/defaultTheme');
// eslint-disable-next-line @typescript-eslint/no-require-imports,no-undef
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: colors.stone['600'],
        primaryDark: colors.stone['700'],
        secondary: colors.cyan['800'],
        backgroundLight: colors.white,
        backgroundDark: colors.black,
        textDark: colors.stone['100'],
        textLight: colors.stone['950'],
        hoverColor: colors.cyan['100'],
        hoverColorDark: colors.cyan['600'],
        borderColor: colors.stone['300'],
        borderColorDark: colors.stone['600'],
      },
    },
  },
  plugins: [],
};
