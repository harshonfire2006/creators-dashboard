import React, { useState, useEffect } from 'react';
import { X, Wand2, Copy, Check, Sparkles, Edit3, History, Layers, Zap, Save, Instagram, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // <--- IMPORT THEME

const CreatePostModal = ({ isOpen, onClose, initialMode = 'text', initialPrompt = '' }) => {
  const { activeTheme } = useTheme(); // <--- THEME HOOK
  const isLight = activeTheme.textColor === 'text-slate-900';

  const [platform, setPlatform] = useState('instagram');
  const [text, setText] = useState('');
  const [vibe, setVibe] = useState('creative');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const [activeView, setActiveView] = useState('editor');

  // Sync prop changes
  useEffect(() => {
    if (isOpen) {
        setMode(initialMode);
        setText(initialPrompt || ''); 
    }
  }, [isOpen, initialMode, initialPrompt]);

  const vibes = [
    { id: 'creative', label: 'CREATIVE', icon: '🎨' },
    { id: 'professional', label: 'PRO', icon: '👔' },
    { id: 'funny', label: 'FUNNY', icon: '🤣' },
    { id: 'cyberpunk', label: 'CYBER', icon: '⚡' },
  ];

  const handleAiGenerate = async (targetMode = mode) => {
    if (!text) { alert("Input required."); return; }
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, mode: targetMode, vibe, platform }),
      });
      const data = await response.json();
      if (data.result) setText(data.result);
    } catch (error) {
      console.error("Error:", error);
      setText("CRITICAL_ERROR: Neural link severed. Is the server running?");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamic UI Text
  const getModalTitle = () => {
    switch(mode) {
        case 'script': return "VIDEO_SCRIPT_ENGINE";
        case 'image': return "AI_ART_STUDIO";
        case 'hashtags': return "HASHTAG_VAULT";
        case 'thread': return "THREAD_REPURPOSER";
        default: return "NEURAL_EDITOR";
    }
  };

  const getPlaceholder = () => {
    switch(mode) {
        case 'script': return "Describe the video concept (e.g. 'A 60s tech review')...";
        case 'image': return "Describe the image vision...";
        case 'hashtags': return "Enter topic for SEO tags...";
        case 'thread': return "Paste content to repurpose...";
        default: return "Describe your vision or paste a trend...";
    }
  };

  // --- DYNAMIC STYLES ---
  const modalBg = isLight ? 'bg-white' : 'bg-[#0B0F19] border border-white/10';
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';
  const editorBg = isLight ? 'bg-slate-50 border-r border-slate-200' : 'bg-black/40 border-r border-white/5';
  const previewBg = isLight ? 'bg-white' : 'bg-black/20';
  const inputBg = isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-white/5 border-white/10 text-cyan-50';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 font-sans">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* MAIN CONTAINER: Responsive Flex Direction */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        className={`relative w-full h-full sm:h-auto sm:max-h-[90vh] max-w-6xl ${modalBg} rounded-none sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:h-[700px]`}
      >
        
        {/* CLOSE BUTTON (Mobile optimized placement) */}
        <button onClick={onClose} className={`absolute top-4 right-4 z-50 p-2 rounded-full ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-black/50 text-white'} hover:rotate-90 transition-transform`}>
            <X size={20}/>
        </button>

        {/* --- LEFT: EDITOR --- */}
        <div className={`w-full lg:w-1/2 p-6 lg:p-10 flex flex-col ${editorBg} h-1/2 lg:h-full`}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${activeTheme.primary}-500/10`}><Zap className={`text-${activeTheme.primary}-500`} size={20}/></div>
                    <h2 className={`text-lg lg:text-xl font-black italic ${textPrimary} uppercase tracking-tighter`}>{getModalTitle()}</h2>
                </div>
                {(mode === 'text' || mode === 'thread') && (
                    <div className={`hidden sm:flex p-1 rounded-xl border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/60 border-white/10'}`}>
                        <button onClick={() => setPlatform('instagram')} className={`p-2 lg:p-3 rounded-lg transition-all ${platform === 'instagram' ? (isLight ? 'bg-white shadow-sm' : 'bg-white/10 text-white') : 'text-slate-500'}`}><Instagram size={18}/></button>
                        <button onClick={() => setPlatform('twitter')} className={`p-2 lg:p-3 rounded-lg transition-all ${platform === 'twitter' ? (isLight ? 'bg-white shadow-sm' : 'bg-white text-black') : 'text-slate-500'}`}><Twitter size={18}/></button>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="flex-1 relative mb-6">
                <textarea 
                    value={text} onChange={(e) => setText(e.target.value)}
                    placeholder={getPlaceholder()} 
                    className={`w-full h-full rounded-2xl p-6 outline-none font-mono focus:border-${activeTheme.primary}-500/50 transition-all resize-none placeholder:text-slate-400 text-sm lg:text-base border ${inputBg}`}
                />
                <button 
                    onClick={() => handleAiGenerate('enhance')}
                    className={`absolute bottom-4 right-4 p-2 lg:p-3 bg-${activeTheme.primary}-500/10 hover:bg-${activeTheme.primary}-500/20 text-${activeTheme.primary}-500 rounded-xl border border-${activeTheme.primary}-500/20 flex items-center gap-2 text-[10px] lg:text-xs font-black transition-all`}
                >
                    <Sparkles size={14}/> MAGIC_ENHANCE
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1">
                    {vibes.map((v) => (
                        <button key={v.id} onClick={() => setVibe(v.id)} className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${vibe === v.id ? `bg-${activeTheme.primary}-500 text-white border-${activeTheme.primary}-500` : `text-slate-500 ${isLight ? 'border-slate-200' : 'border-white/10'} hover:opacity-80`}`}>{v.label}</button>
                    ))}
                </div>
                <button onClick={() => handleAiGenerate()} disabled={isGenerating} className={`w-full sm:w-auto px-8 py-3 lg:py-4 bg-${activeTheme.primary}-500 text-white rounded-xl font-black text-sm hover:scale-105 active:scale-95 shadow-lg shadow-${activeTheme.primary}-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-3`}>
                    <Wand2 size={18} className={isGenerating ? "animate-spin" : ""}/> {isGenerating ? "TUNING..." : "ACTIVATE"}
                </button>
            </div>
        </div>

        {/* --- RIGHT: PREVIEW (Stacked on mobile) --- */}
        <div className={`w-full lg:w-1/2 flex flex-col ${previewBg} h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
            <div className={`flex border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                <TabButton active={activeView === 'editor'} onClick={() => setActiveView('editor')} icon={<Edit3 size={16}/>} label="EDITOR" themeColor={activeTheme.primary} isLight={isLight} />
                <TabButton active={activeView === 'variations'} onClick={() => setActiveView('variations')} icon={<Layers size={16}/>} label="VARIATIONS" themeColor={activeTheme.primary} isLight={isLight} />
                <TabButton active={activeView === 'history'} onClick={() => setActiveView('history')} icon={<History size={16}/>} label="HISTORY" themeColor={activeTheme.primary} isLight={isLight} />
            </div>

            <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div key={activeView} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full">
                        {text ? (
                            <div className="relative group h-full">
                                <div className="absolute -top-2 -right-2 flex gap-2 z-10">
                                    <button onClick={handleCopy} className={`p-2 lg:p-3 rounded-xl border transition-all ${isLight ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900' : 'bg-[#1a1f2e] border-white/10 text-slate-400 hover:text-white'}`}>
                                        {copied ? <Check size={18} className="text-emerald-400"/> : <Copy size={18}/>}
                                    </button>
                                    <button className={`p-2 lg:p-3 rounded-xl border transition-all ${isLight ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900' : 'bg-[#1a1f2e] border-white/10 text-slate-400 hover:text-white'}`}><Save size={18}/></button>
                                </div>
                                <div className={`rounded-3xl p-6 lg:p-8 h-full font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-auto custom-scrollbar border ${isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#1a1f2e]/50 border-white/5 text-slate-300'}`}>
                                    {text}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-40">
                                <p className="mt-4 font-black italic tracking-widest text-xs lg:text-sm">AWAITING_NEURAL_DATA</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
        
      </motion.div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label, themeColor, isLight }) => (
    <button onClick={onClick} className={`flex-1 py-4 lg:py-6 flex items-center justify-center gap-2 lg:gap-3 border-b-2 transition-all ${active ? `border-${themeColor}-500 bg-${themeColor}-500/5 ${isLight ? `text-${themeColor}-600` : 'text-white'}` : `border-transparent ${isLight ? 'text-slate-400 hover:text-slate-600' : 'text-slate-500 hover:text-slate-300'}`}`}>
        {icon} <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
    </button>
)

export default CreatePostModal;