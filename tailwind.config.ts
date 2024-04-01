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
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))', // 기존 정의된 그라데이션
        'custom-radial': 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(240,250,249,1) 0%, rgba(254,241,241,1) 100%)' // 새로운 그라데이션 추가
      },
      colors: {
        vividBlue: '#264FFF'
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
