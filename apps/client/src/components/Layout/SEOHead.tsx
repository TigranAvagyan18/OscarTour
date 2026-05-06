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
	const language = (router.locale || "nl") as Language;

	const seoTitle = customTitle || t(`seo.${page}.title`, language);
	const seoDescription = customDescription || t(`seo.${page}.description`, language);
	const seoKeywords = customKeywords || t(`seo.${page}.keywords`, language);

	const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://flowerfinder.be"}${router.asPath}`;
	const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL || "https://flowerfinder.be"}${image}`;

	const alternateUrls = {
		en: canonicalUrl.replace(/^\/(nl|fr|de)/, ""),
		nl: canonicalUrl.replace(/^\/(en|fr|de)/, "").replace(/^\//, "/nl/"),
		fr: canonicalUrl.replace(/^\/(en|nl|de)/, "").replace(/^\//, "/fr/"),
		de: canonicalUrl.replace(/^\/(en|nl|fr)/, "").replace(/^\//, "/de/"),
	};

	return (
		<Head>
			<title>{seoTitle}</title>
			<meta name="description" content={seoDescription} />
			<meta name="keywords" content={seoKeywords} />

			{noIndex && <meta name="robots" content="noindex,nofollow" />}

			<link rel="canonical" href={canonicalUrl} />

			<link rel="alternate" hrefLang="en-GB" href={alternateUrls.en} />
			<link rel="alternate" hrefLang="nl-BE" href={alternateUrls.nl} />
			<link rel="alternate" hrefLang="fr-BE" href={alternateUrls.fr} />
			<link rel="alternate" hrefLang="de-BE" href={alternateUrls.de} />
			<link rel="alternate" hrefLang="x-default" href={alternateUrls.nl} />

			<meta property="og:title" content={seoTitle} />
			<meta property="og:description" content={seoDescription} />
			<meta property="og:image" content={ogImage} />
			<meta property="og:url" content={canonicalUrl} />
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content="FindCost" />
			<meta
				property="og:locale"
				content={language === "nl" ? "nl_BE" : language === "fr" ? "fr_BE" : language === "de" ? "de_BE" : "en_GB"}
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
