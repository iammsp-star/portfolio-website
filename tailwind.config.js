/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#040b04', // Very dark green-tinted black for CRT BG
                foreground: '#00ff00', // Pure phosphor green
                primary: '#00ff00',
                secondary: '#00cc00',
                accent: '#33ff33',
                terminal: {
                    dark: '#020802',
                    dim: '#003300',
                    border: '#00aa00'
                }
            },
            fontFamily: {
                mono: ['"Fira Code"', '"JetBrains Mono"', 'Courier New', 'monospace'],
                sans: ['"Fira Code"', '"JetBrains Mono"', 'Courier New', 'monospace'],
                display: ['"Fira Code"', '"JetBrains Mono"', 'Courier New', 'monospace'],
            },
            animation: {
                'scanline': 'scanline 8s linear infinite',
                'flicker': 'flicker 0.15s infinite',
                'blink': 'blink 1s step-end infinite',
                'typewriter': 'typing 2s steps(40, end)',
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' }
                },
                flicker: {
                    '0%': { opacity: '0.95' },
                    '50%': { opacity: '0.85' },
                    '100%': { opacity: '0.9' }
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' }
                },
                typing: {
                    from: { width: '0' },
                    to: { width: '100%' }
                }
            }
        },
    },
    plugins: [],
}
