import type { Config } from 'tailwindcss'


const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
  {
    pattern: /(bg|bleed)-([a-z]+)-(50|100|200|800|900|950)$/,
    variants: [
      'dark'
    ]
  },
  ],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens
    },
    container: {
      center: true,
      screens: {
        xs: '450px',
        mobile: '560px',
        tablet: '640px',
        desktop: '1024px'
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              fontWeight: '400',
            },
            'code::before': {
              content: 'none'
            },
            'code::after': {
              content: 'none'
            },
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-full-bleed')
  ],
}
export default config
