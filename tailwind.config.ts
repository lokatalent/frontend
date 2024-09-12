import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primaryBlue: "#3377FF",
				navBlue: "#2659BF",
			},
			backgroundImage: {
				"design-home": "url('/Images/bgDesign.svg')",
			},
		},
	},
	plugins: [],
};
export default config;
