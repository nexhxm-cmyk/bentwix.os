import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B1220',
          secondary: '#0F172A',
        },
        foreground: '#F1F5F9',
        primary: {
          DEFAULT: '#38BDF8',
          dark: '#0EA5E9',
          light: '#7DD3FC',
        },
        accent: '#38BDF8',
        muted: {
          DEFAULT: '#64748B',
          foreground: '#94A3B8',
        },
        border: '#1E293B',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0B1220 0%, #0F172A 100%)',
        'gradient-primary': 'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 100%)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.1)',
        md: '0 4px 12px rgba(0, 0, 0, 0.15)',
        lg: '0 10px 30px rgba(0, 0, 0, 0.2)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [require('tailwindcss/plugin')],
};

export default config;
