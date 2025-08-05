// components/ThemeToggle.tsx
'use client';

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      aria-label="Toggle dark mode"
    >
      <SunIcon
        className={`w-6 h-6 text-yellow-500 absolute transition-transform duration-500 ease-in-out ${
          theme === 'light' ? 'transform translate-x-3 rotate-0' : 'transform -translate-x-3 rotate-90 opacity-0'
        }`}
      />
      <MoonIcon
        className={`w-6 h-6 text-slate-400 absolute transition-transform duration-500 ease-in-out ${
          theme === 'dark' ? 'transform -translate-x-3 rotate-0' : 'transform translate-x-3 rotate-90 opacity-0'
        }`}
      />
    </button>
  );
}