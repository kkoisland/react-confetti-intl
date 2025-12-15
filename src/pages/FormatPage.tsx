import { FormattedMessage, useIntl } from "react-intl";

const FormatPage = () => {
	const now = new Date();
	const amount = 12345.67;
	const largeNumber = 1234567;
	const items = ["Apple", "Banana", "Orange"];
	const startDate = new Date(2024, 0, 1);
	const endDate = new Date(2024, 0, 5);
	const itemCount = 3;
	const position = 2;

	const intl = useIntl();

	const jsonExamples: Record<
		string,
		{
			itemCount: string;
			gender: string;
			position: string;
		}
	> = {
		"ja-JP": {
			itemCount: "{count, plural, other {# 個のアイテム}}",
			gender:
				"{gender, select, male {彼はこれが好きです} female {彼女はこれが好きです} other {この人はこれが好きです}}",
			position: "{position, selectordinal, other {第 # 位}}",
		},
		"en-US": {
			itemCount: "{count, plural, one {# item} other {# items}}",
			gender:
				"{gender, select, male {He liked this} female {She liked this} other {They liked this}}",
			position:
				"{position, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} place",
		},
		"fr-FR": {
			itemCount: "{count, plural, one {# article} other {# articles}}",
			gender:
				"{gender, select, male {Il a aimé cela} female {Elle a aimé cela} other {Ils ont aimé cela}}",
			position: "{position, selectordinal, one {#ère} other {#ème}} place",
		},
		"de-DE": {
			itemCount: "{count, plural, one {# Artikel} other {# Artikel}}",
			gender:
				"{gender, select, male {Er mochte das} female {Sie mochte das} other {Sie mochten das}}",
			position: "{position, selectordinal, other {#.}} Platz",
		},
		"it-IT": {
			itemCount: "{count, plural, one {# articolo} other {# articoli}}",
			gender:
				"{gender, select, male {Gli è piaciuto} female {Le è piaciuto} other {Gli è piaciuto}}",
			position: "{position, selectordinal, other {#º}} posto",
		},
		"zh-CN": {
			itemCount: "{count, plural, other {# 个项目}}",
			gender:
				"{gender, select, male {他喜欢这个} female {她喜欢这个} other {他们喜欢这个}}",
			position: "{position, selectordinal, other {第 # 名}}",
		},
		"ko-KR": {
			itemCount: "{count, plural, other {# 개 항목}}",
			gender:
				"{gender, select, male {그는 이것을 좋아했습니다} female {그녀는 이것을 좋아했습니다} other {그들은 이것을 좋아했습니다}}",
			position: "{position, selectordinal, other {# 위}}",
		},
		"es-ES": {
			itemCount: "{count, plural, one {# artículo} other {# artículos}}",
			gender:
				"{gender, select, male {Le gustó esto} female {Le gustó esto} other {Les gustó esto}}",
			position: "{position, selectordinal, other {#º}} lugar",
		},
		"sv-SE": {
			itemCount: "{count, plural, one {# artikel} other {# artiklar}}",
			gender:
				"{gender, select, male {Han gillade detta} female {Hon gillade detta} other {De gillade detta}}",
			position: "{position, selectordinal, one {#:a} other {#:e}} plats",
		},
		"nl-NL": {
			itemCount: "{count, plural, one {# artikel} other {# artikelen}}",
			gender:
				"{gender, select, male {Hij vond dit leuk} female {Zij vond dit leuk} other {Zij vonden dit leuk}}",
			position: "{position, selectordinal, other {#e}} plaats",
		},
	};

	const currentLocaleExamples =
		jsonExamples[intl.locale] || jsonExamples["en-US"];

	const currencyMap: Record<string, { currency: string; rate: number }> = {
		"ja-JP": { currency: "JPY", rate: 150 },
		"en-US": { currency: "USD", rate: 1 },
		"de-DE": { currency: "EUR", rate: 0.92 },
		"it-IT": { currency: "EUR", rate: 0.92 },
		"zh-CN": { currency: "CNY", rate: 7.24 },
		"ko-KR": { currency: "KRW", rate: 1320 },
		"es-ES": { currency: "EUR", rate: 0.92 },
		"fr-FR": { currency: "EUR", rate: 0.92 },
		"sv-SE": { currency: "SEK", rate: 10.5 },
		"nl-NL": { currency: "EUR", rate: 0.92 },
	};

	const localeCurrency = currencyMap[intl.locale] || {
		currency: "USD",
		rate: 1,
	};

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<div className="grid grid-cols-2 gap-4 mb-8 pb-4 border-b border-gray-300 dark:border-gray-700">
				<div className="font-semibold text-lg">
					{intl.formatDisplayName(intl.locale, { type: "language" })}
				</div>
				<div className="font-semibold text-lg">English (Reference)</div>
			</div>

			<h2 className="text-2xl mb-6">Date & Time</h2>
			<div className="mb-4 space-y-2">
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					intl.formatDate(date, {'{dateStyle: "medium"}'})
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatDate(now, { dateStyle: "medium" })}</div>
					<div>
						{new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
							now,
						)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatTime(now, { timeStyle: "short" })}</div>
					<div>
						{new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
							now,
						)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">Date Range</h2>
			<div className="mb-4 space-y-2">
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					intl.formatDateTimeRange(startDate, endDate)
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatDateTimeRange(startDate, endDate)}</div>
					<div>
						{new Intl.DateTimeFormat("en-US").formatRange(startDate, endDate)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">Relative Time</h2>
			<div className="mb-4 space-y-2">
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					intl.formatRelativeTime(value, unit)
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatRelativeTime(-2, "hour")}</div>
					<div>{new Intl.RelativeTimeFormat("en-US").format(-2, "hour")}</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatRelativeTime(-3, "day")}</div>
					<div>{new Intl.RelativeTimeFormat("en-US").format(-3, "day")}</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">Currency</h2>
			<div className="mb-4 space-y-2">
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					intl.formatNumber(amount, {'{style: "currency", currency: "JPY"}'})
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						(Same){" "}
						{intl.formatNumber(amount, {
							style: "currency",
							currency: localeCurrency.currency,
						})}
					</div>
					<div>
						(Same){" "}
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(amount)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						(USD → {localeCurrency.currency} at {localeCurrency.rate}){" "}
						{intl.formatNumber(amount * localeCurrency.rate, {
							style: "currency",
							currency: localeCurrency.currency,
						})}
					</div>
					<div>
						(USD → USD at 1){" "}
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(amount)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">Number</h2>
			<div className="mb-4 space-y-2">
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					intl.formatNumber(value)
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatNumber(largeNumber)}</div>
					<div>{new Intl.NumberFormat("en-US").format(largeNumber)}</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatNumber(0.75, { style: "percent" })}</div>
					<div>
						{new Intl.NumberFormat("en-US", { style: "percent" }).format(0.75)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						{intl.formatNumber(42.195, { style: "unit", unit: "kilometer" })}
					</div>
					<div>
						{new Intl.NumberFormat("en-US", {
							style: "unit",
							unit: "kilometer",
						}).format(42.195)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">List</h2>
			<div className="mb-4 space-y-2">
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					intl.formatList(items, {'{type: "conjunction"}'})
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatList(items, { type: "conjunction" })}</div>
					<div>
						{new Intl.ListFormat("en-US", { type: "conjunction" }).format(
							items,
						)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">Display Name</h2>
			<div className="mb-4 space-y-2">
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					intl.formatDisplayName(value, {'{type: "language"}'})
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatDisplayName("ja", { type: "language" })}</div>
					<div>
						{new Intl.DisplayNames("en-US", { type: "language" }).of("ja")}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatDisplayName("US", { type: "region" })}</div>
					<div>
						{new Intl.DisplayNames("en-US", { type: "region" }).of("US")}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">ICU Message Format</h2>
			<div className="mb-4 space-y-2">
				<h3 className="text-lg font-semibold mb-2">Plural</h3>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono">
					{"{count, plural, one {# item} other {# items}}"}
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono">
					"format.itemCount": "{jsonExamples["en-US"].itemCount}"
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					"format.itemCount": "{currentLocaleExamples.itemCount}"
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="B8MRsI"
							defaultMessage="{count, plural, one {# item} other {# items}}"
							values={{ count: 0 }}
						/>
					</div>
					<div>0 items</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="B8MRsI"
							defaultMessage="{count, plural, one {# item} other {# items}}"
							values={{ count: 1 }}
						/>
					</div>
					<div>1 item</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="B8MRsI"
							defaultMessage="{count, plural, one {# item} other {# items}}"
							values={{ count: itemCount }}
						/>
					</div>
					<div>3 items</div>
				</div>

				<h3 className="text-lg font-semibold mb-2 mt-6">Select</h3>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono">
					{
						"{gender, select, male {He liked this} female {She liked this} other {They liked this}}"
					}
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono">
					"format.gender": "{jsonExamples["en-US"].gender}"
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					"format.gender": "{currentLocaleExamples.gender}"
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="OHEhHa"
							defaultMessage="{gender, select, male {He liked this} female {She liked this} other {They liked this}}"
							values={{ gender: "male" }}
						/>
					</div>
					<div>He liked this</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="OHEhHa"
							defaultMessage="{gender, select, male {He liked this} female {She liked this} other {They liked this}}"
							values={{ gender: "female" }}
						/>
					</div>
					<div>She liked this</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="OHEhHa"
							defaultMessage="{gender, select, male {He liked this} female {She liked this} other {They liked this}}"
							values={{ gender: "other" }}
						/>
					</div>
					<div>They liked this</div>
				</div>

				<h3 className="text-lg font-semibold mb-2 mt-6">Selectordinal</h3>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono">
					{
						"{position, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}"
					}
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-mono">
					"format.position": "{jsonExamples["en-US"].position}"
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-mono">
					"format.position": "{currentLocaleExamples.position}"
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="n8yUgb"
							defaultMessage="{position, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} place"
							values={{ position: 1 }}
						/>
					</div>
					<div>1st place</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="n8yUgb"
							defaultMessage="{position, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} place"
							values={{ position }}
						/>
					</div>
					<div>2nd place</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<FormattedMessage
							id="n8yUgb"
							defaultMessage="{position, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} place"
							values={{ position: 3 }}
						/>
					</div>
					<div>3rd place</div>
				</div>
			</div>
		</div>
	);
};

export default FormatPage;
