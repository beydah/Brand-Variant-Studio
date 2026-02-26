// #region Imports
import { useState, useEffect } from 'react';
// #endregion

// #region Local Storage Hook
/**
 * Hook for local storage persistence.
 */
export const F_Use_Local_Storage = (p_key, p_initial_value) => {
    const [l_value, set_l_value] = useState(() => {
        const l_saved = localStorage.getItem(p_key);
        return l_saved ? JSON.parse(l_saved) : p_initial_value;
    });

    useEffect(() => {
        localStorage.setItem(p_key, JSON.stringify(l_value));
    }, [p_key, l_value]);

    return [l_value, set_l_value];
};
// #endregion
