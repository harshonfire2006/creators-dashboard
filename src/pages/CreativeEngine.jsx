import React from 'react';
import { Type, Image, Video, Hash, RefreshCcw, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';

const CreativeEngine = () => {
  // Safe extraction of the function
  const context = useOutletContext();
  const openModal = context?.openModal || (() => console.error("Modal context missing!"));

  const tools = [
    { id: 'text', title: "Text Generator", icon: <Type size={32}/>, desc: "Generate viral captions.", color: "text-cyan-400", border: "group-hover:border-cyan-500/50", bg: "group-hover:bg-cyan-400/10" },
    { id: 'image', title: "Image Studio", icon: <Image size={32}/>, desc: "Create thumbnails.", color: "text-purple-400", border: "group-hover:border-purple-500/50", bg: "group-hover:bg-purple-400/10" },
    { id: 'script', title: "Video Script", icon: <Video size={32}/>, desc: "Write scripts for Reels.", color: "text-pink-400", border: "group-hover:border-pink-500/50", bg: "group-hover:bg-pink-400/10" },
    { id: 'hashtags', title: "Hashtag Vault", icon: <Hash size={32}/>, desc: "Manage tag groups.", color: "text-yellow-400", border: "group-hover:border-yellow-500/50", bg: "group-hover:bg-yellow-400/10" },
    { id: 'repurpose', title: "Hook Generator", icon: <Layers size={32}/>, desc: "Content Repurposer.", color: "text-orange-400", border: "group-hover:border-orange-500/50", bg: "group-hover:bg-orange-400/10", new: true },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="relative p-10 rounded-[40px] bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px]"/>
        <div className="relative z-10">
            <h2 className="text-4xl font-black text-white italic tracking-tight mb-4">WHAT WILL YOU <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">CREATE</span> TODAY?</h2>
            <p className="text-slate-300 max-w-xl text-lg">Select a neural module below to begin generation.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openModal(tool.id)}
                className={`group relative bg-black/40 border border-white/10 rounded-[32px] p-8 flex flex-col cursor-pointer overflow-hidden transition-all ${tool.border}`}
            >
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center transition-all ${tool.color} border border-white/10 ${tool.bg} ${tool.border} shadow-[0_0_20px_rgba(0,0,0,0.2)]`}>
                        {tool.icon}
                    </div>
                    {tool.new && <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-full">NEW</span>}
                </div>
                
                <h3 className="text-2xl font-black text-white italic mb-2">{tool.title}</h3>
                <p className="text-slate-400 text-sm">{tool.desc}</p>
                
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
                    LAUNCH TOOL <ArrowRight size={14}/>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CreativeEngine;