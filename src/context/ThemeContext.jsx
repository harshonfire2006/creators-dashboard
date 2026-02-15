import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('cyber'); 

  const themes = {
    cyber: {
      name: 'Cyber Depth',
      primary: 'cyan',
      bgImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      appBg: 'bg-[#020617]',
      sidebarBg: 'bg-black/40',
      textColor: 'text-slate-200',
      cardBg: 'bg-white/5',
      headerBg: 'bg-black/20'
    },
    nebula: {
      name: 'Nebula Dream',
      primary: 'purple',
      bgImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
      appBg: 'bg-[#0b0415]',
      sidebarBg: 'bg-[#0f0720]/60',
      textColor: 'text-slate-200',
      cardBg: 'bg-white/5',
      headerBg: 'bg-black/20'
    },
    carbon: {
      name: 'Carbon Executive',
      primary: 'indigo', // Indigo is very professional/calm
      bgImage: 'none',   // No distracting noise
      appBg: 'bg-[#0f172a]', // Slate-900 (Deep Blue-Grey, very restful)
      sidebarBg: 'bg-[#1e293b]', // Slate-800 (Slightly lighter matte)
      textColor: 'text-slate-200',
      cardBg: 'bg-[#1e293b] border-slate-700', // Solid matte cards
      headerBg: 'bg-[#0f172a]/90'
    },
    arctic: {
      name: 'Arctic Pro',
      primary: 'blue',
      bgImage: 'none',
      appBg: 'bg-[#f8fafc]', // Light Mode
      sidebarBg: 'bg-white',
      textColor: 'text-slate-900', // Dark text for light mode
      cardBg: 'bg-white shadow-sm border-slate-200',
      headerBg: 'bg-white/80'
    },
    obsidian: {
      name: 'Obsidian Gold',
      primary: 'amber',
      bgImage: 'none',
      appBg: 'bg-[#000000]',
      sidebarBg: 'bg-[#0a0a0a]',
      textColor: 'text-slate-200',
      cardBg: 'bg-[#111111] border-white/5',
      headerBg: 'bg-black/40'
    }
  };

  const activeTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);