# React Confetti Sample App

📊 For a visual overview of this project, see the [Speaker Deck presentation](https://speakerdeck.com/kkoisland/react-confetti-with-i18n).

A collection of interactive examples demonstrating various use cases of the [react-confetti](https://github.com/alampros/react-confetti/) library. This project serves as a reference implementation for a Japanese React tutorial book.

## Resources

🚀 **Live Demo**: https://kkoisland.github.io/react-confetti-intl/

📝 **Slides**: [Google Slides](https://docs.google.com/presentation/d/12LJkobZPQwQyVkhdrEsp68T5wXboIY8fvQWEsE_WhCU/preview) — Same content as the Speaker Deck presentation, for those who cannot access Speaker Deck.

## Setup

Clone the repository, install dependencies, and start the development server:

```bash
git clone https://github.com/kkoisland/react-confetti-app.git
cd react-confetti-app
nvm use  # Uses Node.js v22.21.1 specified in .nvmrc
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser.

## Features

- Basic confetti toggle with button control
- Timer-based confetti with countdown animation
- Task completion celebration with toast notification
- Themed confetti variations (seasonal effects)
- Interactive playground for parameter tuning
- Dark mode support
- Responsive layout for mobile and desktop
- Modern UI with glassmorphism effects

## Page Structure

```
/                    → Redirect to /basic
/basic               → Basic confetti toggle
/countdown           → Timer-based confetti
/toast               → Task completion with toast notification
/seasonal            → Themed confetti variations
/playground          → Interactive parameter tuning
```

## Tech Stack

- **Node.js**: 22.21.1
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Vite**: 7.2.2
- **Tailwind CSS**: 4.1.17
- **React Router**: 7.9.6
- **react-confetti**: 6.4.0
- **Biome**: 2.3.5 (Code linting and formatting)

## Project Structure

```
react-confetti-app/
├── .github/workflows/
│   └── biome.yml
├── .vscode/
│   ├── settings.json
│   └── extensions.json
├── public/
├── src/
│   ├── pages/
│   │   ├── BasicPage.tsx
│   │   ├── CountdownPage.tsx
│   │   ├── ToastPage.tsx
│   │   ├── SeasonalPage.tsx
│   │   └── PlaygroundPage.tsx
│   ├── App.tsx
│   ├── Layout.tsx
│   ├── main.tsx
│   └── index.css
├── .gitignore
├── .nvmrc
├── biome.json
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Author

**kkoisland (Keiko)**
- GitHub: [@kkoisland](https://github.com/kkoisland)

## Acknowledgments

Built with [react-confetti](https://github.com/alampros/react-confetti) by [@alampros](https://github.com/alampros).
