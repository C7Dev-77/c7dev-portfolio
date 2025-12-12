import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#050505',
        'cyber-dark': '#0a0a0a',
        'neon-gold': '#FFD700',      // Gold
        'neon-platinum': '#E5E4E2',  // Platinum
      },
      boxShadow: {
        'neon-gold': '0 0 10px #FFD700, 0 0 20px rgba(255, 215, 0, 0.5)',
        'neon-gold-lg': '0 0 20px #FFD700, 0 0 40px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4)',
        'neon-platinum': '0 0 10px #E5E4E2, 0 0 20px rgba(229, 228, 226, 0.5)',
        'neon-platinum-lg': '0 0 20px #E5E4E2, 0 0 40px rgba(229, 228, 226, 0.6), 0 0 60px rgba(229, 228, 226, 0.4)',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)'],
        sans: ['var(--font-inter)'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'glitch': 'glitch 0.3s infinite linear alternate-reverse',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px #00ff9d, 0 0 20px rgba(0, 255, 157, 0.5)' },
          '50%': { boxShadow: '0 0 20px #00ff9d, 0 0 40px rgba(0, 255, 157, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config