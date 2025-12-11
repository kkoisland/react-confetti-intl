import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import type { Locale } from "./types";

// Import all locale files
import deDE from "./locales/de-DE.json";
import enUS from "./locales/en-US.json";
import esES from "./locales/es-ES.json";
import frFR from "./locales/fr-FR.json";
import itIT from "./locales/it-IT.json";
import jaJP from "./locales/ja-JP.json";
import koKR from "./locales/ko-KR.json";
import nlNL from "./locales/nl-NL.json";
import svSE from "./locales/sv-SE.json";
import zhCN from "./locales/zh-CN.json";

const messages: Record<Locale, Record<string, string>> = {
	"ja-JP": jaJP,
	"en-US": enUS,
	"it-IT": itIT,
	"de-DE": deDE,
	"zh-CN": zhCN,
	"ko-KR": koKR,
	"es-ES": esES,
	"fr-FR": frFR,
	"sv-SE": svSE,
	"nl-NL": nlNL,
};

interface LocaleContextValue {
	locale: Locale;
	setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export const useLocaleContext = () => {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error("useLocaleContext must be used within IntlProvider");
	}
	return context;
};

interface IntlProviderProps {
	children: ReactNode;
}

export function IntlProvider({ children }: IntlProviderProps) {
	const [locale, setLocale] = useState<Locale>("it-IT");

	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			<ReactIntlProvider
				messages={messages[locale]}
				locale={locale}
				defaultLocale="ja-JP"
			>
				{children}
			</ReactIntlProvider>
		</LocaleContext.Provider>
	);
}
