module.exports = {
	apps: [
		{
			name: 'server',
			script: './apps/server/dist/main.js',
			watch: false,
			exec_mode: 'cluster',
			instances: 6,
			autorestart: true
		},
		{
			name: 'client',
			script: 'pnpm',
			args: 'run dist:client',
			watch: false,
			exec_mode: 'fork',
			instances: 1,
			autorestart: true,
		},
	]
};
