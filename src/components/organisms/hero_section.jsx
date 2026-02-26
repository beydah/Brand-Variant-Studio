// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Type, RefreshCw, Sparkles } from 'lucide-react';
import { SUGGESTED_BRANDS } from '../../constants';
// #endregion

// #region Component
/**
 * Organism component: Hero Section.
 */
const F_Hero_Section = ({ brandName: p_brand_name, setBrandName: p_set_brand_name, generateNewVariants: p_generate_new_variants, isGenerating: p_is_generating }) => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto pt-8 pb-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {t('app.hero.title')}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
                {t('app.hero.subtitle')}
            </p>

            <div className="w-full relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Type className="h-6 w-6 text-slate-400" />
                </div>
                <input
                    type="text"
                    value={p_brand_name}
                    onChange={(e) => p_set_brand_name(e.target.value)}
                    placeholder={t('app.hero.placeholder')}
                    className="block w-full pl-12 pr-32 py-4 text-xl font-medium bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                />
                <div className="absolute inset-y-0 right-2 flex items-center">
                    <button
                        onClick={p_generate_new_variants}
                        disabled={!p_brand_name || p_is_generating}
                        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {p_is_generating ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                        {t('app.hero.generate')}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                <span className="text-sm text-slate-500 flex items-center">{t('app.hero.try')}</span>
                {SUGGESTED_BRANDS.slice(0, 5).map(suggestion => (
                    <button
                        key={suggestion}
                        onClick={() => { p_set_brand_name(suggestion); setTimeout(p_generate_new_variants, 0); }}
                        className="text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 transition-colors"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default F_Hero_Section;
// #endregion
