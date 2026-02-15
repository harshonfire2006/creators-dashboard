import React from 'react';
import { 
  Globe, Zap, Users, Sparkles, TrendingUp, Newspaper, 
  ArrowRight, Target, Flame, DollarSign, PieChart as PieChartIcon, 
  Swords, Search 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, LineChart, Line 
} from 'recharts';
import { useOutletContext } from 'react-router-dom';

// --- MOCK DATA ---
const chartData = [
  { name: 'Mon', reach: 3200 }, { name: 'Tue', reach: 4500 },
  { name: 'Wed', reach: 2900 }, { name: 'Thu', reach: 6800 },
  { name: 'Fri', reach: 5200 }, { name: 'Sat', reach: 8100 },
  { name: 'Sun', reach: 7400 },
];

const competitorData = [
  { name: 'Wk 1', you: 4000, rival: 2400 }, { name: 'Wk 2', you: 3000, rival: 1398 },
  { name: 'Wk 3', you: 9800, rival: 6800 }, { name: 'Wk 4', you: 3908, rival: 3908 },
  { name: 'Wk 5', you: 4800, rival: 4800 }, { name: 'Wk 6', you: 8800, rival: 5800 },
];

const revenueData = [
  { name: 'Jan', amount: 1200 }, { name: 'Feb', amount: 1900 },
  { name: 'Mar', amount: 1500 }, { name: 'Apr', amount: 2800 },
  { name: 'May', amount: 3200 }, { name: 'Jun', amount: 4500 },
];

const demographicsData = [
  { name: 'Instagram', value: 400, color: '#E1306C' },
  { name: 'Twitter', value: 300, color: '#1DA1F2' },
  { name: 'LinkedIn', value: 300, color: '#0A66C2' },
  { name: 'YouTube', value: 200, color: '#FF0000' },
];

const viralTrends = [
    { topic: "POV Storytelling", volume: "+450%", category: "Video" },
    { topic: "Minimalist UI", volume: "+220%", category: "Design" },
    { topic: "Sustainable Tech", volume: "+180%", category: "Eco" },
    { topic: "Generative Video", volume: "+120%", category: "AI" },
];

