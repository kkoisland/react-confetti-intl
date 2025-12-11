import { useLocaleContext } from "../i18n";
import type { Locale } from "../i18n/types";
import { LOCALE_NAMES, SUPPORTED_LOCALES } from "../i18n/types";

const LanguageSelector = () => {
	const { locale, setLocale } = useLocaleContext();

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setLocale(event.target.value as Locale);
	};

	return (
		<select
			value={locale}
			onChange={handleChange}
			className="px-3 py-2 focus:outline-none"
		>
			{SUPPORTED_LOCALES.map((loc) => (
				<option key={loc} value={loc}>
					{LOCALE_NAMES[loc]}
				</option>
			))}
		</select>
	);
};

export default LanguageSelector;
