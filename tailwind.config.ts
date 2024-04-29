import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      minHeight: {
        '100vh-header-default': 'calc(100dvh - 80px)',
        '100vh-header-reserve': 'calc(100dvh - 120px)'
        // other properties...
      },
      backgroundImage: {
        'gradient-gra1': 'linear-gradient(135deg, #8d66e6 5%,  #9a90e6 49%, #e2a4d6 100%)',
        'gradient-gra2': 'linear-gradient(62deg, #6c5ff7 0%, #95ffd9 93%)',
        'gradient-gra3': 'linear-gradient(62deg, #6c5ff7 0%, #95ffd9 93%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-background':
          'radial-gradient(circle, rgba(186,180,253,1) 11%, rgba(239,239,255,1) 52%, rgba(246,246,255,1) 71%)',
        'bg-gra1': 'background-image: linear-gradient(135deg, #8d66e6 5%, #e2a4d6 49%, #9a90e6 100%)',
        'bg-gra2': 'background-image: linear-gradient(62deg, #6c5ff7 0%, #95ffd9 93%)',
        'bg-gra3': 'background-image: linear-gradient(62deg, #6c5ff7 0%, #95ffd9 93%)',
        'purple-to-pink': 'background-image: linear-gradient(62deg, #8d66e6 0%, #df85d0 82%)'
      },
      colors: {
        'main-color': '#6C5FF7',
        'point-color': '#5373FF',
        'text-color': '#2443CA',
        'pale-color': '#A4BEFF',
        'border-color': '#8074FF',
        'point-purple': '#6C5FF7',
        'light-purple': '#F6F6FF',
        'disable-color': '#E3E1FC',
        'background-color': '#EFEFFF',
        'input-border-color': '#CAC6FC',

        //button
        'button-default-color': '#6C5FF7',
        'button-hover-color': '#4D43B8',
        'button-press-color': '#988FFE',
        'button-focus-color': '#BAB4FD',
        'button-disable-color': '#E3E1FC',

        'pale-purple': '#FCFCFF',
        'dark-purple-color': '#4D43B8',
        'text-dark-gray': '#515B60',
        'icon-color': '#3f3f3f'
      }
    },
    screens: {
      mobile: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1743px'
    },
    fontFamily: {
      pretendard: ['var(--font-pretendard)']
    }
  },

  plugins: [require('daisyui'), require('tailwind-scrollbar-hide')],
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
