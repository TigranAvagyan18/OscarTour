module.exports = {
	FlowerFinder: {
		output: {
			mode: "single",
			client: "react-query",
			target: "./src/generated/index.ts",
			mock: false,
			override: {
				mutator: {
					path: "./src/api/client.ts",
					name: "customInstance",
				},
			},
		},
		input: {
			target: "../server/swagger-spec.yaml",
		},
		hooks: {
			afterAllFilesWrite: "eslint --fix ./src/generated",
		},
	},
};
