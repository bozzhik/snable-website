import type {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xl: {max: '1780px'},
      sm: {max: '500px'},
    },
    fontFamily: {
      sans: ['var(--font-suisse-intl)', ...fontFamily.sans],
      mono: ['var(--font-geist-mono)', ...fontFamily.mono],
    },
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
      },
    },
  },
  plugins: [],
} satisfies Config
