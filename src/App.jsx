import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // <--- IMPORT THIS
import Layout from './components/Layout';
import Dashboard from './components/Dashboard'; 
import CreativeEngine from './pages/CreativeEngine';
import TrendPulse from './pages/TrendPulse';
import NeuralInbox from './pages/NeuralInbox';
import SocialGrid from './pages/SocialGrid';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Profile from './pages/Profile'; 
import PostComposer from './pages/PostComposer'; 

function App() {
  return (
    // 1. WRAP EVERYTHING IN THEME PROVIDER
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} /> 
            <Route path="creative" element={<CreativeEngine />} />
            <Route path="trends" element={<TrendPulse />} />
            <Route path="inbox" element={<NeuralInbox />} />
            <Route path="social" element={<SocialGrid />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="compose" element={<PostComposer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;