/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 🎨 Paleta principal
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        // ✅ Estados
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        // 🩶 Base del tema
        bg: {
          DEFAULT: 'var(--color-bg)',
          surface: 'var(--color-bg-surface)',
          bubble: 'var(--color-bg-bubble)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
      },
      fontFamily: {
        primary: 'var(--font-family-primary, "Inter", sans-serif)',
        secondary: 'var(--font-family-secondary, "Roboto", sans-serif)',
      },
      fontSize: {
        base: 'var(--font-size-base, 1rem)',
        sm: 'var(--font-size-sm, 0.875rem)',
        lg: 'var(--font-size-lg, 1.125rem)',
      },
    },
  },
  plugins: [],
};
