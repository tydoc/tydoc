module.exports = {
  purge: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      spacing: {
        14: '56px',
      },
      colors: {
        // based on https://javisperez.github.io/tailwindcolorshades/#/?Lochmara=3178c6&tv=1 + #3178C6 (TS color)
        blue: {
          50: '#F5F8FC',
          100: '#EAF2F9',
          200: '#CCDDF1',
          300: '#ADC9E8',
          400: '#6FA1D7',
          500: '#3178C6',
          600: '#2C6CB2',
          700: '#1D4877',
          800: '#163659',
          900: '#0F243B',
        },
      },
    },
  },
  variants: {},
  future: {},
  plugins: [],
}
