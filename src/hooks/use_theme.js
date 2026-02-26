// #region Imports
import { useState, useEffect } from 'react';
// #endregion

// #region Theme Hook
/**
 * Hook for managing theme.
 */
export const F_Use_Theme = () => {
    const [is_dark, set_is_dark] = useState(() => {
        const l_saved_theme = localStorage.getItem('brandStudioTheme');
        return l_saved_theme === 'dark';
    });

    useEffect(() => {
        if (is_dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('brandStudioTheme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('brandStudioTheme', 'light');
        }
    }, [is_dark]);

    const F_Toggle_Theme = () => set_is_dark(!is_dark);

    return { is_dark, F_Toggle_Theme };
};
// #endregion
