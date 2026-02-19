import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors
        'bright-indigo': '#0036D8',
        'pacific-cyan': '#3A7D8C',
        'ink-black': '#13161F',
        'parchment': '#FAF6F0',
        
        // DARK MODE as default - Semantic tokens
        'bg-primary': '#13161F',           // Ink Black - main background
        'bg-secondary': '#1A1D27',         // Slightly lighter
        'bg-tertiary': '#22252F',          // For cards/panels
        
        'accent': '#0036D8',               // Bright Indigo
        'accent-hover': '#002BB8',         // Darker Indigo
        
        'surface-inverse': '#FAF6F0',      // Parchment - inverse
        'surface-muted': '#2A2D37',        // Muted dark
        
        'border-custom': 'rgba(250, 246, 240, 0.15)',
        'border-muted': 'rgba(250, 246, 240, 0.08)',
        
        // On-color tokens - text on dark backgrounds
        'on-bg-primary': '#FAF6F0',        // Parchment
        'on-bg-secondary': '#E8E4DE',      // Muted parchment
        'on-bg-tertiary': '#C4BEB4',       // More muted
        'on-accent': '#FFFFFF',
        'on-surface-inverse': '#13161F',
        'on-surface-muted': '#8A8580',
      },
      fontFamily: {
        heading: ['"Averia Serif Libre"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
      fontSize: {
        // Display sizes - more dramatic for dark museum feel
        'display-xl': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-lg': ['4.5rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.01em' }],
        
        // Standard scale
        'h1': ['2.488rem', { lineHeight: '1.2' }],
        'h2': ['1.99rem', { lineHeight: '1.25' }],
        'h3': ['1.592rem', { lineHeight: '1.3' }],
        'h4': ['1.274rem', { lineHeight: '1.35' }],
        'h5': ['1.019rem', { lineHeight: '1.4' }],
        'h6': ['0.815rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
        'button': ['0.875rem', { lineHeight: '1.25' }],
        
        // System/monospace
        'system': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
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
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
        '32': '8rem',    // 128px
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      animation: {
        'grain': 'grain 0.5s steps(10) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -2%)' },
          '20%': { transform: 'translate(2%, -1%)' },
          '30%': { transform: 'translate(-1%, 2%)' },
          '40%': { transform: 'translate(1%, -2%)' },
          '50%': { transform: 'translate(-2%, 1%)' },
          '60%': { transform: 'translate(2%, 2%)' },
          '70%': { transform: 'translate(-1%, -1%)' },
          '80%': { transform: 'translate(1%, 1%)' },
          '90%': { transform: 'translate(-2%, -2%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 54, 216, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 54, 216, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
