import React, { useState } from 'react';
import { 
  User, MapPin, Link as LinkIcon, Calendar, Edit3, 
  Camera, Trophy, Zap, Activity, Shield, CheckCircle2, 
  Twitter, Instagram, Github, Save, Briefcase, Mail,
  Layout, Grid, Layers, Plus, X, Globe, Share2, QrCode,
  Image as ImageIcon, Download, Clock, Star, Linkedin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// FIXED IMPORT: Removed Defs and LinearGradient
import { AreaChart, Area, ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';
import { useTheme } from '../context/ThemeContext'; 

const Profile = () => {
  // --- SAFETY CHECK FOR THEME ---
  const themeContext = useTheme();
  const activeTheme = themeContext?.activeTheme || { textColor: 'text-slate-900', primary: 'blue' };
  const isLight = activeTheme.textColor === 'text-slate-900';

  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // --- STATE ---
  const [user, setUser] = useState({
    name: "Dino",
    handle: "@dino_ai",
    role: "Senior AI Engineer",
    bio: "Building the future of content with Generative AI. 🤖✨ Transforming ideas into neural networks.",
    location: "Varanasi, India",
    website: "dino.ai",
    status: "Open to Work", 
    coverTheme: 'cyber', 
    accentColor: '#06b6d4', // Using Hex for safety (Cyan-500)
    skills: ["React", "Node.js", "TensorFlow", "Three.js", "Next.js"],
  });

  const [newSkill, setNewSkill] = useState("");
  
  const [portfolio, setPortfolio] = useState([
    { id: 1, title: "Neon UI Kit", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop", type: "Design", likes: 124 },
    { id: 2, title: "AI Chatbot", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2606&auto=format&fit=crop", type: "Code", likes: 89 },
    { id: 3, title: "Cyber City", image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2698&auto=format&fit=crop", type: "Art", likes: 256 },
    { id: 4, title: "Finance Dash", image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2670&auto=format&fit=crop", type: "Design", likes: 45 },
  ]);
  const [newProject, setNewProject] = useState({ title: '', type: 'Code', image: '' });

  const activityData = [
    { day: 'M', val: 20 }, { day: 'T', val: 40 }, { day: 'W', val: 35 }, { day: 'T', val: 50 },
    { day: 'F', val: 80 }, { day: 'S', val: 60 }, { day: 'S', val: 90 },
  ];

  const experience = [
      { role: "Senior AI Engineer", company: "Google DeepMind", date: "2024 - Present", active: true },
      { role: "Full Stack Developer", company: "Meta", date: "2022 - 2024", active: false },
      { role: "Frontend Lead", company: "StartUp Inc", date: "2020 - 2022", active: false },
  ];

  // --- ACTIONS ---
  const handleAddSkill = (e) => {
      if (e.key === 'Enter' && newSkill) {
          setUser({...user, skills: [...user.skills, newSkill]});
          setNewSkill("");
      }
  };

  const handleAddProject = (e) => {
      e.preventDefault();
      setPortfolio([...portfolio, { id: Date.now(), ...newProject, image: newProject.image || "https://via.placeholder.com/400", likes: 0 }]);
      setNewProject({ title: '', type: 'Code', image: '' });
      setShowProjectModal(false);
  };

  // --- COLOR MAPS (Safe Hex Codes) ---
  const accentColors = {
      cyan: '#06b6d4',
      purple: '#a855f7',
      emerald: '#10b981',
      orange: '#f97316'
  };

  // --- STYLES ---
  const cardBg = isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0B0F19] border-white/10';
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-20 relative overflow-x-hidden">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

        {/* --- 1. HERO BANNER --- */}
        <div className="relative group/cover h-64 lg:h-80 w-full rounded-b-[40px] lg:rounded-[40px] overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${
                user.coverTheme === 'cyber' ? 'from-cyan-900 via-blue-900 to-purple-900' :
                user.coverTheme === 'nature' ? 'from-emerald-900 via-green-900 to-teal-900' :
                'from-slate-800 via-gray-800 to-zinc-900'
            }`}/>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
            
            {/* Theme Controls */}
            {isEditing && (
                <div className="absolute top-6 right-6 flex gap-4 bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10 z-20">
                    <div className="flex gap-2">
                        {Object.entries(accentColors).map(([name, hex]) => (
                            <button key={name} onClick={() => setUser({...user, accentColor: hex})} className={`w-6 h-6 rounded-full border-2 ${user.accentColor === hex ? 'border-white scale-110' : 'border-transparent opacity-50'}`} style={{ backgroundColor: hex }}/>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* --- 2. PROFILE HEADER --- */}
        <div className="px-4 lg:px-10 -mt-20 relative z-10 mb-8">
            <div className={`p-6 lg:p-8 rounded-[32px] ${isLight ? 'bg-white/90 border-white shadow-xl' : 'bg-[#0B0F19]/90 border-white/10'} border backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-end gap-6 lg:gap-10`}>
                
                {/* Avatar / QR */}
                <div className="relative group/avatar cursor-pointer shrink-0" onClick={() => setShowQr(!showQr)}>
                    <div className={`w-32 h-32 lg:w-40 lg:h-40 rounded-[24px] p-1.5 relative overflow-hidden transition-transform hover:scale-105 duration-300 shadow-2xl ${isLight ? 'bg-white' : 'bg-[#0B0F19]'} ring-4`} style={{ ringColor: `${user.accentColor}20` }}>
                        <AnimatePresence mode="wait">
                            {!showQr ? (
                                <motion.div 
                                    key="avatar" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }}
                                    className="w-full h-full rounded-[20px] flex items-center justify-center text-5xl font-black text-white"
                                    style={{ background: `linear-gradient(135deg, ${user.accentColor}, #8b5cf6)` }}
                                >
                                    {user.name[0]}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="qr" initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }}
                                    className="w-full h-full rounded-[20px] bg-white flex items-center justify-center p-2"
                                >
                                    <QrCode size={100} className="text-black"/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {isEditing && <div className="absolute bottom-2 right-2 bg-black/60 p-1.5 rounded-full backdrop-blur-md text-white"><Camera size={12}/></div>}
                    </div>
                    {/* Online Status */}
                    <div className={`absolute bottom-3 -right-2 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest backdrop-blur-xl shadow-lg flex items-center gap-1.5 ${user.status === 'Open to Work' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${user.status === 'Open to Work' ? 'bg-emerald-500' : 'bg-red-500'}`}/>
                        {user.status}
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 w-full lg:w-auto space-y-3 pb-2">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                        {isEditing ? (
                            <input value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className={`text-3xl lg:text-4xl font-black bg-transparent border-b ${isLight ? 'border-slate-300 text-slate-900' : 'border-white/20 text-white'} outline-none w-full max-w-md`}/>
                        ) : (
                            <h1 className={`text-3xl lg:text-4xl font-black ${textPrimary} tracking-tight`}>{user.name}</h1>
                        )}
                        <span className="w-fit px-2 py-1 rounded-md bg-opacity-10 border border-opacity-20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1" style={{ backgroundColor: `${user.accentColor}10`, borderColor: `${user.accentColor}30`, color: user.accentColor }}>
                            <CheckCircle2 size={12}/> Pro Verified
                        </span>
                    </div>
                    
                    <div className={`flex flex-wrap items-center gap-3 text-sm ${textSecondary}`}>
                        <span className={`font-bold ${textPrimary}`}>{user.role}</span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1"><MapPin size={14}/> {user.location}</span>
                        <span className="opacity-30">•</span>
                        <a href={`https://${user.website}`} className="flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: user.accentColor }}><LinkIcon size={14}/> {user.website}</a>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-2 pt-1">
                        {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                            <button key={i} className={`p-2 rounded-lg border transition-all ${isLight ? 'border-slate-200 text-slate-500 hover:bg-slate-100' : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}>
                                <Icon size={16}/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full lg:w-auto">
                    <button onClick={() => setIsEditing(!isEditing)} className={`flex-1 lg:flex-none px-6 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${isEditing ? 'text-white' : `${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-900' : 'bg-white/10 hover:bg-white/20 text-white'} border border-transparent`}`} style={isEditing ? { backgroundColor: user.accentColor } : {}}>
                        {isEditing ? <><Save size={16}/> SAVE</> : <><Edit3 size={16}/> EDIT</>}
                    </button>
                    {!isEditing && (
                        <button onClick={() => setShowHireModal(true)} className={`flex-1 lg:flex-none px-6 py-3 rounded-xl text-xs font-bold bg-${activeTheme.primary}-500 hover:bg-${activeTheme.primary}-400 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-${activeTheme.primary}-500/20`}>
                            <Mail size={16}/> HIRE ME
                        </button>
                    )}
                </div>
            </div>
        </div>

        {/* --- 3. BENTO GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4 lg:px-10">
            
            {/* LEFT COLUMN (Static Info) */}
            <div className="space-y-6 lg:space-y-8">
                
                {/* Bio Card */}
                <div className={`p-6 rounded-[32px] ${cardBg} backdrop-blur-sm`}>
                    <div className="flex items-center gap-2 mb-4"><User size={16} style={{ color: user.accentColor }}/><h3 className={`text-sm font-bold ${textPrimary} uppercase tracking-widest`}>About</h3></div>
                    {isEditing ? (
                        <textarea value={user.bio} onChange={(e) => setUser({...user, bio: e.target.value})} className={`w-full h-32 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/20 border-white/10'} border rounded-xl p-3 text-sm ${textPrimary} outline-none resize-none`} style={{ borderColor: isEditing ? user.accentColor : '' }}/>
                    ) : (
                        <p className={`text-sm ${textSecondary} leading-relaxed`}>{user.bio}</p>
                    )}
                    <div className="mt-6 pt-6 border-t border-dashed border-gray-700/20">
                        <button className={`w-full py-2.5 border ${isLight ? 'border-slate-200 text-slate-600 hover:bg-slate-50' : 'border-white/10 text-slate-400 hover:bg-white/5'} rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all`}>
                            <Download size={14}/> DOWNLOAD RESUME
                        </button>
                    </div>
                </div>

                {/* Skills */}
                <div className={`p-6 rounded-[32px] ${cardBg} backdrop-blur-sm`}>
                    <div className="flex items-center gap-2 mb-4"><Layers size={16} className="text-purple-500"/><h3 className={`text-sm font-bold ${textPrimary} uppercase tracking-widest`}>Tech Stack</h3></div>
                    <div className="flex flex-wrap gap-2">
                        {user.skills.map((skill) => (
                            <span key={skill} className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold flex items-center gap-2 group transition-all cursor-default ${isLight ? 'bg-slate-100 border-slate-200 text-slate-700' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                                {skill}
                                {isEditing && <button onClick={() => setUser({...user, skills: user.skills.filter(s => s !== skill)})} className="text-slate-400 hover:text-red-500"><X size={12}/></button>}
                            </span>
                        ))}
                        {isEditing && (
                            <div className="relative flex items-center">
                                <Plus size={14} className="absolute left-2 text-slate-500"/>
                                <input 
                                    value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={handleAddSkill} placeholder="Add..." 
                                    className={`pl-7 pr-3 py-1.5 rounded-lg border text-[11px] font-bold outline-none w-24 focus:w-32 transition-all ${isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-white/5 border-white/10 text-white'}`}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Availability Widget */}
                <div className={`p-6 rounded-[32px] bg-gradient-to-br ${isLight ? 'from-slate-100 to-white border-slate-200' : 'from-[#0F131F] to-black border-white/10'} border flex items-center justify-between`}>
                    <div>
                        <h4 className={`text-sm font-bold ${textPrimary}`}>Availability</h4>
                        <p className="text-xs text-slate-500 mt-1">Next slot: <span className="text-emerald-500 font-bold">Tomorrow, 2 PM</span></p>
                    </div>
                    <button className={`p-2.5 ${isLight ? 'bg-white shadow-sm text-slate-700' : 'bg-white/10 text-white'} rounded-xl`}><Calendar size={18}/></button>
                </div>
            </div>

            {/* RIGHT COLUMN (Tabs & Content) */}
            <div className="lg:col-span-2 flex flex-col h-full">
                
                {/* Custom Tab Bar */}
                <div className={`flex items-center gap-2 p-1 rounded-2xl w-fit mb-6 border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/10'}`}>
                    {['overview', 'portfolio', 'timeline'].map(tab => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)} 
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab ? `text-white shadow-md` : `${textSecondary} hover:${textPrimary}`}`}
                            style={activeTab === tab ? { backgroundColor: user.accentColor } : {}}
                        >
                            {tab === 'overview' && <Layout size={14}/>}{tab === 'portfolio' && <Grid size={14}/>}{tab === 'timeline' && <Clock size={14}/>}
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex-1">
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Analytics Graph */}
                            <div className={`col-span-1 md:col-span-2 p-8 rounded-[32px] ${cardBg} backdrop-blur-xl`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className={`text-lg font-bold ${textPrimary} flex items-center gap-2`}><Activity size={18} className="text-emerald-500"/> Contribution Graph</h3>
                                    <select className={`bg-transparent text-xs font-bold ${textSecondary} outline-none`}><option>Last 7 Days</option></select>
                                </div>
                                <div className="h-48 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={activityData}>
                                            <defs>
                                                <linearGradient id="colorAct" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={user.accentColor} stopOpacity={0.3}/>
                                                    <stop offset="95%" stopColor={user.accentColor} stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="val" stroke={user.accentColor} strokeWidth={3} fill="url(#colorAct)" />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: isLight ? '#94a3b8' : '#64748b', fontSize: 12}} dy={10}/>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Small Stats */}
                            <div className={`p-6 rounded-[32px] ${cardBg} flex flex-col justify-between`}>
                                <div className={`p-3 w-fit rounded-xl ${isLight ? 'bg-blue-50 text-blue-500' : 'bg-blue-500/10 text-blue-400'}`}><ImageIcon size={20}/></div>
                                <div>
                                    <div className={`text-3xl font-black ${textPrimary}`}>12.5K</div>
                                    <div className={`text-xs ${textSecondary} font-bold uppercase tracking-wider`}>Profile Views</div>
                                </div>
                            </div>
                            <div className={`p-6 rounded-[32px] ${cardBg} flex flex-col justify-between`}>
                                <div className={`p-3 w-fit rounded-xl ${isLight ? 'bg-purple-50 text-purple-500' : 'bg-purple-500/10 text-purple-400'}`}><Star size={20}/></div>
                                <div>
                                    <div className={`text-3xl font-black ${textPrimary}`}>4.9/5</div>
                                    <div className={`text-xs ${textSecondary} font-bold uppercase tracking-wider`}>Client Rating</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'portfolio' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portfolio.map((item) => (
                                <div key={item.id} className={`group relative aspect-[4/3] rounded-[24px] overflow-hidden border ${isLight ? 'border-slate-200' : 'border-white/10'} cursor-pointer`}>
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                        <span className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: user.accentColor }}>{item.type}</span>
                                        <h3 className="text-xl font-black text-white">{item.title}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-slate-300 text-xs">
                                            <span className="flex items-center gap-1"><Star size={12}/> {item.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div onClick={() => setShowProjectModal(true)} className={`border-2 border-dashed ${isLight ? 'border-slate-300 hover:border-slate-400 hover:bg-slate-50' : 'border-white/10 hover:border-white/30 hover:bg-white/5'} rounded-[24px] flex flex-col items-center justify-center ${textSecondary} transition-all cursor-pointer min-h-[250px]`}>
                                <Plus size={32} className="mb-2"/>
                                <span className="text-xs font-bold uppercase tracking-widest">Add Project</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'timeline' && (
                        <div className={`pl-4 border-l ${isLight ? 'border-slate-200' : 'border-white/10'} ml-4 space-y-8`}>
                            {experience.map((job, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-4 ${isLight ? 'border-white bg-blue-500' : 'border-[#020617] bg-blue-500'}`}/>
                                    <div className={`p-6 rounded-[24px] border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-white/5 border-white/10'} hover:scale-[1.01] transition-transform`}>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-base font-bold ${textPrimary}`}>{job.role}</h4>
                                            <span className={`text-[10px] font-mono ${textSecondary} bg-black/5 dark:bg-white/10 px-2 py-1 rounded`}>{job.date}</span>
                                        </div>
                                        <div className={`text-sm ${textSecondary}`}>{job.company}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* --- MODALS --- */}
        <AnimatePresence>
            {showHireModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowHireModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`relative w-full max-w-md ${cardBg} rounded-[32px] p-8 shadow-2xl`}>
                        <div className="flex justify-between items-center mb-6"><h3 className={`text-xl font-black ${textPrimary} italic`}>HIRE_PROTOCOL</h3><button onClick={() => setShowHireModal(false)}><X size={20} className={textSecondary}/></button></div>
                        <form className="space-y-4">
                            <input required placeholder="Your Name" className={`w-full ${isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-black/40 border-white/10 text-white'} border rounded-xl p-3 text-sm outline-none focus:border-blue-500`}/>
                            <input required type="email" placeholder="Email Address" className={`w-full ${isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-black/40 border-white/10 text-white'} border rounded-xl p-3 text-sm outline-none focus:border-blue-500`}/>
                            <textarea required placeholder="Project Details..." className={`w-full h-32 ${isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-black/40 border-white/10 text-white'} border rounded-xl p-3 text-sm outline-none focus:border-blue-500 resize-none`}/>
                            <button className="w-full py-3 text-white font-black rounded-xl text-xs transition-all" style={{ backgroundColor: user.accentColor }}>INITIATE CONTACT</button>
                        </form>
                    </motion.div>
                </div>
            )}
            {showProjectModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProjectModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`relative w-full max-w-md ${cardBg} rounded-[32px] p-8 shadow-2xl`}>
                        <div className="flex justify-between items-center mb-6"><h3 className={`text-xl font-black ${textPrimary} italic`}>NEW_PROJECT</h3><button onClick={() => setShowProjectModal(false)}><X size={20} className={textSecondary}/></button></div>
                        <form onSubmit={handleAddProject} className="space-y-4">
                            <input required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} placeholder="Project Title" className={`w-full ${isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-black/40 border-white/10 text-white'} border rounded-xl p-3 text-sm outline-none`}/>
                            <select value={newProject.type} onChange={e => setNewProject({...newProject, type: e.target.value})} className={`w-full ${isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-black/40 border-white/10 text-white'} border rounded-xl p-3 text-sm outline-none`}><option>Design</option><option>Code</option><option>Art</option></select>
                            <input value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} placeholder="Image URL (optional)" className={`w-full ${isLight ? 'bg-slate-100 border-slate-200 text-slate-900' : 'bg-black/40 border-white/10 text-white'} border rounded-xl p-3 text-sm outline-none`}/>
                            <button type="submit" className="w-full py-3 text-white font-black rounded-xl text-xs transition-all" style={{ backgroundColor: user.accentColor }}>UPLOAD TO GRID</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default Profile;