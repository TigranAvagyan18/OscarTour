module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: "detect",
		},
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
				project: "./tsconfig.app.json",
			},
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
	},
	ignorePatterns: ["dist", ".eslintrc.cjs", "generated", "ui"],
	rules: {
		"import/no-unresolved": "off",
		"import/extensions": "off",
		"import/named": "off",
		"import/default": "off",
		"import/order": [
			"error",
			{
				groups: ["builtin", "external", "internal", "unknown", "parent", "sibling", "index", "object", "type"],
			},
		],
		"import/prefer-default-export": "off",
		"no-empty-pattern": "off",
		"import/no-named-as-default": "off",
		"@typescript-eslint/no-unused-vars": "warn",
		"no-unused-vars": "warn",
	},
};
