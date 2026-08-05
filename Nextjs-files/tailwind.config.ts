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
        // Premium Credit Card Palette
        'cyber-black': '#000000',        // Deep black like black cards
        'cyber-dark': '#0a0a0a',         // Slightly lighter black
        'card-black': '#1a1a1a',         // Card surface black
        'neon-gold': '#FFD700',          // Premium gold
        'gold-dark': '#B8860B',          // Dark gold accent
        'neon-platinum': '#E5E4E2',      // Platinum
        'platinum-dark': '#C0C0C0',      // Silver/Platinum accent
        'neon-silver': '#C0C0C0',        // Silver
        'accent-gold': '#FFA500',        // Orange-gold accent
      },
      boxShadow: {
        'neon-gold': '0 0 15px #FFD700, 0 0 30px rgba(255, 215, 0, 0.5)',
        'neon-gold-lg': '0 0 25px #FFD700, 0 0 50px rgba(255, 215, 0, 0.6), 0 0 75px rgba(255, 215, 0, 0.4)',
        'neon-platinum': '0 0 15px #E5E4E2, 0 0 30px rgba(229, 228, 226, 0.5)',
        'neon-platinum-lg': '0 0 25px #E5E4E2, 0 0 50px rgba(229, 228, 226, 0.6), 0 0 75px rgba(229, 228, 226, 0.4)',
        'card-glow': '0 4px 20px rgba(255, 215, 0, 0.15)',
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
          '0%, 100%': { boxShadow: '0 0 15px #FFD700, 0 0 30px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 25px #FFD700, 0 0 50px rgba(255, 215, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

export default config