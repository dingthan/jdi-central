import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ 
  scrollY = 0, 
  activeSide = 'client', 
  setActiveSide = () => {}, 
  theme = 'dark', 
  toggleTheme = () => {}, 
  isMenuOpen = false, 
  setIsMenuOpen = () => {}, 
  setView = () => {}, 
  currentView = 'home' 
}) => {
  const themeMain = activeSide === 'client' ? '#1bd2a4' : '#3b82f6';
  const themeBg = activeSide === 'client' ? 'bg-[#1bd2a4]' : 'bg-blue-600';
  const themeText = activeSide === 'client' ? 'text-[#1bd2a4]' : 'text-blue-600';
  const themeBorder = activeSide === 'client' ? 'border-[#1bd2a4]/30' : 'border-blue-500/30';
  
  const isDark = theme === 'dark';

  const JDILogo = ({ side }) => (
    <div 
      onClick={() => setView('home')} 
      className="flex items-center gap-3 group cursor-pointer"
    >
      <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeDasharray="10 15"
            className={side === 'client' ? 'text-[#1bd2a4]' : 'text-blue-500'}
          />
        </svg>
        <div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center font-black text-[10px] md:text-xs italic rounded-sm transform transition-transform group-hover:scale-110 ${side === 'client' ? 'bg-[#1bd2a4]' : 'bg-blue-600'} text-white`}>
          JDI
        </div>
      </div>
      <div className={`text-lg md:text-xl font-black tracking-tighter uppercase italic leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Central<span className={side === 'client' ? 'text-[#1bd2a4]' : 'text-blue-500'}>.</span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden ${isDark ? 'bg-[#020203] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Background Grid */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${isDark ? 'opacity-[0.05]' : 'opacity-[0.08]'}`} 
           style={{ backgroundImage: `linear-gradient(${themeMain} 1px, transparent 1px), linear-gradient(90deg, ${themeMain} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      
      {/* Dynamic Ambient Glow */}
      <div 
        className={`fixed pointer-events-none transition-all duration-1000 ease-out z-0 ${isDark ? 'opacity-40' : 'opacity-20'}`}
        style={{
          width: '1000px',
          height: '1000px',
          background: activeSide === 'client' ? 'radial-gradient(circle, #1bd2a4 0%, transparent 70%)' : 'radial-gradient(circle, #2563eb 0%, transparent 70%)',
          left: activeSide === 'client' ? '30%' : '70%',
          top: '30%',
          transform: `translate(-50%, -50%) translate(${scrollY * 0.05}px, ${scrollY * 0.02}px)`,
          filter: 'blur(140px)'
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all duration-500 ${scrollY > 50 ? (isDark ? 'bg-black/60 backdrop-blur-xl py-4' : 'bg-white/80 backdrop-blur-xl py-4') : 'bg-transparent'}`}>
        <JDILogo side={activeSide}/>
        
        <div className="hidden lg:flex items-center space-x-10 font-bold uppercase text-[10px] tracking-[0.3em]">
          <a href="#" onClick={(e) => { e.preventDefault(); setView('hire-talents'); }} className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}>Hire Talent</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setView('solutions'); }} className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}>Solutions</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setView('case-studies'); }} className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}>Case Studies</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setView('client-login'); }} className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-blue-600'}`}>Client Login</a>
          <div className={`w-[1px] h-4 ${isDark ? 'bg-white/10' : 'bg-slate-300'}`} />
          <button 
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-300 hover:bg-slate-100'}`}
          >
            {isDark ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} className="text-blue-600" />}
            <span className="text-[9px] font-black">{isDark ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className={`hidden md:block px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl ${themeBg} ${activeSide === 'client' && isDark ? 'text-black' : 'text-white'}`}>
            Hire Top 3%
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${isDark ? 'text-white hover:bg-white/5' : 'text-slate-900 hover:bg-slate-100'}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-[60] lg:hidden p-6 transition-all duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-16">
            <JDILogo side={activeSide} />
            <button onClick={() => setIsMenuOpen(false)} className="p-2"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-10 text-4xl font-black uppercase italic italic tracking-tighter">
            <a href="#" onClick={() => setIsMenuOpen(false)}>Hire Talent</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Solutions</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Case Studies</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Client Login</a>
            <button 
              onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
              className="text-left flex items-center gap-4"
            >
              {isDark ? <Sun /> : <Moon />} {isDark ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
