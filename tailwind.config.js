/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#050510',
        'deep-space': '#0D0D1F',
        'neon-violet': '#7B61FF',
        'cyber-cyan': '#00D9FF',
        'glitch-pink': '#FF2D6B',
        'star-white': '#EAEAEA',
        'muted': '#888888',
      },
      fontFamily: {
        'grotesk': ['"Space Grotesk"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-violet': '0 0 20px rgba(123, 97, 255, 0.5), 0 0 40px rgba(123, 97, 255, 0.2)',
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.2)',
        'neon-pink': '0 0 20px rgba(255, 45, 107, 0.5), 0 0 40px rgba(255, 45, 107, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(123, 97, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(123, 97, 255, 0.8), 0 0 80px rgba(123, 97, 255, 0.3)' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
  plugins: [],
}
