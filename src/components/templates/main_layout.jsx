// #region Imports
import React, { useState } from 'react';
import F_Navigation from '../organisms/navigation';
import { useTranslation } from 'react-i18next';
// #endregion

// #region Component
/**
 * Template component: Main Layout.
 */
const F_Main_Layout = ({ children: p_children, activeTab: p_active_tab, setActiveTab: p_set_active_tab, likedCount: p_liked_count, isDark: p_is_dark, toggleTheme: p_toggle_theme }) => {
    const { t } = useTranslation();
    const [l_is_collapsed, set_l_is_collapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            <F_Navigation
                isDark={p_is_dark}
                toggleTheme={p_toggle_theme}
                likedCount={p_liked_count}
                isCollapsed={l_is_collapsed}
                setIsCollapsed={set_l_is_collapsed}
            />

            {/* Main Content Area - Shifted Right on Desktop, Padded Top & Bottom on Mobile */}
            <div className={`${l_is_collapsed ? 'md:ml-20' : 'md:ml-64'} flex flex-col min-h-screen transition-all duration-300 ease-in-out`}>

                <main className="flex-grow max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:py-8 space-y-8">
                    {p_children}
                </main>

                <div className="md:hidden pb-20 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2 m-4 px-4 text-center">
                    <a href="https://beydahsaglam.com" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                        {t('app.footer.made_by', 'Geliştirici:')} Ilkay Beydah Sağlam
                    </a>
                    <a href="https://github.com/beydah/Brand-Variant-Studio" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        {t('app.footer.contribute', "GitHub'da Katkı Yapabilirsiniz")}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default F_Main_Layout;
// #endregion
