/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#05060F',
        surface: '#0D1117',
        border: '#1C2333',
        gold: '#FFB800',
        cyan: '#00E5FF',
        red: '#FF2D55',
        green: '#00FF87',
        card: {
          bronce: '#733B12',
          plata: '#94A3B8',
          oro: '#F59E0B',
          legendary: '#8B5CF6',
          icon: '#111827'
        }
      },
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-gold': '0 0 15px rgba(255, 184, 0, 0.4)',
        'glow-cyan': '0 0 15px rgba(0, 229, 255, 0.4)',
      }
    },
  },
  plugins: [],
}
