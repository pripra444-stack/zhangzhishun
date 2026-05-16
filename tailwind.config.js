/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#060c18',
        'bg-section': '#07101c',
        'bg-darker': '#050a14',
        gold: '#d4a853',
        'portal-blue': '#4488cc',
        'text-muted': '#8899aa',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

