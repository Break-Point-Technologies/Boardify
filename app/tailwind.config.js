/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        foreground: '#f8fafc',
        cream: '#f5f0e8',
        'cream-foreground': '#0a0a0a',
        'border-brutal': '#000000',
        'reading-tan': '#e8dcc8',
        'reading-tan-deep': '#d4c4a8',
        'reading-orange': '#c9a86c',
        'reading-orange-deep': '#a88b4a',
        'running-green': '#c8e6c8',
        'running-green-deep': '#a5d6a5',
        'running-green-accent': '#2e7d32',
        'grid-empty': '#e5e5e5',
      },
    },
  },
  plugins: [],
};
