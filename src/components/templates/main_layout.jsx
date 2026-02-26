// #region Imports
import React from 'react';
import F_Header from '../organisms/header';
import { useTranslation } from 'react-i18next';
// #endregion

// #region Component
/**
 * Template component: Main Layout.
 */
const F_Main_Layout = ({ children: p_children, activeTab: p_active_tab, setActiveTab: p_set_active_tab, likedCount: p_liked_count, isDark: p_is_dark, toggleTheme: p_toggle_theme }) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            <F_Header
                activeTab={p_active_tab}
                setActiveTab={p_set_active_tab}
                likedCount={p_liked_count}
                isDark={p_is_dark}
                toggleTheme={p_toggle_theme}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[calc(100vh-160px)]">
                {p_children}
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 text-center no-print">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center space-y-6">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 rounded-lg shadow-lg shrink-0">
                                <defs>
                                    <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#5A67D8" />
                                        <stop offset="100%" stopColor="#3C366B" />
                                    </linearGradient>
                                </defs>
                                <rect width="512" height="512" rx="120" fill="url(#footerGradient)" />
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
                            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">Brand Variant Studio</span>
                        </div>

                        {/* Tagline */}
                        <p className="text-slate-500 dark:text-slate-400 max-w-md text-center">
                            {t('app.hero.subtitle', 'Find your perfect brand aesthetic.')}
                        </p>

                        {/* Links */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
                            <span className="text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} Brand Variant Studio. {t('app.footer.license', 'Licensed under MIT')}.</span>
                            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                            <a href="https://beydahsaglam.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                {t('app.footer.made_by')} Ilkay Beydah Saglam
                            </a>
                            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                            <a href="https://github.com/beydah/Brand-Variant-Studio" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                {t('app.footer.contribute')}
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* CSS for print mode (PDF export) */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @media print {
          body { background: white; color: black; }
          header, section:first-of-type, .no-print { display: none !important; }
          .grid { display: block; }
          .group { break-inside: avoid; margin-bottom: 20px; box-shadow: none; border: 1px solid #e2e8f0; }
          button { display: none !important; }
        }
      `}} />
        </div>
    );
};

export default F_Main_Layout;
// #endregion
