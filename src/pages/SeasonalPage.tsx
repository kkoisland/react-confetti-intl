import { useState } from "react";
import Confetti from "react-confetti";
import { defineMessages, useIntl } from "react-intl";

const THEME_SWITCH_DELAY = 100;

export const themeMessages = defineMessages({
	sakuraName: {
		id: "seasonal.theme.sakura.name",
		defaultMessage: "Sakura",
		description: "テーマ名：桜",
	},
	sakuraDescription: {
		id: "seasonal.theme.sakura.description",
		defaultMessage:
			"Cherry blossom petals gently swirl and flutter in the breeze",
		description: "テーマ説明：桜の花びらが風に舞う様子",
	},
	snowName: {
		id: "seasonal.theme.snow.name",
		defaultMessage: "Snow",
		description: "テーマ名：雪",
	},
	snowDescription: {
		id: "seasonal.theme.snow.description",
		defaultMessage:
			"Snowflakes softly fall and scatter downward (dark mode recommended)",
		description: "テーマ説明：雪が静かに降る様子",
	},
	koyoName: {
		id: "seasonal.theme.koyo.name",
		defaultMessage: "Autumn",
		description: "テーマ名：紅葉",
	},
	koyoDescription: {
		id: "seasonal.theme.koyo.description",
		defaultMessage: "Autumn leaves dance and swirl in the wind",
		description: "テーマ説明：紅葉が風に舞う様子",
	},
	starName: {
		id: "seasonal.theme.star.name",
		defaultMessage: "Star",
		description: "テーマ名：星",
	},
	starDescription: {
		id: "seasonal.theme.star.description",
		defaultMessage:
			"Gold, silver, and sand shimmer and gently float (dark mode recommended)",
		description: "テーマ説明：金銀砂がきらめく様子",
	},
	christmasName: {
		id: "seasonal.theme.christmas.name",
		defaultMessage: "Christmas",
		description: "テーマ名：クリスマス",
	},
	christmasDescription: {
		id: "seasonal.theme.christmas.description",
		defaultMessage: "Festive confetti bursts and spreads in Christmas colors",
		description: "テーマ説明：クリスマスの紙吹雪が弾ける様子",
	},
});

const UI_TEXT = defineMessages({
	stopButton: {
		id: "seasonal.stopButton",
		defaultMessage: "Stop Confetti",
		description: "ボタン：紙吹雪を停止",
	},
	themeLabel: {
		id: "seasonal.themeLabel",
		defaultMessage: "Theme:",
		description: "ラベル：テーマ名表示",
	},
	colorsLabel: {
		id: "seasonal.colorsLabel",
		defaultMessage: "Colors:",
		description: "ラベル：カラー表示",
	},
	piecesLabel: {
		id: "seasonal.piecesLabel",
		defaultMessage: "Pieces:",
		description: "ラベル：紙吹雪の個数表示",
	},
	gravityLabel: {
		id: "seasonal.gravityLabel",
		defaultMessage: "Gravity:",
		description: "ラベル：重力パラメータ表示",
	},
	windLabel: {
		id: "seasonal.windLabel",
		defaultMessage: "Wind:",
		description: "ラベル：風パラメータ表示",
	},
	initialVelocityYLabel: {
		id: "seasonal.initialVelocityYLabel",
		defaultMessage: "InitialVelocityY:",
		description: "ラベル：Y軸初速パラメータ表示",
	},
	initialVelocityXLabel: {
		id: "seasonal.initialVelocityXLabel",
		defaultMessage: "InitialVelocityX:",
		description: "ラベル：X軸初速パラメータ表示",
	},
	copiedButton: {
		id: "seasonal.copiedButton",
		defaultMessage: "Copied!",
		description:
			"ボタン：コピー完了状態。UI制約あり：最大9文字。短縮必須。意味優先。",
	},
	copyCodeButton: {
		id: "seasonal.copyCodeButton",
		defaultMessage: "Copy Code",
		description: "ボタン：UI制約あり：最大9文字。短縮必須。意味優先。",
	},
});

export const THEME_STG = {
	sakura: { id: "sakura" },
	snow: { id: "snow" },
	koyo: { id: "koyo" },
	star: { id: "star" },
	christmas: { id: "christmas" },
};

export const themes = [
	{
		id: "sakura",
		emoji: "🌸",
		colors: ["#FFB7C5", "#FFC0CB"],
		numberOfPieces: 100,
		gravity: 0.02,
		wind: 0.01,
		initialVelocityY: -3,
	},
	{
		id: "snow",
		emoji: "❄️",
		colors: ["#FFFFFF", "#E0F2F7"],
		numberOfPieces: 300,
		gravity: 0.01,
		initialVelocityY: -7,
	},
	{
		id: "koyo",
		emoji: "🍁",
		colors: ["#FF6347", "#FFA500"],
		numberOfPieces: 200,
		gravity: 0.08,
		wind: 0.02,
	},
	{
		id: "star",
		emoji: "✨",
		colors: ["#DAA520", "#E8E8E8", "#E6BE8A"],
		numberOfPieces: 150,
		gravity: 0.0005,
		initialVelocityY: -9,
	},
	{
		id: "christmas",
		emoji: "🎄",
		colors: ["#FF0000", "#00FF00", "#DAA520", "#4169E1"],
		numberOfPieces: 500,
		gravity: 0.06,
		initialVelocityX: 5,
	},
];

