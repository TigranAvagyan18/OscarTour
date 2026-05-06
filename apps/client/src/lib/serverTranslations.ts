import { GetStaticPropsContext, GetServerSidePropsContext } from "next";
import { Language, translations, t as clientT } from "../i18n";

export interface ServerTranslations {
	locale: Language;
	translations: Record<string, string>;
}

export function getServerTranslations(
	context: GetStaticPropsContext | GetServerSidePropsContext,
	namespaces: string[] = [],
): ServerTranslations {
	const locale = (context.locale || "en") as Language;
	const translationKeys: Record<string, string> = {};

	namespaces.forEach((namespace) => {
		const namespaceTranslations = translations[locale]?.[namespace];
		if (namespaceTranslations && typeof namespaceTranslations === "object") {
			Object.keys(namespaceTranslations).forEach((key) => {
				const fullKey = `${namespace}.${key}`;
				translationKeys[fullKey] = clientT(fullKey, locale);
			});
		}
	});

	return {
		locale,
		translations: translationKeys,
	};
}

// Server-side translation function
export function createServerT(serverTranslations: ServerTranslations) {
	return (key: string): string => {
		return serverTranslations.translations[key] || clientT(key, serverTranslations.locale);
	};
}
