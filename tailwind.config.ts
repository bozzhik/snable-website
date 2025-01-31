import type {Config} from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
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
        light: '#070707',
      },
      gray: {
        DEFAULT: '#818181',
        light: '#333333',
        medium: '#161616',
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
