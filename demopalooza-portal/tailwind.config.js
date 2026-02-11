/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Modern palette
        dark: {
          DEFAULT: '#1E1E1E',
          alt: '#2A2A2A',
        },
        gray: {
          DEFAULT: '#6B7280',
          light: '#E5E7EB',
        },
        offwhite: '#F3F4F6',
        purewhite: '#FFFFFF',

        // Accent Colors - Soft, modern
        accent: {
          DEFAULT: '#90E9B8',
          hover: '#7DD4A3',
          light: '#D1FAE5',
        },
        mint: '#B6FFF6',
        orange: '#F97316',
        peach: '#FED7AA',
        lavender: '#DDD6FE',
        lime: '#D9F99D',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -15px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
