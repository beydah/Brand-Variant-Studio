import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Copy, Download, RefreshCw, Settings2, 
  Moon, Sun, Check, Sparkles, FileJson, Image as ImageIcon,
  Type, Palette, SlidersHorizontal, Shuffle
} from 'lucide-react';

// --- CONSTANTS & DATA ---

const FONT_CATEGORIES = {
  'Sans Serif': ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Lato', 'Outfit', 'Plus Jakarta Sans', 'Work Sans', 'DM Sans', 'Syne'],
  'Serif': ['Playfair Display', 'Merriweather', 'Lora', 'PT Serif', 'Cinzel', 'EB Garamond', 'Cormorant Garamond', 'Libre Baskerville'],
  'Display': ['Bebas Neue', 'Righteous', 'Abril Fatface', 'Anton', 'Josefin Sans', 'Comfortaa', 'Space Grotesk', 'Oswald'],
  'Tech/Mono': ['Space Mono', 'Roboto Mono', 'Fira Code', 'JetBrains Mono', 'Share Tech Mono', 'VT323'],
  'Elegant': ['Cinzel Decorative', 'Italiana', 'Tenor Sans', 'Forum', 'Marcellus', 'Prata']
};

const ALL_FONTS = Object.values(FONT_CATEGORIES).flat();

const COLOR_TONES = ['All', 'Dark', 'Light', 'Vibrant', 'Pastel', 'Monochrome'];

const SUGGESTED_BRANDS = ['Loopest', 'Aura', 'Nexus', 'Lumina', 'Vortex', 'Kismet', 'Onyx', 'Celestia', 'Zenith', 'Nova'];

// --- UTILS: COLOR & CONTRAST ---

const hexToRgb = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return [r, g, b];
};

const getLuminance = (r, g, b) => {
  let [rs, gs, bs] = [r / 255, g / 255, b / 255];
  rs = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  gs = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  bs = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (hex1, hex2) => {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

const generateColorByTone = (tone) => {
  let h = Math.floor(Math.random() * 360);
  let s, l;

  switch (tone) {
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
    default: // 'All'
      s = Math.floor(Math.random() * 100);
      l = Math.floor(Math.random() * 100);
  }
  return hslToHex(h, s, l);
};

const getAccessibleTextColor = (bgHex) => {
  let textHex = '#ffffff';
  let attempts = 0;
  while (getContrastRatio(bgHex, textHex) < 4.5 && attempts < 20) {
    // Try to generate a contrasting color
    const lBg = getLuminance(...hexToRgb(bgHex));
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 40); // Keep text relatively desaturated
    // If bg is dark, make text light, and vice versa
    const l = lBg < 0.5 ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 30) + 10;
    textHex = hslToHex(h, s, l);
    attempts++;
  }
  // Fallback to pure black or white if generation fails to find good contrast quickly
  if (getContrastRatio(bgHex, textHex) < 4.5) {
    textHex = getLuminance(...hexToRgb(bgHex)) > 0.5 ? '#000000' : '#ffffff';
  }
  return textHex;
};

const generateVariant = (id, fontCategoryFilter, colorToneFilter, allowTransforms) => {
  // Font selection
  let availableFonts = ALL_FONTS;
  let category = 'Random';
  
  if (fontCategoryFilter !== 'All') {
    availableFonts = FONT_CATEGORIES[fontCategoryFilter];
    category = fontCategoryFilter;
  } else {
    // Pick a random category to balance the distribution if 'All'
    const categories = Object.keys(FONT_CATEGORIES);
    category = categories[Math.floor(Math.random() * categories.length)];
    availableFonts = FONT_CATEGORIES[category];
  }
  
  const fontFamily = availableFonts[Math.floor(Math.random() * availableFonts.length)];
  
  // Color selection
  const bgHex = generateColorByTone(colorToneFilter);
  const textHex = getAccessibleTextColor(bgHex);
  const contrastScore = getContrastRatio(bgHex, textHex).toFixed(2);

  // Optional styles
  const styles = {};
  if (allowTransforms) {
    const r = Math.random();
    if (r > 0.8) styles.textTransform = 'uppercase';
    else if (r > 0.6) styles.textTransform = 'lowercase';
    
    if (Math.random() > 0.7) styles.letterSpacing = `${(Math.random() * 0.2).toFixed(2)}em`;
  }

  // Weights (not all fonts support all weights, but we try common ones)
  const weights = [300, 400, 500, 600, 700];
  const fontWeight = weights[Math.floor(Math.random() * weights.length)];

  return {
    id: id || crypto.randomUUID(),
    fontFamily,
    fontCategory: category,
    fontWeight,
    bgHex,
    textHex,
    contrastScore,
    styles
  };
};

