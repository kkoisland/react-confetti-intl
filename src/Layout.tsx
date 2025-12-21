import { useEffect, useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { Link, NavLink, Outlet } from "react-router-dom";
import LanguageSelector from "./components/LanguageSelector";

const NAV_ACTIVE_STYLES = "text-indigo-600 dark:text-indigo-300 font-bold";
export const NAV_HOVER_STYLES =
	"hover:text-indigo-600 dark:hover:text-indigo-300";

const navMessages = defineMessages({
	basic: {
		id: "layout.nav.basic",
		defaultMessage: "Basic",
		description: "ナビゲーション：Basicページへのリンク",
	},
	countdown: {
		id: "layout.nav.countdown",
		defaultMessage: "Countdown",
		description: "ナビゲーション：Countdownページへのリンク",
	},
	toast: {
		id: "layout.nav.toast",
		defaultMessage: "Toast",
		description: "ナビゲーション：Toastページへのリンク",
	},
	seasonal: {
		id: "layout.nav.seasonal",
		defaultMessage: "Seasonal",
		description: "ナビゲーション：Seasonalページへのリンク",
	},
	playground: {
		id: "layout.nav.playground",
		defaultMessage: "Playground",
		description: "ナビゲーション：Playgroundページへのリンク",
	},
	format: {
		id: "layout.nav.format",
		defaultMessage: "Format",
		description: "ナビゲーション：Formatページへのリンク",
	},
});

const Layout = () => {
	const intl = useIntl();
	const appName = intl.formatMessage({
		id: "layout.appName",
		defaultMessage: "React Confetti",
		description:
			"アプリケーション名：翻訳サンプルのため、可能な範囲で翻訳してください。翻訳が不自然な言語では原文のままでも構いません。",
	});
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(() => {
		const saved = localStorage.getItem("react-confetti-intl:darkMode");
		if (saved !== null) return JSON.parse(saved);
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});
	const toggleTheme = () => setIsDarkMode(!isDarkMode);

	useEffect(() => {
		localStorage.setItem(
			"react-confetti-intl:darkMode",
			JSON.stringify(isDarkMode),
		);
		document.documentElement.classList.toggle("dark", isDarkMode);
	}, [isDarkMode]);

	const navLinks = [
		{ key: "basic", to: "/basic", label: navMessages.basic },
		{ key: "countdown", to: "/countdown", label: navMessages.countdown },
		{ key: "toast", to: "/toast", label: navMessages.toast },
		{ key: "seasonal", to: "/seasonal", label: navMessages.seasonal },
		{ key: "playground", to: "/playground", label: navMessages.playground },
		{ key: "format", to: "/format", label: navMessages.format },
	];

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
			<header className="backdrop-blur-md shadow-sm sticky top-0 z-10">
				<nav className="px-4 py-2">
					<div className="flex justify-between items-center">
						<div>
							<Link
								to="/"
								className={`text-2xl font-bold ${NAV_HOVER_STYLES} transition-colors`}
							>
								{appName}
							</Link>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex space-x-8">
							{navLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									className={({ isActive }) =>
										`${NAV_HOVER_STYLES} transition-colors ${
											isActive ? NAV_ACTIVE_STYLES : ""
										}`
									}
								>
									<FormattedMessage {...link.label} />
								</NavLink>
							))}
						</div>

						<LanguageSelector />

						{/* Right side buttons */}
						<div className="flex items-center gap-4">
							<button type="button" onClick={toggleTheme}>
								{isDarkMode ? "☀️" : "🌙"}
							</button>

							<div className="md:hidden">
								<button
									type="button"
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className={`text-3xl ${NAV_HOVER_STYLES} transition-colors`}
								>
									{isMenuOpen ? "✕" : "☰"}
								</button>
							</div>
						</div>
					</div>

					{isMenuOpen && (
						<div className="md:hidden mt-4">
							{navLinks.map((link) => (
								<NavLink
									key={link.to}
									to={link.to}
									onClick={() => setIsMenuOpen(false)}
									className={({ isActive }) =>
										`block py-3 px-4 text-lg ${NAV_HOVER_STYLES} transition-colors font-bold ${
											isActive ? NAV_ACTIVE_STYLES : ""
										}`
									}
								>
									<FormattedMessage {...link.label} />
								</NavLink>
							))}
						</div>
					)}
				</nav>
			</header>

			<main className="flex-grow">
				<Outlet />
			</main>

			<footer className="py-4 px-4 text-center text-sm text-gray-600 dark:text-gray-400">
				<div className="flex flex-col gap-2">
					<div>
						<FormattedMessage
							id="layout.footerLine1"
							defaultMessage="<b>{appName} Sample App</b> by kkoisland (Keiko) | Built with <link>react-confetti</link>"
							description="フッター：アプリ情報とreact-confettiへのリンク。翻訳サンプルのため、byも言語に応じて自然な表現に翻訳してください"
							values={{
								appName,
								b: (chunks) => <b key="footer-bold">{chunks}</b>,
								link: (chunks) => (
									<a
										key="footer-link"
										href="https://github.com/alampros/react-confetti"
										target="_blank"
										rel="noopener noreferrer"
										className={`underline ${NAV_HOVER_STYLES}`}
									>
										<em>{chunks}</em>
									</a>
								),
							}}
						/>
					</div>
					<div>
						<FormattedMessage
							id="layout.footerLine2"
							defaultMessage="View Source on <link>GitHub</link>"
							description="フッター：GitHubリポジトリへのリンク"
							values={{
								link: (chunks) => (
									<a
										key="footer-github-link"
										href="https://github.com/kkoisland/react-confetti-intl"
										target="_blank"
										rel="noopener noreferrer"
										className={`underline ${NAV_HOVER_STYLES}`}
									>
										{chunks}
									</a>
								),
							}}
						/>
					</div>
					<div className="text-xs mt-2 text-gray-500 dark:text-gray-500">
						<FormattedMessage
							id="layout.footerNote"
							defaultMessage="App name is translated for demonstration"
							description="フッター：注釈。アプリ名も翻訳サンプルとして訳されていることを示す"
						/>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
