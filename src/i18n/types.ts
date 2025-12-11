export type Locale =
	| "ja-JP"
	| "en-US"
	| "it-IT"
	| "de-DE"
	| "zh-CN"
	| "ko-KR"
	| "es-ES"
	| "fr-FR"
	| "sv-SE"
	| "nl-NL";

export const SUPPORTED_LOCALES: readonly Locale[] = [
	"ja-JP",
	"en-US",
	"it-IT",
	"de-DE",
	"zh-CN",
	"ko-KR",
	"es-ES",
	"fr-FR",
	"sv-SE",
	"nl-NL",
] as const;

export const LOCALE_NAMES: Record<Locale, string> = {
	"ja-JP": "日本語",
	"en-US": "English",
	"it-IT": "Italiano",
	"de-DE": "Deutsch",
	"zh-CN": "中文",
	"ko-KR": "한국어",
	"es-ES": "Español",
	"fr-FR": "Français",
	"sv-SE": "Svenska",
	"nl-NL": "Nederlands",
};
