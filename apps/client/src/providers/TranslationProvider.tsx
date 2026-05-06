import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Language, t, getCurrentLanguage } from "../i18n";
import { ServerTranslations } from "../lib/serverTranslations";
import { TranslatableString, LanguageCode } from "../types/translatable.types";
import { getTranslationText } from "../utils/language";

interface TranslationContextType {
	language: Language;
	changeLanguage: (lang: Language) => void;
	t: (key: string) => string;
	getTranslation: (translatable: TranslatableString | string | null | undefined) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
	children: React.ReactNode;
	serverTranslations?: ServerTranslations;
}

export function TranslationProvider({ children, serverTranslations }: TranslationProviderProps) {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	const routerLocale = (router.locale || "nl") as Language;
	const [language, setCurrentLanguage] = useState<Language>(routerLocale);

	useEffect(() => {
		setMounted(true);
		const newLocale = (router.locale || "nl") as Language;
		setCurrentLanguage(newLocale);

		if (typeof window !== "undefined") {
			localStorage.setItem("language", newLocale);
		}
	}, [router.locale]);

	const handleChangeLanguage = (lang: Language) => {
		const currentPath = router.asPath;
		router.push(currentPath, currentPath, { locale: lang, scroll: false });
	};

	const translate = (key: string) => {
		if (serverTranslations?.translations[key]) {
			return serverTranslations.translations[key];
		}
		return t(key, language);
	};

	const getTranslation = (translatable: TranslatableString | string | null | undefined) => {
		return getTranslationText(translatable, language as LanguageCode);
	};

	if (!mounted) {
		return (
			<TranslationContext.Provider
				value={{
					language: routerLocale,
					changeLanguage: handleChangeLanguage,
					t: (key: string) => t(key, routerLocale),
					getTranslation: (translatable) => getTranslationText(translatable, routerLocale as LanguageCode),
				}}
			>
				{children}
			</TranslationContext.Provider>
		);
	}

	return (
		<TranslationContext.Provider
			value={{
				language,
				changeLanguage: handleChangeLanguage,
				t: translate,
				getTranslation,
			}}
		>
			{children}
		</TranslationContext.Provider>
	);
}

export function useTranslation() {
	const context = useContext(TranslationContext);
	if (context === undefined) {
		throw new Error("useTranslation must be used within a TranslationProvider");
	}
	return context;
}
