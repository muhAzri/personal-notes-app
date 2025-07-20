/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        'primary-variant': '#1d4ed8',
        secondary: '#10b981',
        background: '#0f172a',
        surface: '#1e293b',
        error: '#ef4444',
        warning: '#f59e0b',
        'on-background': '#f8fafc',
        'on-background-grey': '#94a3b8',
        'on-surface': '#f8fafc',
        'light-background': '#f8fafc',
        'light-surface': '#ffffff',
        'light-on-background': '#0f172a',
        'light-on-background-grey': '#64748b',
        'light-on-surface': '#0f172a',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}