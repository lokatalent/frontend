import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			colors: {
				primaryBlue: "#3377FF",
				navBlue: "#2659BF",
				textGray: "#141416",
				textGray2: "#212121",
				textGray3: "#9EA3AE",
				textGray4: "#2D2D2D8F",
				textGray5: "#4B5563",
				bgWhite: "#FAF8F4",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			backgroundImage: {
				"design-home": "url('/Images/bgDesign.svg')",
				"balance-card": "url('/Images/balanceBg.png')",
				"booking-card": "url('/Images/bookingBg.png')",
				map: "url('/Images/map-bg.png')",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;

// sm	--- 640px	@media (min-width: 640px) { ... }
// md --- 768px	@media (min-width: 768px) { ... }
// lg	--- 1024px	@media (min-width: 1024px) { ... }
// xl	--- 1280px	@media (min-width: 1280px) { ... }
// 2xl --- 1536px	@media (min-width: 1536px) { ... }

// sm: it works in between 640px to 768px
// md: it works in between 768px to 1024px
// lg: it works in between 1024px to 1280px
// xl: it works in between 1280x to 1536px
// 2xl: it works in between 15px and above
