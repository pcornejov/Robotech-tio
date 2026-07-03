/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0E14',
        surface: '#131A24',
        'surface-alt': '#1C2530',
        primary: '#3A8FB7',
        accent: '#FF4A1C',
        'accent-dim': '#B8330F',
        'text-primary': '#F2F5F8',
        'text-secondary': '#8C9BAC',
        border: '#2A3441',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
