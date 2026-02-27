// #region Imports
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Sparkles, Heart, ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import F_Icon_Button from '../atoms/icon_button';
// #endregion

// #region Component
/**
 * Organism component: Navigation (Sidebar & Mobile Nav).
 */
const F_Navigation = ({ isDark: p_is_dark, toggleTheme: p_toggle_theme, likedCount: p_liked_count, isCollapsed: p_is_collapsed, setIsCollapsed: p_set_is_collapsed }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const l_active_tab = location.pathname.includes('/likes') ? 'liked' : 'explore';

    const F_Toggle_Language = () => {
        const l_new_lang = i18n.language === 'en' ? 'tr' : 'en';
        i18n.changeLanguage(l_new_lang);
    };

    const Logo = ({ idSuffix }) => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-full h-full rounded-lg shadow-lg">
            <defs>
                <linearGradient id={`bvNav-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5A67D8" />
                    <stop offset="100%" stopColor="#3C366B" />
                </linearGradient>
            </defs>
            <rect width="512" height="512" rx="120" fill={`url(#bvNav-${idSuffix})`} />
            <text
                x="50%"
                y="54%"
                fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                fontWeight="900"
                fontSize="260"
                letterSpacing="-10"
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="middle">
                BV
            </text>
        </svg>
    );

    return (
        <>
            {/* --- DESKTOP LEFT SIDEBAR --- */}
            <nav className={`hidden md:flex flex-col ${p_is_collapsed ? 'w-20' : 'w-64'} fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-all duration-300 ease-in-out`}>

                {/* Logo Area & Collapse Toggle */}
                <div className={`p-6 flex flex-col ${p_is_collapsed ? 'items-center' : 'items-start'} gap-4`}>
                    <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity" title={p_is_collapsed ? t('app.title', 'Brand Variant') : ''}>
                        <div className={`${p_is_collapsed ? 'w-10 h-10' : 'w-8 h-8'} shrink-0 transition-all`}>
                            <Logo idSuffix="desktop" />
                        </div>
                        {!p_is_collapsed && (
                            <span className="font-bold text-lg leading-tight whitespace-normal text-slate-800 dark:text-white">
                                {t('app.title', 'Brand Variant Studio')}
                            </span>
                        )}
                    </Link>

                    {!p_is_collapsed && (
                        <button
                            onClick={() => p_set_is_collapsed(true)}
                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors w-full px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            {t('app.nav.collapse', 'Daralt')}
                        </button>
                    )}
                </div>

                {p_is_collapsed && (
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={() => p_set_is_collapsed(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-800 p-2 rounded-full shadow-sm"
                            title={t('app.nav.expand', 'Genişlet')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                )}

                {/* Main Links */}
                <div className={`flex-1 ${p_is_collapsed ? 'px-2' : 'px-4'} space-y-2 overflow-y-auto`}>
                    <button
                        onClick={() => navigate('/variants')}
                        className={`w-full flex items-center ${p_is_collapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'} rounded-xl font-medium transition-all ${l_active_tab === 'explore'
                            ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                            : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        title={p_is_collapsed ? t('app.tabs.explore') : ''}
                    >
                        <Sparkles size={20} className={`shrink-0 ${l_active_tab === 'explore' ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                        {!p_is_collapsed && <span className="truncate">{t('app.tabs.explore')}</span>}
                    </button>

                    <button
                        onClick={() => navigate('/likes')}
                        className={`w-full flex items-center ${p_is_collapsed ? 'justify-center p-3' : 'justify-between px-4 py-3'} rounded-xl font-medium transition-all relative ${l_active_tab === 'liked'
                            ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                            : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                            }`}
                        title={p_is_collapsed ? t('app.tabs.liked') : ''}
                    >
                        <div className={`flex items-center ${p_is_collapsed ? '' : 'gap-3'}`}>
                            <Heart size={20} className={`shrink-0 ${l_active_tab === 'liked' ? 'fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400' : ''}`} />
                            {!p_is_collapsed && <span className="truncate">{t('app.tabs.liked')}</span>}
                        </div>
                        {p_liked_count > 0 && (
                            <span className={p_is_collapsed
                                ? "absolute top-1 right-1 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold px-1"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 py-0.5 px-2 rounded-full text-xs font-bold"}>
                                {p_liked_count > 99 ? '99+' : p_liked_count}
                            </span>
                        )}
                    </button>
                </div>

                {/* Bottom Toggles Area */}
                <div className={`p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col ${p_is_collapsed ? 'items-center gap-4' : 'gap-2'}`}>

                    {/* Localization */}
                    <button
                        onClick={F_Toggle_Language}
                        className={`flex items-center ${p_is_collapsed ? 'justify-center p-2' : 'justify-between px-3 py-2 w-full'} rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white`}
                        title={p_is_collapsed ? t('app.nav.language', 'Language') : ''}
                    >
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /><path d="M2 12h20" /></svg>
                            {!p_is_collapsed && <span className="text-sm font-medium">{t('app.nav.language')}</span>}
                        </div>
                        {!p_is_collapsed && <span className="text-xs font-bold bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{i18n.language.toUpperCase()}</span>}
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={p_toggle_theme}
                        className={`flex items-center ${p_is_collapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2 w-full'} rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white`}
                        title={p_is_collapsed ? t('app.nav.theme') : ''}
                    >
                        {p_is_dark ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />}
                        {!p_is_collapsed && <span className="text-sm font-medium">{t('app.nav.theme')}</span>}
                    </button>

                    {/* Footer Links (Only visible when expanded) */}
                    {!p_is_collapsed && (
                        <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 px-3">
                            <a href="https://beydahsaglam.com" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                                {t('app.footer.made_by', 'Geliştirici:')} Ilkay Beydah Sağlam
                            </a>
                            <a href="https://github.com/beydah/Brand-Variant-Studio" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                {t('app.footer.contribute', "GitHub'da Katkı Yapabilirsiniz")}
                            </a>
                        </div>
                    )}
                </div>
            </nav>


            {/* --- MOBILE TOP BAR --- */}
            <nav className="md:hidden fixed top-0 w-full h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 px-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="w-8 h-8 shrink-0">
                        <Logo idSuffix="mobile" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-white">
                        {t('app.title', 'Brand Variant')}
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <button
                        onClick={F_Toggle_Language}
                        className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        {i18n.language.toUpperCase()}
                    </button>
                    <F_Icon_Button
                        icon={p_is_dark ? Sun : Moon}
                        onClick={p_toggle_theme}
                        title={t('app.filters.shuffle_colors')}
                    />
                </div>
            </nav>


            {/* --- MOBILE BOTTOM NAVIGATION --- */}
            <nav className="md:hidden fixed bottom-0 w-full h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 flex items-center justify-around pb-safe">
                <button
                    onClick={() => navigate('/variants')}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 ${l_active_tab === 'explore'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                        }`}
                >
                    <Sparkles size={22} className={l_active_tab === 'explore' ? 'fill-blue-600/20' : ''} />
                    <span className="text-[10px] font-medium">{t('app.tabs.explore')}</span>
                </button>

                <button
                    onClick={() => navigate('/likes')}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 relative ${l_active_tab === 'liked'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                        }`}
                >
                    <div className="relative">
                        <Heart size={22} className={l_active_tab === 'liked' ? 'fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400' : ''} />
                        {p_liked_count > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-bold px-1 ring-2 ring-white dark:ring-slate-900">
                                {p_liked_count > 99 ? '99+' : p_liked_count}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium">{t('app.tabs.liked')}</span>
                </button>
            </nav>
        </>
    );
};

export default F_Navigation;
// #endregion
