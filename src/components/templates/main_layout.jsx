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

                {/* Print Header */}
                <div className="hidden print:block text-center border-b border-slate-200 mb-6 pb-4">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight m-0">Brand Variant Studio</h1>
                    <p className="text-sm text-slate-500 mt-1 mb-2">Brand Typography & Color Harmonies</p>
                    <div className="text-xs text-slate-400 mt-2">
                        Prepared using github.com/beydah/Brand-Variant-Studio • Developer: Ilkay Beydah Sağlam
                    </div>
                </div>

                <main className="flex-grow max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:py-8 space-y-8 print:pt-0 print:pb-0">
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

                {/* CSS for print mode (PDF export) */}
                <style dangerouslySetInnerHTML={{
                    __html: `
        @page {
            size: A4 landscape; /* Recommend landscape for 4 columns */
            margin: 1.5cm;
        }
        @media print {
          html, body { 
              background: #ffffff !important; 
              color: #0f172a !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important; 
          }
          /* Strip dark mode entirely */
          * { background-color: transparent; }
          .dark { background: #ffffff !important; color: #0f172a !important; }
          .dark body { background: #ffffff !important; }
          
          nav, section:first-of-type, .no-print, [data-html2canvas-ignore="true"] { display: none !important; }
          
          .md\\:ml-64, .md\\:ml-20 { margin-left: 0 !important; }
          
          /* Enforce margins and strict 4 column layout */
          main { 
              padding: 2cm 0 !important; 
              max-width: 100% !important; 
              margin: 0 !important; 
          }
          
          .grid { 
              display: grid !important; 
              grid-template-columns: repeat(4, minmax(0, 1fr)) !important; 
              gap: 15px !important; 
              align-items: start !important;
          }
          
          .print-card-wrapper { 
              page-break-inside: avoid !important;
              break-inside: avoid !important; 
              margin-bottom: 0px !important; 
              box-shadow: none !important; 
              border: 1px solid #e2e8f0 !important; 
              background: #ffffff !important;
          }
          
          /* Cards should keep their visual preview backgrounds */
          .print-card-wrapper div[style*="background-color"] {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important; 
          }

          /* Strip hover effects from cards */
          .group:hover { transform: none !important; box-shadow: none !important; }
          button { display: none !important; }

          /* Override meta info text colors to dark for legibility on white paper */
          .meta-info, .meta-info * { color: #0f172a !important; }
          .meta-info { background: #ffffff !important; }
          .dark .meta-info .bg-slate-800, .meta-info .bg-slate-100 { background: #f8fafc !important; }
          .dark .meta-info .border-slate-800 { border-color: #e2e8f0 !important; }
          .meta-info svg { stroke: #0f172a !important; }
        }
      `}} />
            </div>
        </div>
    );
};

export default F_Main_Layout;
// #endregion
