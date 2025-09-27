
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'pixel': ['"Press Start 2P"', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				jungle: {
					50: '#f0fdf4',
					100: '#dcfce7',
					200: '#bbf7d0',
					300: '#86efac',
					400: '#4ade80',
					500: '#22c55e',
					600: '#16a34a',
					700: '#15803d',
					800: '#166534',
					900: '#14532d',
					950: '#0D1117', // Dark jungle-green background matching emojicoin.fun
				},
				neon: {
					yellow: '#FFD43B', // Exact neon yellow from emojicoin.fun
					green: '#39ff14',
					purple: '#bf00ff',
				},
				pixel: {
					blue: '#0074E4',    // Classic retro blue
					pink: '#FF006E',    // Hot pink
					cyan: '#00E5FF',    // Electric cyan
					lime: '#00FF41',    // Lime green
					orange: '#FF8500',  // Retro orange
					magenta: '#FF00FF', // Bright magenta
				},
				// Light gray text color
				gray: {
					100: '#f7fafc',
					200: '#edf2f7',
					300: '#e2e8f0',
					400: '#cbd5e0',
					500: '#a0aec0',
					600: '#718096',
					700: '#4a5568',
					800: '#2d3748',
					900: '#1a202c',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'2xl': '1rem' // Ensuring rounded-2xl is consistent
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255, 212, 59, 0.5)' }, // Updated to use neon yellow
					'50%': { boxShadow: '0 0 30px rgba(255, 212, 59, 0.8)' }
				},
				'pixel-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)',
						filter: 'hue-rotate(0deg)'
					},
					'50%': { 
						transform: 'scale(1.05)',
						filter: 'hue-rotate(90deg)'
					}
				},
				'pixel-glitch': {
					'0%, 100%': { 
						transform: 'translateX(0)',
						filter: 'hue-rotate(0deg)'
					},
					'25%': { 
						transform: 'translateX(-2px)',
						filter: 'hue-rotate(90deg)'
					},
					'75%': { 
						transform: 'translateX(2px)',
						filter: 'hue-rotate(270deg)'
					}
				},
				'scanlines': {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '0 20px' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite alternate',
				'pixel-pulse': 'pixel-pulse 2s ease-in-out infinite',
				'pixel-glitch': 'pixel-glitch 3s ease-in-out infinite',
				'scanlines': 'scanlines 2s linear infinite',
			},
			backgroundImage: {
				'jungle-gradient': 'linear-gradient(135deg, #0D1117 0%, #14532d 25%, #166534 50%, #15803d 75%, #16a34a 100%)',
				'temple-gradient': 'linear-gradient(135deg, #0D1117 0%, #14532d 25%, #166534 50%, #15803d 75%, #16a34a 100%)',
				'neon-gradient': 'linear-gradient(45deg, #FFD43B, #39ff14, #bf00ff)',
				'pixel-gradient': 'linear-gradient(45deg, #0074E4, #FF006E, #00E5FF, #00FF41)',
				'scanlines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
