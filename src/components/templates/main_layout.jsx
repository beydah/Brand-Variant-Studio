// #region Imports
import React from 'react';
import F_Header from '../organisms/header';
// #endregion

// #region Component
/**
 * Template component: Main Layout.
 */
const F_Main_Layout = ({ children: p_children, activeTab: p_active_tab, setActiveTab: p_set_active_tab, likedCount: p_liked_count, isDark: p_is_dark, toggleTheme: p_toggle_theme }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
            <F_Header
                activeTab={p_active_tab}
                setActiveTab={p_set_active_tab}
                likedCount={p_liked_count}
                isDark={p_is_dark}
                toggleTheme={p_toggle_theme}
            />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {p_children}
            </main>

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
