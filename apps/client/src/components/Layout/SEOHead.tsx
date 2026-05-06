import Head from "next/head";
import { useRouter } from "next/router";
import { t, Language } from "../../i18n";

interface SEOHeadProps {
	page: "home" | "search" | "priceEstimation" | "about" | "contact";
	title?: string;
	description?: string;
	keywords?: string;
	image?: string;
	noIndex?: boolean;
}

export default function SEOHead({
	page,
	title: customTitle,
	description: customDescription,
	keywords: customKeywords,
	image = "/fav.ico",
	noIndex = false,
}: SEOHeadProps) {
	const router = useRouter();
	const language = (router.locale || "hy") as Language;

	const seoTitle = customTitle || t(`seo.${page}.title`, language);
	const seoDescription = customDescription || t(`seo.${page}.description`, language);
	const seoKeywords = customKeywords || t(`seo.${page}.keywords`, language);

	const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://oscartour.am"}${router.asPath}`;
	const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL || "https://oscartour.am"}${image}`;

	const alternateUrls = {
		hy: canonicalUrl.replace(/^\/(en|ru|fr|de)/, ""),
		en: canonicalUrl.replace(/^\/(hy|ru|fr|de)/, ""),
		ru: canonicalUrl.replace(/^\/(hy|en|fr|de)/, "").replace(/^\//, "/ru/"),
		fr: canonicalUrl.replace(/^\/(hy|en|ru|de)/, "").replace(/^\//, "/fr/"),
		de: canonicalUrl.replace(/^\/(hy|en|ru|fr)/, "").replace(/^\//, "/de/"),
	};

	return (
		<Head>
			<title>{seoTitle}</title>
			<meta name="description" content={seoDescription} />
			<meta name="keywords" content={seoKeywords} />

			{noIndex && <meta name="robots" content="noindex,nofollow" />}

			<link rel="canonical" href={canonicalUrl} />

			<link rel="alternate" hrefLang="en-GB" href={alternateUrls.en} />
			<link rel="alternate" hrefLang="ru-RU" href={alternateUrls.ru} />
			<link rel="alternate" hrefLang="fr-FR" href={alternateUrls.fr} />
			<link rel="alternate" hrefLang="de-DE" href={alternateUrls.de} />
			<link rel="alternate" hrefLang="x-default" href={alternateUrls.hy} />

			<meta property="og:title" content={seoTitle} />
			<meta property="og:description" content={seoDescription} />
			<meta property="og:image" content={ogImage} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="OscarTour" />
			<meta
				property="og:locale"
				content={language === "hy" ? "hy_AM" : language === "en" ? "en_GB" : language === "ru" ? "ru_RU" : language === "fr" ? "fr_FR" : language === "de" ? "de_DE" : "hy_AM"}
			/>

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={seoTitle} />
			<meta name="twitter:description" content={seoDescription} />
			<meta name="twitter:image" content={ogImage} />

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta httpEquiv="Content-Language" content={language} />
		</Head>
	);
}
