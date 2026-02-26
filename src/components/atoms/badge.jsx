// #region Imports
import React from 'react';
// #endregion

// #region Component
/**
 * Atomic component: Badge.
 */
const F_Badge = ({ children: p_children, className: p_class_name }) => (
    <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${p_class_name}`}>
        {p_children}
    </span>
);

export default F_Badge;
// #endregion
