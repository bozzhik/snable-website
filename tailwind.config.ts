import type {Config} from 'tailwindcss'

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xl: {max: '1780px'},
      sm: {max: '500px'},
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
