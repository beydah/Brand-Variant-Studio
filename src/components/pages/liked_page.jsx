// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

import F_Variant_Card from '../organisms/variant_card';
// #endregion

// #region Component
/**
 * Page component: Liked Page.
 */
const F_Liked_Page = ({ likedVariants: p_liked_variants, brandName: p_brand_name, toggleLike: p_toggle_like, exportLikedJSON: p_export_liked_json, modifyVariant: p_modify_variant }) => {
    const { t } = useTranslation();

    return (
        <>            {p_liked_variants.length === 0 ? (
            <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <Heart className="text-slate-400" size={32} />
                </div>
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">{t('app.liked.no_variants')}</h3>
                <p className="text-slate-500">{t('app.liked.empty_message')}</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                <AnimatePresence>
                    {p_liked_variants.map((variant) => (
                        <F_Variant_Card
                            key={variant.id}
                            variant={variant}
                            brandName={p_brand_name}
                            isLiked={true}
                            toggleLike={p_toggle_like}
                            modifyVariant={p_modify_variant}
                            isLikedTab={true}
                        />
                    ))}
                </AnimatePresence>
            </div>
        )}
        </>
    );
};

export default F_Liked_Page;
// #endregion
