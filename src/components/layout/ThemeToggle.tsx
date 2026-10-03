import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme selector"
      className="inline-flex items-center p-0.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-200 select-none"
    >
      {/* Light option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        aria-label="Switch to Light Theme"
        onClick={() => setTheme('light')}
        className={`relative flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase transition-colors duration-150 rounded-md z-10 ${
          theme === 'light'
            ? 'text-[var(--primary)] font-bold'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
        }`}
      >
        {theme === 'light' && (
          <motion.div
            layoutId="theme-active-pill"
            className="absolute inset-0 rounded-md bg-[var(--bg-surface)] border border-[var(--primary)]/40 shadow-sm z-[-1]"
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          />
        )}
        <Sun className="w-3 h-3 text-amber-500 transition-transform hover:rotate-45" />
        <span className="hidden sm:inline">LIGHT</span>
      </button>

      {/* Dark option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        aria-label="Switch to Dark Theme"
        onClick={() => setTheme('dark')}
        className={`relative flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase transition-colors duration-150 rounded-md z-10 ${
          theme === 'dark'
            ? 'text-[var(--primary)] font-bold'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-main)]'
        }`}
      >
        {theme === 'dark' && (
          <motion.div
            layoutId="theme-active-pill"
            className="absolute inset-0 rounded-md bg-[var(--bg-surface)] border border-[var(--primary)]/40 shadow-sm z-[-1]"
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          />
        )}
        <Moon className="w-3 h-3 text-[var(--primary)]" />
        <span className="hidden sm:inline">DARK</span>
      </button>
    </div>
  );
};
