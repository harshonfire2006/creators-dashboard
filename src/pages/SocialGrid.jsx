import React, { useState } from 'react';
import { 
  Plus, Calendar as CalendarIcon, Layout as LayoutIcon,
  Image as ImageIcon, Video, Type, Clock, 
  Trash2, X, Twitter, Instagram, Linkedin, Youtube,
  MoreVertical, Layers, ChevronRight, ChevronLeft,
  Search, Filter, Eye, UserPlus, Zap, Heart, MessageCircle, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; 

const SocialGrid = () => {
  const { activeTheme } = useTheme(); 
  const isLight = activeTheme.textColor === 'text-slate-900';

  const [view, setView] = useState('board'); 
  const [isAdding, setIsAdding] = useState(false);
  const [previewPost, setPreviewPost] = useState(null); 
  const [draggedItem, setDraggedItem] = useState(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [posts, setPosts] = useState([
    { id: 1, title: "Next-Gen AI Tools Thread", type: "text", status: "draft", platform: "twitter", date: "2026-02-10", priority: "High", assignee: "Sarah", viralScore: 85, content: "Top 5 AI tools you missed this week..." },
    { id: 2, title: "Creator Studio Vlog", type: "video", status: "progress", platform: "instagram", date: "2026-02-12", priority: "Med", assignee: "Mike", viralScore: 92, content: "Behind the scenes at the new studio! 🎥" },
    { id: 3, title: "Modern UI Principles", type: "image", status: "review", platform: "linkedin", date: "2026-02-14", priority: "Low", assignee: "You", viralScore: 64, content: "Glassmorphism is back..." },
    { id: 4, title: "Gemini 2.5 Logic Flux", type: "text", status: "scheduled", platform: "twitter", date: "2026-02-15", priority: "High", assignee: "Sarah", viralScore: 98, content: "Gemini 2.5 just changed the coding game..." },
  ]);

  // --- FILTER LOGIC ---
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || post.platform.toLowerCase() === platformFilter.toLowerCase();
    return matchesSearch && matchesPlatform;
  });

  // --- CALENDAR LOGIC ---
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay(); 
  // Adjust for Monday start (0=Mon, 6=Sun) or Sunday start (0=Sun)
  // Standard JS getDay() returns 0 for Sunday. Let's assume standard Sunday start for grid.
  const firstDayIndex = getFirstDayOfMonth(currentDate); 
  const daysInMonth = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  const openAddModal = (dateStr) => {
    setSelectedDate(dateStr);
    setIsAdding(true);
  };

  // --- ACTIONS ---
  const handleAddPost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
        id: Date.now(),
        title: formData.get('title'),
        content: "Draft content...", 
        platform: formData.get('platform'),
        type: formData.get('type'),
        priority: formData.get('priority'),
        status: 'draft',
        date: selectedDate || new Date().toISOString().split('T')[0],
        assignee: "You",
        viralScore: Math.floor(Math.random() * 40) + 60 
    };
    setPosts([...posts, newPost]);
    setIsAdding(false);
    setSelectedDate(null);
  };

  const moveTask = (id, newStatus) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const columns = [
    { id: 'draft', title: 'BACKLOG', color: 'from-slate-500/20 to-slate-500/5', border: 'border-slate-500/50', icon: '💡' },
    { id: 'progress', title: 'IN PROGRESS', color: 'from-blue-500/20 to-blue-500/5', border: 'border-blue-500/50', icon: '⚡' },
    { id: 'review', title: 'REVIEW', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/50', icon: '👁️' },
    { id: 'scheduled', title: 'READY', color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/50', icon: '🚀' }
  ];

  // --- DYNAMIC STYLES ---
  const cardBg = isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0B0F19] border-white/10';
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';
  const modalBg = isLight ? 'bg-white' : 'bg-[#0B0F19] border border-white/10';

  return (
    <div className="h-full flex flex-col space-y-4 lg:space-y-6 relative pb-4 overflow-hidden">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

        {/* --- TOOLBAR --- */}
        <div className="flex flex-col gap-4 px-1 shrink-0">
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl border ${isLight ? 'bg-blue-50 border-blue-100' : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-cyan-500/20'}`}>
                        <Layers size={20} className={`text-${activeTheme.primary}-500`}/>
                    </div>
                    <div>
                        <h2 className={`text-xl font-black ${textPrimary} italic tracking-tighter`}>MISSION_CONTROL</h2>
                        <p className={`text-[10px] ${textSecondary} font-mono tracking-widest uppercase`}>Content Logistics Pipeline</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className={`flex flex-1 lg:flex-none p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#0B0F19] border-white/10'}`}>
                        <button onClick={() => setView('board')} className={`flex-1 lg:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex justify-center items-center gap-2 ${view === 'board' ? (isLight ? 'bg-white text-black shadow-sm' : 'bg-white/10 text-white shadow-lg') : textSecondary}`}>
                            <LayoutIcon size={14}/> BOARD
                        </button>
                        <button onClick={() => setView('calendar')} className={`flex-1 lg:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex justify-center items-center gap-2 ${view === 'calendar' ? (isLight ? 'bg-white text-black shadow-sm' : 'bg-white/10 text-white shadow-lg') : textSecondary}`}>
                            <CalendarIcon size={14}/> CALENDAR
                        </button>
                    </div>
                    <button onClick={() => openAddModal(null)} className={`hidden sm:flex group items-center gap-2 px-6 py-3 bg-${activeTheme.primary}-500 text-white rounded-xl font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-${activeTheme.primary}-500/20`}>
                        <Plus size={16} strokeWidth={3}/> <span className="hidden lg:inline">CREATE_TASK</span><span className="lg:hidden">NEW</span>
                    </button>
                    {/* Mobile FAB */}
                    <button onClick={() => openAddModal(null)} className={`sm:hidden p-3 bg-${activeTheme.primary}-500 text-white rounded-xl shadow-lg`}>
                        <Plus size={20}/>
                    </button>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:max-w-xs">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSecondary}`} size={14}/>
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tasks..." 
                        className={`w-full ${isLight ? 'bg-slate-100 border-slate-200 focus:bg-white' : 'bg-white/5 border-white/10 focus:bg-black/40'} border rounded-xl pl-9 pr-4 py-2.5 text-xs ${textPrimary} outline-none focus:border-${activeTheme.primary}-500/50 transition-all`}
                    />
                </div>
                
                <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar w-full p-1 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'}`}>
                    {['All', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(p => (
                        <button 
                            key={p} 
                            onClick={() => setPlatformFilter(p)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all whitespace-nowrap ${platformFilter === p ? `bg-${activeTheme.primary}-500 text-white shadow-md` : `${textSecondary} hover:${textPrimary}`}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 overflow-hidden relative">
            
            {/* --- KANBAN BOARD VIEW --- */}
            {view === 'board' ? (
                <div className="flex gap-4 lg:gap-6 h-full overflow-x-auto pb-4 px-1 snap-x snap-mandatory">
                    {columns.map(col => (
                        <div key={col.id} onDragOver={(e) => e.preventDefault()} onDrop={() => moveTask(draggedItem, col.id)} className="flex-none w-[85vw] sm:w-[350px] flex flex-col group h-full snap-center">
                            {/* Column Header */}
                            <div className={`p-4 rounded-t-2xl bg-gradient-to-b ${col.color} border-t border-x ${isLight ? 'border-slate-200' : 'border-white/5'} flex justify-between items-center relative overflow-hidden`}>
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${col.border.replace('border-', 'from-').replace('/50', '')} to-transparent opacity-50`}/>
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="text-sm">{col.icon}</span>
                                    <span className={`text-[11px] font-black ${textPrimary} tracking-[0.2em] uppercase`}>{col.title}</span>
                                </div>
                                <span className={`text-[10px] font-mono ${textSecondary} ${isLight ? 'bg-white/50' : 'bg-black/20'} px-2 py-0.5 rounded`}>{filteredPosts.filter(p => p.status === col.id).length}</span>
                            </div>
                            
                            {/* Column Body */}
                            <div className={`flex-1 ${isLight ? 'bg-slate-50/50' : 'bg-[#05070a]/40'} rounded-b-2xl border-x border-b ${isLight ? 'border-slate-200' : 'border-white/5'} p-3 backdrop-blur-md overflow-y-auto custom-scrollbar flex flex-col gap-3`}>
                                <AnimatePresence mode="popLayout">
                                    {filteredPosts.filter(p => p.status === col.id).map((post) => (
                                        <motion.div 
                                            layout draggable onDragStart={() => setDraggedItem(post.id)} key={post.id}
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                            whileHover={{ y: -2 }}
                                            onClick={() => setPreviewPost(post)}
                                            className={`p-4 rounded-xl ${cardBg} border ${isLight ? 'border-slate-200' : 'border-white/10'} shadow-sm cursor-grab active:cursor-grabbing group/card relative transition-all hover:shadow-md`}
                                        >
                                            <div className="flex justify-between items-start mb-3 relative z-10">
                                                <PlatformBadge platform={post.platform} isLight={isLight} />
                                                <div className="flex gap-1">
                                                    <button onClick={(e) => { e.stopPropagation(); setPosts(posts.filter(p => p.id !== post.id)) }} className={`p-1 rounded ${isLight ? 'hover:bg-slate-100 text-slate-400' : 'hover:bg-white/10 text-slate-500'} hover:text-red-400`}><Trash2 size={14}/></button>
                                                </div>
                                            </div>
                                            <h4 className={`text-[13px] font-bold ${textPrimary} leading-snug mb-4 group-hover/card:text-${activeTheme.primary}-500 transition-colors relative z-10`}>{post.title}</h4>
                                            
                                            <div className={`flex items-center justify-between pt-3 border-t ${isLight ? 'border-slate-100' : 'border-white/5'} relative z-10`}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${post.viralScore > 90 ? 'bg-emerald-500/10 text-emerald-500' : isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/5 text-slate-500'}`}>
                                                        <Zap size={10}/> {post.viralScore}
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full bg-${activeTheme.primary}-500 text-[8px] font-bold flex items-center justify-center text-white border ${isLight ? 'border-white' : 'border-black'}`}>{post.assignee[0]}</div>
                                                </div>
                                                <div className={`flex items-center gap-1.5 text-[10px] font-mono ${textSecondary}`}>
                                                    <Clock size={10}/> {post.date.split('-').slice(1).join('/')}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                
                // --- CALENDAR VIEW (Fixed Scrollable Layout) ---
                <div className={`${cardBg} rounded-[24px] border ${isLight ? 'border-slate-200' : 'border-white/5'} p-4 lg:p-6 backdrop-blur-md h-full flex flex-col overflow-hidden`}>
                    
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4 lg:mb-6 px-2 shrink-0">
                        <div className="flex items-center gap-4">
                            <h2 className={`text-xl lg:text-2xl font-black ${textPrimary} italic`}>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                            <div className="flex gap-1">
                                <button onClick={() => changeMonth(-1)} className={`p-2 rounded-lg ${textSecondary} hover:${textPrimary} ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'} transition-colors`}><ChevronLeft size={16}/></button>
                                <button onClick={() => changeMonth(1)} className={`p-2 rounded-lg ${textSecondary} hover:${textPrimary} ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/10'} transition-colors`}><ChevronRight size={16}/></button>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Grid Container */}
                    <div className={`flex-1 ${isLight ? 'bg-white border-slate-200' : 'bg-[#0B0F19] border-white/10'} rounded-2xl border overflow-auto custom-scrollbar`}>
                        {/* Minimum width to prevent squishing on mobile */}
                        <div className="min-w-[600px] min-h-[600px] h-full flex flex-col">
                            
                            {/* Days Header */}
                            <div className={`grid grid-cols-7 border-b ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-white/[0.02]'} shrink-0`}>
                                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                                    <div key={d} className={`p-3 text-[10px] font-black ${textSecondary} text-center tracking-widest`}>{d}</div>
                                ))}
                            </div>

                            {/* Date Cells Grid */}
                            <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                                {Array.from({ length: firstDayIndex }).map((_, i) => (
                                    <div key={`empty-${i}`} className={`border-r border-b ${isLight ? 'border-slate-100 bg-slate-50/50' : 'border-white/5 bg-white/[0.01]'}`} />
                                ))}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                    const dayPosts = filteredPosts.filter(p => p.date === dateStr);
                                    
                                    return (
                                        <div 
                                            key={day} 
                                            className={`border-r border-b ${isLight ? 'border-slate-100 hover:bg-slate-50' : 'border-white/5 hover:bg-white/[0.03]'} p-2 relative group transition-colors min-h-[100px] flex flex-col`} 
                                            onClick={() => openAddModal(dateStr)}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`text-[10px] lg:text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${textSecondary} group-hover:${textPrimary}`}>{day}</span>
                                                <button className={`opacity-0 group-hover:opacity-100 p-1 rounded ${textSecondary} hover:${textPrimary} transition-all`}><Plus size={10}/></button>
                                            </div>
                                            
                                            <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar max-h-[80px]">
                                                {dayPosts.map(post => (
                                                    <div 
                                                        key={post.id} 
                                                        onClick={(e) => { e.stopPropagation(); setPreviewPost(post); }} 
                                                        className={`text-[9px] font-bold px-1.5 py-1 rounded border flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity truncate ${post.platform === 'twitter' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-white/5 text-slate-300 border-white/10'}`}
                                                    >
                                                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${post.status === 'scheduled' ? 'bg-emerald-500' : 'bg-slate-400'}`}/>
                                                        <span className="truncate">{post.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* --- PREVIEW MODAL --- */}
        <AnimatePresence>
            {previewPost && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`${modalBg} rounded-[32px] overflow-hidden max-w-md w-full relative shadow-2xl`}>
                        <div className={`p-6 border-b ${isLight ? 'border-slate-100' : 'border-white/5'} flex justify-between items-center`}>
                            <h3 className={`font-bold ${textPrimary}`}>Post Preview</h3>
                            <button onClick={() => setPreviewPost(null)}><X size={20} className={`${textSecondary} hover:${textPrimary}`}/></button>
                        </div>
                        <div className={`p-8 ${isLight ? 'bg-slate-50' : 'bg-black'}`}>
                            <div className="flex gap-3 mb-4">
                                <div className={`w-10 h-10 rounded-full ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}/>
                                <div><div className={`w-24 h-3 rounded mb-1 ${isLight ? 'bg-slate-300' : 'bg-slate-700'}`}/><div className={`w-12 h-2 rounded ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}/></div>
                            </div>
                            <p className={`text-sm whitespace-pre-wrap leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{previewPost.content}</p>
                            {previewPost.type === 'image' && <div className={`mt-4 w-full h-48 rounded-xl flex items-center justify-center ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}><ImageIcon className={textSecondary}/></div>}
                            <div className={`flex justify-between mt-6 pt-4 border-t ${isLight ? 'border-slate-200 text-slate-400' : 'border-slate-800 text-slate-500'}`}>
                                <Heart size={16}/> <MessageCircle size={16}/> <Share2 size={16}/>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* --- ADD TASK MODAL --- */}
        <AnimatePresence>
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
                    <motion.form 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        onSubmit={handleAddPost}
                        className={`relative w-full max-w-[450px] ${modalBg} p-8 lg:p-10 rounded-[40px] shadow-2xl overflow-hidden`}
                    >
                        <button type="button" onClick={() => setIsAdding(false)} className={`absolute top-8 right-8 ${textSecondary} hover:${textPrimary}`}><X size={20}/></button>
                        <h3 className={`text-2xl font-black ${textPrimary} italic tracking-tighter uppercase mb-6`}>NEW_LOG_ENTRY</h3>
                        <div className="space-y-6">
                            <div className="space-y-2"><label className={`text-[10px] font-black ${textSecondary} uppercase tracking-widest`}>Title</label><input name="title" required className={`w-full ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'} border rounded-2xl p-4 outline-none focus:border-${activeTheme.primary}-500/50 transition-all font-medium text-sm`} placeholder="Post Title..." /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2"><label className={`text-[10px] font-black ${textSecondary} uppercase tracking-widest`}>Platform</label><select name="platform" className={`w-full ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'} border rounded-2xl p-4 text-sm outline-none`}><option value="twitter">Twitter</option><option value="instagram">Instagram</option><option value="linkedin">LinkedIn</option></select></div>
                                <div className="space-y-2"><label className={`text-[10px] font-black ${textSecondary} uppercase tracking-widest`}>Priority</label><select name="priority" className={`w-full ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-white/5 border-white/10 text-white'} border rounded-2xl p-4 text-sm outline-none`}><option value="High">🔴 Critical</option><option value="Med">🟡 Standard</option><option value="Low">🔵 Low</option></select></div>
                            </div>
                        </div>
                        <button type="submit" className={`w-full mt-10 bg-${activeTheme.primary}-500 text-white font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg text-xs tracking-widest`}>INITIALIZE TASK</button>
                    </motion.form>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

const PlatformBadge = ({ platform, isLight }) => {
    const config = {
        twitter: { color: 'text-blue-400', icon: <Twitter size={12}/> },
        instagram: { color: 'text-pink-400', icon: <Instagram size={12}/> },
        linkedin: { color: 'text-blue-600', icon: <Linkedin size={12}/> },
        youtube: { color: 'text-red-500', icon: <Youtube size={12}/> },
    };
    const style = config[platform?.toLowerCase()] || config.twitter;
    return <span className={`text-[9px] font-bold px-2 py-1 rounded ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'} border flex items-center gap-1.5 uppercase ${style.color}`}>{style.icon} {platform}</span>;
};

export default SocialGrid;