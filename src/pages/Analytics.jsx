import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, DollarSign, Activity, 
  ArrowUpRight, ArrowDownRight, Download, Calendar, 
  Target, Share2, Eye, MousePointer, Award,
  Cpu, MoreHorizontal, Globe, MapPin, Search,
  Twitter, Instagram, Linkedin, Youtube, Zap,
  X, CheckCircle2, AlertCircle, ChevronRight, Filter
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // <--- IMPORT THEME

const Analytics = () => {
  const { activeTheme } = useTheme();
  const isLight = activeTheme.textColor === 'text-slate-900';

  const [timeRange, setTimeRange] = useState('30d');
  const [platform, setPlatform] = useState('all'); 
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null); 
  const [selectedPost, setSelectedPost] = useState(null); 

  // --- MOCK DATA ---
  const generateGrowthData = (base) => Array.from({ length: 7 }, (_, i) => ({
    name: `Day ${i + 1}`,
    followers: base + (i * 150) + Math.random() * 500,
    projected: base + (i * 160) + 200,
    organic: (base * 0.6) + (i * 50),
    paid: (base * 0.4) + (i * 100)
  }));

  const currentData = {
    all: { growth: generateGrowthData(12000), reach: '2.4M', rev: '$14,203', eng: '5.8%' },
    twitter: { growth: generateGrowthData(5000), reach: '850K', rev: '$4,100', eng: '3.2%' },
    instagram: { growth: generateGrowthData(8000), reach: '1.1M', rev: '$6,200', eng: '8.4%' },
    linkedin: { growth: generateGrowthData(3000), reach: '200K', rev: '$8,900', eng: '2.1%' },
    youtube: { growth: generateGrowthData(1500), reach: '350K', rev: '$2,100', eng: '12.5%' },
  }[platform];

  const gradedPosts = [
    { id: 1, title: "AI Revolution Thread", score: 'S', grade: 98, feedback: "Perfect hooks. Viral structure.", platform: 'twitter', metrics: { likes: '12K', shares: '4.5K', saves: '8K' }, breakdown: { hook: 99, value: 95, cta: 98 } },
    { id: 2, title: "Behind the Scenes Reel", score: 'A', grade: 92, feedback: "Great pacing, weak CTA.", platform: 'instagram', metrics: { likes: '8K', shares: '1.2K', saves: '500' }, breakdown: { hook: 95, value: 90, cta: 85 } },
    { id: 3, title: "Q3 Earnings Analysis", score: 'B', grade: 85, feedback: "Too detailed. Summarize more.", platform: 'linkedin', metrics: { likes: '400', shares: '50', saves: '120' }, breakdown: { hook: 80, value: 95, cta: 70 } },
  ];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [platform]);

  // --- DYNAMIC STYLES ---
  const cardBg = isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0B0F19] border-white/10';
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';
  const chartGridColor = isLight ? "#e2e8f0" : "#ffffff10";
  const chartAxisColor = isLight ? "#64748b" : "#94a3b8";
  const tooltipBg = isLight ? '#fff' : '#000';
  const tooltipBorder = isLight ? '#e2e8f0' : '#333';

  // --- RENDER MODAL CONTENT ---
  const renderModalContent = () => {
      switch(selectedFeature) {
          case 'revenue':
              return (
                  <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className={`p-4 rounded-xl ${isLight ? 'bg-slate-50' : 'bg-white/5'}`}>
                              <h4 className={`text-xs uppercase font-bold mb-4 ${textSecondary}`}>Revenue Streams</h4>
                              <div className="space-y-4">
                                  {[{l: 'Sponsorships', v: '$8,400', p: 60}, {l: 'Ad Revenue', v: '$3,200', p: 30}, {l: 'Digital Products', v: '$2,603', p: 10}].map((item, i) => (
                                      <div key={i}>
                                          <div className="flex justify-between text-sm mb-1"><span className={textPrimary}>{item.l}</span><span className="font-bold text-emerald-500">{item.v}</span></div>
                                          <div className={`w-full h-1.5 rounded-full ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}><div className="h-full bg-emerald-500 rounded-full" style={{width: `${item.p}%`}}/></div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                          <div className={`p-4 rounded-xl flex flex-col justify-center items-center ${isLight ? 'bg-slate-50' : 'bg-white/5'}`}>
                              <div className={`text-4xl font-black ${textPrimary}`}>$14,203</div>
                              <div className={`text-xs ${textSecondary}`}>Total Generated</div>
                              <div className="mt-4 text-[10px] text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-500/20">+12.5% vs Last Month</div>
                          </div>
                      </div>
                      <div className="h-[200px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={currentData.growth}>
                                  <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} vertical={false}/>
                                  <XAxis dataKey="name" stroke={chartAxisColor} fontSize={10} axisLine={false} tickLine={false}/>
                                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '8px', color: isLight ? '#000' : '#fff' }}/>
                                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30}/>
                              </BarChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
              );
          case 'geo':
              return (
                  <div className="space-y-4">
                      <div className={`flex justify-between items-center pb-4 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                          <h3 className={`font-bold ${textPrimary}`}>Top Performing Regions</h3>
                          <button className={`text-xs px-3 py-1 rounded-lg ${isLight ? 'bg-cyan-50 text-cyan-600' : 'bg-cyan-500/20 text-cyan-400'}`}>Download CSV</button>
                      </div>
                      <table className="w-full text-left text-sm">
                          <thead className={`text-xs uppercase font-bold ${textSecondary}`}>
                              <tr><th className="pb-2">Country</th><th className="pb-2">Users</th><th className="pb-2">Growth</th><th className="pb-2">Status</th></tr>
                          </thead>
                          <tbody className={textPrimary}>
                              {[
                                  { c: 'United States', u: '450K', g: '+12%', s: 'Active' },
                                  { c: 'India', u: '320K', g: '+24%', s: 'Trending' },
                                  { c: 'Germany', u: '150K', g: '+5%', s: 'Stable' },
                                  { c: 'United Kingdom', u: '120K', g: '+8%', s: 'Active' },
                              ].map((row, i) => (
                                  <tr key={i} className={`border-b ${isLight ? 'border-slate-100 hover:bg-slate-50' : 'border-white/5 hover:bg-white/5'} transition-colors`}>
                                      <td className="py-3 font-bold">{row.c}</td>
                                      <td className="py-3">{row.u}</td>
                                      <td className="py-3 text-emerald-500">{row.g}</td>
                                      <td className="py-3"><span className={`text-[10px] px-2 py-1 rounded ${isLight ? 'bg-slate-100' : 'bg-white/10'}`}>{row.s}</span></td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              );
          case 'post_detail':
              if (!selectedPost) return null;
              return (
                  <div className="space-y-6">
                      <div className="flex items-start gap-4">
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black ${selectedPost.score === 'S' ? 'bg-yellow-500 text-black' : selectedPost.score === 'A' ? 'bg-cyan-500 text-black' : 'bg-slate-700 text-white'}`}>
                              {selectedPost.score}
                          </div>
                          <div>
                              <h3 className={`text-xl font-bold ${textPrimary}`}>{selectedPost.title}</h3>
                              <p className={`text-sm ${textSecondary}`}>{selectedPost.feedback}</p>
                          </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                          {Object.entries(selectedPost.metrics).map(([key, val]) => (
                              <div key={key} className={`p-3 rounded-xl text-center border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10'}`}>
                                  <div className={`text-xl font-black ${textPrimary}`}>{val}</div>
                                  <div className={`text-[10px] uppercase ${textSecondary}`}>{key}</div>
                              </div>
                          ))}
                      </div>
                      <div className={`p-4 rounded-xl space-y-3 ${isLight ? 'bg-slate-50' : 'bg-white/5'}`}>
                          <h4 className={`text-xs font-bold uppercase ${textSecondary}`}>AI Score Breakdown</h4>
                          {Object.entries(selectedPost.breakdown).map(([key, val]) => (
                              <div key={key}>
                                  <div className="flex justify-between text-xs mb-1"><span className={`capitalize ${textPrimary}`}>{key} Efficiency</span><span className="font-mono text-cyan-500">{val}/100</span></div>
                                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-black'}`}><div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${val}%` }}/></div>
                              </div>
                          ))}
                      </div>
                  </div>
              );
          default: return null;
      }
  };

  return (
    <div className="space-y-6 lg:space-y-8 pb-10 relative">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        
        {/* --- 1. HEADER --- */}
        <div className="flex flex-col xl:flex-row justify-between gap-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className={`text-3xl lg:text-4xl font-black ${textPrimary} italic tracking-tighter uppercase mb-1 flex items-center gap-3`}>
                        <Cpu className={`text-${activeTheme.primary}-500`} size={32}/> DINO_ANALYTICS
                    </h1>
                    <div className="flex items-center gap-3">
                        <span className={`text-xs font-mono ${textSecondary} uppercase tracking-widest`}>Cross-Platform Intelligence</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold flex items-center gap-1 animate-pulse">
                            <Activity size={10}/> LIVE
                        </span>
                    </div>
                </div>
                {/* Platform Selector */}
                <div className={`flex p-1 rounded-2xl w-fit backdrop-blur-md border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                    {[{ id: 'all', label: 'Global', icon: <Globe size={14}/> }, { id: 'twitter', label: 'Twitter', icon: <Twitter size={14}/> }, { id: 'instagram', label: 'Instagram', icon: <Instagram size={14}/> }].map(p => (
                        <button key={p.id} onClick={() => setPlatform(p.id)} className={`flex items-center gap-2 px-4 lg:px-5 py-2 rounded-xl text-xs font-bold transition-all ${platform === p.id ? `bg-${activeTheme.primary}-500 text-white shadow-lg` : `${textSecondary} hover:${textPrimary}`}`}>
                            {p.icon} <span className="hidden sm:inline">{p.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Time & Export */}
            <div className="flex flex-wrap items-end gap-3">
                <div className={`rounded-xl p-1 flex border ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/10'}`}>
                    {['7d', '30d', '90d'].map(range => (
                        <button key={range} onClick={() => setTimeRange(range)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${timeRange === range ? `bg-${activeTheme.primary}-500 text-white` : `${textSecondary} hover:${textPrimary}`}`}>{range.toUpperCase()}</button>
                    ))}
                </div>
                <button className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all font-bold text-xs ${isLight ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'}`}>
                    <Download size={16}/> EXPORT
                </button>
            </div>
        </div>

        {/* --- 2. KPI CARDS --- */}
        <AnimatePresence mode='wait'>
            {!isLoading && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <StatCard onClick={() => setSelectedFeature('revenue')} title="Total Revenue" value={currentData.rev} trend="+12.5%" icon={<DollarSign size={20}/>} color="text-emerald-500" bg={cardBg} textP={textPrimary} textS={textSecondary} isLight={isLight} sub="Click for ROI Breakdown" glow="emerald"/>
                    <StatCard onClick={() => alert("Reach Drill-down")} title="Total Reach" value={currentData.reach} trend="+8.2%" icon={<Globe size={20}/>} color={`text-${activeTheme.primary}-500`} bg={cardBg} textP={textPrimary} textS={textSecondary} isLight={isLight} sub="15% New Users" glow={activeTheme.primary}/>
                    <StatCard onClick={() => alert("Engagement Drill-down")} title="Avg. Engagement" value={currentData.eng} trend="-1.1%" icon={<Activity size={20}/>} color="text-yellow-500" bg={cardBg} textP={textPrimary} textS={textSecondary} isLight={isLight} sub="vs Industry: 3.2%" isNegative glow="yellow"/>
                    <StatCard onClick={() => alert("Visits Drill-down")} title="Profile Visits" value="85.2K" trend="+24%" icon={<Users size={20}/>} color="text-purple-500" bg={cardBg} textP={textPrimary} textS={textSecondary} isLight={isLight} sub="Conv. Rate: 2.1%" glow="purple"/>
                </motion.div>
            )}
        </AnimatePresence>

        {/* --- 3. MAIN GRID --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* GROWTH CHART */}
            <motion.div onClick={() => setSelectedFeature('growth')} className={`xl:col-span-2 ${cardBg} border ${isLight ? 'border-slate-200' : 'border-white/10'} p-6 lg:p-8 rounded-[32px] backdrop-blur-xl relative overflow-hidden group cursor-pointer transition-all hover:shadow-lg`}>
                <div className="flex justify-between items-center mb-6 relative z-10">
                    <div>
                        <h3 className={`text-lg font-bold ${textPrimary} flex items-center gap-2`}><TrendingUp size={18} className={`text-${activeTheme.primary}-500`}/> Growth Trajectory</h3>
                        <p className={`text-xs ${textSecondary}`}>Click to expand <span className={`text-${activeTheme.primary}-500 font-bold`}>Forecast Details</span></p>
                    </div>
                </div>
                <div className="h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={currentData.growth}>
                            <defs><linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} vertical={false}/>
                            <XAxis dataKey="name" stroke={chartAxisColor} fontSize={10} tickLine={false} axisLine={false}/>
                            <YAxis stroke={chartAxisColor} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`}/>
                            <Tooltip contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: '12px', color: isLight ? '#000' : '#fff' }} itemStyle={{ color: isLight ? '#000' : '#fff' }}/>
                            <Area type="monotone" dataKey="followers" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorFollowers)" />
                            <Area type="monotone" dataKey="projected" stroke="#22d3ee" strokeWidth={3} strokeDasharray="5 5" fill="none" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* MONTHLY GOALS */}
            <div className={`${cardBg} border ${isLight ? 'border-slate-200' : 'border-white/10'} p-6 lg:p-8 rounded-[32px] backdrop-blur-xl flex flex-col justify-between relative overflow-hidden`}>
                <div className="flex justify-between items-center mb-6 z-10">
                    <h3 className={`text-lg font-bold ${textPrimary} flex items-center gap-2`}><Target size={18} className="text-pink-500"/> Monthly Goals</h3>
                    <button className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${isLight ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/5 text-slate-400 hover:text-white'}`}>EDIT</button>
                </div>
                <div className="space-y-6 z-10">
                    <GoalRing label="Revenue" current={14200} target={20000} color="#10b981" icon={<DollarSign size={14}/>} textP={textPrimary} textS={textSecondary} isLight={isLight} />
                    <GoalRing label="Followers" current={18500} target={25000} color="#22d3ee" icon={<Users size={14}/>} textP={textPrimary} textS={textSecondary} isLight={isLight} />
                    <GoalRing label="Engagement" current={5.8} target={8.0} color="#f472b6" suffix="%" icon={<Activity size={14}/>} textP={textPrimary} textS={textSecondary} isLight={isLight} />
                </div>
            </div>
        </div>

        {/* --- 4. INTELLIGENCE ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* GEO MAP */}
            <div onClick={() => setSelectedFeature('geo')} className={`${cardBg} border ${isLight ? 'border-slate-200' : 'border-white/10'} p-6 rounded-[32px] backdrop-blur-xl xl:col-span-2 relative overflow-hidden group cursor-pointer transition-all hover:shadow-lg`}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg font-bold ${textPrimary} flex items-center gap-2`}><MapPin size={18} className="text-indigo-500"/> Geo-Distribution</h3>
                    <div className="flex gap-2 text-[10px] font-bold"><span className={`flex items-center gap-1 ${textSecondary}`}><span className="w-2 h-2 rounded-full bg-cyan-500"/> US (45%)</span></div>
                </div>
                <div className={`relative h-[250px] w-full rounded-2xl border overflow-hidden flex items-center justify-center ${isLight ? 'bg-slate-50 border-slate-100' : 'bg-[#05070a] border-white/5'}`}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `radial-gradient(circle, ${isLight ? '#cbd5e1' : '#333'} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
                    <MapHotspot top="30%" left="25%" color="cyan" size="lg" delay={0} />
                    <MapHotspot top="28%" left="48%" color="purple" size="md" delay={1} />
                    <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-lg text-[10px] border backdrop-blur ${isLight ? 'bg-white/80 border-slate-200 text-slate-600' : 'bg-black/80 border-white/10 text-white'}`}>Click to expand region data</div>
                </div>
            </div>

            {/* CONTENT GRADER */}
            <div className={`${cardBg} border ${isLight ? 'border-slate-200' : 'border-white/10'} p-6 rounded-[32px] backdrop-blur-xl flex flex-col`}>
                <h3 className={`text-lg font-bold ${textPrimary} mb-6 flex items-center gap-2`}><Award size={18} className="text-yellow-500"/> Content Grader</h3>
                <div className="space-y-4 flex-1">
                    {gradedPosts.map((post) => (
                        <motion.div key={post.id} onClick={() => { setSelectedFeature('post_detail'); setSelectedPost(post); }} className={`border p-4 rounded-2xl flex items-center gap-4 transition-colors cursor-pointer group ${isLight ? 'bg-slate-50 border-slate-100 hover:bg-slate-100' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shadow-inner border ${isLight ? 'border-transparent' : 'border-white/10'} ${post.score === 'S' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' : post.score === 'A' ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400' : 'bg-slate-500/20 text-slate-500 dark:text-slate-400'}`}>{post.score}</div>
                            <div className="flex-1"><div className={`text-sm font-bold ${textPrimary} group-hover:text-${activeTheme.primary}-500 transition-colors`}>{post.title}</div><div className={`text-[10px] mt-1 ${textSecondary}`}>{post.feedback}</div></div>
                            <div className={`text-xs font-mono font-bold ${textSecondary}`}>{post.grade}/100</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- DEEP DIVE MODAL --- */}
        <AnimatePresence>
            {selectedFeature && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedFeature(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div 
                        layoutId={selectedFeature} 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`relative w-full max-w-4xl max-h-[85vh] border rounded-[32px] shadow-2xl overflow-hidden flex flex-col ${isLight ? 'bg-white border-slate-200' : 'bg-[#0B0F19] border-white/10'}`}
                    >
                        <div className={`p-6 border-b flex justify-between items-center ${isLight ? 'border-slate-100 bg-slate-50' : 'border-white/10 bg-white/[0.02]'}`}>
                            <h2 className={`text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3 ${textPrimary}`}>
                                {selectedFeature === 'revenue' && <><DollarSign className="text-emerald-500"/> Financial_Matrix</>}
                                {selectedFeature === 'geo' && <><Globe className="text-indigo-500"/> Global_Intelligence</>}
                                {selectedFeature === 'post_detail' && <><Award className="text-yellow-500"/> Content_Autopsy</>}
                                {selectedFeature === 'growth' && <><TrendingUp className="text-cyan-500"/> Growth_Engine</>}
                            </h2>
                            <button onClick={() => setSelectedFeature(null)} className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-500 hover:text-white'}`}><X size={24}/></button>
                        </div>
                        <div className="p-8 overflow-y-auto custom-scrollbar">{renderModalContent()}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

// --- SUB COMPONENTS ---
const StatCard = ({ title, value, trend, icon, color, sub, isNegative, glow, onClick, bg, textP, textS, isLight }) => (
    <div onClick={onClick} className={`${bg} border ${isLight ? 'border-slate-200 hover:border-blue-300' : 'border-white/10 hover:border-white/20'} p-6 rounded-[24px] backdrop-blur-xl relative overflow-hidden group transition-all cursor-pointer`}>
        <div className="flex justify-between items-start mb-4"><div className={`p-3 rounded-xl ${isLight ? 'bg-slate-100' : 'bg-white/5'} ${color}`}>{icon}</div><div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isNegative ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{isNegative ? <ArrowDownRight size={14}/> : <ArrowUpRight size={14}/>} {trend}</div></div>
        <div className={`text-3xl font-black ${textP} mb-1 tracking-tight`}>{value}</div><div className={`text-xs font-medium ${textS}`}>{title}</div>{sub && <div className={`mt-4 pt-4 border-t ${isLight ? 'border-slate-100' : 'border-white/5'} text-[10px] ${textS} font-mono flex items-center justify-between`}>{sub} <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity"/></div>}
    </div>
);

const GoalRing = ({ label, current, target, color, suffix = '', icon, textP, textS, isLight }) => {
    const percentage = Math.min((current / target) * 100, 100);
    return (
        <div className={`flex items-center justify-between group cursor-pointer p-2 rounded-xl transition-colors -mx-2 ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
            <div className="flex items-center gap-3"><div className={`p-2 rounded-lg transition-colors ${isLight ? 'bg-slate-100 text-slate-500' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>{icon}</div><div><div className={`text-sm font-bold ${textP}`}>{label}</div><div className={`text-[10px] ${textS}`}>{current.toLocaleString()}{suffix} / {target.toLocaleString()}{suffix}</div></div></div>
            <div className="relative w-12 h-12 flex items-center justify-center"><svg className="w-full h-full -rotate-90"><circle cx="24" cy="24" r="20" stroke={isLight ? '#e2e8f0' : '#333'} strokeWidth="3" fill="none"/><circle cx="24" cy="24" r="20" stroke={color} strokeWidth="3" fill="none" strokeDasharray={125} strokeDashoffset={125 - (percentage / 100) * 125} strokeLinecap="round" className="transition-all duration-1000 ease-out"/></svg><span className={`absolute text-[9px] font-bold ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{Math.round(percentage)}%</span></div>
        </div>
    );
};

const MapHotspot = ({ top, left, color, size, delay }) => (
    <div className="absolute" style={{ top, left }}><span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-${color}-400`} style={{ animationDelay: `${delay}s` }}></span><span className={`relative inline-flex rounded-full ${size === 'lg' ? 'w-3 h-3' : 'w-2 h-2'} bg-${color}-400`}></span></div>
);

export default Analytics;