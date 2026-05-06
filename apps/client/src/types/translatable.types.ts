export type TranslatableString = {
	en: string;
	nl: string;
	de: string;
	fr: string;
};

export const LANGUAGES = [
	{ code: "en", label: "English", countryCode: "GB" },
	{ code: "nl", label: "Dutch", countryCode: "NL" },
	{ code: "de", label: "German", countryCode: "DE" },
	{ code: "fr", label: "French", countryCode: "FR" },
] as const;

export type LanguageCode = "en" | "nl" | "de" | "fr";

export const createEmptyTranslation = (): TranslatableString => ({
	en: "",
	nl: "",
	de: "",
	fr: "",
});
