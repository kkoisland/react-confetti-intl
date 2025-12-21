import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UTF8 = "utf-8";
const LOCALES_DIR = path.join(__dirname, "../src/i18n/locales");
const BASE_LOCALE = "en-US";
const BASE_LOCALE_FILE = `${BASE_LOCALE}.json`;
const LOCALES = [
	BASE_LOCALE,
	"ja-JP",
	"it-IT",
	"de-DE",
	"zh-CN",
	"ko-KR",
	"es-ES",
	"fr-FR",
	"sv-SE",
	"nl-NL",
] as const;
const EXTRACT_CMD = [
	"formatjs extract 'src/**/*.{ts,tsx}'",
	`--out-file ${path.join(LOCALES_DIR, BASE_LOCALE_FILE)}`,
	"--id-interpolation-pattern '[sha512:contenthash:base64:6]'",
	"--format simple",
].join(" ");

type Translations = Record<string, string>;

type ExtractedDescriptor = {
	defaultMessage: string;
	description?: string;
	file?: string;
};

type ExtractedMessages = Record<string, ExtractedDescriptor>;

type TranslationMessage = {
	id: string;
	defaultMessage: string;
	description?: string;
	file: string;
};

console.log("📝 Extracting translations from code...");

// Step 1: Extract translations to en-US.json
execSync(EXTRACT_CMD, { stdio: "inherit" });

// Step 1.5: Extract detailed messages for translation companies
const detailedMessagesPath = path.join(LOCALES_DIR, ".messages-temp.json");
const EXTRACT_DETAILED_CMD = [
	"formatjs extract 'src/**/*.{ts,tsx}'",
	`--out-file ${detailedMessagesPath}`,
	"--id-interpolation-pattern '[sha512:contenthash:base64:6]'",
	"--extract-source-location",
].join(" ");

execSync(EXTRACT_DETAILED_CMD, { stdio: "inherit" });

const extractedMessages: ExtractedMessages = JSON.parse(
	fs.readFileSync(detailedMessagesPath, UTF8),
);

const messages: TranslationMessage[] = Object.entries(extractedMessages).map(
	([id, descriptor]) => ({
		id,
		defaultMessage: descriptor.defaultMessage,
		...(descriptor.description && { description: descriptor.description }),
		file: descriptor.file ? path.basename(descriptor.file) : "",
	}),
);

const messagesPath = path.join(LOCALES_DIR, "messages.json");
fs.writeFileSync(messagesPath, `${JSON.stringify(messages, null, "\t")}\n`);

fs.unlinkSync(detailedMessagesPath);

console.log(`✅ messages.json created with ${messages.length} entries`);

// Step 2: Read en-US.json to get the list of valid IDs
const enUSPath = path.join(LOCALES_DIR, BASE_LOCALE_FILE);
const enUSContent: Translations = JSON.parse(fs.readFileSync(enUSPath, UTF8));
const validIds = Object.keys(enUSContent);

// Step 2.1: Normalize en-US.json indentation to tabs (same as other locales)
fs.writeFileSync(enUSPath, `${JSON.stringify(enUSContent, null, "\t")}\n`);

console.log(`✅ en-US.json updated (${validIds.length} keys)`);

// Step 3: Update other locale files
for (const locale of LOCALES) {
	if (locale === BASE_LOCALE) continue; // Skip en-US, already handled

	const localePath = path.join(LOCALES_DIR, `${locale}.json`);
	// Read existing translations if file exists
	const existingTranslations: Translations = fs.existsSync(localePath)
		? JSON.parse(fs.readFileSync(localePath, UTF8))
		: {};

	// Create new translations object
	const newTranslations: Translations = {};

	for (const id of validIds) {
		if (existingTranslations[id]) {
			// Keep existing translation
			newTranslations[id] = existingTranslations[id];
		} else {
			// Add new key with English value
			newTranslations[id] = enUSContent[id];
		}
	}

	// Write updated translations
	fs.writeFileSync(
		localePath,
		`${JSON.stringify(newTranslations, null, "\t")}\n`,
	);

	const addedCount =
		Object.keys(newTranslations).length -
		Object.keys(existingTranslations).length;
	const removedCount =
		Object.keys(existingTranslations).length -
		Object.keys(newTranslations).filter((id) => existingTranslations[id])
			.length;

	console.log(
		`✅ ${locale}.json updated (${addedCount > 0 ? `+${addedCount}` : "0"} added, ${removedCount > 0 ? `-${removedCount}` : "0"} removed)`,
	);
}

console.log("🎉 All locale files updated!");
