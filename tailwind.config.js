/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], // Dark mode 지원
  content: [
    './pages/**/*.{ts,tsx}', // Tailwind 클래스 탐색 경로
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '', // 클래스 앞에 추가 프리픽스 (필요 시 사용)
  theme: {
    colors: {
      body: '#fefefe',
      white: '#ffffff',
      red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      green: {
        50: '#f0f9f2',
        100: '#dbf0de',
        200: '#bae0c2',
        300: '#8cc99d',
        400: '#5bac73',
        500: '#3c965a',
        600: '#297244',
        700: '#205c37',
        800: '#1c492d',
        900: '#183c27',
      },
      gray: {
        50: '#fbfbfb',
        100: '#efefef',
        200: '#dcdcdc',
        300: '#bdbdbd',
        400: '#989898',
        500: '#7c7c7c',
        600: '#656565',
        700: '#525252',
        800: '#464646',
        900: '#3d3d3d',
      },
    },
  },
  plugins: [require('tailwindcss-animate')], // 애니메이션 플러그인
}
