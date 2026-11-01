// client/tailwind.config.js
// Tailwind v3, installed locally (replaces the cdn.tailwindcss.com script). Same colours and fonts as the old config in index.html.
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        banyanGreen: '#1B4332',
        banyanLight: '#2D6A4F',
        banyanGold: '#C5A880',
        limeAccent: '#C6F00C',
        slateDark: '#111827',
        canvasSand: '#FAF8F5',
        espresso: '#2A1F1A',
        deep: '#1F1713',
        alabaster: '#FAF8F5',
        'footer-green': '#EEF4DD',
        olive: '#5C6E0A',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
