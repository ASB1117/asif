/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                neon: {
                    blue: '#00f3ff',
                    purple: '#bc13fe',
                    pink: '#ff0099',
                },
                bg: {
                    dark: '#0a0a0a',
                    card: 'rgba(255, 255, 255, 0.05)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'cyber-grid': "url('https://grainy-gradients.com/noise.svg')", // Placeholder for noise/grid
            },
            animation: {
                'glow-pulse': 'glow-pulse 3s infinite',
            },
            keyframes: {
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 5px #00f3ff, 0 0 10px #00f3ff' },
                    '50%': { boxShadow: '0 0 20px #bc13fe, 0 0 30px #bc13fe' },
                }
            }
        },
    },
    plugins: [],
}
