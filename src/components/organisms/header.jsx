// #region Imports
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Menu, X } from 'lucide-react';
import F_Icon_Button from '../atoms/icon_button';
// #endregion

// #region Component
/**
 * Organism component: Header.
 */
const F_Header = ({ activeTab: p_active_tab, setActiveTab: p_set_active_tab, likedCount: p_liked_count, isDark: p_is_dark, toggleTheme: p_toggle_theme }) => {
    const { t, i18n } = useTranslation();
    const [l_is_mobile_menu_open, set_l_is_mobile_menu_open] = useState(false);

    const F_Toggle_Language = () => {
        const l_new_lang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(l_new_lang);
    };

    const logoSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 rounded-lg shadow-lg shrink-0">
            <defs>
                <linearGradient id="bvGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5A67D8" />
                    <stop offset="100%" stopColor="#3C366B" />
                </linearGradient>
            </defs>
            <rect width="512" height="512" rx="120" fill="url(#bvGradient)" />
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
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {logoSvg}
                    <span className="font-bold text-lg tracking-tight hidden sm:block">{t('app.title')}</span>
                    <span className="font-bold text-md tracking-tight sm:hidden">{t('app.title')}</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:flex items-center gap-4">
                    <button
                        onClick={F_Toggle_Language}
                        className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {i18n.language.toUpperCase()}
                    </button>

                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <button
                            onClick={() => p_set_active_tab('explore')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${p_active_tab === 'explore'
                                ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {t('app.tabs.explore')}
                        </button>
                        <button
                            onClick={() => p_set_active_tab('liked')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${p_active_tab === 'liked'
                                ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {t('app.tabs.liked')}
                            {p_liked_count > 0 && (
                                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 py-0.5 px-2 rounded-full text-xs">
                                    {p_liked_count}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

                    <F_Icon_Button
                        icon={p_is_dark ? Sun : Moon}
                        onClick={p_toggle_theme}
                        title={t('app.filters.shuffle_colors')}
                    />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex sm:hidden items-center">
                    <button
                        onClick={() => set_l_is_mobile_menu_open(!l_is_mobile_menu_open)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none"
                    >
                        {l_is_mobile_menu_open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {l_is_mobile_menu_open && (
                <div className="sm:hidden px-4 pt-2 pb-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-4 shadow-lg absolute w-full left-0">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Language</span>
                        <button
                            onClick={F_Toggle_Language}
                            className="text-xs font-bold px-3 py-1.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                            {i18n.language.toUpperCase()}
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Theme</span>
                        <F_Icon_Button
                            icon={p_is_dark ? Sun : Moon}
                            onClick={p_toggle_theme}
                            title={t('app.filters.shuffle_colors')}
                        />
                    </div>

                    <div className="pt-2">
                        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full">
                            <button
                                onClick={() => { p_set_active_tab('explore'); set_l_is_mobile_menu_open(false); }}
                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all text-center ${p_active_tab === 'explore'
                                    ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                {t('app.tabs.explore')}
                            </button>
                            <button
                                onClick={() => { p_set_active_tab('liked'); set_l_is_mobile_menu_open(false); }}
                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${p_active_tab === 'liked'
                                    ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                {t('app.tabs.liked')}
                                {p_liked_count > 0 && (
                                    <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 py-0.5 px-2 rounded-full text-xs">
                                        {p_liked_count}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default F_Header;
// #endregion
