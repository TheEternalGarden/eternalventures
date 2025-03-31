import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        helios: ['var(--font-helios-ext)'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        ripple: {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '0.6' },
          '100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0' },
        },
        fadeInFromBottom: {
          'from': { 
            transform: 'perspective(1000px) rotateX(25deg) translateY(100px)',
            opacity: '0'
          },
          'to': {
            transform: 'perspective(1000px) rotateX(0deg) translateY(0)',
            opacity: '1'
          }
        },
        circleRotate: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg) translateX(200px) rotate(-360deg)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        ripple: 'ripple 1s ease-out forwards',
        fadeIn: 'fadeInFromBottom 1s ease-out forwards',
        'circle-rotate': 'circleRotate 30s linear infinite'
      },
    },
  },
  plugins: [],
};

export default config;
