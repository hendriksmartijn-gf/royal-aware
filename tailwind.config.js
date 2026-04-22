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
        navy: {
          50:  '#eef1f7',
          100: '#d5dcea',
          200: '#abbaca',
          300: '#7e95b5',
          400: '#4e6f96',
          500: '#2e4f7a',
          600: '#1C2B4A',
          700: '#16223b',
          800: '#0f1828',
          900: '#080e17',
        },
        amber: {
          50:  '#fdf8ec',
          100: '#f8eecf',
          200: '#f0d99a',
          300: '#e8c266',
          400: '#dea93a',
          500: '#C4973A',
          600: '#a67d2e',
          700: '#866224',
          800: '#654a1b',
          900: '#443112',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  safelist: [
    // Navy colors used dynamically in Record lookups
    'bg-navy-600', 'text-navy-600', 'text-navy-700', 'text-navy-200',
    'bg-navy-600/10', 'border-navy-600/20',
    // Amber colors used dynamically
    'bg-amber-500/20', 'text-amber-700', 'bg-amber-100', 'bg-amber-500',
    // Placeholder colors
    'bg-blue-100', 'bg-red-100', 'bg-yellow-100', 'bg-pink-100',
  ],
  plugins: [],
};
