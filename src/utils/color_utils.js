// #region Color Conversion Utilities
/**
 * Converts hex to RGB.
 * @param {string} p_hex 
 */
export const F_Hex_To_Rgb = (p_hex) => {
    let r = 0, g = 0, b = 0;
    if (p_hex.length === 4) {
        r = parseInt(p_hex[1] + p_hex[1], 16);
        g = parseInt(p_hex[2] + p_hex[2], 16);
        b = parseInt(p_hex[3] + p_hex[3], 16);
    } else if (p_hex.length === 7) {
        r = parseInt(p_hex.substring(1, 3), 16);
        g = parseInt(p_hex.substring(3, 5), 16);
        b = parseInt(p_hex.substring(5, 7), 16);
    }
    return [r, g, b];
};

/**
 * Calculates luminance.
 */
export const F_Get_Luminance = (p_r, p_g, p_b) => {
    let [rs, gs, bs] = [p_r / 255, p_g / 255, p_b / 255];
    rs = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
    gs = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
    bs = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculates contrast ratio.
 */
export const F_Get_Contrast_Ratio = (p_hex1, p_hex2) => {
    const [r1, g1, b1] = F_Hex_To_Rgb(p_hex1);
    const [r2, g2, b2] = F_Hex_To_Rgb(p_hex2);
    const l1 = F_Get_Luminance(r1, g1, b1);
    const l2 = F_Get_Luminance(r2, g2, b2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * Converts HSL to Hex.
 */
export const F_Hsl_To_Hex = (p_h, p_s, p_l) => {
    let l_val = p_l / 100;
    const a = p_s * Math.min(l_val, 1 - l_val) / 100;
    const f = n => {
        const k = (n + p_h / 30) % 12;
        const color = l_val - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
};
// #endregion

// #region Color Generation
/**
 * Generates color by tone.
 */
export const F_Generate_Color_By_Tone = (p_tone) => {
    let h = Math.floor(Math.random() * 360);
    let s, l;

    switch (p_tone) {
        case 'Dark':
            s = Math.floor(Math.random() * 50) + 20;
            l = Math.floor(Math.random() * 20) + 10;
            break;
        case 'Light':
            s = Math.floor(Math.random() * 30) + 10;
            l = Math.floor(Math.random() * 15) + 80;
            break;
        case 'Vibrant':
            s = Math.floor(Math.random() * 30) + 70;
            l = Math.floor(Math.random() * 20) + 40;
            break;
        case 'Pastel':
            s = Math.floor(Math.random() * 40) + 40;
            l = Math.floor(Math.random() * 15) + 75;
            break;
        case 'Monochrome':
            s = 0;
            l = Math.floor(Math.random() * 100);
            break;
        default:
            s = Math.floor(Math.random() * 100);
            l = Math.floor(Math.random() * 100);
    }
    return F_Hsl_To_Hex(h, s, l);
};

/**
 * Gets accessible text color.
 */
export const F_Get_Accessible_Text_Color = (p_bg_hex) => {
    let text_hex = '#ffffff';
    let attempts = 0;
    while (F_Get_Contrast_Ratio(p_bg_hex, text_hex) < 4.5 && attempts < 20) {
        const l_bg = F_Get_Luminance(...F_Hex_To_Rgb(p_bg_hex));
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 40);
        const l = l_bg < 0.5 ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 10;
        text_hex = F_Hsl_To_Hex(h, s, l);
        attempts++;
    }
    if (F_Get_Contrast_Ratio(p_bg_hex, text_hex) < 4.5) {
        text_hex = F_Get_Luminance(...F_Hex_To_Rgb(p_bg_hex)) > 0.5 ? '#000000' : '#ffffff';
    }
    return text_hex;
};
// #endregion
