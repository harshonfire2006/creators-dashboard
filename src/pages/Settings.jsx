import React, { useState } from 'react';
import { 
  User, Bell, Shield, CreditCard, Cpu, Palette, 
  ToggleLeft, ToggleRight, Save, RefreshCw, LogOut, 
  Trash2, CheckCircle2, Lock, Eye, EyeOff, Zap, 
  Globe, Smartphone, Mail, AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // <--- IMPORT THEME CONTEXT

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  
  // GET THEME FROM CONTEXT
  const { theme, setTheme, activeTheme } = useTheme();
  
  // Helper to detect Light Mode
  const isLight = activeTheme.textColor === 'text-slate-900';

  // --- SETTINGS STATE ---
  const [settings, setSettings] = useState({
    // General
    username: 'dino_ai',
    email: 'admin@dino.ai',
    bio: 'Building the future.',
    visibility: 'Public',
    
    // Neural Link (AI)
    openaiKey: 'sk-........................',
    geminiKey: 'AIza........................',
    temperature: 0.7,
    model: 'GPT-4 Turbo',
    
    // Notifications
    emailAlerts: true,
    pushAlerts: true,
    marketing: false,
    
    // Billing
    plan: 'Pro' 
  });

  const [showKeys, setShowKeys] = useState(false);

  // --- ACTIONS ---
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        alert("SYSTEM UPDATED: Configuration saved to neural core.");
    }, 1500);
  };

  const toggleSetting = (key) => {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Tabs = [
      { id: 'general', label: 'General', icon: <User size={16}/> },
      { id: 'neural', label: 'Neural Link', icon: <Cpu size={16}/> },
      { id: 'appearance', label: 'Appearance', icon: <Palette size={16}/> },
      { id: 'notifications', label: 'Alerts', icon: <Bell size={16}/> },
      { id: 'billing', label: 'Billing', icon: <CreditCard size={16}/> },
  ];

  // --- DYNAMIC STYLES ---
  const cardBg = isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-black/40 border-white/10';
  const textPrimary = isLight ? 'text-slate-900' : 'text-white';
  const textSecondary = isLight ? 'text-slate-500' : 'text-slate-400';
  const inputBg = isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-black/40 border-white/10 text-white';

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 lg:gap-8 pb-10 relative max-w-7xl mx-auto px-4 lg:px-0">
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        
        {/* --- LEFT: NAVIGATION (Horizontal on Mobile, Vertical on Desktop) --- */}
        <div className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
            <div className="mb-2 lg:mb-6 px-2">
                <h1 className={`text-2xl font-black ${textPrimary} italic uppercase tracking-tighter`}>SETTINGS_V1</h1>
                <p className={`text-xs ${textSecondary} font-mono`}>System Configuration</p>
            </div>
            
            {/* Scrollable Container for Mobile */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 no-scrollbar">
                {Tabs.map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all relative overflow-hidden group shrink-0 whitespace-nowrap ${activeTab === tab.id ? `bg-${activeTheme.primary}-500/10 text-${activeTheme.primary}-500 border border-${activeTheme.primary}-500/20` : `${textSecondary} hover:${textPrimary} ${isLight ? 'hover:bg-slate-100' : 'hover:bg-white/5'} border border-transparent`}`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && <motion.div layoutId="active-glow" className={`absolute inset-0 bg-${activeTheme.primary}-500/5`} />}
                    </button>
                ))}
            </div>

            <div className="hidden lg:block mt-auto pt-6 border-t border-white/5 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors">
                    <LogOut size={16}/> Log Out
                </button>
            </div>
        </div>

        {/* --- RIGHT: CONTENT AREA --- */}
        <div className={`flex-1 ${cardBg} border rounded-[32px] backdrop-blur-xl p-6 lg:p-8 relative overflow-hidden flex flex-col min-h-[500px]`}>
            
            {/* Header */}
            <div className={`flex justify-between items-center mb-8 pb-6 border-b ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                <div>
                    <h2 className={`text-xl font-bold ${textPrimary} capitalize`}>{activeTab} Settings</h2>
                    <p className={`text-xs ${textSecondary}`}>Manage your {activeTab} preferences</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-6 py-2 bg-${activeTheme.primary}-500 hover:bg-${activeTheme.primary}-400 text-white font-black rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-${activeTheme.primary}-500/20 disabled:opacity-50`}
                >
                    {isSaving ? <RefreshCw size={14} className="animate-spin"/> : <Save size={14}/>}
                    {isSaving ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 pr-2">
                
                {/* 1. GENERAL TAB */}
                {activeTab === 'general' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="flex gap-6 items-center">
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-tr from-${activeTheme.primary}-500 to-purple-500 flex items-center justify-center text-3xl font-black text-white shadow-xl`}>D</div>
                            <div className="space-y-2">
                                <button className={`px-4 py-2 ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-900' : 'bg-white/10 hover:bg-white/20 text-white'} rounded-lg text-xs font-bold transition-all`}>Change Avatar</button>
                                <div className={`text-[10px] ${textSecondary}`}>JPG, GIF or PNG. Max 1MB.</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Display Name" value={settings.username} onChange={v => setSettings({...settings, username: v})} icon={<User size={14}/>} inputBg={inputBg} textPrimary={textPrimary} />
                            <InputGroup label="Email Address" value={settings.email} onChange={v => setSettings({...settings, email: v})} icon={<Mail size={14}/>} inputBg={inputBg} textPrimary={textPrimary} />
                        </div>
                        <InputGroup label="Bio" value={settings.bio} onChange={v => setSettings({...settings, bio: v})} isArea inputBg={inputBg} textPrimary={textPrimary} />
                    </motion.div>
                )}

                {/* 2. NEURAL LINK (AI) TAB */}
                {activeTab === 'neural' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                         <div className={`p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-3`}>
                            <Zap className="text-purple-500 shrink-0 mt-0.5" size={16}/>
                            <div>
                                <h4 className={`text-sm font-bold ${textPrimary}`}>Neural Engine Active</h4>
                                <p className={`text-xs ${textSecondary} mt-1`}>Your AI core is connected and running at 100% efficiency.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className={`text-sm font-bold ${textPrimary}`}>API Configuration</h3>
                                <button onClick={() => setShowKeys(!showKeys)} className={`text-xs text-${activeTheme.primary}-500 hover:text-${activeTheme.primary}-400 flex items-center gap-1`}>
                                    {showKeys ? <EyeOff size={12}/> : <Eye size={12}/>} {showKeys ? 'Hide Keys' : 'Show Keys'}
                                </button>
                            </div>
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">OpenAI Secret Key</label>
                                    <div className="flex gap-2">
                                        <input type={showKeys ? "text" : "password"} value={settings.openaiKey} readOnly className={`flex-1 ${inputBg} rounded-xl px-4 py-3 text-sm outline-none font-mono`}/>
                                        <button className={`px-4 ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-900' : 'bg-white/5 hover:bg-white/10 text-white'} rounded-xl text-xs font-bold transition-colors`}>Edit</button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase">Gemini API Key</label>
                                    <div className="flex gap-2">
                                        <input type={showKeys ? "text" : "password"} value={settings.geminiKey} readOnly className={`flex-1 ${inputBg} rounded-xl px-4 py-3 text-sm outline-none font-mono`}/>
                                        <button className={`px-4 ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-900' : 'bg-white/5 hover:bg-white/10 text-white'} rounded-xl text-xs font-bold transition-colors`}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`pt-6 border-t ${isLight ? 'border-slate-200' : 'border-white/5'} space-y-4`}>
                             <div className="flex justify-between items-center">
                                 <div>
                                     <div className={`text-sm font-bold ${textPrimary}`}>Creativity Temperature</div>
                                     <div className={`text-xs ${textSecondary}`}>Controls randomness: 0 (Strict) to 1 (Creative)</div>
                                 </div>
                                 <span className={`text-${activeTheme.primary}-500 font-mono font-bold`}>{settings.temperature}</span>
                             </div>
                             <input 
                                type="range" min="0" max="1" step="0.1" 
                                value={settings.temperature} 
                                onChange={(e) => setSettings({...settings, temperature: e.target.value})}
                                className={`w-full h-2 ${isLight ? 'bg-slate-200' : 'bg-white/10'} rounded-lg appearance-none cursor-pointer accent-${activeTheme.primary}-500`}
                             />
                        </div>
                    </motion.div>
                )}

                {/* 3. APPEARANCE TAB (4 THEMES) */}
                {activeTab === 'appearance' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                         <div className="space-y-4">
                             <h3 className={`text-sm font-bold ${textPrimary}`}>System Interface Theme</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <ThemeCard 
                                    id="cyber" label="Cyber Depth" desc="Dark • Cyan • Industrial" 
                                    bg="bg-slate-900" accent="bg-cyan-500"
                                    onClick={() => setTheme('cyber')} isActive={theme === 'cyber'} textPrimary={textPrimary} textSecondary={textSecondary} isLight={isLight}
                                 />
                                 <ThemeCard 
                                    id="carbon" label="Carbon Executive" desc="Matte Slate • Indigo • Eye-Care" 
                                    bg="bg-[#0f172a]" accent="bg-indigo-500"
                                    onClick={() => setTheme('carbon')} isActive={theme === 'carbon'} textPrimary={textPrimary} textSecondary={textSecondary} isLight={isLight}
                                 />
                                 <ThemeCard 
                                    id="nebula" label="Nebula Dream" desc="Cosmic • Purple • Glass" 
                                    bg="bg-[#0f0720]" accent="bg-purple-500"
                                    onClick={() => setTheme('nebula')} isActive={theme === 'nebula'} textPrimary={textPrimary} textSecondary={textSecondary} isLight={isLight}
                                 />
                                 <ThemeCard 
                                    id="arctic" label="Arctic Pro" desc="Light • Blue • Corporate" 
                                    bg="bg-white border border-slate-200" accent="bg-blue-600" darkText
                                    onClick={() => setTheme('arctic')} isActive={theme === 'arctic'} textPrimary={textPrimary} textSecondary={textSecondary} isLight={isLight}
                                 />
                                 <ThemeCard 
                                    id="obsidian" label="Obsidian Gold" desc="Deep Black • Amber • Luxury" 
                                    bg="bg-black" accent="bg-amber-500"
                                    onClick={() => setTheme('obsidian')} isActive={theme === 'obsidian'} textPrimary={textPrimary} textSecondary={textSecondary} isLight={isLight}
                                 />
                             </div>
                         </div>
                    </motion.div>
                )}

                {/* 4. NOTIFICATIONS TAB */}
                {activeTab === 'notifications' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                         <ToggleItem 
                            title="Email Notifications" desc="Receive daily summaries and critical alerts via email." 
                            active={settings.emailAlerts} onClick={() => toggleSetting('emailAlerts')} icon={<Mail size={16}/>}
                            cardBg={isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} textPrimary={textPrimary} textSecondary={textSecondary} activeColor={`text-${activeTheme.primary}-500`}
                         />
                         <ToggleItem 
                            title="Push Notifications" desc="Real-time alerts for browser and mobile devices." 
                            active={settings.pushAlerts} onClick={() => toggleSetting('pushAlerts')} icon={<Smartphone size={16}/>}
                            cardBg={isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} textPrimary={textPrimary} textSecondary={textSecondary} activeColor={`text-${activeTheme.primary}-500`}
                         />
                         <ToggleItem 
                            title="Marketing Updates" desc="Receive product updates, newsletters, and offers." 
                            active={settings.marketing} onClick={() => toggleSetting('marketing')} icon={<Globe size={16}/>}
                            cardBg={isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/5'} textPrimary={textPrimary} textSecondary={textSecondary} activeColor={`text-${activeTheme.primary}-500`}
                         />
                    </motion.div>
                )}

                {/* 5. BILLING TAB */}
                {activeTab === 'billing' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             {['Free', 'Pro', 'Max'].map(plan => (
                                 <div 
                                    key={plan}
                                    onClick={() => setSettings({...settings, plan})}
                                    className={`relative p-6 rounded-2xl border transition-all cursor-pointer ${settings.plan === plan ? `bg-${activeTheme.primary}-500/10 border-${activeTheme.primary}-500 shadow-md` : `${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10'} hover:border-${activeTheme.primary}-500/30`}`}
                                 >
                                     {plan === 'Pro' && <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-${activeTheme.primary}-500 text-white text-[10px] font-black uppercase rounded-full tracking-widest`}>Popular</div>}
                                     <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{plan}</div>
                                     <div className={`text-3xl font-black ${textPrimary} mb-4`}>
                                         {plan === 'Free' ? '$0' : plan === 'Pro' ? '$29' : '$99'}
                                         <span className="text-sm font-normal text-slate-500">/mo</span>
                                     </div>
                                     <ul className="space-y-2 mb-6">
                                         {[1,2,3].map(i => (
                                             <li key={i} className={`flex items-center gap-2 text-xs ${textSecondary}`}>
                                                 <CheckCircle2 size={12} className={`text-${activeTheme.primary}-500`}/> Feature Access {i}
                                             </li>
                                         ))}
                                     </ul>
                                     <button className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${settings.plan === plan ? `bg-${activeTheme.primary}-500 text-white` : `${isLight ? 'bg-slate-200 text-slate-600' : 'bg-white/10 text-white'} hover:bg-opacity-80`}`}>
                                         {settings.plan === plan ? 'Current Plan' : 'Switch Plan'}
                                     </button>
                                 </div>
                             ))}
                        </div>
                        
                        <div className="mt-8 p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
                             <h3 className="text-sm font-bold text-red-500 flex items-center gap-2 mb-2"><AlertTriangle size={16}/> Danger Zone</h3>
                             <p className={`text-xs ${textSecondary} mb-4`}>Once you delete your account, there is no going back. Please be certain.</p>
                             <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 rounded-lg text-xs font-bold transition-all flex items-center gap-2">
                                 <Trash2 size={14}/> Delete Account
                             </button>
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const ThemeCard = ({ id, label, desc, bg, accent, darkText, onClick, isActive, textPrimary, textSecondary, isLight }) => (
    <div 
        onClick={onClick}
        className={`cursor-pointer rounded-2xl border-2 p-1 transition-all relative overflow-hidden group ${isActive ? 'border-blue-500 scale-[1.02]' : `${isLight ? 'border-slate-200' : 'border-white/10'} hover:border-blue-500/50`}`}
    >
        <div className={`h-24 w-full rounded-xl ${bg} relative overflow-hidden mb-3`}>
            <div className={`absolute top-2 left-2 w-12 h-3 ${darkText ? 'bg-slate-200' : 'bg-white/10'} rounded-md`}/>
            <div className={`absolute bottom-2 right-2 w-16 h-10 ${accent} opacity-20 rounded-lg`}/>
        </div>
        <div className="px-3 pb-2">
            <div className={`text-sm font-bold ${isActive ? 'text-blue-500' : textPrimary}`}>{label}</div>
            <div className={`text-[10px] ${textSecondary}`}>{desc}</div>
        </div>
        {isActive && <div className="absolute top-3 right-3 text-blue-500 bg-blue-500/20 p-1 rounded-full"><CheckCircle2 size={14}/></div>}
    </div>
);

const InputGroup = ({ label, value, onChange, icon, isArea, inputBg, textPrimary }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
            {icon} {label}
        </label>
        {isArea ? (
            <textarea 
                value={value} onChange={e => onChange(e.target.value)}
                className={`w-full h-24 ${inputBg} rounded-xl px-4 py-3 text-sm ${textPrimary} outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-all`}
            />
        ) : (
            <input 
                value={value} onChange={e => onChange(e.target.value)}
                className={`w-full ${inputBg} rounded-xl px-4 py-3 text-sm ${textPrimary} outline-none focus:ring-1 focus:ring-blue-500 transition-all`}
            />
        )}
    </div>
);

const ToggleItem = ({ title, desc, active, onClick, icon, cardBg, textPrimary, textSecondary, activeColor }) => (
    <div className={`flex items-center justify-between p-4 rounded-xl border ${cardBg}`}>
        <div className="flex items-start gap-3">
            <div className="p-2 bg-black/5 dark:bg-white/10 rounded-lg text-slate-400">{icon}</div>
            <div>
                <div className={`text-sm font-bold ${textPrimary}`}>{title}</div>
                <div className={`text-[11px] ${textSecondary}`}>{desc}</div>
            </div>
        </div>
        <button onClick={onClick} className={`transition-colors ${active ? activeColor : 'text-slate-400'}`}>
            {active ? <ToggleRight size={32} strokeWidth={1.5} className="fill-current opacity-20"/> : <ToggleLeft size={32} strokeWidth={1.5}/>}
        </button>
    </div>
);

export default Settings;