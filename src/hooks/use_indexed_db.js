// #region Imports
import { useState, useEffect } from 'react';
import { F_IDB_Get, F_IDB_Set } from '../utils/indexed_db';
// #endregion

// #region IndexedDB Hook
/**
 * Hook for IndexedDB persistence.
 */
export const F_Use_Indexed_DB = (p_key, p_initial_value) => {
    const [l_value, set_l_value] = useState(p_initial_value);
    const [l_is_loading, set_l_is_loading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadFromIDB = async () => {
            const savedValue = await F_IDB_Get(p_key);
            if (isMounted) {
                if (savedValue !== undefined && savedValue !== null) {
                    set_l_value(savedValue);
                }
                set_l_is_loading(false);
            }
        };

        loadFromIDB();

        return () => {
            isMounted = false;
        };
    }, [p_key]);

    const set_value_and_store = (new_value_or_updater) => {
        set_l_value(prev => {
            const val = typeof new_value_or_updater === 'function' ? new_value_or_updater(prev) : new_value_or_updater;
            F_IDB_Set(p_key, val);
            return val;
        });
    };

    return [l_value, set_value_and_store, l_is_loading];
};
// #endregion
