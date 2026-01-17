/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6', // Purple
        secondary: '#06B6D4', // Cyan
        accent: '#F59E0B', // Gold
        dark: '#0F172A',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        hebrew: ['var(--font-rubik)'],
      },
    },
  },
  plugins: [],
}
