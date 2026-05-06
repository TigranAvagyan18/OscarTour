/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://oscartour.am",
	generateRobotsTxt: true,
	exclude: ["/admin", "/admin/*", "/tours", "/tours/*"],
	sitemapSize: 50000,
	alternateRefs: [
		{
			href: "https://oscartour.am",
			hreflang: "hy-AM",
		},
		{
			href: "https://oscartour.am/en",
			hreflang: "en-GB",
		},
		{
			href: "https://oscartour.am/ru",
			hreflang: "ru-RU",
		},
		{
			href: "https://oscartour.am/fr",
			hreflang: "fr-FR",
		},
		{
			href: "https://oscartour.am/de",
			hreflang: "de-DE",
		},
		{
			href: "https://oscartour.am",
			hreflang: "x-default",
		},
	],
};
