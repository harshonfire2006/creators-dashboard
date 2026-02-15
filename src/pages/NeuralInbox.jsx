import React, { useState } from 'react';
import { 
  Twitter, Instagram, Youtube, MessageSquare, 
  CheckCircle2, Trash2, MoreHorizontal, 
  Search, RefreshCw, Sparkles, Send, X, Copy, 
  ThumbsUp, ThumbsDown, Star, ArrowUpRight,
  Filter, AlertTriangle, CornerDownRight, User, Reply
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; 

const NeuralInbox = () => {
  const { activeTheme } = useTheme();
  const isLight = activeTheme.textColor === 'text-slate-900';

  // State
  const [filter, setFilter] = useState('All');
  const [platform, setPlatform] = useState('All');
  const [selectedComments, setSelectedComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null); 
  const [replyText, setReplyText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTone, setGeneratedTone] = useState(null);

  // Mock Data
  const [comments, setComments] = useState([
    { id: 1, user: "@tech_wizard", platform: "twitter", text: "This AI tool is absolutely mind-blowing! 🤯 How did you build this?", sentiment: "Positive", score: 98, date: "2m", status: "unread", replies: [] },
    { id: 2, user: "design_queen", platform: "instagram", text: "The UI looks glitchy on mobile. Can you fix it?", sentiment: "Negative", score: 85, date: "15m", status: "unread", replies: [] },
    { id: 3, user: "CodeMaster99", platform: "youtube", text: "Does this support Gemini 2.0 Flash API? I need the low latency features.", sentiment: "Neutral", score: 50, date: "1h", status: "unread", replies: [] },
    { id: 4, user: "@startup_daily", platform: "twitter", text: "DM us for a collab! We love your work and want to feature it.", sentiment: "Positive", score: 92, date: "3h", status: "replied", replies: [{id: 999, text: "Thanks! I've sent you a DM.", date: "2h ago", user: "You"}] },
    { id: 5, user: "random_bot", platform: "instagram", text: "Buy followers cheap at fake-site.com", sentiment: "Spam", score: 99, date: "5h", status: "unread", replies: [] },
  ]);

  // --- ACTIONS ---
  const handleBulkAction = (action) => {
    if (action === 'delete') {
      setComments(comments.filter(c => !selectedComments.includes(c.id)));
    } else if (action === 'mark_read') {
      setComments(comments.map(c => selectedComments.includes(c.id) ? { ...c, status: 'read' } : c));
    }
    setSelectedComments([]);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      text: replyText,
      date: "Just now",
      user: "You"
    };

    setComments(comments.map(c => {
      if (c.id === replyingTo.id) {
        return { 
          ...c, 
          status: 'replied', 
          replies: [...(c.replies || []), newReply]
        };
      }
      return c;
    }));

    setReplyingTo(null);
    setReplyText('');
  };

  const generateReply = async (tone) => {
    setIsGenerating(true);
    setGeneratedTone(tone);
    setReplyText("Thinking..."); 

    try {
      const response = await fetch('http://localhost:5000/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: replyingTo.text, mode: 'rewrite', tone: tone }),
      });
      const data = await response.json();
      if (data.result) setReplyText(data.result);
      else setReplyText("Error generating text.");
    } catch (error) {
      console.error(error);
      setReplyText("System Offline.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredComments = comments.filter(c => {
    const matchesFilter = filter === 'All' || c.sentiment === filter;
    const matchesPlatform = platform === 'All' || c.platform === platform.toLowerCase();
    return matchesFilter && matchesPlatform;
  });

  // Styles
  const headerBg = isLight ? 'bg-white/95 border-slate-200' : 'bg-[#0B0F19]/95 border-white/10';
  const itemHover = isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.03]';
  const itemSelected = isLight ? 'bg-blue-50 border-blue-200' : 'bg-blue-500/10 border-blue-500/30';
  const textPrimary = isLight ? 'text-slate-900' : 'text-slate-200';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
        <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.2); border-radius: 2px; }`}</style>

        {/* --- FIXED HEADER --- */}
        <div className={`flex-none p-6 border-b ${headerBg} backdrop-blur-xl z-20 space-y-4`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white'}`}>
                        <MessageSquare size={18} />
                    </div>
                    <h2 className={`text-lg font-black ${textPrimary} italic tracking-tight`}>NEURAL_INBOX</h2>
                </div>
                <AnimatePresence>
                    {selectedComments.length > 0 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex gap-2">
                            <button onClick={() => handleBulkAction('mark_read')} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-[10px] font-bold hover:bg-emerald-500 hover:text-white transition-all"><CheckCircle2 size={14}/> MARK READ</button>
                            <button onClick={() => handleBulkAction('delete')} className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14}/> DELETE</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className={`flex p-1 rounded-lg border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/20 border-white/5'}`}>
                    {['All', 'Twitter', 'Instagram', 'YouTube'].map(p => (
                        <button key={p} onClick={() => setPlatform(p)} className={`px-4 py-1.5 rounded-md text-[11px] font-bold transition-all ${platform === p ? (isLight ? 'bg-white text-black shadow-sm' : 'bg-white/10 text-white shadow-sm') : (isLight ? 'text-slate-500 hover:text-slate-700' : 'text-slate-400 hover:text-white')}`}>{p}</button>
                    ))}
                </div>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full">
                    <Filter size={14} className={textSecondary} />
                    {['All', 'Positive', 'Negative', 'Spam'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all whitespace-nowrap ${filter === f ? (isLight ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-black border-white') : (isLight ? 'bg-white border-slate-200 text-slate-500 hover:border-slate-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20')}`}>{f}</button>
                    ))}
                </div>
            </div>
        </div>

        {/* --- DENSE LIST VIEW --- */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800'}`}>
                {filteredComments.map((comment) => (
                    <div 
                        key={comment.id}
                        className={`group relative flex flex-col p-3 transition-colors cursor-pointer border-l-4 ${selectedComments.includes(comment.id) ? itemSelected + ' border-l-blue-500' : `${itemHover} ${comment.status === 'unread' ? 'border-l-cyan-500 bg-cyan-500/5' : 'border-l-transparent'}`}`}
                        onClick={() => {
                            if (selectedComments.includes(comment.id)) setSelectedComments(selectedComments.filter(id => id !== comment.id));
                            else setSelectedComments([...selectedComments, comment.id]);
                        }}
                    >
                        {/* MAIN COMMENT ROW */}
                        <div className="flex items-start gap-3 w-full">
                            <div className={`mt-1 transition-all ${selectedComments.includes(comment.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedComments.includes(comment.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-400'}`}>
                                    <CheckCircle2 size={10}/>
                                </div>
                            </div>

                            <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs ${comment.platform === 'twitter' ? 'bg-black' : comment.platform === 'youtube' ? 'bg-red-600' : 'bg-pink-600'}`}>
                                {comment.platform === 'twitter' ? <Twitter size={14}/> : comment.platform === 'youtube' ? <Youtube size={14}/> : <Instagram size={14}/>}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold ${textPrimary}`}>{comment.user}</span>
                                        <span className="text-[10px] text-slate-500">{comment.date}</span>
                                        {comment.sentiment === 'Spam' && <span className="text-[8px] font-bold text-orange-500 bg-orange-500/10 px-1 rounded">SPAM</span>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${comment.sentiment === 'Positive' ? 'text-emerald-500 bg-emerald-500/10' : comment.sentiment === 'Negative' ? 'text-red-500 bg-red-500/10' : 'text-slate-500 bg-slate-500/10'}`}>
                                            {comment.score}%
                                        </span>
                                        
                                        {/* --- MOBILE REPLY BUTTON (Always Visible on Small Screens) --- */}
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setReplyingTo(comment); setReplyText(''); }}
                                            className={`lg:hidden p-1.5 rounded-full ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white'}`}
                                        >
                                            <Reply size={12}/>
                                        </button>
                                    </div>
                                </div>
                                <p className={`text-xs ${textSecondary} truncate pr-2 lg:pr-12`}>{comment.text}</p>
                            </div>

                            {/* --- DESKTOP REPLY BUTTON (Hover Only) --- */}
                            <div className="hidden lg:flex absolute right-3 top-2 flex items-start pt-1 opacity-0 group-hover:opacity-100 transition-opacity pl-4">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setReplyingTo(comment); setReplyText(''); }}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold text-white shadow-sm transition-all bg-cyan-600 hover:bg-cyan-500`}
                                >
                                    <Sparkles size={10}/> Reply
                                </button>
                            </div>
                        </div>

                        {/* --- THREADED REPLIES DISPLAY --- */}
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-2 ml-11 space-y-2">
                                {comment.replies.map((reply, idx) => (
                                    <div key={idx} className={`relative pl-4 py-2 border-l-2 ${isLight ? 'border-slate-200' : 'border-white/10'} text-xs`}>
                                        <div className={`absolute -left-[9px] top-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-lg ${isLight ? 'border-slate-200' : 'border-white/10'}`} />
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`font-bold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>You</span>
                                            <span className="text-[10px] text-slate-500">{reply.date}</span>
                                        </div>
                                        <p className={textSecondary}>{reply.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* --- AI REPLY MODAL --- */}
        <AnimatePresence>
            {replyingTo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className={`${isLight ? 'bg-white' : 'bg-[#0B0F19] border border-white/10'} w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl`}>
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className={`text-sm font-bold ${textPrimary}`}>Reply to {replyingTo.user}</h3>
                            <button onClick={() => setReplyingTo(null)}><X size={18} className={textSecondary}/></button>
                        </div>
                        <div className="p-4 space-y-4">
                            <p className={`text-xs ${textSecondary} italic border-l-2 border-slate-500 pl-2`}>"{replyingTo.text}"</p>
                            <div className="flex gap-2">
                                {['Professional', 'Friendly', 'Witty'].map(tone => (
                                    <button key={tone} onClick={() => generateReply(tone)} disabled={isGenerating} className={`text-[10px] px-3 py-1.5 rounded border transition-all ${isLight ? 'border-slate-200 hover:bg-slate-50' : 'border-white/10 hover:bg-white/5 text-slate-300'}`}>{tone}</button>
                                ))}
                            </div>
                            <div className="relative">
                                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className={`w-full h-32 ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-black/50 text-white'} border border-white/10 rounded-xl p-3 text-sm outline-none resize-none`} placeholder="AI Draft will appear here..."/>
                                {isGenerating && <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]"><Sparkles className="animate-pulse text-cyan-500"/></div>}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={handleSendReply} className="flex-1 py-2 bg-cyan-500 text-white rounded-lg text-xs font-bold">SEND REPLY</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default NeuralInbox;