import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				modern: {
					red: "#E65345",
					yellow: "#F2C042",
					blue: "#3668A6",
					paper: "#F7F4EE",
					charcoal: "#2B2B2A",
				},
			},
			boxShadow: {
				'solid-sm': '2px 2px 0px 0px #2B2B2A',
				'solid': '4px 4px 0px 0px #2B2B2A',
				'solid-lg': '8px 8px 0px 0px #2B2B2A',
				'solid-red': '4px 4px 0px 0px #E65345',
			},
		},
	},
	plugins: [
        typography(),
    ],
};