import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Briefcase, 
  Code, 
  ZapOff, 
  Menu, 
  X 
} from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSide, setActiveSide] = useState('client'); 

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: 'Verified Talents', value: '2,500+' },
    { label: 'Projects Shipped', value: '480+' },
    { label: 'Avg. Match Time', value: '48h' },
    { label: 'Growth Index', value: '142%' },
  ];

  const JDILogo = ({ side }) => (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 15" className={side === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'} />
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="1 98" strokeLinecap="round" className={side === 'client' ? 'text-blue-400' : 'text-[#1bd2a4]/80'} />
        </svg>
        <div className={`w-7 h-7 flex items-center justify-center font-black text-xs italic rounded-sm transform transition-transform group-hover:scale-110 ${side === 'client' ? 'bg-blue-600' : 'bg-[#1bd2a4]'} text-white`}>
          JDI
        </div>
      </div>
      <div className="text-xl font-black tracking-tighter uppercase italic leading-none">
        Central<span className={side === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'}>.</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-[#1bd2a4] selection:text-black overflow-x-hidden">
      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      {/* Animated Aura */}
      <div 
        className="fixed pointer-events-none transition-transform duration-1000 ease-out z-0 opacity-40"
        style={{
          width: '800px',
          height: '800px',
          background: activeSide === 'client' 
            ? 'radial-gradient(circle, #2563eb 0%, transparent 70%)' 
            : 'radial-gradient(circle, #1bd2a4 0%, transparent 70%)',
          left: activeSide === 'client' ? '20%' : '60%',
          top: '30%',
          transform: `translate(-50%, -50%) translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
          filter: 'blur(120px)'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-6 flex justify-between items-center">
        <JDILogo side={activeSide} />
        <div className="hidden md:flex space-x-12 font-medium uppercase text-[10px] tracking-[0.4em]">
          <a href="#" className="hover:text-blue-400 transition-colors">Hire Talent</a>
          <a href="#" className="hover:text-[#1bd2a4] transition-colors">Build Career</a>
          <a href="#" className="hover:text-white/50 transition-colors">Network</a>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-3 rounded-full hover:scale-110 transition-transform active:scale-95 ${activeSide === 'client' ? 'bg-blue-600' : 'bg-[#1bd2a4]'} text-white`}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 min-h-screen flex flex-col justify-center px-6">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-4 relative z-10">
          <div 
            onMouseEnter={() => setActiveSide('client')}
            className={`group relative p-8 md:p-12 rounded-[2rem] transition-all duration-500 border-2 ${activeSide === 'client' ? 'bg-blue-600/5 border-blue-500/40' : 'bg-transparent border-transparent opacity-40'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-blue-500/50 text-blue-400 text-[10px] font-bold tracking-widest uppercase bg-blue-500/10">
              <ZapOff size={14} /> Zero Commitment
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Hire <br /><span className="text-transparent stroke-blue">Precision.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">Deploy elite tech squads for specific projects. Zero overhead.</p>
            <button className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-sm font-black transition-all italic">
              BUILD A PROJECT <ArrowRight size={20} />
            </button>
          </div>

          <div 
            onMouseEnter={() => setActiveSide('talent')}
            className={`group relative p-8 md:p-12 rounded-[2rem] transition-all duration-500 border-2 ${activeSide === 'talent' ? 'bg-[#1bd2a4]/5 border-[#1bd2a4]/40' : 'bg-transparent border-transparent opacity-40'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#1bd2a4]/50 text-[#1bd2a4] text-[10px] font-bold tracking-widest uppercase bg-[#1bd2a4]/10">
              <TrendingUp size={14} /> Global Scale
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Own <br /><span className="text-transparent stroke-green">Your Growth.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">Secure high-impact remote roles with global innovators.</p>
            <button className="flex items-center gap-4 bg-[#1bd2a4] hover:bg-[#18b88f] text-black font-black px-8 py-4 rounded-sm transition-all italic">
              SECURE YOUR PROFILE <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white text-black relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
          {stats.map((s, i) => (
            <div key={i} className="border-l-4 border-black pl-6">
              <div className="text-5xl font-black italic mb-1">{s.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a0c] p-10 rounded-[2rem] border border-white/5 hover:border-blue-500/50 transition-colors">
            <ShieldCheck size={32} className="text-blue-500 mb-8" />
            <h3 className="text-2xl font-bold mb-4 uppercase italic">Vetted Quality</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Every talent undergoes a rigorous technical audit.</p>
          </div>
          <div className="bg-[#0a0a0c] p-10 rounded-[2rem] border border-white/5 hover:border-[#1bd2a4]/50 transition-colors">
            <Zap size={32} className="text-[#1bd2a4] mb-8" />
            <h3 className="text-2xl font-bold mb-4 uppercase italic">Rapid Deployment</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Hire full-stack squads in under 48 hours.</p>
          </div>
          <div className="bg-[#0a0a0c] p-10 rounded-[2rem] border border-white/5 hover:border-blue-500/50 transition-colors">
            <Terminal size={32} className="text-blue-500 mb-8" />
            <h3 className="text-2xl font-bold mb-4 uppercase italic">Career Stacking</h3>
            <p className="text-slate-500 leading-relaxed font-medium">Find career-defining projects with top-tier companies.</p>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-blue { -webkit-text-stroke: 1.5px #3b82f6; }
        .stroke-green { -webkit-text-stroke: 1.5px #1bd2a4; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}} />
    </div>
  );
};

export default App;
