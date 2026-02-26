// #region Imports
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Save, ArrowLeftRight, RotateCcw } from 'lucide-react';
import F_Badge from '../atoms/badge';
import F_Copy_Button from '../molecules/copy_button';
import { F_Get_Luminance, hexToRgb } from '../../utils/color_utils';
// #endregion

// #region Component
/**
 * Organism component: Variant Card.
 */
const F_Variant_Card = ({ variant: p_variant, brandName: p_brand_name, isLiked: p_is_liked, toggleLike: p_toggle_like, isLikedTab: p_is_liked_tab, modifyVariant: p_modify_variant }) => {
    const { t } = useTranslation();

    const [l_edited_bg, set_l_edited_bg] = useState(p_variant.bgHex);
    const [l_edited_text, set_l_edited_text] = useState(p_variant.textHex);

    useEffect(() => {
        set_l_edited_bg(p_variant.bgHex);
        set_l_edited_text(p_variant.textHex);
    }, [p_variant.bgHex, p_variant.textHex]);

    const l_has_changes = l_edited_bg !== p_variant.bgHex || l_edited_text !== p_variant.textHex;

    const handleSave = () => {
        if (p_modify_variant) {
            p_modify_variant(p_variant.id, l_edited_bg, l_edited_text);
        }
    };

    const handleSwapColors = () => {
        const temp = l_edited_bg;
        set_l_edited_bg(l_edited_text);
        set_l_edited_text(temp);

        // Auto-save instantly inside liked tab
        if (p_modify_variant) {
            p_modify_variant(p_variant.id, l_edited_text, temp); // Note: we pass the swapped values
        }
    };

    const handleUndo = () => {
        set_l_edited_bg(p_variant.bgHex);
        set_l_edited_text(p_variant.textHex);
    };



    const l_bg_rgb = hexToRgb(l_edited_bg);
    const l_bg_luminance = F_Get_Luminance(l_bg_rgb[0], l_bg_rgb[1], l_bg_rgb[2]);
    const l_icon_color_class = l_bg_luminance > 0.5 ? "text-slate-900" : "text-white/90";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="group h-full"
        >
            <div
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col h-full bg-white dark:bg-slate-900"
            >
                {/* Visual Preview */}
                <div
                    className="h-48 flex items-center justify-center p-6 relative group/preview"
                    style={{ backgroundColor: l_edited_bg }}
                >
                    <button
                        onClick={() => p_toggle_like(p_variant)}
                        className={`absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors z-10`}
                    >
                        <Heart size={20} className={p_is_liked ? "fill-red-500 text-red-500" : l_icon_color_class} />
                    </button>

                    <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover/preview:opacity-100 transition-opacity z-10">
                        {p_is_liked_tab && (
                            <button
                                onClick={handleSwapColors}
                                className={`p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors ${l_icon_color_class}`}
                                title={t('app.card.swap_colors') || "Swap Colors"}
                            >
                                <ArrowLeftRight size={16} />
                            </button>
                        )}
                    </div>

                    <span
                        className="text-3xl text-center max-w-full truncate px-4"
                        style={{
                            color: l_edited_text,
                            fontFamily: `"${p_variant.fontFamily}", sans-serif`,
                            fontWeight: p_variant.fontWeight,
                            ...p_variant.styles
                        }}
                    >
                        {p_variant.brandName || p_brand_name || 'Preview'}
                    </span>
                </div>

                {/* Meta Info */}
                <div className="meta-info p-4 flex flex-col gap-4 relative flex-grow bg-white dark:bg-slate-900">
                    {/* Save Button Overlay */}
                    <AnimatePresence>
                        {p_is_liked_tab && l_has_changes && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute -top-10 left-0 right-0 mx-4 flex gap-2 z-20"
                            >
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-xl py-2 px-4 flex items-center justify-center gap-2 font-medium text-sm transition-colors"
                                >
                                    <Save size={16} />
                                    {t('app.card.save', 'Kaydet')}
                                </button>
                                <button
                                    onClick={handleUndo}
                                    className="bg-slate-700 hover:bg-slate-800 text-white shadow-lg rounded-xl flex items-center justify-center px-4 transition-colors"
                                >
                                    <RotateCcw size={16} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-lg text-slate-900 dark:text-white truncate max-w-full" title={p_variant.fontFamily}>
                                {p_variant.fontFamily}
                            </span>
                            <div className="shrink-0 mt-0.5">
                                <F_Copy_Button text={p_variant.fontFamily} tooltip={t('app.card.copy_font')} hideText />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <F_Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 truncate max-w-[120px]">
                                {p_variant.fontCategory}
                            </F_Badge>
                            <span className="text-slate-400 dark:text-slate-500 text-[10px]">•</span>
                            <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                {t('app.card.weight')} {p_variant.fontWeight}
                            </span>
                        </div>
                    </div>

                    <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                    <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2 w-full">
                            <div className="flex-1 flex flex-col gap-1.5">
                                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">{t('app.card.background')}</span>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    {p_is_liked_tab ? (
                                        <input
                                            type="color"
                                            value={l_edited_bg}
                                            onChange={(e) => set_l_edited_bg(e.target.value)}
                                            className="w-4 h-4 rounded-full border border-black/10 shadow-inner p-0 overflow-hidden cursor-pointer shrink-0"
                                            style={{ backgroundColor: l_edited_bg, appearance: 'none' }}
                                        />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-black/10 shadow-inner shrink-0" style={{ background: l_edited_bg }} />
                                    )}
                                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 ml-1 truncate max-w-[60px]">{l_edited_bg.toUpperCase()}</span>
                                    <div>
                                        <F_Copy_Button text={l_edited_bg.toUpperCase()} tooltip={t('app.card.copy_bg')} hideText />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-1.5">
                                <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">{t('app.card.text')}</span>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    {p_is_liked_tab ? (
                                        <input
                                            type="color"
                                            value={l_edited_text}
                                            onChange={(e) => set_l_edited_text(e.target.value)}
                                            className="w-4 h-4 rounded-full border border-black/10 shadow-inner p-0 overflow-hidden cursor-pointer shrink-0"
                                            style={{ backgroundColor: l_edited_text, appearance: 'none' }}
                                        />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-black/10 shadow-inner shrink-0" style={{ background: l_edited_text }} />
                                    )}
                                    <span className="font-mono text-xs text-slate-700 dark:text-slate-300 ml-1 truncate max-w-[60px]">{l_edited_text.toUpperCase()}</span>
                                    <div>
                                        <F_Copy_Button text={l_edited_text.toUpperCase()} tooltip={t('app.card.copy_text')} hideText />
                                    </div>
                                </div>
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
