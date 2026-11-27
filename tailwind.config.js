/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // "Dusk flight" palette: midnight sky, sunset coral and amber, sea teal, warm ivory.
      colors: {
        ink: '#0C0B1D',
        ink2: '#17152F',
        line: '#2E2B52',
        coral: '#FF6B4A',
        amber: '#FFB547',
        ember: '#C2411D', // coral that stays readable on light backgrounds
        teal: '#0B756A',
        mint: '#5EE0C8',
        success: 'rgb(15 165 64)',
        paper: '#FAF7F2',
        ash: '#EDE8DF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-body)', 'system-ui', 'sans-serif'], // small caps labels
      },
      backgroundImage: {
        sunset: 'linear-gradient(100deg, #FF6B4A 0%, #FF8F4A 45%, #FFB547 100%)',
      },
      boxShadow: {
        card: '0 24px 60px -30px rgba(12,11,29,0.35)',
        glow: '0 14px 40px -12px rgba(255,107,74,0.6)',
        float: '0 40px 80px -32px rgba(12,11,29,0.55)',
      },
      keyframes: {
        rise: {
          from: { transform: 'translateY(22px)' },
          to: { transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,-6%,0) scale(1.15)' },
        },
        shimmer: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        route: {
          to: { strokeDashoffset: '-200' },
        },
      },
      animation: {
        rise: 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 40s linear infinite',
        aurora: 'aurora 14s ease-in-out infinite',
        shimmer: 'shimmer 6s ease-in-out infinite',
        route: 'route 8s linear infinite',
      },
    },
  },
  plugins: [],
};
