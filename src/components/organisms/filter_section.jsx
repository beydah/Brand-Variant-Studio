// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, Type, Palette } from 'lucide-react';
import { FONT_CATEGORIES, COLOR_TONES } from '../../constants';
// #endregion

// #region Component
/**
 * Organism component: Filter Section.
 */
const F_Filter_Section = ({ filters: p_filters, setFilters: p_set_filters, generateNewVariants: p_generate_new_variants, shuffleFontsOnly: p_shuffle_fonts_only, shuffleColorsOnly: p_shuffle_colors_only }) => {
    const { t } = useTranslation();
    const [is_visible, set_is_visible] = React.useState(false);

    return (
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-4">

            {/* Header / Toggle Button */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => set_is_visible(!is_visible)}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <SlidersHorizontal size={16} className={is_visible ? "text-blue-600 dark:text-blue-400" : "text-slate-400"} />
                    {t('app.filters.label', 'Filtreler')}
                </button>
            </div>

            {/* Filter Content (Collapsible) */}
            {is_visible && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800/50">
                    <div className="grid grid-cols-2 md:flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={p_filters.fontCategory}
                            onChange={(e) => {
                                p_set_filters(prev => ({ ...prev, fontCategory: e.target.value }));
                                setTimeout(p_generate_new_variants, 0);
                            }}
                            className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            <option value="All">{t('app.filters.all_fonts')}</option>
                            {Object.keys(FONT_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>

                        <select
                            value={p_filters.colorTone}
                            onChange={(e) => {
                                p_set_filters(prev => ({ ...prev, colorTone: e.target.value }));
                                setTimeout(p_generate_new_variants, 0);
                            }}
                            className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/50"
                        >
                            {COLOR_TONES.map(tone => <option key={tone} value={tone}>{tone}{t('app.filters.tones_suffix')}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 md:flex items-center gap-2 w-full md:w-auto md:justify-end">
                        <button
                            onClick={p_shuffle_fonts_only}
                            className="flex justify-center items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        >
                            <Type size={14} /> {t('app.filters.shuffle_fonts')}
                        </button>
                        <button
                            onClick={p_shuffle_colors_only}
                            className="flex justify-center items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                        >
                            <Palette size={14} /> {t('app.filters.shuffle_colors')}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default F_Filter_Section;
// #endregion
