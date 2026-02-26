// #region Font Configuration
/**
 * Font categories grouped by style.
 */
export const FONT_CATEGORIES = {
  'Sans Serif': ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Lato', 'Outfit', 'Plus Jakarta Sans', 'Work Sans', 'DM Sans', 'Syne'],
  'Serif': ['Playfair Display', 'Merriweather', 'Lora', 'PT Serif', 'Cinzel', 'EB Garamond', 'Cormorant Garamond', 'Libre Baskerville'],
  'Display': ['Bebas Neue', 'Righteous', 'Abril Fatface', 'Anton', 'Josefin Sans', 'Comfortaa', 'Space Grotesk', 'Oswald'],
  'Tech/Mono': ['Space Mono', 'Roboto Mono', 'Fira Code', 'JetBrains Mono', 'Share Tech Mono', 'VT323'],
  'Elegant': ['Cinzel Decorative', 'Italiana', 'Tenor Sans', 'Forum', 'Marcellus', 'Prata']
};

/**
 * Flattened list of all fonts.
 */
export const ALL_FONTS = Object.values(FONT_CATEGORIES).flat();
// #endregion

// #region Color Configuration
/**
 * Available color tones for filtering.
 */
export const COLOR_TONES = ['All', 'Dark', 'Light', 'Vibrant', 'Pastel', 'Monochrome'];
// #endregion

// #region Brand Suggestions
/**
 * Initial brand name suggestions.
 */
export const SUGGESTED_BRANDS = ['Zeta', 'Aura', 'Nexus', 'Lumina', 'Vortex', 'Kismet', 'Onyx', 'Celestia', 'Zenith', 'Nova'];
// #endregion
