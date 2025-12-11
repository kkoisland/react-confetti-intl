import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { IntlProvider } from "./i18n/IntlProvider.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<BrowserRouter>
				<IntlProvider>
					<App />
				</IntlProvider>
			</BrowserRouter>
		</StrictMode>,
	);
}