const SeasonalPage = () => {
	const intl = useIntl();
	const [selectedThemeIndex, setSelectedThemeIndex] = useState<number | null>(
		null,
	);
	const currentTheme =
		selectedThemeIndex !== null ? themes[selectedThemeIndex] : null;
	const [showConfetti, setShowConfetti] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopyCode = () => {
		if (!currentTheme) return;

		const jsxCode = `<Confetti
    colors={${JSON.stringify(currentTheme.colors)}}
    numberOfPieces={${currentTheme.numberOfPieces}}
    gravity={${currentTheme.gravity}}${
			currentTheme.wind !== undefined ? `\n    wind={${currentTheme.wind}}` : ""
		}${
			currentTheme.initialVelocityY !== undefined
				? `\n    initialVelocityY={${currentTheme.initialVelocityY}}`
				: ""
		}${
			currentTheme.initialVelocityX !== undefined
				? `\n    initialVelocityX={${currentTheme.initialVelocityX}}`
				: ""
		}
  />`;

		navigator.clipboard.writeText(jsxCode);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div className="flex flex-col items-center justify-center h-full gap-8 p-4">
			<div className="flex flex-col md:flex-row gap-4">
				{themes.map((t, index) => {
					const isSelected = index === selectedThemeIndex;
					return (
						<button
							type="button"
							key={t.id}
							onClick={() => {
								setShowConfetti(false);
								setSelectedThemeIndex(index);
								setTimeout(() => {
									setShowConfetti(true);
								}, THEME_SWITCH_DELAY);
							}}
							className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ${
								isSelected
									? "bg-gradient-to-r from-orange-100 to-pink-200 text-gray-800"
									: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							{t.emoji}{" "}
							{intl.formatMessage(
								{
									sakura: themeMessages.sakuraName,
									snow: themeMessages.snowName,
									koyo: themeMessages.koyoName,
									star: themeMessages.starName,
									christmas: themeMessages.christmasName,
								}[t.id as keyof typeof THEME_STG],
							)}
						</button>
					);
				})}
			</div>
			{/* Description */}
			{currentTheme && (
				<p className="text-xl text-gray-600 dark:text-gray-400">
					{intl.formatMessage(
						{
							sakura: themeMessages.sakuraDescription,
							snow: themeMessages.snowDescription,
							koyo: themeMessages.koyoDescription,
							star: themeMessages.starDescription,
							christmas: themeMessages.christmasDescription,
						}[currentTheme.id as keyof typeof THEME_STG],
					)}
				</p>
			)}

			{showConfetti && (
				<button
					type="button"
					onClick={() => setShowConfetti(false)}
					className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
				>
					{intl.formatMessage(UI_TEXT.stopButton)}
				</button>
			)}

			{/* Confetti */}
			{showConfetti && currentTheme && (
				<Confetti
					colors={currentTheme.colors}
					numberOfPieces={currentTheme.numberOfPieces}
					gravity={currentTheme.gravity}
					wind={currentTheme.wind}
					initialVelocityY={currentTheme.initialVelocityY}
					initialVelocityX={currentTheme.initialVelocityX}
				/>
			)}

			{/* Parameters */}
			{showConfetti && currentTheme && (
				<div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-start justify-between gap-4">
						<div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
							<div>
								<span className="font-semibold">
									{intl.formatMessage(UI_TEXT.themeLabel)}
								</span>{" "}
								{intl.formatMessage(
									{
										sakura: themeMessages.sakuraName,
										snow: themeMessages.snowName,
										koyo: themeMessages.koyoName,
										star: themeMessages.starName,
										christmas: themeMessages.christmasName,
									}[currentTheme.id as keyof typeof THEME_STG],
								)}
							</div>
							<div>
								<span className="font-semibold">
									{intl.formatMessage(UI_TEXT.colorsLabel)}
								</span>{" "}
								{currentTheme.colors.join(", ")}
							</div>
							<div>
								<span className="font-semibold">
									{intl.formatMessage(UI_TEXT.piecesLabel)}
								</span>{" "}
								{currentTheme.numberOfPieces}
							</div>
							<div>
								<span className="font-semibold">
									{intl.formatMessage(UI_TEXT.gravityLabel)}
								</span>{" "}
								{currentTheme.gravity}
							</div>
							{currentTheme.wind !== undefined && (
								<div>
									<span className="font-semibold">
										{intl.formatMessage(UI_TEXT.windLabel)}
									</span>{" "}
									{currentTheme.wind}
								</div>
							)}
							{currentTheme.initialVelocityY !== undefined && (
								<div>
									<span className="font-semibold">
										{intl.formatMessage(UI_TEXT.initialVelocityYLabel)}
									</span>{" "}
									{currentTheme.initialVelocityY}
								</div>
							)}
							{currentTheme.initialVelocityX !== undefined && (
								<div>
									<span className="font-semibold">
										{intl.formatMessage(UI_TEXT.initialVelocityXLabel)}
									</span>{" "}
									{currentTheme.initialVelocityX}
								</div>
							)}
						</div>
						<button
							type="button"
							onClick={handleCopyCode}
							className="w-20 px-2 py-1 text-xs bg-gradient-to-r from-orange-100 to-pink-200 text-gray-800 font-semibold rounded hover:from-orange-200 hover:to-pink-300 transition-all whitespace-nowrap"
						>
							{intl.formatMessage(
								copied ? UI_TEXT.copiedButton : UI_TEXT.copyCodeButton,
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default SeasonalPage;
