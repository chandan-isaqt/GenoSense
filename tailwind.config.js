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
        lab: {
          bg: '#05080D',
          secondary: '#080D14',
          card: '#0B111A',
          border: '#182532',
          cyan: '#35D6C7',
          blue: '#4DA3FF',
          text: '#F4F7FA',
          muted: '#8B9AAA',
          success: '#35D6C7',
          warning: '#F5B942',
          danger: '#FF6678',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'lab-grid': "radial-gradient(rgba(53, 214, 199, 0.08) 1px, transparent 1px)",
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-pulse': 'dataPulse 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '0.4' },
        },
        dataPulse: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(200%)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
