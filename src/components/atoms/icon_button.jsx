// #region Imports
import React from 'react';
// #endregion

// #region Component
/**
 * Atomic component: Icon Button.
 */
const F_Icon_Button = ({ icon: p_icon, onClick: p_on_click, className: p_class_name, active: p_active, title: p_title }) => {
    const Icon = p_icon;
    return (
        <button
            onClick={p_on_click}
            title={p_title}
            className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center
        ${p_active
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                    : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                } ${p_class_name}`}
        >
            <Icon size={18} />
        </button>
    );
};

export default F_Icon_Button;
// #endregion
