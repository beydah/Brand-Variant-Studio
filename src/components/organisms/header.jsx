// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import F_Icon_Button from '../atoms/icon_button';
// #endregion

// #region Component
/**
 * Organism component: Header.
 */
const F_Header = ({ activeTab: p_active_tab, setActiveTab: p_set_active_tab, likedCount: p_liked_count, isDark: p_is_dark, toggleTheme: p_toggle_theme }) => {
    const { t, i18n } = useTranslation();

    const F_Toggle_Language = () => {
        const l_new_lang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(l_new_lang);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/src/assets/favicon.svg" alt="Logo" className="w-8 h-8 rounded-lg shadow-lg" />
                    <span className="font-bold text-lg tracking-tight hidden sm:block">{t('app.title')}</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-4">
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

                    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

                    <F_Icon_Button
                        icon={p_is_dark ? Sun : Moon}
                        onClick={p_toggle_theme}
                        title={t('app.filters.shuffle_colors')}
                    />
                </div>
            </div>
        </header>
    );
};

export default F_Header;
// #endregion
