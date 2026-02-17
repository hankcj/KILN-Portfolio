import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        'bright-indigo': '#0036D8',
        'pacific-cyan': '#3A7D8C',
        'ink-black': '#13161F',
        'parchment': '#FAF6F0',
        // Semantic tokens
        'bg-primary': '#FAF6F0',
        'bg-secondary': '#F0EBE3',
        'accent': '#0036D8',
        'surface-inverse': '#13161F',
        'surface-muted': '#E8E4DE',
        'border-custom': '#C4BEB4',
        'border-muted': '#E0DCD6',
        'on-bg-primary': '#13161F',
        'on-bg-secondary': '#13161F',
        'on-accent': '#FFFFFF',
        'on-surface-inverse': '#FAF6F0',
        'on-surface-muted': '#5C5C68',
      },
      fontFamily: {
        heading: ['"Averia Serif Libre"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.488rem', { lineHeight: '1.2' }],
        'h2': ['1.99rem', { lineHeight: '1.25' }],
        'h3': ['1.592rem', { lineHeight: '1.3' }],
        'h4': ['1.274rem', { lineHeight: '1.35' }],
        'h5': ['1.019rem', { lineHeight: '1.4' }],
        'h6': ['0.815rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'small': ['0.875rem', { lineHeight: '1.45' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
        'button': ['0.875rem', { lineHeight: '1.25' }],
      },
      spacing: {
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
