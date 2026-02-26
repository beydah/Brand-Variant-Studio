import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import F_Main_Layout from './components/templates/main_layout';
import F_Explore_Page from './components/pages/explore_page';
import F_Liked_Page from './components/pages/liked_page';
import { F_Use_Theme } from './hooks/use_theme';
import { F_Use_Indexed_DB } from './hooks/use_indexed_db';
import { F_Use_Font_Loader } from './hooks/use_font_loader';
import { F_Generate_Variant, F_Export_Liked_Json } from './services/variant_service';
import { F_Generate_Color_By_Tone, F_Get_Accessible_Text_Color, F_Get_Contrast_Ratio } from './utils/color_utils';
// #endregion

// #region Application Component
/**
 * Main Application Component.
 */
export default function F_App() {
  const [l_brand_name, set_l_brand_name] = useState('Lumina');
  const [l_variants, set_l_variants, l_variants_loading] = F_Use_Indexed_DB('brandStudioExplore', []);
  const [l_liked_variants, set_l_liked_variants, l_liked_loading] = F_Use_Indexed_DB('brandStudioLiked', []);
  const [l_is_generating, set_l_is_generating] = useState(false);
  const { is_dark, F_Toggle_Theme } = F_Use_Theme();
  const l_location = useLocation();
  const l_active_tab = l_location.pathname.includes('/likes') ? 'liked' : 'explore';

  // #region Filters State
  const [l_filters, set_l_filters] = useState({
    fontCategory: 'All',
    colorTone: 'All',
    allowTransforms: false
  });
  // #endregion

  // #region Hooks
  F_Use_Font_Loader(l_variants, l_liked_variants, l_active_tab);
  // #endregion

  // #region Logic Functions
  const F_Generate_New_Variants = useCallback(() => {
    set_l_is_generating(true);
    setTimeout(() => {
      const l_new_variants = Array.from({ length: 100 }, () =>
        F_Generate_Variant(null, l_filters.fontCategory, l_filters.colorTone, l_filters.allowTransforms)
      );
      set_l_variants(l_new_variants);
      set_l_is_generating(false);
    }, 400);
  }, [l_filters]);

  useEffect(() => {
    if (!l_variants_loading && l_variants.length === 0) {
      F_Generate_New_Variants();
    }
  }, [F_Generate_New_Variants, l_variants.length, l_variants_loading]);

  const F_Toggle_Like = (p_variant) => {
    set_l_liked_variants(prev => {
      const l_is_liked = prev.some(v => v.id === p_variant.id);
      if (l_is_liked) {
        return prev.filter(v => v.id !== p_variant.id);
      } else {
        return [{ ...p_variant, brandName: l_brand_name }, ...prev];
      }
    });
  };

  const F_Modify_Variant = (p_variant_id, p_new_bg, p_new_text) => {
    set_l_liked_variants(prev => prev.map(v => {
      if (v.id === p_variant_id) {
        return {
          ...v,
          bgHex: p_new_bg,
          textHex: p_new_text,
          contrastScore: F_Get_Contrast_Ratio(p_new_bg, p_new_text).toFixed(2)
        };
      }
      return v;
    }));
  };

  const F_Shuffle_Colors_Only = () => {
    set_l_variants(prev => prev.map(v => {
      const l_bg_hex = F_Generate_Color_By_Tone(l_filters.colorTone);
      const l_text_hex = F_Get_Accessible_Text_Color(l_bg_hex);
      return {
        ...v,
        bgHex: l_bg_hex,
        textHex: l_text_hex,
        contrastScore: F_Get_Contrast_Ratio(l_bg_hex, l_text_hex).toFixed(2)
      };
    }));
  };

  const F_Shuffle_Fonts_Only = () => {
    set_l_variants(prev => prev.map(v => {
      const l_new_v = F_Generate_Variant(v.id, l_filters.fontCategory, l_filters.colorTone, l_filters.allowTransforms);
      return {
        ...v,
        fontFamily: l_new_v.fontFamily,
        fontCategory: l_new_v.fontCategory,
        fontWeight: l_new_v.fontWeight,
        styles: l_new_v.styles
      };
    }));
  };
  // #endregion

  // #region Render
  return (
    <F_Main_Layout
      activeTab={l_active_tab}
      likedCount={l_liked_variants.length}
      isDark={is_dark}
      toggleTheme={F_Toggle_Theme}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <F_Explore_Page
              brandName={l_brand_name}
              setBrandName={set_l_brand_name}
              generateNewVariants={F_Generate_New_Variants}
              isGenerating={l_is_generating}
              filters={l_filters}
              setFilters={set_l_filters}
              shuffleFontsOnly={F_Shuffle_Fonts_Only}
              shuffleColorsOnly={F_Shuffle_Colors_Only}
              variants={l_variants}
              likedVariants={l_liked_variants}
              toggleLike={F_Toggle_Like}
            />
          }
        />
        <Route
          path="/likes"
          element={
            <F_Liked_Page
              likedVariants={l_liked_variants}
              brandName={l_brand_name}
              toggleLike={F_Toggle_Like}
              exportLikedJSON={() => F_Export_Liked_Json(l_liked_variants)}
              modifyVariant={F_Modify_Variant}
            />
          }
        />
      </Routes>
    </F_Main_Layout>
  );
  // #endregion
}
// #endregion