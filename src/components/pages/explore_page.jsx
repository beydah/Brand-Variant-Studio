// #region Imports
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import F_Hero_Section from '../organisms/hero_section';
import F_Filter_Section from '../organisms/filter_section';
import F_Variant_Card from '../organisms/variant_card';
// #endregion

// #region Component
/**
 * Page component: Explore Page.
 */
const F_Explore_Page = ({
    brandName: p_brand_name,
    setBrandName: p_set_brand_name,
    generateNewVariants: p_generate_new_variants,
    isGenerating: p_is_generating,
    filters: p_filters,
    setFilters: p_set_filters,
    shuffleFontsOnly: p_shuffle_fonts_only,
    shuffleColorsOnly: p_shuffle_colors_only,
    variants: p_variants,
    likedVariants: p_liked_variants,
    toggleLike: p_toggle_like
}) => {
    return (
        <>
            <F_Hero_Section
                brandName={p_brand_name}
                setBrandName={p_set_brand_name}
                generateNewVariants={p_generate_new_variants}
                isGenerating={p_is_generating}
            />

            <F_Filter_Section
                filters={p_filters}
                setFilters={p_set_filters}
                generateNewVariants={p_generate_new_variants}
                shuffleFontsOnly={p_shuffle_fonts_only}
                shuffleColorsOnly={p_shuffle_colors_only}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                <AnimatePresence>
                    {p_variants.map((variant) => (
                        <F_Variant_Card
                            key={variant.id}
                            variant={variant}
                            brandName={p_brand_name}
                            isLiked={p_liked_variants.some(v => v.id === variant.id)}
                            toggleLike={p_toggle_like}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
};

export default F_Explore_Page;
// #endregion
