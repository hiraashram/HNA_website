/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f2f7ec',
          100: '#deecd0',
          200: '#bcd9a1',
          300: '#94c06c',
          400: '#6fa642',
          500: '#4e8a2a',
          600: '#3a6e1e',
          700: '#2d5416',
          800: '#1e3a0d',
          900: '#0f1f06',
        },
        amber: {
          50:  '#fdf8ef',
          100: '#f9ecd3',
          200: '#f2d4a0',
          300: '#e8b866',
          400: '#d4963a',
          500: '#b8781e',
          600: '#9a5e14',
          700: '#7c470e',
          800: '#5e3409',
          900: '#3d2104',
        },
        earth: {
          50:  '#f7f3ee',
          100: '#ede4d7',
          200: '#d8c6b0',
          300: '#c0a283',
          400: '#a67c5a',
          500: '#8a5e3a',
          600: '#6e4826',
          700: '#533516',
          800: '#38240a',
          900: '#1e1203',
        },
        cream: '#F8F4EE',
        sage:  '#7B9E6B',
        bark:  '#6B4F2A',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Lato"', 'sans-serif'],
        devanagari: ['"Tiro Devanagari Sanskrit"', 'serif'],
      },
      backgroundImage: {
        'leaf-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234e8a2a' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out',
        'fade-in':    'fadeIn 0.5s ease-out',
        'leaf-sway':  'leafSway 4s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        leafSway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%':      { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
