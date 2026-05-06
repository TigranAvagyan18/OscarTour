/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	typescript: {
		tsconfigPath: "./tsconfig.json",
		ignoreBuildErrors: true,
	},
	experimental: {
		esmExternals: "loose",
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	i18n: {
		locales: ["en", "ru", "hy", "fr", "de"],
		defaultLocale: "hy",
		localeDetection: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**", // allow any host
			},
			{
				protocol: "http",
				hostname: "**", // optional, if you need http too
			},
		],
		unoptimized: true,
	},
	async rewrites() {
		return [
			{
				source: "/relay-Ke9c/static/:path*",
				destination: "https://eu-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/relay-Ke9c/:path*",
				destination: "https://eu.i.posthog.com/:path*",
			},
			{
				source: "/relay-Ke9c/flags",
				destination: "https://eu.i.posthog.com/flags",
			},
		];
	},
	skipTrailingSlashRedirect: true,
};

export default nextConfig;
