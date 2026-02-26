// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, FileJson, Download } from 'lucide-react';
// #endregion

// #region Component
/**
 * Organism component: Liked Actions.
 */
const F_Liked_Actions = ({ likedCount: p_liked_count, exportLikedJSON: p_export_liked_json }) => {
    const { t } = useTranslation();

    if (p_liked_count === 0) return null;

    return (
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 print:hidden">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="fill-red-500 text-red-500" size={20} /> {t('app.liked.saved_concepts')}
            </h2>
            <div className="flex gap-2">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 transition-colors"
                >
                    <Download size={16} /> {t('app.liked.print_pdf')}
                </button>
            </div>
        </div>
    );
};

export default F_Liked_Actions;
// #endregion
