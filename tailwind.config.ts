import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      colors: {
        bg:       '#000000',
        surface:  '#0f0d0b',
        surface2: '#181410',
        surface3: '#221c16',
        ink:      '#f5f0e8',
        muted:    '#a09080',
        subtle:   '#5a4e42',
        orange: {
          core:   '#c8621a',
          bright: '#e07030',
          dim:    '#8a4010',
          border: 'rgba(200,98,26,0.30)',
          bg:     'rgba(200,98,26,0.07)',
          text:   'rgba(224,112,48,0.90)',
        },
        edge: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          strong:  'rgba(255,255,255,0.12)',
        },
        status: {
          green: '#3d9e6a',
          red:   '#c0504a',
        },
      },
      boxShadow: {
        'orange-sm': '0 0 14px rgba(200,98,26,0.28)',
        'orange-md': '0 0 30px rgba(200,98,26,0.38), 0 0 60px rgba(200,98,26,0.14)',
        'glass':     '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      maxWidth: { '8xl': '88rem' },
      animation: {
        'fade-up':    'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fade-in 0.45s ease both',
        'spin-slow':  'spin-slow 1.4s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-up':    { from:{opacity:'0',transform:'translateY(18px)'}, to:{opacity:'1',transform:'translateY(0)'} },
        'fade-in':    { from:{opacity:'0'}, to:{opacity:'1'} },
        'spin-slow':  { to:{transform:'rotate(360deg)'} },
        'glow-pulse': { '0%,100%':{boxShadow:'0 0 18px rgba(200,98,26,0.2)'}, '50%':{boxShadow:'0 0 36px rgba(200,98,26,0.5)'} },
      },
    },
  },
  plugins: [],
}
export default config
