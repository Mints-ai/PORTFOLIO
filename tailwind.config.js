/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep': 'var(--color-bg-deep)',
        'bg-surface': 'var(--color-bg-surface)',
        'bg-elevated': 'var(--color-bg-elevated)',
        'beige-100': 'var(--color-beige-100)',
        'beige-200': 'var(--color-beige-200)',
        'beige-300': 'var(--color-beige-300)',
        'beige-900': 'var(--color-beige-900)',
        'accent-gold': 'var(--color-accent-gold)',
        'accent-gold-bright': 'var(--color-accent-gold-bright)',
        'accent-gold-dim': 'var(--color-accent-gold-dim)',
        'neon-green': 'var(--color-neon-green)',
        'neon-green-dim': 'var(--color-neon-green-dim)',
        'glass-border': 'var(--glass-border)',
        'glass-border-gold': 'var(--glass-border-gold)',
        'glass-border-neon': 'var(--glass-border-neon)',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        accent: ['"Orbitron"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backdropBlur: {
        glass: '48px',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0)' },
          '50%': { boxShadow: '0 0 30px 4px rgba(201,168,76,0.3)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
