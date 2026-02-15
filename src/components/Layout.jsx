import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, TrendingUp, MessageSquare, Sparkles, 
  Globe, BarChart3, Settings, Cpu, ChevronLeft, ChevronRight, 
  Plus, User, Bell, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreatePostModal from './CreatePostModal';
import { useTheme } from '../context/ThemeContext'; 

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // <--- NEW MOBILE STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for Modal Logic
  const [modalMode, setModalMode] = useState('text'); 
  const [modalPrompt, setModalPrompt] = useState(''); 

  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // GET THEME FROM CONTEXT
  const { activeTheme } = useTheme(); 
  
  // Helper to detect if we are in a Light Mode theme
  const isLight = activeTheme.textColor === 'text-slate-900';
  const borderColor = isLight ? 'border-slate-200' : 'border-white/5';

  const handleOpenModal = (mode = 'text', prompt = '') => {
    setModalMode(mode);
    setModalPrompt(prompt); 
    setIsModalOpen(true);
  };

  // Close mobile menu when a link is clicked
  const handleNavClick = (path) => {
      navigate(path);
      setMobileMenuOpen(false);
  };

  return (
    // DYNAMIC BACKGROUND & TEXT COLOR
    <div className={`flex h-screen ${activeTheme.appBg} ${activeTheme.textColor} font-sans overflow-hidden transition-colors duration-500 selection:bg-${activeTheme.primary}-500/30`}>
      
      {/* GLOBAL BACKGROUND TEXTURE & ORBS */}
      <div className="fixed inset-0 pointer-events-none font-mono z-0">
        {activeTheme.bgImage !== 'none' && (
            <div 
                className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
                style={{ backgroundImage: activeTheme.bgImage }} 
            />
        )}
        {activeTheme.name !== 'Carbon Executive' && (
            <>
                <div className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] ${isLight ? 'opacity-10' : 'opacity-20'} bg-${activeTheme.primary}-500 transition-all duration-1000`}/>
                <div className={`absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] ${isLight ? 'opacity-10' : 'opacity-20'} bg-${activeTheme.primary}-600 transition-all duration-1000`}/>
            </>
        )}
      </div>

      {/* MOBILE OVERLAY BACKDROP */}
      {mobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR (Responsive) */}
      <motion.aside 
        animate={{ 
            width: sidebarCollapsed ? 80 : 288,
            x: mobileMenuOpen ? 0 : -300 // Hide on mobile (x: -300) unless open
        }} 
        // We use CSS class 'lg:translate-x-0' to force show it on desktop
        className={`fixed lg:static inset-y-0 left-0 z-50 border-r ${borderColor} flex flex-col p-6 ${activeTheme.sidebarBg} backdrop-blur-2xl transition-all duration-300 lg:transform-none shadow-2xl lg:shadow-none`}
      >
        <div className="flex flex-col h-full justify-between">
            <div>
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick('/')}>
                        <div className="relative group shrink-0">
                            <div className={`absolute inset-0 bg-${activeTheme.primary}-400 rounded-xl blur group-hover:blur-md transition-all opacity-40`}></div>
                            <div className={`relative w-11 h-11 ${isLight ? 'bg-white border-slate-200' : 'bg-black border-white/20'} border rounded-xl flex items-center justify-center`}>
                                <Cpu className={`text-${activeTheme.primary}-500`} size={24} />
                            </div>
                        </div>
                        {!sidebarCollapsed && (
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col whitespace-nowrap">
                                <span className={`font-black text-xl tracking-tighter ${isLight ? 'text-slate-900' : 'text-white'}`}>DINO.AI</span>
                                <span className={`text-[10px] tracking-[0.2em] text-${activeTheme.primary}-500 font-bold uppercase`}>System Active</span>
                            </motion.div>
                        )}
                    </div>
                    {/* Mobile Close Button */}
                    <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-500 hover:text-white"><X size={20}/></button>
                </div>
                
                <nav className="space-y-2">
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<LayoutDashboard size={18}/>} label="Neural Hub" active={isActive('/')} onClick={() => handleNavClick('/')} />
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<TrendingUp size={18}/>} label="Trend Pulse" active={isActive('/trends')} onClick={() => handleNavClick('/trends')} />
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<MessageSquare size={18}/>} label="Neural Inbox" active={isActive('/inbox')} onClick={() => handleNavClick('/inbox')} />
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<Sparkles size={18}/>} label="Creative Engine" active={isActive('/creative')} badge="PRO" onClick={() => handleNavClick('/creative')} />
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<Globe size={18}/>} label="Social Grid" active={isActive('/social')} onClick={() => handleNavClick('/social')} />
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<BarChart3 size={18}/>} label="Analytics" active={isActive('/analytics')} onClick={() => handleNavClick('/analytics')} />
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<User size={18}/>} label="Profile" active={isActive('/profile')} onClick={() => handleNavClick('/profile')} />
                    
                    <div className={`h-px ${isLight ? 'bg-slate-200' : 'bg-white/5'} my-2`} />
                    
                    <NavItem themeColor={activeTheme.primary} isLight={isLight} collapsed={sidebarCollapsed} icon={<Settings size={18}/>} label="Settings" active={isActive('/settings')} onClick={() => handleNavClick('/settings')} />
                </nav>
            </div>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`hidden lg:flex mt-4 p-2 ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-white/5 hover:bg-white/10 text-white'} rounded-lg w-full justify-center transition-colors`}>{sidebarCollapsed ? <ChevronRight size={16}/> : <ChevronLeft size={16}/>}</button>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative z-10 overflow-hidden w-full">
        <header className={`h-20 lg:h-24 border-b ${borderColor} flex items-center justify-between px-6 lg:px-10 ${activeTheme.headerBg} backdrop-blur-md relative z-30 transition-all duration-500`}>
          <div className="flex items-center gap-4">
             {/* Mobile Menu Trigger */}
             <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-white"><Menu size={24}/></button>
             
             <div className="flex flex-col">
                <h1 className={`text-xl lg:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'} tracking-tight italic uppercase truncate max-w-[200px] lg:max-w-none`}>
                    {location.pathname === '/' ? 'NEURAL HUB' : location.pathname.replace('/', '').replace('-', ' ').toUpperCase()}
                </h1>
                <div className={`hidden lg:flex items-center gap-2 text-[10px] text-${activeTheme.primary}-500/80 font-mono`}><span className={`w-1.5 h-1.5 rounded-full bg-${activeTheme.primary}-500 animate-pulse`} /> ONLINE</div>
             </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <button className={`p-2 rounded-full relative transition-colors ${isLight ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'}`}>
                <Bell size={20}/>
                <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-${activeTheme.primary}-500 border ${isLight ? 'border-white' : 'border-black'}`}/>
            </button>

            <button 
                onClick={() => navigate('/compose')} 
                className={`group relative px-4 lg:px-6 py-2.5 lg:py-3 overflow-hidden rounded-xl bg-${activeTheme.primary}-500 text-white font-black text-xs lg:text-sm tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-lg shadow-${activeTheme.primary}-500/30`}
            >
              <span className="relative z-10 flex items-center gap-2"><Plus size={18} strokeWidth={3} /> <span className="hidden lg:inline">INITIALIZE_POST</span><span className="lg:hidden">POST</span></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar">
            <Outlet context={{ openModal: handleOpenModal }} />
        </div>
      </main>

      <CreatePostModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialMode={modalMode}
        initialPrompt={modalPrompt} 
      />
    </div>
  );
};

// Updated NavItem
const NavItem = ({ icon, label, active, badge, onClick, collapsed, themeColor, isLight }) => (
    <motion.button 
        onClick={onClick} 
        whileHover={{ x: 4, backgroundColor: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)' }} 
        className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-3.5 rounded-xl transition-all relative overflow-hidden group 
        ${active 
            ? `bg-${themeColor}-500/10 text-${themeColor}-600 border border-${themeColor}-500/20` 
            : `text-slate-500 ${isLight ? 'hover:text-slate-800' : 'hover:text-slate-200'} border border-transparent`
        }`}
    >
        {active && <div className={`absolute inset-0 bg-${themeColor}-500/5 z-0`} />}
        <div className="flex items-center gap-4 z-10">
            <span className={active ? `text-${themeColor}-500 drop-shadow-md` : `group-hover:text-${themeColor}-500 transition-colors`}>{icon}</span>
            {!collapsed && <span className={`text-sm font-bold tracking-tight ${active ? (isLight ? 'text-slate-900' : 'text-white') : ''}`}>{label}</span>}
        </div>
        {!collapsed && badge && <span className={`text-[9px] bg-${themeColor}-500/20 text-${themeColor}-600 border border-${themeColor}-500/30 px-2 py-0.5 rounded-md font-black italic font-mono`}>{badge}</span>}
    </motion.button>
);

export default Layout;