// --- COMPONENTS ---

const IconButton = ({ icon: Icon, onClick, className, active, title }) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center
      ${active 
        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' 
        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
      } ${className}`}
  >
    <Icon size={18} />
  </button>
);

const CopyButton = ({ text, tooltip }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
      title={tooltip}
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      <span>{text}</span>
    </button>
  );
};

const Badge = ({ children, className }) => (
  <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${className}`}>
    {children}
  </span>
);

export default function App() {
  const [brandName, setBrandName] = useState('Lumina');
  const [variants, setVariants] = useState([]);
  const [likedVariants, setLikedVariants] = useState([]);
  const [activeTab, setActiveTab] = useState('explore');
  const [isDark, setIsDark] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Filters
  const [filters, setFilters] = useState({
    fontCategory: 'All',
    colorTone: 'All',
    allowTransforms: false
  });

  // Load Preferences & Liked
  useEffect(() => {
    const savedLiked = localStorage.getItem('brandStudioLiked');
    if (savedLiked) setLikedVariants(JSON.parse(savedLiked));
    
    const savedTheme = localStorage.getItem('brandStudioTheme');
    if (savedTheme === 'dark') setIsDark(true);
  }, []);

  // Theme observer
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('brandStudioTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('brandStudioTheme', 'light');
    }
  }, [isDark]);

  // Dynamic Google Font Loader
  useEffect(() => {
    const activeFonts = activeTab === 'explore' 
      ? variants.map(v => v.fontFamily) 
      : likedVariants.map(v => v.fontFamily);
      
    const uniqueFonts = [...new Set(activeFonts)];
    if (uniqueFonts.length === 0) return;

    const fontString = uniqueFonts.map(f => f.replace(/ /g, '+')).join('&family=');
    const url = `https://fonts.googleapis.com/css2?family=${fontString}:wght@300;400;500;600;700&display=swap`;
    
    let link = document.getElementById('google-fonts-dynamic');
    if (!link) {
      link = document.createElement('link');
      link.id = 'google-fonts-dynamic';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = url;
  }, [variants, likedVariants, activeTab]);

  const generateNewVariants = useCallback(() => {
    setIsGenerating(true);
    // Simulate slight delay for perceived value and UI reset
    setTimeout(() => {
      const newVariants = Array.from({ length: 100 }, (_, i) => 
        generateVariant(null, filters.fontCategory, filters.colorTone, filters.allowTransforms)
      );
      setVariants(newVariants);
      setActiveTab('explore');
      setIsGenerating(false);
    }, 400);
  }, [filters]);

  // Initial generation
  useEffect(() => {
    if (variants.length === 0) {
      generateNewVariants();
    }
  }, []);

  const toggleLike = (variant) => {
    setLikedVariants(prev => {
      const isLiked = prev.some(v => v.id === variant.id);
      let newLiked;
      if (isLiked) {
        newLiked = prev.filter(v => v.id !== variant.id);
      } else {
        newLiked = [variant, ...prev];
      }
      localStorage.setItem('brandStudioLiked', JSON.stringify(newLiked));
      return newLiked;
    });
  };

  const shuffleColorsOnly = () => {
    setVariants(prev => prev.map(v => {
      const bgHex = generateColorByTone(filters.colorTone);
      const textHex = getAccessibleTextColor(bgHex);
      return { 
        ...v, 
        bgHex, 
        textHex, 
        contrastScore: getContrastRatio(bgHex, textHex).toFixed(2) 
      };
    }));
  };

  const shuffleFontsOnly = () => {
    setVariants(prev => prev.map(v => {
      const newV = generateVariant(v.id, filters.fontCategory, filters.colorTone, filters.allowTransforms);
      return {
        ...v,
        fontFamily: newV.fontFamily,
        fontCategory: newV.fontCategory,
        fontWeight: newV.fontWeight,
        styles: newV.styles
      };
    }));
  };

  const exportLikedJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(likedVariants, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "brand_variants.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportToPNG = async (variant) => {
    // A lightweight SVG-to-Canvas exporter to avoid external dependencies
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    // Load font before drawing
    await document.fonts.load(`${variant.fontWeight} 100px "${variant.fontFamily}"`);

    // Draw Background
    ctx.fillStyle = variant.bgHex;
    ctx.fillRect(0, 0, width, height);

    // Draw Text
    ctx.fillStyle = variant.textHex;
    ctx.font = `${variant.fontWeight} 100px "${variant.fontFamily}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Apply simulated text transforms
    let displayProps = { ...variant.styles };
    let displayText = brandName;
    if (displayProps.textTransform === 'uppercase') displayText = displayText.toUpperCase();
    if (displayProps.textTransform === 'lowercase') displayText = displayText.toLowerCase();
    
    // Note: Canvas doesn't natively support letter-spacing easily, we do a basic render
    ctx.fillText(displayText, width / 2, height / 2);

    // Download
    const link = document.createElement('a');
    link.download = `${brandName}-${variant.fontFamily.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const displayedVariants = useMemo(() => {
    let list = activeTab === 'explore' ? variants : likedVariants;
    return list;
  }, [variants, likedVariants, activeTab]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              BV
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">Brand Variant Studio</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-4">
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'explore' 
                    ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => setActiveTab('liked')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                  activeTab === 'liked' 
                    ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Liked
                {likedVariants.length > 0 && (
                  <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 py-0.5 px-2 rounded-full text-xs">
                    {likedVariants.length}
                  </span>
                )}
              </button>
            </div>
            
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            <IconButton 
              icon={isDark ? Sun : Moon} 
              onClick={() => setIsDark(!isDark)} 
              title="Toggle theme"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* HERO INPUT SECTION */}
        <section className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto pt-8 pb-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Find your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">brand aesthetic.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Enter a name to instantly generate 100 unique typographic and color harmonies.
          </p>

          <div className="w-full relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Type className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name..."
              className="block w-full pl-12 pr-32 py-4 text-xl font-medium bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <button
                onClick={generateNewVariants}
                disabled={!brandName || isGenerating}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generate
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-sm text-slate-500 flex items-center">Try:</span>
            {SUGGESTED_BRANDS.slice(0, 5).map(suggestion => (
              <button
                key={suggestion}
                onClick={() => { setBrandName(suggestion); setTimeout(generateNewVariants, 0); }}
                className="text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </section>

        {/* CONTROLS & FILTERS */}
        {activeTab === 'explore' && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-20 z-40">
            
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Filters:</span>
              </div>
              
              <select 
                value={filters.fontCategory}
                onChange={(e) => { setFilters(p => ({...p, fontCategory: e.target.value})); setTimeout(generateNewVariants, 0); }}
                className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                <option value="All">All Fonts</option>
                {Object.keys(FONT_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select 
                value={filters.colorTone}
                onChange={(e) => { setFilters(p => ({...p, colorTone: e.target.value})); setTimeout(generateNewVariants, 0); }}
                className="text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {COLOR_TONES.map(tone => <option key={tone} value={tone}>{tone} Tones</option>)}
              </select>

              <label className="flex items-center gap-2 cursor-pointer ml-2">
                <input 
                  type="checkbox" 
                  checked={filters.allowTransforms}
                  onChange={(e) => { setFilters(p => ({...p, allowTransforms: e.target.checked})); setTimeout(generateNewVariants, 0); }}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Allow casing edits</span>
              </label>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button 
                onClick={shuffleFontsOnly}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Type size={14} /> Shuffle Fonts
              </button>
              <button 
                onClick={shuffleColorsOnly}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Palette size={14} /> Shuffle Colors
              </button>
            </div>
          </section>
        )}

        {/* LIKED ACTIONS */}
        {activeTab === 'liked' && likedVariants.length > 0 && (
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="fill-red-500 text-red-500" size={20} /> Saved Concepts
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={exportLikedJSON}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
              >
                <FileJson size={16} /> Export JSON
              </button>
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 transition-colors"
              >
                <Download size={16} /> Print / PDF
              </button>
            </div>
          </div>
        )}

        {/* GRID */}
        {displayedVariants.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Heart className="text-slate-400" size={32} />
            </div>
            <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No variants yet</h3>
            <p className="text-slate-500">Go back to explore and heart some styles you like.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            <AnimatePresence>
              {displayedVariants.map((variant) => {
                const isLiked = likedVariants.some(v => v.id === variant.id);
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={variant.id}
                    className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 flex flex-col"
                  >
                    {/* Visual Preview */}
                    <div 
                      className="h-48 flex items-center justify-center p-6 relative"
                      style={{ backgroundColor: variant.bgHex }}
                    >
                      <button 
                        onClick={() => toggleLike(variant)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors z-10"
                      >
                        <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "text-white/80"} />
                      </button>

                      <div className="absolute top-3 left-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          onClick={() => exportToPNG(variant)}
                          className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors text-white/90"
                          title="Export as PNG"
                        >
                          <ImageIcon size={16} />
                        </button>
                      </div>

                      <span 
                        className="text-3xl text-center max-w-full truncate px-4"
                        style={{ 
                          color: variant.textHex, 
                          fontFamily: `"${variant.fontFamily}", sans-serif`,
                          fontWeight: variant.fontWeight,
                          ...variant.styles
                        }}
                      >
                        {brandName || 'Preview'}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="p-4 flex flex-col gap-4">
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white truncate" title={variant.fontFamily}>
                            {variant.fontFamily}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {variant.fontCategory}
                            </Badge>
                            <span className="text-xs text-slate-500">W: {variant.fontWeight}</span>
                          </div>
                        </div>
                        <CopyButton text={variant.fontFamily} tooltip="Copy Font Family" />
                      </div>

                      <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                      <div className="flex justify-between items-center gap-2">
                        <div className="flex gap-2 w-full">
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Background</span>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border border-black/10 shadow-inner" style={{ background: variant.bgHex }} />
                              <CopyButton text={variant.bgHex.toUpperCase()} tooltip="Copy Background Hex" />
                            </div>
                          </div>
                          
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Text</span>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border border-black/10 shadow-inner" style={{ background: variant.textHex }} />
                              <CopyButton text={variant.textHex.toUpperCase()} tooltip="Copy Text Hex" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Optional accessibility indicator */}
                      {/* <div className="text-xs text-slate-400 text-right">
                        Contrast: {variant.contrastScore}:1
                      </div> */}

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* CSS for print mode (PDF export) */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white; color: black; }
          header, section:first-of-type, .no-print { display: none !important; }
          .grid { display: block; }
          .group { break-inside: avoid; margin-bottom: 20px; box-shadow: none; border: 1px solid #e2e8f0; }
          button { display: none !important; }
        }
      `}} />
    </div>
  );
}