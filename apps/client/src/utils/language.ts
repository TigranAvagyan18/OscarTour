import { TranslatableString, LanguageCode } from "@/types/translatable.types";

export const getTranslationText = (
	translatable: TranslatableString | string | null | undefined,
	language: LanguageCode,
): string => {
	if (!translatable) return "";

	if (typeof translatable === "string") {
		return translatable;
	}

	const translation = translatable[language];

	if (translation && translation.trim() !== "") {
		return translation;
	}

	if (language !== "en" && translatable.en && translatable.en.trim() !== "") {
		return translatable.en;
	}

	const firstAvailable = Object.values(translatable).find((val) => val && val.trim() !== "");

	return firstAvailable || "";
};
