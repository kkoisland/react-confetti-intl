import tsParser from "@typescript-eslint/parser";
import formatjsPlugin from "eslint-plugin-formatjs";

export default [
	{
		files: ["src/**/*.ts", "src/**/*.tsx"],
		languageOptions: {
			parser: tsParser,
		},
		plugins: {
			formatjs: formatjsPlugin,
		},
		rules: {
			"formatjs/enforce-id": [
				"error",
				{
					idInterpolationPattern: "[sha512:contenthash:base64:6]",
				},
			],
		},
	},
];
