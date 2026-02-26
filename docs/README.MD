# 🎨 Brand Variant Studio

> A professional-grade typographic and color aesthetic explorer tool for high-end brand design.

![Brand Variant Studio](https://img.shields.io/badge/Status-Standardized-brightgreen)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20Tailwind-blue)
![Architecture](https://img.shields.io/badge/Architecture-Atomic%20Design-orange)

## 📖 Overview

**Brand Variant Studio** is a sophisticated generator designed for designers and brand developers. It creates 100 unique typographic harmonies instantly, allowing users to explore different brand aesthetics across various categories like "Sans Serif", "Serif", "Tech/Mono", and "Elegant".

## ✨ Key Features

- **Automated Aesthetic Generation**: 100 unique cards with contrasting color palettes and font pairings.
- **Atomic Design System**: Built with modular components (Atoms, Molecules, Organisms).
- **Service-Based Logic**: Decoupled business logic for variant generation and file exports.
- **Global Localization (i18n)**: Full support for English and Turkish out of the box.
- **Google Fonts Integration**: Dynamic loading of font families as needed.
- **Export Capabilities**: Save your favorites as PNG images or export the entire library as a JSON configuration.
- **Dark/Light Mode**: Fully responsive theme switching that persists locally.

## 🏗 Architecture & Project Structure

The project follows strict **Full-Stack Best Practices** for project organization:

```text
src/
├── components/          # UI Components (Atomic Design)
│   ├── atoms/           # Basic building blocks (Buttons, Badges)
│   ├── molecules/       # Groups of atoms (CopyButton)
│   ├── organisms/       # Complex sections (Header, Cards)
│   ├── templates/       # Page layouts (MainLayout)
│   └── pages/           # High-level views (Explore, Liked)
├── services/            # Business Logic & External APIs
│   ├── variant_service.js # Variant generation & exports
│   └── localization.js  # i18n configuration
├── constants/           # Global constants (Font data, Color tones)
├── hooks/               # Custom React hooks (Theme, Storage)
├── locales/             # Translation files (EN, TR)
├── utils/               # Pure utility functions (Color math)
├── app.jsx              # Main orchestrator
└── main.jsx             # Entry point
```

## 🛠 Naming Conventions

This project enforces strict naming standards:

| Level                | Convention     | Example              |
| :------------------- | :------------- | :------------------- |
| **Folders & Files**  | `snake_case`   | `variant_card.jsx`   |
| **Functions**        | `F_Snake_Case` | `F_Generate_Variant` |
| **Classes**          | `C_Snake_Case` | `C_Theme_Manager`    |
| **Parameters**       | `p_snake_case` | `p_brand_name`       |
| **Local Variables**  | `snake_case`   | `l_current_variant`  |
| **Global Constants** | `SNAKE_CASE`   | `ALL_FONTS`          |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛡 Security & Contribution

Please refer to the `docs/` folder for more detailed information:
- [CONTRIBUTION.MD](./CONTRIBUTION.MD)
- [SECURITY.MD](./SECURITY.MD)
- [LICENSE.MD](./LICENSE.MD)

---

Developed with ❤️ by the Brand Variant Studio Team.
