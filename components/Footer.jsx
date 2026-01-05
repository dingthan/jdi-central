import React from 'react';

const Footer = ({ theme, activeSide, setView }) => {
  const isDark = theme === 'dark';
  const themeBg = activeSide === 'client' ? 'bg-[#1bd2a4]' : 'bg-[#3b82f6]';
  const themeText = activeSide === 'client' ? 'text-[#1bd2a4]' : 'text-[#3b82f6]';

  // Internal Logo Component for Footer (Static)
  const FooterLogo = () => (
    <div className="flex items-center gap-3 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onClick={() => setView('home')}>
      <div className={`w-8 h-8 flex items-center justify-center font-black italic rounded-sm ${themeBg} text-white text-[10px]`}>
        JDI
      </div>
      <div className={`text-lg font-black uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Central<span className={themeText}>.</span>
      </div>
    </div>
  );

  return (
    <footer className={`py-24 px-6 border-t ${isDark ? 'bg-black border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-20 relative z-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <FooterLogo />
          <h3 className="text-5xl font-black uppercase italic tracking-tighter leading-[0.85] mt-8 mb-8">
            LET'S <span className={themeText}>SCALE</span><br />WHAT MATTERS.
          </h3>
          <p className="text-xs opacity-40 font-bold uppercase tracking-widest leading-relaxed max-w-sm">
            Building the future of tech in Southeast Asia. Vetting the top 3% for global growth.
          </p>
        </div>
        
        {/* Links Column 1 */}
        <div className="space-y-8">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Platform</div>
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => setView('hire-talents')} className="text-left hover:opacity-100 opacity-60 transition-opacity">Hire Talent</button>
            <button onClick={() => setView('solutions')} className="text-left hover:opacity-100 opacity-60 transition-opacity">Solutions</button>
            <button onClick={() => setView('case-studies')} className="text-left hover:opacity-100 opacity-60 transition-opacity">Case Studies</button>
          </div>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-8">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Connect</div>
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">LinkedIn</a>
            <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">Twitter / X</a>
            <a href="#" className="hover:opacity-100 opacity-60 transition-opacity">Instagram</a>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="max-w-[1600px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
        <div>© 2024 JDI Group. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
