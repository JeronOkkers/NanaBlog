// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'], // Enable dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        // Define your theme colors here so you can use them like `bg-primary`
        primary: 'var(--primary)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'muted-bg': 'var(--muted-bg)',
        'card-bg': 'var(--card-bg)',
      },
    },
  },
  // 👇 THIS IS THE CRUCIAL PART THAT ACTIVATES THE PLUGIN
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
export default config