// #region Imports
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Copy, Check } from 'lucide-react';
// #endregion

// #region Component
/**
 * Molecular component: Copy Button.
 */
const F_Copy_Button = ({ text: p_text, tooltip: p_tooltip }) => {
    const { t } = useTranslation();
    const [l_copied, set_l_copied] = useState(false);

    const F_Handle_Copy = (p_e) => {
        p_e.stopPropagation();
        navigator.clipboard.writeText(p_text);
        set_l_copied(true);
        setTimeout(() => set_l_copied(false), 1500);
    };

    return (
        <button
            onClick={F_Handle_Copy}
            className="group relative flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={p_tooltip}
        >
            {l_copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            <span>{p_text}</span>
        </button>
    );
};

export default F_Copy_Button;
// #endregion
