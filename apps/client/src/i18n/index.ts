export interface Translation {
	[key: string]: string | Translation;
}

export interface Translations {
	[language: string]: Translation;
}

import { en } from "./locales/en";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { hy } from "./locales/hy";
import { ru } from "./locales/ru";

export const translations: Translations = {
	en,
	fr,
	de,
	hy,
	ru,
};

export type Language = "en" | "ru" | "hy" | "de" | "fr";

export const languages: { code: Language; name: string; flag: string; nativeName: string }[] = [
  { code: 'en', name: "English", flag: "GB", nativeName: "English" },
  { code: 'ru', name: "Russian", flag: "RU", nativeName: "Русский" },
  { code: 'hy', name: "Armenian", flag: "AM", nativeName: "Հայերեն" },
  { code: 'de', name: "German", flag: "DE", nativeName: "Deutsch" },
  { code: 'fr', name: "French", flag: "FR", nativeName: "Français" },
];

export const getCurrentLanguage = (routerLocale?: string): Language => {
	if (routerLocale && languages.some((l) => l.code === routerLocale)) {
		return routerLocale as Language;
	}

	if (typeof window !== "undefined") {
		const saved = localStorage.getItem("language") as Language;
		if (saved && languages.some((l) => l.code === saved)) {
			return saved;
		}
	}

	return "hy";
};

export const t = (key: string, lang?: Language): string => {
	const language = lang || getCurrentLanguage();
	const keys = key.split(".");
	let value: Translation | string = translations[language] || translations.en;

	for (const k of keys) {
		if (value && typeof value === "object" && k in value) {
			value = value[k];
		} else {
			// Fallback to English
			let fallbackValue: Translation | string = translations.en;
			for (const fallbackKey of keys) {
				if (fallbackValue && typeof fallbackValue === "object" && fallbackKey in fallbackValue) {
					fallbackValue = fallbackValue[fallbackKey];
				} else {
					return key; // Return key if not found in fallback either
				}
			}
			return typeof fallbackValue === "string" ? fallbackValue : key;
		}
	}

	return typeof value === "string" ? value : key;
};
