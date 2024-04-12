import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      height: {
        '100vh-header': 'calc(100dvh - 60px)'
        // other properties...
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-background':
          'radial-gradient(circle, rgba(186,180,253,1) 11%, rgba(239,239,255,1) 52%, rgba(246,246,255,1) 71%)'
      },
      colors: {
        'main-color': '#6C5FF7',
        'point-color': '#5373FF',
        'text-color': '#2443CA',
        'pale-color': '#A4BEFF',
        'border-color': '#EFEFEF',
        'point-purple': '#6C5FF7',
        'light-purple': '#F6F6FF',
        'disable-color': '#E3E1FC',
        //button
        'button-default-color': '#6C5FF7',
        'button-hover-color': '#4D43B8',
        'button-press-color': '#988FFE',
        'button-focus-color': '#BAB4FD',
        'button-disable-color': '#E3E1FC',

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
