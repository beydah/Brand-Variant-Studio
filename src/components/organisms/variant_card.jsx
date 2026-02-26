// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Image as ImageIcon } from 'lucide-react';
import F_Badge from '../atoms/badge';
import F_Copy_Button from '../molecules/copy_button';
import { F_Export_To_Png } from '../../services/variant_service';
// #endregion

// #region Component
/**
 * Organism component: Variant Card.
 */
const F_Variant_Card = ({ variant: p_variant, brandName: p_brand_name, isLiked: p_is_liked, toggleLike: p_toggle_like }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col"
        >
            {/* Visual Preview */}
            <div
                className="h-48 flex items-center justify-center p-6 relative"
                style={{ backgroundColor: p_variant.bgHex }}
            >
                <button
                    onClick={() => p_toggle_like(p_variant)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors z-10"
                >
                    <Heart size={20} className={p_is_liked ? "fill-red-500 text-red-500" : "text-white/80"} />
                </button>

                <div className="absolute top-3 left-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => F_Export_To_Png(p_variant, p_brand_name)}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors text-white/90"
                        title={t('app.card.export_png')}
                    >
                        <ImageIcon size={16} />
                    </button>
                </div>

                <span
                    className="text-3xl text-center max-w-full truncate px-4"
                    style={{
                        color: p_variant.textHex,
                        fontFamily: `"${p_variant.fontFamily}", sans-serif`,
                        fontWeight: p_variant.fontWeight,
                        ...p_variant.styles
                    }}
                >
                    {p_brand_name || 'Preview'}
                </span>
            </div>

            {/* Meta Info */}
            <div className="p-4 flex flex-col gap-4">

                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-slate-900 dark:text-white truncate" title={p_variant.fontFamily}>
                            {p_variant.fontFamily}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <F_Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                {p_variant.fontCategory}
                            </F_Badge>
                            <span className="text-xs text-slate-500">{t('app.card.weight')} {p_variant.fontWeight}</span>
                        </div>
                    </div>
                    <F_Copy_Button text={p_variant.fontFamily} tooltip={t('app.card.copy_font')} />
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2 w-full">
                        <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">{t('app.card.background')}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-black/10 shadow-inner" style={{ background: p_variant.bgHex }} />
                                <F_Copy_Button text={p_variant.bgHex.toUpperCase()} tooltip={t('app.card.copy_bg')} />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">{t('app.card.text')}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full border border-black/10 shadow-inner" style={{ background: p_variant.textHex }} />
                                <F_Copy_Button text={p_variant.textHex.toUpperCase()} tooltip={t('app.card.copy_text')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default F_Variant_Card;
// #endregion
