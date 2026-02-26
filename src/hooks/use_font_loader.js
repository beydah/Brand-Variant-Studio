// #region Imports
import { useEffect } from 'react';
// #endregion

// #region Font Loader Hook
/**
 * Hook for dynamic Google Font loading.
 */
export const F_Use_Font_Loader = (p_variants, p_liked_variants, p_active_tab) => {
    useEffect(() => {
        const l_active_fonts = p_active_tab === 'explore'
            ? p_variants.map(v => v.fontFamily)
            : p_liked_variants.map(v => v.fontFamily);

        const l_unique_fonts = [...new Set(l_active_fonts)];
        if (l_unique_fonts.length === 0) return;

        const l_font_string = l_unique_fonts.map(f => f.replace(/ /g, '+')).join('&family=');
        const l_url = `https://fonts.googleapis.com/css2?family=${l_font_string}:wght@300;400;500;600;700&display=swap`;

        let l_link = document.getElementById('google-fonts-dynamic');
        if (!l_link) {
            l_link = document.createElement('link');
            l_link.id = 'google-fonts-dynamic';
            l_link.rel = 'stylesheet';
            document.head.appendChild(l_link);
        }
        l_link.href = l_url;
    }, [p_variants, p_liked_variants, p_active_tab]);
};
// #endregion
