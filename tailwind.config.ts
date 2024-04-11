import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'point-color': '#5373FF',
        'text-color': '#2443CA',
        'pale-color': '#A4BEFF',
        'border-color': '#EFEFEF',
        'point-purple': '#6C5FF7',
        'light-purple': '#F6F6FF',
        'pale-purple': '#FCFCFF',
        'dark-purple-color': '#4D43B8',
        'text-dark-gray': '#515B60'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: true,
    darkTheme: 'light',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root'
  }
};

export default config;
