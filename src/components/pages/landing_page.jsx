// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Sun, Moon, Github, Code } from 'lucide-react';
import F_Icon_Button from '../atoms/icon_button';
// #endregion

// #region Component
/**
 * Page component: Landing Page.
 */
const F_Landing_Page = ({ isDark, toggleTheme }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const F_Toggle_Language = () => {
        const l_new_lang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(l_new_lang);
    };

    const Logo = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full rounded-lg shadow-lg">
            <defs>
                <linearGradient id="bvNav-landing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5A67D8" />
                    <stop offset="100%" stopColor="#3C366B" />
                </linearGradient>
            </defs>
            <rect width="512" height="512" rx="120" fill="url(#bvNav-landing)" />
            <text
                x="50%"
                y="54%"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                fontWeight="900"
                fontSize="260"
                letterSpacing="-10"
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="middle">
                BV
            </text>
        </svg>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col">

            {/* Minimal Header */}
            <header className="w-full h-20 px-6 sm:px-12 flex items-center justify-between z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 shrink-0">
                        <Logo />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">
                        {t('app.title', 'Brand Variant Studio')}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={F_Toggle_Language}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                    >
                        {i18n.language.toUpperCase()}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                        title={t('app.nav.theme')}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 py-6">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        {t('app.landing.title')}
                    </h1>

                    <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        {t('app.landing.subtitle')}
                    </p>

                    <div className="pt-4 pb-8 flex justify-center">
                        <button
                            onClick={() => navigate('/variants')}
                            className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all hover:-translate-y-1 hover:scale-105 shadow-xl hover:shadow-blue-500/25 active:scale-95"
                        >
                            <Sparkles size={24} className="group-hover:animate-pulse" />
                            {t('app.landing.cta')}
                        </button>
                    </div>

                    {/* Developer Info Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <a
                            href={t('app.landing.dev_url', 'https://beydahsaglam.com')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors font-medium text-sm group"
                        >
                            <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                <Code size={18} />
                            </span>
                            {t('app.landing.developer')}
                        </a>

                        <a
                            href={t('app.landing.repo_url', 'https://github.com/beydah/Brand-Variant-Studio')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium text-sm group"
                        >
                            <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                                <Github size={18} />
                            </span>
                            {t('app.landing.github')}
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default F_Landing_Page;
// #endregion
