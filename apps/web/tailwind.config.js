/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F4',
          100: '#E6ECE6',
          200: '#CCD8CD',
          300: '#AEC0B0',
          400: '#8FA892',
          500: '#78917B', // Brand Primary Sage
          600: '#5E7661',
          700: '#4A5D4C',
          800: '#39473B',
          900: '#263028',
        },
        cream: {
          50: '#FDFBF7',
          100: '#FBF9F5', // Brand Background
          200: '#F5EFE6',
          300: '#ECE2D3',
          400: '#DFD1BD',
        },
        coral: {
          500: '#D97757', // Warm Empathetic Accent
          600: '#C25F3F',
        },
        deep: {
          800: '#2A332E',
          900: '#1A211D', // Deep Charcoal
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
