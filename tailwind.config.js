const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--default-font)", ...fontFamily.sans],
			},
			colors: {
				operator: "#FF9F0A",
			},
		},
	},
	plugins: [
		plugin(({ addVariant, addComponents }) => {
			addVariant("xs", "@media screen and (max-width: theme('screens.sm'))");
		}),
	],
};
