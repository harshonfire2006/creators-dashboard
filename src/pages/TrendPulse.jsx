import React, { useState } from 'react';
import { TrendingUp, Newspaper, ArrowRight, Zap, Globe, Flame, Search, Filter, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // <--- IMPORT THEME

const TrendPulse = () => {
  const { openModal } = useOutletContext(); 
  const { activeTheme } = useTheme(); // <--- Theme Hook
  const isLight = activeTheme.textColor === 'text-slate-900';

  const [activeCategory, setActiveCategory] = useState('All');
  const [isScanning, setIsScanning] = useState(false);

  // MOCK DATA
  const categories = ['All', 'Tech', 'Design', 'Eco', 'AI'];
  
  const viralTrends = [
    { id: 1, topic: "POV Storytelling", volume: "+450%", category: "Tech", confidence: "High", desc: "Creators using 1st person perspective to sell products." },
    { id: 2, topic: "Minimalist UI", volume: "+220%", category: "Design", confidence: "Med", desc: "Clean, flat interfaces are making a comeback." },
    { id: 3, topic: "Sustainable Tech", volume: "+180%", category: "Eco", confidence: "Med", desc: "Gadgets made from recycled ocean plastic." },
    { id: 4, topic: "Generative Video", volume: "+120%", category: "AI", confidence: "High", desc: "Sora & Runway Gen-3 taking over feeds." },
    { id: 5, topic: "Digital Detox", volume: "+90%", category: "Tech", confidence: "Low", desc: "Apps that lock your phone are trending." },
    { id: 6, topic: "Retro Gaming", volume: "+300%", category: "Design", confidence: "High", desc: "8-bit aesthetics in modern web design." },
  ];

  const industryNews = [
    { source: "TechCrunch", title: "TikTok launches 10-minute video limit for all users", time: "2h ago" },
    { source: "TheVerge", title: "Instagram algorithm now prioritizes 'Original Audio' over Remixes", time: "4h ago" },
    { source: "AI Weekly", title: "Gemini 2.5 Flash API is now free for creators", time: "6h ago" },
    { source: "SocialMediaToday", title: "YouTube Shorts adds new monetization tiers", time: "8h ago" },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  // Filter Logic
  const filteredTrends = activeCategory === 'All' 
    ? viralTrends 
    : viralTrends.filter(t => t.category === activeCategory);

  // --- DYNAMIC STYLES ---
  const cardBg = isLight ? 'bg-white border-slate-200' : 'bg-black/40 border-white/10';
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';
  const heroGradient = isLight ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-slate-200' : 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-white/10';

  return (
    <div className="space-y-6 lg:space-y-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">
        
        {/* HERO SECTION */}
        <div className={`relative p-6 lg:p-10 rounded-[32px] ${heroGradient} border overflow-hidden`}>
            <div className={`absolute top-0 right-0 w-64 h-64 ${isLight ? 'bg-blue-500/10' : 'bg-cyan-500/20'} blur-[100px] pointer-events-none`}/>
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h2 className={`text-2xl lg:text-3xl font-black ${textPrimary} italic tracking-tight mb-2 flex flex-wrap items-center gap-3`}>
                        DAILY CREATOR BRIEFING
                        {isScanning && <span className={`text-xs ${isLight ? 'bg-blue-500 text-white' : 'bg-cyan-500 text-black'} px-2 py-1 rounded font-bold animate-pulse`}>SCANNING...</span>}
                    </h2>
                    <p className={`${textSecondary} text-sm lg:text-base max-w-xl`}>AI-scanned viral opportunities for today. "POV Storytelling" is currently spiking on TikTok and Reels.</p>
                </div>
                
                <div className="flex w-full lg:w-auto gap-3">
                    <button onClick={handleScan} className={`p-3 rounded-xl transition-all border ${isLight ? 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600' : 'bg-white/10 border-white/10 hover:bg-white/20 text-white'}`}>
                        <RefreshCw size={20} className={isScanning ? "animate-spin" : ""}/>
                    </button>
                    <button 
                        onClick={() => openModal('text', 'Write a post about POV Storytelling trending on TikTok')} 
                        className={`flex-1 lg:flex-none px-6 py-3 font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}
                    >
                        <Zap size={18} className={isLight ? "text-yellow-400" : "text-black"}/> CREATE TRENDING POST
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
            
            {/* VIRAL OPPORTUNITIES (Takes up 2 columns on desktop) */}
            <div className={`xl:col-span-2 p-6 lg:p-8 rounded-[32px] ${cardBg} border backdrop-blur-xl min-h-[500px]`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    <h3 className={`text-lg font-black ${textPrimary} italic flex items-center gap-2`}>
                        <TrendingUp className={`text-${activeTheme.primary}-500`} size={20}/> VIRAL_CANDIDATES
                    </h3>
                    
                    {/* CATEGORY FILTERS */}
                    <div className={`flex flex-wrap gap-1 p-1 rounded-xl border w-full sm:w-auto ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10'}`}>
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${activeCategory === cat ? `bg-${activeTheme.primary}-500 text-white shadow-lg` : `${textSecondary} hover:${textPrimary}`}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-3">
                    <AnimatePresence>
                        {filteredTrends.map((trend, i) => (
                            <motion.div 
                                layout
                                key={trend.id} 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => openModal('text', `Write a viral post about "${trend.topic}". Context: ${trend.desc}`)}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-5 rounded-2xl border transition-all cursor-pointer group ${isLight ? 'bg-slate-50 border-slate-200 hover:border-blue-300' : 'bg-white/5 border-white/5 hover:border-cyan-500/30 hover:bg-white/10'}`}
                            >
                                <div className="flex items-start gap-4 lg:gap-6 mb-3 sm:mb-0">
                                    <div className={`text-2xl lg:text-3xl font-black ${isLight ? 'text-slate-200' : 'text-slate-700'} group-hover:text-${activeTheme.primary}-500/50 transition-colors`}>0{i+1}</div>
                                    <div>
                                        <h4 className={`text-base lg:text-lg font-bold ${textPrimary} group-hover:text-${activeTheme.primary}-500 transition-colors flex items-center gap-2 lg:gap-3`}>
                                            {trend.topic}
                                            {trend.confidence === 'High' && <Flame size={14} className="text-orange-500 animate-pulse"/>}
                                        </h4>
                                        <p className={`text-xs ${textSecondary} mt-1 max-w-sm leading-relaxed`}>{trend.desc}</p>
                                    </div>
                                </div>
                                <div className="flex sm:block justify-between items-center pl-12 sm:pl-0 sm:text-right border-t sm:border-0 border-white/5 pt-2 sm:pt-0">
                                    <span className="block font-mono text-lg lg:text-xl text-emerald-500 font-black">{trend.volume}</span>
                                    <span className={`text-[10px] ${textSecondary} uppercase tracking-widest`}>Growth</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* INDUSTRY NEWS (Takes up 1 column) */}
            <div className={`p-6 lg:p-8 rounded-[32px] ${cardBg} border backdrop-blur-xl flex flex-col h-full`}>
                <h3 className={`text-lg font-black ${textPrimary} italic mb-6 flex items-center gap-2`}>
                    <Newspaper className="text-purple-500" size={20}/> LATEST_INTEL
                </h3>
                <div className="space-y-4 flex-1">
                    {industryNews.map((news, i) => (
                        <div key={i} className={`flex gap-3 group cursor-pointer p-3 rounded-xl transition-all ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${isLight ? 'bg-slate-100 border-slate-200 group-hover:border-purple-200' : 'bg-white/5 border-white/5 group-hover:border-purple-500/30'}`}>
                                <Globe size={18} className={`${textSecondary} group-hover:text-purple-500`}/>
                            </div>
                            <div>
                                <h4 className={`font-bold ${textPrimary} text-xs leading-relaxed group-hover:text-${activeTheme.primary}-500 transition-colors line-clamp-2`}>{news.title}</h4>
                                <div className={`flex items-center gap-2 mt-2 text-[9px] ${textSecondary} uppercase tracking-wider font-mono`}>
                                    <span className="text-purple-500">{news.source}</span> • <span>{news.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className={`w-full mt-6 py-3 rounded-xl border ${isLight ? 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900' : 'border-white/10 hover:bg-white/5 text-slate-400 hover:text-white'} text-xs font-bold transition-all flex items-center justify-center gap-2`}>
                    VIEW ALL HEADLINES <ArrowRight size={14}/>
                </button>
            </div>
        </div>
    </div>
  );
};

export default TrendPulse;