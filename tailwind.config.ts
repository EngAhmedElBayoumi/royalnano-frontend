import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: 'var(--primary)',
  			primaryDark: 'var(--primary-dark)',
  			secondary: 'var(--secondary)',
  			gray: 'var(--gray)',
  			lightGray: '#F5F2F2',
  			dashboardBg: '#F8F7F7',
  			gray300: '#E9E8E8',
  			darkGray: '#5A5A5A',
  			subtitle: '#7d7d7d',
  			neutralGray: '#ebece4',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'var(--sidebar-background)',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: '(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderWidth: {
  			'5': '5px',
  			'10': '10px'
  		},
  		borderColor: {
  			primary: 'var(--primary)'
  		},
  		borderRadius: {
  			'10': '10px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			custom: '0px 4px 4px 0px #00000040',
  			lg: '0px 14px 24px 0px #00000040'
  		},
  		filter: {
  			primary: 'brightness(0) saturate(100%) invert(68%) sepia(42%) saturate(528%) hue-rotate(10deg) brightness(96%) contrast(85%)'
  		},
  		keyframes: {
  			'spinner-leaf-fade': {
  				'0%, 100%': {
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'spinner-leaf-fade': 'spinner-leaf-fade 800ms linear infinite'
  		}
  	},
  	screens: {
  		xs: '560px',
  		sm: '700px',
  		md: '992px',
  		lg: '1200px',
  		xl: '1800px'
  	},
  	fontSize: {
  		xl: [
  			'40px',
  			{
  				lineHeight: '74px',
  				fontWeight: '700'
  			}
  		],
  		lg: [
  			'30',
  			{
  				lineHeight: '50px',
  				fontWeight: '700'
  			}
  		],
  		md: [
  			'25px',
  			{
  				lineHeight: '46px',
  				fontWeight: '700'
  			}
  		],
  		sm: [
  			'18px',
  			{
  				fontWeight: '500',
  				lineHeight: '34px'
  			}
  		]
  	}
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