const Dashboard = () => {
  // We get the 'openModal' function from the Layout wrapper!
  const { openModal } = useOutletContext(); 

  return (
    <div className="space-y-10 pb-10">
        
        {/* TOP STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatBox title="SYNAPTIC REACH" value="842.1K" icon={<Globe size={16}/>} trend="+22%" delay={0.1} />
            <StatBox title="INTERACTION" value="12.4%" icon={<Zap size={16}/>} trend="+5%" delay={0.2} />
            <StatBox title="NETWORK SIZE" value="89.3K" icon={<Users size={16}/>} trend="+18%" delay={0.3} />
            <StatBox title="AI SAVED TIME" value="142h" icon={<Sparkles size={16}/>} trend="∞" delay={0.4} />
        </div>

        {/* MAIN CHART & GOALS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 relative p-8 rounded-[32px] bg-black/40 border border-white/10 overflow-hidden group backdrop-blur-xl">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.2)_3px)] opacity-50 pointer-events-none z-0 mix-blend-overlay"></div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                    <h3 className="text-xl font-black text-white italic flex items-center gap-2">TRAFFIC_DYNAMICS <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"/></h3>
                </div>
                <div className="h-[300px] w-full min-h-[300px] relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs><linearGradient id="cyberGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5}/><stop offset="100%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} dy={15} tick={{fontFamily: 'monospace'}} />
                            <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} tick={{fontFamily: 'monospace'}} />
                            <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(34, 211, 238, 0.3)', borderRadius: '12px', fontSize: '12px', fontFamily: 'monospace' }} cursor={{ stroke: '#22d3ee', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area type="stepAfter" dataKey="reach" stroke="#22d3ee" strokeWidth={3} fill="url(#cyberGradient)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="flex flex-col gap-6">
                <div className="p-6 rounded-[32px] bg-black/40 border border-white/10 backdrop-blur-xl flex flex-col relative overflow-hidden flex-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none"/>
                    <h3 className="text-lg font-black text-white italic mb-6 flex items-center gap-2"><Target className="text-pink-400" size={20}/> MONTHLY_TARGETS</h3>
                    <div className="space-y-6 flex-1">
                        <GoalItem label="Follower Growth" current="8.2K" target="10K" progress={82} color="bg-cyan-400" />
                        <GoalItem label="Revenue (USD)" current="$3.4K" target="$5K" progress={68} color="bg-emerald-400" />
                        <GoalItem label="Post Frequency" current="12" target="20" progress={60} color="bg-purple-400" />
                    </div>
                </div>
                
                <div className="p-6 rounded-[32px] bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Flame className="text-orange-400" size={20}/>
                        <span className="font-black text-white italic">BEST TIME TO POST</span>
                    </div>
                    <div className="text-3xl font-black text-white">18:00 <span className="text-sm font-normal text-orange-200">Today</span></div>
                    <p className="text-[10px] text-slate-400 mt-1">High audience activity predicted.</p>
                </div>
            </div>
        </div>

        {/* TREND RADAR (MINI) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-[32px] bg-black/40 border border-white/10 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black text-white italic flex items-center gap-2"><TrendingUp className="text-cyan-400" size={20}/> TREND_RADAR</h3>
                    <button className="text-xs text-slate-400 hover:text-white transition-colors">VIEW ALL</button>
                </div>
                <div className="space-y-4">
                    {viralTrends.map((trend, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group" onClick={openModal}>
                            <div className="flex items-center gap-4">
                                <div className="text-2xl font-black text-slate-600 group-hover:text-white transition-colors">0{i+1}</div>
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{trend.topic}</h4>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">{trend.category}</span>
                                </div>
                            </div>
                            <div className="text-right"><span className="block font-mono text-emerald-400 font-bold">{trend.volume}</span></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-8 rounded-[32px] bg-black/40 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-white italic flex items-center gap-2"><Swords size={20} className="text-red-400"/> COMPETITOR_SPY</h3>
                    <div className="flex gap-2">
                        <span className="text-xs text-cyan-400 font-bold flex items-center gap-1"><div className="w-2 h-2 bg-cyan-400 rounded-full"/> YOU</span>
                        <span className="text-xs text-slate-500 font-bold flex items-center gap-1"><div className="w-2 h-2 bg-slate-500 rounded-full"/> RIVAL</span>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={competitorData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                            <Line type="monotone" dataKey="you" stroke="#22d3ee" strokeWidth={3} dot={{r: 4}} />
                            <Line type="monotone" dataKey="rival" stroke="#64748b" strokeWidth={3} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
  );
};

// --- SMALL COMPONENTS ---
const StatBox = ({ title, value, trend, icon, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay }} whileHover={{ y: -4, borderColor: 'rgba(34, 211, 238, 0.3)' }} className="p-6 rounded-3xl bg-black/40 border border-white/10 relative group cursor-pointer backdrop-blur-md overflow-hidden">
    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
    <div className="absolute top-4 right-4 text-slate-600 group-hover:text-cyan-400 transition-colors z-10">{icon}</div>
    <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 mb-3 uppercase relative z-10">{title}</p>
    <div className="flex items-end gap-3 relative z-10">
      <h4 className="text-3xl font-black text-white italic tracking-tight">{value}</h4>
      <span className="text-[10px] font-bold text-cyan-400 mb-1 font-mono bg-cyan-500/10 px-1.5 py-0.5 rounded">{trend}</span>
    </div>
  </motion.div>
);

const GoalItem = ({ label, current, target, progress, color }) => (
    <div>
        <div className="flex justify-between text-xs mb-2">
            <span className="font-bold text-slate-300">{label}</span>
            <span className="font-mono text-cyan-400">{current} <span className="text-slate-600">/ {target}</span></span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, delay: 0.5 }} className={`h-full ${color}`} />
        </div>
    </div>
);

export default Dashboard;