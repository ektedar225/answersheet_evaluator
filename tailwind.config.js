/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c7d7fe',
          300: '#a5bcfc',
          400: '#819af8',
          500: '#6474f1',
          600: '#5154e3', // Main primary
          700: '#4742c6',
          800: '#3b379f',
          900: '#33337e',
          950: '#201e50',
        },
        secondary: {
          50: '#f0fdfd',
          100: '#ccfcfa',
          200: '#99f6f4',
          300: '#61e9ea',
          400: '#39d3d7',
          500: '#14b4bc', // Main secondary
          600: '#0f919c',
          700: '#12737d',
          800: '#155e67',
          900: '#164e57',
          950: '#07333b',
        },
        accent: {
          50: '#f9f5ff',
          100: '#f2e9fe',
          200: '#e5d4fd',
          300: '#d3b3fa',
          400: '#be86f5',
          500: '#a855ed', // Main accent
          600: '#9539d5',
          700: '#822bb7',
          800: '#6c2595',
          900: '#5a2079',
          950: '#3c0c57',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};