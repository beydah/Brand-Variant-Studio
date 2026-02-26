# Brand Variant Studio

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> "Find your perfect brand aesthetics in seconds."

Brand Variant Studio is a meticulously crafted, client-side React application that empowers designers, developers, and entrepreneurs to instantly generate and visualize 100+ unique typographic and color harmonies for their brand names. Built with modern web technologies, it offers a seamless, high-performance experience directly in your browser without requiring a backend architecture.

## 🚀 Features

- **Instant Generation**: Type a brand name and instantly behold hundreds of beautifully matched font families and color palettes.
- **Smart Color Harmonies**: Proprietary color utility matching (`color_utils.js`) ensuring perfect WCAG contrast ratios across vibrant, pastel, and dark tones.
- **Dynamic Filtering**: Instantly filter outputs by font categories (Serif, Sans-Serif, Display, Monospace) and specific color moods.
- **Responsive Architecture**: Fully responsive grid that collapses elegantly from desktop down to mobile-app style navigation.
- **Client-Side Persistence**: State and liked variants are perpetually stored in your browser leveraging powerful IndexedDB caching.
- **i18n Ready**: Natively supports full English and Turkish locales seamlessly switchable without page reloads.
- **Dark Mode**: Ships with a stunning Dark Mode enabled by default.

## 🛠 Tech Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Storage**: IndexedDB (via `idb` wrappers)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Localization**: `i18next`, `react-i18next`

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/beydah/Brand-Variant-Studio.git
   cd Brand-Variant-Studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure (Atomic Design)

```
src/
├── components/          # UI Components
│   ├── atoms/           # Smallest units (badges, buttons, icons)
│   ├── molecules/       # Combinations of atoms (copy buttons)
│   ├── organisms/       # Complex sections (cards, navigation)
│   ├── templates/       # Page layouts (main layout)
│   └── pages/           # Route views (explore, likes)
├── hooks/               # Custom React hooks (use_theme, use_indexed_db)
├── locales/             # i18n JSON files (en, tr)
├── services/            # Business & Generation Logic (variant_service)
├── utils/               # Helper utilities (color calculation logic)
├── App.jsx              # Main Router and State provider
└── main.jsx             # React DOM root mounting
```

## 🤝 Contribution

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. 
Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

Distributed under the MIT License. See `LICENSE.md` for more information.

---
**Developer:** [Ilkay Beydah Sağlam](https://beydahsaglam.com)
