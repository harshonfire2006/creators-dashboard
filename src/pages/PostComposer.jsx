import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { 
  Twitter, Instagram, Linkedin, Youtube, 
  Calendar, Send, Sparkles, Image as ImageIcon, 
  Hash, Globe, Monitor, CheckCircle2, X,
  MoreHorizontal, Zap, ChevronDown,
  Link as LinkIcon, Save, Archive, RefreshCw,
  Languages, Split, ScanFace, Tag, AlertTriangle,
  MapPin, UserPlus, MessageCircle, Heart, Share2, Bookmark,
  Repeat, BarChart2, ThumbsUp, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext'; // <--- IMPORT THEME CONTEXT

const PostComposer = () => {
  const { activeTheme } = useTheme(); // <--- Get Theme Colors
  const isLight = activeTheme.textColor === 'text-slate-900';

  // --- CORE STATE ---
  const [activeVariant, setActiveVariant] = useState('A');
  const [content, setContent] = useState({
      A: { text: '', media: null },
      B: { text: '', media: null }
  });
  const [platforms, setPlatforms] = useState(['twitter', 'instagram']); 
  const [activePreview, setActivePreview] = useState('instagram'); 
  const [schedule, setSchedule] = useState({ type: 'now', date: '', time: '' });
  const [isPosting, setIsPosting] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  
  // --- AUTH STATE (LinkedIn) ---
  const [searchParams] = useSearchParams();
  const [linkedInAuth, setLinkedInAuth] = useState({ token: null, urn: null });

  useEffect(() => {
      const token = searchParams.get('token');
      const urn = searchParams.get('urn');
      if (token && urn) {
          setLinkedInAuth({ token, urn });
          window.history.replaceState({}, document.title, "/compose");
          alert("✅ LinkedIn Connected Successfully!");
      }
  }, [searchParams]);

  const connectLinkedIn = () => {
      window.location.href = 'http://localhost:5000/auth/linkedin';
  };

  // --- OLD FEATURES STATE ---
  const [linkUrl, setLinkUrl] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [viralScore, setViralScore] = useState(0);
  const [showDrafts, setShowDrafts] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [drafts, setDrafts] = useState([
      { id: 1, text: "Launching the new API tomorrow! 🚀", date: "2 days ago" },
  ]);
  const [isRewriting, setIsRewriting] = useState(false);

  // --- NEW PRO FEATURES STATE ---
  const [location, setLocation] = useState('');
  const [firstComment, setFirstComment] = useState('');
  const [audience, setAudience] = useState('Public'); 
  const [utmSource, setUtmSource] = useState('');

  // Mock Data for Radar Chart
  const [sentimentData, setSentimentData] = useState([
    { subject: 'Joy', A: 0, fullMark: 100 },
    { subject: 'Trust', A: 0, fullMark: 100 },
    { subject: 'Urgency', A: 0, fullMark: 100 },
    { subject: 'Logic', A: 0, fullMark: 100 },
    { subject: 'Hype', A: 0, fullMark: 100 },
  ]);

  // --- LOGIC ---
  const currentText = content[activeVariant].text;
  const currentMedia = content[activeVariant].media;
  const charLimit = activePreview === 'twitter' ? 280 : 2200;
  const charCount = currentText.length;
  const isOverLimit = charCount > charLimit;

  // Helpers
  const updateText = (newText) => setContent(prev => ({ ...prev, [activeVariant]: { ...prev[activeVariant], text: newText } }));
  const updateMedia = (newMedia) => setContent(prev => ({ ...prev, [activeVariant]: { ...prev[activeVariant], media: newMedia } }));

  // EFFECT: Analyze Content
  useEffect(() => {
    let score = 0;
    if (currentText.length > 20) score += 20;
    if (currentText.includes('#')) score += 15;
    if (currentMedia) score += 30;
    setViralScore(Math.min(score + Math.floor(Math.random() * 10), 100));

    const len = currentText.length;
    setSentimentData([
        { subject: 'Joy', A: len > 10 ? 60 + (len % 30) : 20, fullMark: 100 },
        { subject: 'Trust', A: len > 30 ? 80 : 40, fullMark: 100 },
        { subject: 'Urgency', A: currentText.includes('!') ? 90 : 30, fullMark: 100 },
        { subject: 'Logic', A: len > 50 ? 75 : 30, fullMark: 100 },
        { subject: 'Hype', A: currentText.includes('🚀') ? 95 : 20, fullMark: 100 },
    ]);
    
    const words = currentText.split(' ').filter(w => w.length > 5);
    setKeywords(words.slice(0, 5));
  }, [currentText, currentMedia]);

  // --- REAL AI FEATURES ---

  // 1. Translate
  const handleTranslate = async (langCode) => {
      if (!currentText) return alert("Please write some text first.");
      setIsProcessing(true);
      try {
          const response = await fetch('http://localhost:5000/api/ai/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: `Translate this to ${langCode}: ${currentText}`, mode: 'translate' }),
          });
          const data = await response.json();
          if (data.result) updateText(data.result);
      } catch (error) { console.error(error); alert("AI Server Error (Is Backend Running?)"); } 
      finally { setIsProcessing(false); }
  };

  // 2. Rewrite
  const handleRewrite = async (tone) => {
      if (!currentText) return alert("Write something first!");
      setIsRewriting(true);
      try {
          const response = await fetch('http://localhost:5000/api/ai/generate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                  prompt: `Rewrite this post in a ${tone} tone: ${currentText}`,
                  mode: 'rewrite'
              })
          });
          const data = await response.json();
          if (data.result) updateText(data.result);
      } catch (error) {
          console.error(error);
          alert("AI Rewrite Failed (Check Backend Console)");
      } finally {
          setIsRewriting(false);
      }
  };

  // Feature: Link Shortener
  const handleShortenLink = () => {
      if (!linkUrl) return;
      setShortLink(`dino.li/${Math.random().toString(36).substring(7)}`);
      setLinkUrl('');
  };

  // Feature: AI Image
  const handleGenerateImage = () => {
      setIsProcessing(true);
      setTimeout(() => {
          updateMedia('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop');
          setIsProcessing(false);
      }, 1500);
  };

  // Feature: Copy Variant
  const copyVariant = () => {
      const other = activeVariant === 'A' ? 'B' : 'A';
      setContent(prev => ({ ...prev, [other]: { ...prev[activeVariant] } }));
      setActiveVariant(other);
  };

  // --- POSTING LOGIC ---
  const handlePost = async () => {
    setIsPosting(true);

    // LinkedIn Real Integration
    if (activePreview === 'linkedin') {
        if (!linkedInAuth.token) {
            setIsPosting(false);
            return alert("⚠️ Please connect LinkedIn first via the button below.");
        }
        try {
            const response = await fetch('http://localhost:5000/api/linkedin/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: currentText,
                    accessToken: linkedInAuth.token,
                    userUrn: linkedInAuth.urn
                })
            });
            const data = await response.json();
            if (data.success) alert("✅ Posted to LinkedIn Successfully!");
            else alert("❌ Error: " + JSON.stringify(data));
        } catch (error) {
            console.error(error);
            alert("Server Connection Error");
        } finally {
            setIsPosting(false);
        }
        return;
    }

    // Twitter Simulation
    setTimeout(() => { setIsPosting(false); alert(`🚀 Simulation: Broadcasting to ${activePreview.toUpperCase()}.`); }, 2500);
  };

  const togglePlatform = (p) => {
    if (platforms.includes(p)) {
        const newPlats = platforms.filter(plat => plat !== p);
        setPlatforms(newPlats);
        if (activePreview === p && newPlats.length > 0) setActivePreview(newPlats[0]);
    } else {
        setPlatforms([...platforms, p]);
        setActivePreview(p);
    }
  };

  // --- DYNAMIC STYLES ---
  const cardBg = isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10';
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';
  const inputBg = isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-white/5 border-white/10 text-white';

  return (
    <div className="h-full flex flex-col xl:flex-row gap-6 lg:gap-8 pb-6 relative overflow-hidden">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

        {/* --- LEFT: COMMAND CENTER --- */}
        <div className="flex-1 flex flex-col gap-6 h-full overflow-y-auto no-scrollbar pr-2 relative w-full">
            
            {/* 1. DASHBOARD HEADER */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`md:col-span-2 ${cardBg} border p-6 rounded-[32px] backdrop-blur-md flex flex-col justify-between`}>
                    <div>
                        <h1 className={`text-2xl font-black ${textPrimary} italic tracking-tighter uppercase mb-2`}>OMNI_BROADCAST_V5</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold flex items-center gap-1"><Zap size={10}/> SYSTEM ONLINE</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['twitter', 'instagram', 'linkedin', 'youtube'].map(p => (
                            <button key={p} onClick={() => togglePlatform(p)} className={`group relative h-10 px-4 rounded-xl border transition-all duration-300 flex items-center gap-2 overflow-hidden ${platforms.includes(p) ? `bg-${activeTheme.primary}-500/10 border-${activeTheme.primary}-500 ${isLight ? 'text-black' : 'text-white'} shadow-md` : `${inputBg} hover:border-${activeTheme.primary}-500/50`}`}>
                                {p === 'twitter' && <Twitter size={14}/>}{p === 'instagram' && <Instagram size={14}/>}{p === 'linkedin' && <Linkedin size={14}/>}{p === 'youtube' && <Youtube size={14}/>}
                                <span className="font-bold uppercase tracking-wider text-[10px]">{p}</span>
                            </button>
                        ))}
                    </div>
                    
                    {/* AUTH STATUS */}
                    <div className={`mt-4 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                        {!linkedInAuth.token ? (
                             <button onClick={connectLinkedIn} className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/30 transition-all">
                                 <Linkedin size={12}/> Connect LinkedIn
                             </button>
                        ) : (
                             <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30 inline-flex items-center gap-2">
                                 <CheckCircle2 size={10}/> LinkedIn Connected
                             </div>
                        )}
                    </div>
                </div>

                {/* Viral Score */}
                <div className={`${cardBg} border p-4 rounded-[32px] backdrop-blur-md relative flex items-center gap-2`}>
                    <div className={`flex-1 flex flex-col items-center justify-center border-r ${isLight ? 'border-slate-200' : 'border-white/5'} pr-2`}>
                        <div className={`relative w-16 h-16 rounded-full border-4 ${isLight ? 'border-slate-100' : 'border-white/5'} flex items-center justify-center mb-1`}>
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36"><path className={`${viralScore > 80 ? 'text-emerald-500' : viralScore > 50 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000`} strokeDasharray={`${viralScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"/></svg>
                            <span className={`text-sm font-black ${textPrimary}`}>{viralScore}</span>
                        </div>
                        <span className="text-[8px] uppercase text-slate-500 font-bold">Viral Score</span>
                    </div>
                    <div className="flex-1 h-24 w-24 relative">
                        <ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="80%" data={sentimentData}><PolarGrid stroke={isLight ? "#e2e8f0" : "#ffffff10"} /><PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 8 }} /><Radar name="Sentiment" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} /></RadarChart></ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 2. EDITOR CORE (FIXED WRITING SPACE) */}
            <div className={`flex-1 ${cardBg} border rounded-[32px] flex flex-col relative focus-within:border-${activeTheme.primary}-500/30 transition-colors overflow-hidden min-h-[500px]`}>
                <div className={`flex border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                    <button onClick={() => setActiveVariant('A')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeVariant === 'A' ? `bg-${activeTheme.primary}-500/10 text-${activeTheme.primary}-500 border-b-2 border-${activeTheme.primary}-500` : `${textSecondary} hover:${textPrimary} hover:bg-white/5`}`}>Variant A</button>
                    <button onClick={() => setActiveVariant('B')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${activeVariant === 'B' ? 'bg-purple-500/10 text-purple-500 border-b-2 border-purple-500' : `${textSecondary} hover:${textPrimary} hover:bg-white/5`}`}>Variant B</button>
                    <button onClick={copyVariant} className={`px-4 border-l ${isLight ? 'border-slate-200' : 'border-white/5'} text-slate-500`} title="Copy Content"><Split size={14}/></button>
                </div>

                <div className={`flex items-center justify-between px-6 py-4 border-b ${isLight ? 'border-slate-200 bg-slate-50/50' : 'border-white/5 bg-white/[0.01]'}`}>
                    <div className="flex gap-2">
                        {/* Translate */}
                        <div className="relative" onMouseEnter={() => setIsTranslateOpen(true)} onMouseLeave={() => setIsTranslateOpen(false)}>
                            <button className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-2 ${isTranslateOpen ? 'bg-white text-black shadow-lg' : `${inputBg} hover:bg-${activeTheme.primary}-500/10 hover:text-${activeTheme.primary}-500`}`}><Languages size={12}/> Translate</button>
                            <AnimatePresence>{isTranslateOpen && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute top-full left-0 mt-1 w-32 ${isLight ? 'bg-white border-slate-200 text-black' : 'bg-[#0F131F] border-white/20'} border rounded-xl shadow-2xl overflow-hidden z-[100] py-1`}>{['ES', 'HI', 'FR', 'DE', 'JA'].map(l => (<button key={l} onClick={() => { handleTranslate(l); setIsTranslateOpen(false); }} className={`w-full text-left px-4 py-2.5 text-[10px] font-bold ${textSecondary} hover:bg-${activeTheme.primary}-500/20 hover:text-${activeTheme.primary}-500 transition-colors`}>{l}</button>))}</motion.div>)}</AnimatePresence>
                        </div>
                        {['Hype', 'Pro', 'Story'].map(tone => (
                            <button key={tone} onClick={() => handleRewrite(tone)} disabled={isRewriting} className={`px-3 py-1.5 rounded-lg ${inputBg} hover:bg-${activeTheme.primary}-500/10 hover:text-${activeTheme.primary}-500 text-[10px] font-bold transition-all`}>
                                {isRewriting ? <RefreshCw size={10} className="animate-spin"/> : tone}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                         {isProcessing && <div className={`text-[10px] font-mono text-${activeTheme.primary}-500 animate-pulse`}>AI PROCESSING...</div>}
                         <span className={`text-xs font-mono font-bold ${isOverLimit ? 'text-red-500' : textSecondary}`}>{charCount} / {charLimit}</span>
                    </div>
                </div>

                {/* --- SCROLLABLE CONTENT AREA START --- */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                    <textarea 
                        value={currentText} 
                        onChange={(e) => updateText(e.target.value)} 
                        placeholder={`Compose ${activeVariant} content...`} 
                        className={`w-full min-h-[350px] bg-transparent text-lg ${textPrimary} p-6 placeholder:text-slate-500 outline-none resize-none font-medium leading-relaxed border-none focus:ring-0`}
                    />
                    
                    {shortLink && (
                        <div className="mx-6 mb-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex justify-between items-center">
                            <span className="text-xs text-emerald-500 font-mono flex items-center gap-2"><LinkIcon size={12}/> {shortLink}</span>
                            <button onClick={() => {updateText(currentText + " " + shortLink); setShortLink('')}} className="text-[10px] font-bold text-white bg-emerald-500 px-2 py-1 rounded hover:bg-emerald-600 transition-all">INSERT</button>
                        </div>
                    )}

                    {/* PRO FEATURES GRID */}
                    <div className={`px-6 pb-6 grid grid-cols-2 gap-4 border-t ${isLight ? 'border-slate-200' : 'border-white/5'} pt-6`}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><MapPin size={10}/> Location</label>
                            <input value={location} onChange={(e) => setLocation(e.target.value)} className={`w-full ${inputBg} rounded-lg px-3 py-2 text-xs outline-none focus:border-${activeTheme.primary}-500/50`} placeholder="Add location tag..."/>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><MessageCircle size={10}/> First Comment</label>
                            <input value={firstComment} onChange={(e) => setFirstComment(e.target.value)} className={`w-full ${inputBg} rounded-lg px-3 py-2 text-xs outline-none focus:border-${activeTheme.primary}-500/50`} placeholder="Hashtags to hide..."/>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><UserPlus size={10}/> Audience</label>
                            <select value={audience} onChange={(e) => setAudience(e.target.value)} className={`w-full ${inputBg} rounded-lg px-3 py-2 text-xs outline-none focus:border-${activeTheme.primary}-500/50`}>
                                <option>Public</option><option>Connections Only</option><option>Close Friends</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><LinkIcon size={10}/> UTM Source</label>
                            <input value={utmSource} onChange={(e) => setUtmSource(e.target.value)} className={`w-full ${inputBg} rounded-lg px-3 py-2 text-xs outline-none focus:border-${activeTheme.primary}-500/50`} placeholder="e.g. campaign_v1"/>
                        </div>
                    </div>
                </div>
                {/* --- SCROLLABLE CONTENT AREA END --- */}

                {/* Footer Tools */}
                <div className={`p-4 border-t ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/5 bg-white/[0.02]'} rounded-b-[32px] flex items-center justify-between z-10`}>
                    <div className="flex items-center gap-2">
                        <button onClick={() => updateMedia('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')} className={`p-2 hover:bg-white/10 rounded-lg ${textSecondary} hover:text-${activeTheme.primary}-500 transition-colors`}><ImageIcon size={18}/></button>
                        <button onClick={handleGenerateImage} className={`p-2 hover:bg-white/10 rounded-lg ${textSecondary} hover:text-${activeTheme.primary}-500 transition-colors`}><ScanFace size={18}/></button>
                        
                        <div className="relative group/link">
                             <div className={`flex items-center ${isLight ? 'bg-slate-200' : 'bg-black'} border ${isLight ? 'border-slate-300' : 'border-white/10'} rounded-lg pl-2 overflow-hidden transition-all w-8 focus-within:w-48 group-hover/link:w-48`}>
                                <LinkIcon size={14} className="text-slate-500 shrink-0"/>
                                <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="Paste URL..." className={`bg-transparent border-none text-[10px] ${textPrimary} p-2 w-full outline-none`}/>
                                <button onClick={handleShortenLink} className={`p-2 hover:bg-white/10 text-${activeTheme.primary}-500`}><CheckCircle2 size={12}/></button>
                             </div>
                        </div>

                        <button onClick={() => setShowDrafts(!showDrafts)} className={`p-2 rounded-lg transition-colors ${showDrafts ? 'bg-purple-500 text-white' : `${textSecondary} hover:text-purple-500`}`}><Archive size={18}/></button>
                    </div>
                    <button onClick={() => { if(!currentText) return; setDrafts([...drafts, { id: Date.now(), text: currentText, date: "Just now" }]); updateText(''); alert("Draft Saved"); }} className={`flex items-center gap-2 text-[10px] font-bold ${textSecondary} hover:${textPrimary} transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5`}><Save size={14}/> SAVE DRAFT</button>
                </div>
            </div>

            {/* Launch Button */}
            <div className={`${cardBg} border p-4 rounded-[24px] flex flex-col md:flex-row items-center gap-4 justify-between relative z-20 shadow-sm`}>
                <div className="relative w-full md:w-auto">
                    <button onClick={() => setShowScheduler(!showScheduler)} className={`w-full md:w-auto flex items-center gap-3 px-6 py-4 rounded-xl border transition-all text-left min-w-[240px] ${schedule.type !== 'now' ? `bg-${activeTheme.primary}-500/10 border-${activeTheme.primary}-500/50` : `${inputBg} hover:border-${activeTheme.primary}-500/30`}`}>
                        <div className={`p-2 rounded-lg ${schedule.type !== 'now' ? `bg-${activeTheme.primary}-500 text-white` : `bg-white/10 text-slate-400`}`}>{schedule.type === 'ai' ? <Sparkles size={18}/> : <Calendar size={18}/>}</div>
                        <div><div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Launch Window</div><div className={`text-sm font-bold ${schedule.type !== 'now' ? `text-${activeTheme.primary}-500` : textPrimary}`}>{schedule.type === 'now' ? 'IMMEDIATE LAUNCH' : `${schedule.date} @ ${schedule.time}`}</div></div>
                        <ChevronDown size={16} className="ml-auto text-slate-500"/>
                    </button>
                    {/* Scheduler Popup */}
                    <AnimatePresence>
                        {showScheduler && (
                            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className={`absolute bottom-full left-0 mb-4 w-full md:w-[350px] ${isLight ? 'bg-white border-slate-200 shadow-xl' : 'bg-[#0F131F] border-white/20 shadow-2xl'} rounded-[24px] overflow-hidden p-6 z-50`}>
                                <div className="flex justify-between items-center mb-6"><h3 className={`text-sm font-black ${textPrimary} italic`}>FLIGHT_CONTROLS</h3><button onClick={() => setShowScheduler(false)}><X size={16} className="text-slate-500 hover:text-white"/></button></div>
                                <div className="space-y-4">
                                    <button onClick={() => {setSchedule({ type: 'ai', date: 'Tomorrow', time: '09:45 AM' }); setShowScheduler(false);}} className={`w-full p-4 rounded-xl ${isLight ? 'bg-slate-50' : 'bg-gradient-to-r from-purple-900/40 to-cyan-900/40'} border ${isLight ? 'border-slate-200' : 'border-white/10'} flex items-center gap-4 hover:border-${activeTheme.primary}-500/50 transition-all group`}>
                                        <div className={`p-2 rounded-lg text-${activeTheme.primary}-500 bg-${activeTheme.primary}-500/10 group-hover:scale-110 transition-transform`}><Sparkles size={18}/></div>
                                        <div className="text-left"><div className={`text-xs font-bold ${textPrimary}`}>AI Optimization</div><div className="text-[10px] text-slate-400">Best time for engagement</div></div>
                                    </button>
                                    <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}/>
                                    <div className="space-y-3">
                                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase">Target Date</label><input type="date" className={`w-full ${inputBg} rounded-lg p-2 text-xs outline-none focus:border-${activeTheme.primary}-500`}/></div>
                                        <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase">T-Minus (Time)</label><input type="time" className={`w-full ${inputBg} rounded-lg p-2 text-xs outline-none focus:border-${activeTheme.primary}-500`}/></div>
                                    </div>
                                    <button onClick={() => { setSchedule({ type: 'custom', date: 'Selected Date', time: 'Selected Time' }); setShowScheduler(false); }} className={`w-full py-3 ${isLight ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white/10 hover:bg-white/20 text-white'} rounded-xl text-xs font-bold mt-2`}>CONFIRM TRAJECTORY</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <button onClick={handlePost} disabled={isPosting || !currentText} className={`w-full md:flex-1 md:ml-4 h-12 md:h-full min-h-[50px] md:min-h-[60px] bg-${activeTheme.primary}-500 hover:bg-${activeTheme.primary}-600 text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-${activeTheme.primary}-500/20 disabled:opacity-50 group`}>
                    {isPosting ? <><div className="w-5 h-5 border-2 border-black/30 border-t-white rounded-full animate-spin"/><span>TRANSMITTING...</span></> : <><Send size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>{schedule.type === 'now' ? "EXECUTE LAUNCH" : "ARM SCHEDULE"}</>}
                </button>
            </div>
        </div>

        {/* --- RIGHT: REALISTIC LIVE PREVIEW (Hidden on small mobile) --- */}
        <div className="hidden lg:flex w-full xl:w-[420px] flex-col gap-6 h-full overflow-hidden">
            <div className="flex items-center justify-between px-2 pt-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Monitor size={14}/> Simulation</span>
                <div className="flex gap-2">
                    {platforms.map(p => (
                        <button key={p} onClick={() => setActivePreview(p)} className={`p-1.5 rounded-lg transition-all ${activePreview === p ? 'bg-white text-black' : 'bg-white/10 text-slate-500'}`}>
                            {p === 'twitter' && <Twitter size={14}/>}{p === 'instagram' && <Instagram size={14}/>}{p === 'linkedin' && <Linkedin size={14}/>}{p === 'youtube' && <Youtube size={14}/>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 bg-black border border-white/10 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col">
                <div className="h-10 w-full flex justify-between px-6 items-center z-20 bg-black/90 backdrop-blur">
                    <span className="text-xs font-bold text-white">9:41</span>
                    <div className="flex gap-1.5"><div className="w-4 h-4 rounded-full bg-white/10"/></div>
                </div>
                {/* PREVIEW CONTENT UNCHANGED - IT IS ALWAYS DARK MODE BY DESIGN (Like real apps) */}
                <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 bg-black">
                    {activePreview === 'twitter' && (
                        <div className="p-4 border-b border-white/10 font-sans">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">D</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-1"><span className="font-bold text-white text-[15px]">Dino AI</span><CheckCircle2 size={14} className="text-blue-400 fill-blue-400/10"/><span className="text-slate-500 text-[15px]">@dino_ai · 1m</span></div>
                                    <p className="text-[15px] text-white leading-normal mt-0.5 whitespace-pre-wrap">{currentText || "Writing tweet..."}</p>
                                    {currentMedia && <div className="mt-3 rounded-2xl overflow-hidden border border-white/10"><img src={currentMedia} className="w-full h-auto"/></div>}
                                    {location && <div className="mt-2 text-xs text-slate-500 flex items-center gap-1"><MapPin size={12}/> {location}</div>}
                                    <div className="flex justify-between items-center mt-3 max-w-[85%] text-slate-500"><MessageCircle size={18}/><Repeat size={18}/><Heart size={18}/><BarChart2 size={18}/><Share2 size={18}/></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activePreview === 'instagram' && (
                        <div className="bg-black text-white font-sans">
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]"><div className="w-full h-full bg-black rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold">D</div></div><div className="flex flex-col"><span className="text-sm font-semibold">dino.ai</span>{location && <span className="text-xs text-white">{location}</span>}</div></div><MoreHorizontal size={20}/>
                            </div>
                            <div className="aspect-square bg-slate-900 w-full overflow-hidden flex items-center justify-center border-y border-white/10">{currentMedia ? <img src={currentMedia} className="w-full h-full object-cover"/> : <div className="text-slate-600 text-xs">No Media Selected</div>}</div>
                            <div className="p-3"><div className="flex justify-between mb-3"><div className="flex gap-4"><Heart size={24}/><MessageCircle size={24}/><Send size={24}/></div><Bookmark size={24}/></div><div className="text-sm font-bold mb-1">1,204 likes</div><div className="text-sm"><span className="font-bold mr-2">dino.ai</span><span className="text-slate-200">{currentText || "Caption goes here..."}</span></div>{firstComment && <div className="text-xs text-slate-500 mt-1">View all 12 comments</div>}<div className="text-[10px] text-slate-500 uppercase mt-1">2 MINUTES AGO</div></div>
                        </div>
                    )}
                    {activePreview === 'linkedin' && (
                        <div className="bg-[#1b1f23] text-white font-sans pb-4">
                            <div className="p-3 flex gap-2"><div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">D</div><div className="flex-1"><div className="flex items-center gap-1"><span className="font-bold text-sm">Dino AI</span><span className="text-slate-400 text-xs">• 1st</span></div><div className="text-xs text-slate-400">Generative AI Infrastructure</div><div className="text-xs text-slate-400 flex items-center gap-1">1m • <Globe size={10}/></div></div><button className="text-blue-400 font-bold text-sm flex items-center gap-1"><UserPlus size={16}/> Follow</button></div>
                            <div className="px-3 pb-2 text-sm text-slate-200 whitespace-pre-wrap">{currentText || "Post content..."}</div>{currentMedia && <img src={currentMedia} className="w-full h-auto"/>}<div className="px-3 py-2 flex justify-between items-center border-t border-white/10 mt-2"><button className="flex items-center gap-1 text-slate-400 text-sm font-bold"><ThumbsUp size={18}/> Like</button><button className="flex items-center gap-1 text-slate-400 text-sm font-bold"><MessageCircle size={18}/> Comment</button><button className="flex items-center gap-1 text-slate-400 text-sm font-bold"><Repeat size={18}/> Repost</button><button className="flex items-center gap-1 text-slate-400 text-sm font-bold"><Send size={18}/> Send</button></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PostComposer;