import { FormattedMessage, useIntl } from "react-intl";

const FormatPage = () => {
	const now = new Date();
	const amount = 12345.67;
	const largeNumber = 1234567;
	const items = ["Apple", "Banana", "Orange"];
	const startDate = new Date(2024, 0, 1);
	const endDate = new Date(2024, 0, 5);
	const itemCount = 3;

	const intl = useIntl();

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
			<h2 className="text-2xl mb-6">
				<FormattedMessage
					id="format.dateTimeHeading"
					defaultMessage="Date & Time"
					description="見出し：日時フォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
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

			<h2 className="text-2xl mb-6 mt-8">
				<FormattedMessage
					id="format.currencyHeading"
					defaultMessage="Currency"
					description="見出し：通貨フォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
				<div className="grid grid-cols-2 gap-4">
					<div>
						{intl.formatMessage({
							id: "format.sameCurrency",
							defaultMessage: "(Same)",
							description:
								"説明：金額に通貨変換が発生しない場合の注記。直訳が不自然な言語では「通貨変換なし」など意味が分かる表現にしてください。",
						})}{" "}
						{intl.formatNumber(amount, {
							style: "currency",
							currency: localeCurrency.currency,
						})}
					</div>
					<div>
						{intl.formatMessage({
							id: "format.sameCurrency",
							defaultMessage: "(Same)",
							description:
								"説明：金額に通貨変換が発生しない場合の注記。直訳が不自然な言語では「通貨変換なし」など意味が分かる表現にしてください。",
						})}{" "}
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(amount)}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						{intl.formatMessage(
							{
								id: "format.convertedCurrency",
								defaultMessage: "(USD → {toCurrency} at {rate})",
								description: "説明：通貨変換表示",
							},
							{
								toCurrency: localeCurrency.currency,
								rate: localeCurrency.rate,
							},
						)}{" "}
						{intl.formatNumber(amount * localeCurrency.rate, {
							style: "currency",
							currency: localeCurrency.currency,
						})}
					</div>
					<div>
						{intl.formatMessage(
							{
								id: "format.convertedCurrency",
								defaultMessage: "(USD → {toCurrency} at {rate})",
								description: "説明：通貨変換表示",
							},
							{ toCurrency: "USD", rate: 1 },
						)}{" "}
						{new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(amount)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">
				<FormattedMessage
					id="format.numberHeading"
					defaultMessage="Number"
					description="見出し：数値フォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
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

			<h2 className="text-2xl mb-6 mt-8">
				<FormattedMessage
					id="format.relativeTimeHeading"
					defaultMessage="Relative Time"
					description="見出し：相対時刻フォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatRelativeTime(-2, "hour")}</div>
					<div>{new Intl.RelativeTimeFormat("en-US").format(-2, "hour")}</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatRelativeTime(-3, "day")}</div>
					<div>{new Intl.RelativeTimeFormat("en-US").format(-3, "day")}</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">
				<FormattedMessage
					id="format.listHeading"
					defaultMessage="List"
					description="見出し：リストフォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatList(items, { type: "conjunction" })}</div>
					<div>
						{new Intl.ListFormat("en-US", { type: "conjunction" }).format(
							items,
						)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">
				<FormattedMessage
					id="format.dateRangeHeading"
					defaultMessage="Date Range"
					description="見出し：日付範囲フォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
				<div className="grid grid-cols-2 gap-4">
					<div>{intl.formatDateTimeRange(startDate, endDate)}</div>
					<div>
						{new Intl.DateTimeFormat("en-US").formatRange(startDate, endDate)}
					</div>
				</div>
			</div>

			<h2 className="text-2xl mb-6 mt-8">
				<FormattedMessage
					id="format.displayNameHeading"
					defaultMessage="Display Name"
					description="見出し：表示名フォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
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

			<h2 className="text-2xl mb-6 mt-8">
				<FormattedMessage
					id="format.pluralHeading"
					defaultMessage="Plural"
					description="見出し：複数形フォーマットセクション"
				/>
			</h2>
			<div className="mb-4 space-y-2">
				<div className="grid grid-cols-2 gap-4">
					<div>
						{intl.formatMessage(
							{
								id: "format.itemCount",
								defaultMessage: "{count, plural, one {# item} other {# items}}",
							},
							{ count: 0 },
						)}
					</div>
					<div>0 items</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<div>
							{intl.formatMessage(
								{
									id: "format.itemCount",
									defaultMessage:
										"{count, plural, one {# item} other {# items}}",
								},
								{ count: 1 },
							)}
						</div>
					</div>
					<div>1 item</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<div>
							{intl.formatMessage(
								{
									id: "format.itemCount",
									defaultMessage:
										"{count, plural, one {# item} other {# items}}",
								},
								{ count: itemCount },
							)}
						</div>
					</div>
					<div>3 items</div>
				</div>
			</div>
		</div>
	);
};

export default FormatPage;
