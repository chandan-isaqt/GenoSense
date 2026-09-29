/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050914',
          900: '#090f20',
          850: '#0d162e',
          800: '#131e3d',
          700: '#1e2d56',
          600: '#2b3f75',
        },
        biotech: {
          cyan: '#06b6d4',
          glow: '#22d3ee',
          green: '#10b981',
          emerald: '#059669',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          dark: '#030712'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(rgba(6, 182, 212, 0.12) 1px, transparent 1px)",
        'cyber-gradient': "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(16, 185, 129, 0.1) 100%)",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
