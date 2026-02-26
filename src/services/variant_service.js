// #region Imports
import { ALL_FONTS, FONT_CATEGORIES } from '../constants';
import {
    F_Generate_Color_By_Tone,
    F_Get_Accessible_Text_Color,
    F_Get_Contrast_Ratio
} from '../utils/color_utils';
// #endregion

// #region Variant Generation
/**
 * Generates brand variant.
 */
export const F_Generate_Variant = (p_id, p_font_category_filter, p_color_tone_filter, p_allow_transforms) => {
    let available_fonts = ALL_FONTS;
    let category = 'Random';

    if (p_font_category_filter !== 'All') {
        available_fonts = FONT_CATEGORIES[p_font_category_filter];
        category = p_font_category_filter;
    } else {
        const categories = Object.keys(FONT_CATEGORIES);
        category = categories[Math.floor(Math.random() * categories.length)];
        available_fonts = FONT_CATEGORIES[category];
    }

    const font_family = available_fonts[Math.floor(Math.random() * available_fonts.length)];
    const bg_hex = F_Generate_Color_By_Tone(p_color_tone_filter);
    const text_hex = F_Get_Accessible_Text_Color(bg_hex);
    const contrast_score = F_Get_Contrast_Ratio(bg_hex, text_hex).toFixed(2);

    const styles = {};
    if (p_allow_transforms) {
        const r = Math.random();
        if (r > 0.8) styles.textTransform = 'uppercase';
        else if (r > 0.6) styles.textTransform = 'lowercase';

        if (Math.random() > 0.7) styles.letterSpacing = `${(Math.random() * 0.2).toFixed(2)}em`;
    }

    const weights = [300, 400, 500, 600, 700];
    const font_weight = weights[Math.floor(Math.random() * weights.length)];

    return {
        id: p_id || crypto.randomUUID(),
        fontFamily: font_family,
        fontCategory: category,
        fontWeight: font_weight,
        bgHex: bg_hex,
        textHex: text_hex,
        contrastScore: contrast_score,
        styles
    };
};
// #endregion

// #region Export Services
/**
 * Exports liked variants to JSON.
 */
export const F_Export_Liked_Json = (p_liked_variants) => {
    const data_str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(p_liked_variants, null, 2));
    const download_anchor_node = document.createElement('a');
    download_anchor_node.setAttribute("href", data_str);
    download_anchor_node.setAttribute("download", "brand_variants.json");
    document.body.appendChild(download_anchor_node);
    download_anchor_node.click();
    download_anchor_node.remove();
};

// #endregion
