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
        primary:   '#1E3765',   // deep corporate blue
        secondary: '#B7C728',   // lime green accent
        error:     '#D64545',
      },
      fontFamily: {
        sans: ['Trebuchet MS', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'display': ['32px', { lineHeight: '38px', fontWeight: '700' }],
        'headline-lg': ['24px', { lineHeight: '30px', fontWeight: '700' }],
        'headline-md': ['20px', { lineHeight: '24px', fontWeight: '700' }],
        'headline-sm': ['18px', { lineHeight: '22px', fontWeight: '700' }],
        'body-lg':     ['16px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md':     ['15px', { lineHeight: '27px', fontWeight: '400' }],
        'body-sm':     ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'label-lg':    ['18px', { lineHeight: '22px', fontWeight: '700' }],
        'label-md':    ['13.5px', { lineHeight: '18px', fontWeight: '700' }],
        'label-sm':    ['12px',  { lineHeight: '16px', fontWeight: '700' }],
        'nav-link':    ['13.5px', { lineHeight: '18px', fontWeight: '400' }],
      },
      borderRadius: {
        // brand shape tokens (square-ish)
        DEFAULT: '4px',
        sm:  '4px',
        md:  '8px',
        lg:  '12px',
        xl:  '16px',
        '2xl': '16px',   // cap 2xl at 16px — brand stays square
        full: '9999px',
        none: '0px',
      },
      spacing: {
        'xs':  '6px',
        'sm':  '16px',
        'md':  '26px',
        'lg':  '48px',
        'xl':  '106px',
      },
      height: {
        'btn': '43px',
      },
    },
  },
  safelist: [
    // Primary / secondary used in dynamic Record lookups
    'bg-primary', 'text-primary', 'border-primary',
    'bg-primary/10', 'bg-primary/20', 'border-primary/20',
    'bg-secondary', 'text-secondary', 'border-secondary',
    'bg-secondary/20', 'ring-secondary/30',
    // Category colours
    'bg-amber-100', 'bg-blue-100', 'bg-red-100', 'bg-yellow-100', 'bg-pink-100',
    // Channel badge colours
    'bg-blue-100', 'text-blue-800',
    'bg-green-100', 'text-green-800',
    'bg-orange-100', 'text-orange-800',
    'bg-purple-100', 'text-purple-800',
  ],
  plugins: [],
};
