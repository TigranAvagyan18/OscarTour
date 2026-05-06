/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://flowerfinder.be",
	generateRobotsTxt: true,
	exclude: ["/admin", "/shop/dashboard", "/courier/dashboard"],
	sitemapSize: 50000,
	alternateRefs: [
		{
			href: "https://flowerfinder.be",
			hreflang: "nl-BE",
		},
		{
			href: "https://flowerfinder.be/en",
			hreflang: "en-GB",
		},
		{
			href: "https://flowerfinder.be/fr",
			hreflang: "fr-BE",
		},
		{
			href: "https://flowerfinder.be/de",
			hreflang: "de-BE",
		},
		{
			href: "https://flowerfinder.be",
			hreflang: "x-default",
		},
	],
};
