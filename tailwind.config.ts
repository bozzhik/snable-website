import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    screens: {
      xl: {max: '1780px'},
      sm: {max: '500px'},
    },
    fontFamily: {
      sans: ['var(--font-suisse-intl)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
    },
    colors: {
      white: {
        DEFAULT: '#FFFFFF',
        dirty: '#CCCCCC',
      },
      black: {
        DEFAULT: '#040404',
        light: '#080808',
        card: '#0E0E0E',
      },
      gray: {
        DEFAULT: '#818181',
        medium: '#262626',
        dark: '#101010',
      },
      transparent: 'transparent',
      neutral: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#e5e5e5',
        300: '#d4d4d4',
        400: '#a3a3a3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
        950: '#0a0a0a',
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
