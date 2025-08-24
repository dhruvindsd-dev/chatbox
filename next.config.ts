import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	webpack(config) {
		// Configure SVG handling
		const rules = config.module.rules
		
		// Find and modify the existing rule that handles SVG files
		const imageRule = rules.find((rule: unknown) => {
			if (typeof rule !== "object" || !rule || !("test" in rule)) return false
			const testRule = rule.test as RegExp
			return testRule && testRule.toString().includes("svg")
		}) as { exclude?: RegExp }

		if (imageRule) {
			// Exclude SVG from the default image rule
			imageRule.exclude = /\.svg$/
		}

		// Add our custom SVG rule
		rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						icon: true,
						svgo: true,
						svgoConfig: {
							plugins: [
								{
									name: "preset-default",
									params: {
										overrides: {
											removeViewBox: false,
										},
									},
								},
							],
						},
					},
				},
			],
		})

		return config
	},
}

export default nextConfig
