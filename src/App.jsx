import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle2,
  Users,
  Star,
  Zap,
  Sparkles,
  Loader2,
  MessageSquare,
  Terminal,
  ShieldCheck,
  Globe,
  Briefcase,
  Cpu,
  Palette,
  Layout,
  BarChart3,
  Award,
  FileText,
  Search,
  Menu,
  X,
  Trophy,
  CalendarDays,
  HelpCircle
} from 'lucide-react';

/**
 * JDI Central - Color Adaptive Edition (Consultation Update)
 * "Hire Precision" -> Emerald Green (#1bd2a4)
 * "Build the Future" -> Electric Blue (#3b82f6)
 */

const apiKey = ""; 
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSide, setActiveSide] = useState('client'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    setStartX(e.touches[0].pageX - (marqueeRef.current?.offsetLeft || 0));
    setScrollLeft(marqueeRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e) => {
    if (!isPaused || !marqueeRef.current) return;
    const x = e.touches[0].pageX - (marqueeRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; 
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsPaused(false), 800);
  };

  const callGemini = async (prompt, systemPrompt) => {
    setAiLoading(true);
    setError(null);
    setAiResult(null);

    const fetchWithRetry = async (retries = 0) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });

        if (!response.ok) {
          if ((response.status === 429 || response.status >= 500) && retries < 5) {
            const delay = Math.pow(2, retries) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(retries + 1);
          }
          throw new Error('Failed to connect to AI Engine');
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (err) {
        if (retries < 5) {
          const delay = Math.pow(2, retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchWithRetry(retries + 1);
        }
        throw err;
      }
    };

    try {
      const result = await fetchWithRetry();
      setAiResult(result);
    } catch (err) {
      setError("The AI Engine is currently at capacity. Please try again in a moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiConsult = () => {
    if (!userInput.trim()) return;
    let systemPrompt, prompt;
    if (activeSide === 'client') {
      systemPrompt = "You are an expert Technical Recruiter at JDI Central. Generate a high-impact, professional Job Description.";
      prompt = `Create an elite Job Description for: ${userInput}.`;
    } else {
      systemPrompt = "You are an elite Technical Architect at JDI Central. Architect the ideal JDI squad.";
      prompt = `Project Vision: ${userInput}.`;
    }
    callGemini(prompt, systemPrompt);
  };

  const stats = [
    { label: 'Talent Pass Rate', value: 'Top 3%' },
    { label: 'Client Retention', value: '97%' },
    { label: 'Global Availability', value: '24/7' },
    { label: 'Time to Hire', value: '< 48h' },
  ];

  const skillsets = [
    { role: "Developers", icon: <Cpu size={20} /> },
    { role: "Designers", icon: <Palette size={20} /> },
    { role: "Project Managers", icon: <Briefcase size={20} /> },
    { role: "Product Managers", icon: <Layout size={20} /> },
    { role: "Marketing Experts", icon: <BarChart3 size={20} /> },
  ];

  // Logic: client -> Emerald Green, talent -> Electric Blue
  const themeMain = activeSide === 'client' ? '#1bd2a4' : '#3b82f6';
  const themeBg = activeSide === 'client' ? 'bg-[#1bd2a4]' : 'bg-blue-600';
  const themeText = activeSide === 'client' ? 'text-[#1bd2a4]' : 'text-blue-500';
  const themeBorder = activeSide === 'client' ? 'border-[#1bd2a4]/30' : 'border-blue-500/30';

  const JDILogo = ({ side }) => (
    <div className="flex items-center gap-3 group cursor-pointer">
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
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeDasharray="1 98" 
            strokeLinecap="round"
            className={side === 'client' ? 'text-[#1bd2a4]/80' : 'text-blue-400'}
          />
        </svg>
        <div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center font-black text-[10px] md:text-xs italic rounded-sm transform transition-transform group-hover:scale-110 ${side === 'client' ? 'bg-[#1bd2a4]' : 'bg-blue-600'} text-white`}>
          JDI
        </div>
      </div>
      <div className="text-lg md:text-xl font-black tracking-tighter uppercase italic leading-none">
        Central<span className={side === 'client' ? 'text-[#1bd2a4]' : 'text-blue-500'}>.</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]" 
           style={{ backgroundImage: `linear-gradient(${themeMain} 1px, transparent 1px), linear-gradient(90deg, ${themeMain} 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      
      {/* Dynamic Ambient Glow */}
      <div 
        className="fixed pointer-events-none transition-all duration-1000 ease-out z-0 opacity-40"
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
      <nav className="fixed top-0 w-full z-50 mix-blend-difference px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/10">
        <JDILogo side={activeSide}/>
        <div className="hidden md:flex space-x-10 font-bold uppercase text-[10px] tracking-[0.3em]">
          <a href="#" className="hover:text-blue-400 transition-colors">Hire Talent</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Solutions</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Case Studies</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">Client Login</a>
        </div>
        <button className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl ${themeBg} ${activeSide === 'client' ? 'text-black' : 'text-white'}`}>
          Hire Top 3%
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 min-h-[90vh] flex flex-col justify-center px-6 z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-6 relative">
          
          {/* Hire Precision - EMERALD */}
          <div 
            onMouseEnter={() => { setActiveSide('client'); setAiResult(null); }} 
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-pointer ${activeSide === 'client' ? 'bg-[#1bd2a4]/5 border-[#1bd2a4]/40' : 'opacity-40 border-transparent hover:opacity-60'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#1bd2a4]/50 text-[#1bd2a4] text-[10px] font-bold tracking-widest uppercase bg-[#1bd2a4]/10">
              <Star size={14} fill="currentColor" /> World-Class Talent
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Hire <br /><span className="text-transparent stroke-green">Precision.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">Access individual elite software engineers and designers.</p>
            <button className="flex items-center gap-4 bg-[#1bd2a4] hover:bg-[#18b88f] text-black px-8 py-4 rounded-sm font-black transition-all italic group">
              HIRE TOP TALENT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Build the Future - BLUE */}
          <div 
            onMouseEnter={() => { setActiveSide('talent'); setAiResult(null); }} 
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-pointer ${activeSide === 'talent' ? 'bg-blue-600/5 border-blue-500/40' : 'opacity-40 border-transparent hover:opacity-60'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-blue-500/50 text-blue-400 text-[10px] font-bold tracking-widest uppercase bg-blue-500/10">
              <Zap size={14} fill="currentColor" /> Full Solutions
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Build <br /><span className="text-transparent stroke-blue">The Future.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">Deploy a dedicated JDI squad to ship mission-critical products.</p>
            <button className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-sm transition-all italic group">
              START A PROJECT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-16 bg-black overflow-hidden relative border-y border-white/5 cursor-grab active:cursor-grabbing">
        <div ref={marqueeRef} className={`flex whitespace-nowrap animate-marquee-fast ${isPaused ? 'pause' : ''}`}>
          {[...skillsets, ...skillsets, ...skillsets].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-8 mx-12 transition-all duration-300 select-none">
              <span className={`transition-colors duration-500 ${themeText} opacity-40`}>{skill.icon}</span>
              <span className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white/30 hover:text-white transition-colors duration-300">{skill.role}</span>
              <span className={`w-2 h-2 rounded-full ${themeBg} opacity-20 mx-4 transition-colors duration-500`} />
            </div>
          ))}
        </div>
      </section>

      {/* DYNAMIC AI SECTION */}
      <section className="relative py-24 px-6 z-10 border-b border-white/5 bg-[#050507]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 transition-all duration-500">
            {activeSide === 'client' ? (
              <FileText className="text-[#1bd2a4] animate-pulse" size={28} />
            ) : (
              <Sparkles className="text-blue-500 animate-pulse" size={28} />
            )}
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-center">
              {activeSide === 'client' ? 'AI Job Architect' : 'AI Project Architect'}
            </h2>
          </div>
          <div className={`bg-white/5 border rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl transition-all duration-700 ${themeBorder}`}>
            <p className="text-slate-400 mb-6 text-center text-sm font-medium">
              {activeSide === 'client' 
                ? "Draft a world-class Job Description to attract elite talent instantly. ✨"
                : "Describe your project vision and get a professional squad blueprint. ✨"}
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <input 
                  value={userInput} 
                  onChange={(e) => setUserInput(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && handleAiConsult()}
                  placeholder={activeSide === 'client' ? "e.g., Senior Full Stack Engineer (Rust/React)" : "What are you building?"} 
                  className={`w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-6 py-4 focus:outline-none text-white placeholder:text-slate-600 transition-all ${activeSide === 'client' ? 'focus:border-[#1bd2a4]' : 'focus:border-blue-500'}`} 
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  {activeSide === 'client' ? <Search size={18} /> : <Terminal size={18} />}
                </div>
              </div>
              <button 
                onClick={handleAiConsult} 
                disabled={aiLoading} 
                className={`px-8 py-4 rounded-lg font-black italic transition-all disabled:opacity-50 min-w-[220px] shadow-lg hover:shadow-xl ${themeBg} ${activeSide === 'client' ? 'text-black hover:bg-[#18b88f]' : 'text-white hover:bg-blue-500'}`}
              >
                {aiLoading ? <Loader2 className="animate-spin mx-auto" /> : (activeSide === 'client' ? "GENERATE DESCRIPTION" : "DRAFT BLUEPRINT")}
              </button>
            </div>
            
            {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-4 text-center">{error}</div>}
            
            {aiResult && (
              <div className="p-8 rounded-lg bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-h-[500px] overflow-y-auto custom-scrollbar">
                <div className="flex items-start gap-4">
                  <MessageSquare className={themeText} />
                  <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {aiResult}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-6xl font-black italic mb-2 tracking-tighter">{s.value}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 text-[10rem] font-black opacity-[0.03] select-none pointer-events-none -mr-20 uppercase">SYSTEMS</div>
      </section>

      {/* Screening Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8 leading-tight">
              The <span className={`transition-colors duration-700 ${themeText}`}>Top 3%</span> Screening Process.
            </h2>
            <div className="space-y-6">
              {["Language & Personality Evaluation", "In-Depth Technical Deep Dive", "Live Technical Screening", "Trial-to-Hire Guarantee"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white font-bold uppercase italic tracking-wider text-sm">
                  <CheckCircle2 className={`transition-colors duration-700 ${themeText}`} size={20} /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: <Users size={32} />, title: "Build Teams", desc: "Scale with pre-vetted seniors." },
              { icon: <Terminal size={32} />, title: "Tech Depth", desc: "AI, Fintech, Web Specialists.", offset: true },
              { icon: <ShieldCheck size={32} />, title: "Zero Risk", desc: "Trial periods ensure fit." },
              { icon: <Globe size={32} />, title: "Global Reach", desc: "Borderless expertise.", offset: true }
            ].map((card, idx) => (
              <div key={idx} className={`bg-[#0a0a0c] p-8 rounded-[2rem] border border-white/5 transition-all duration-700 hover:${themeBorder} ${card.offset ? 'mt-12' : ''}`}>
                <div className={`mb-6 transition-colors duration-700 ${themeText}`}>{card.icon}</div>
                <h4 className="font-black uppercase italic mb-2">{card.title}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION SECTION (NEW) */}
      <section className="py-24 px-6 relative z-10 border-y border-white/5 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-[#0a0a0c] p-8 md:p-16 rounded-[3rem] border border-white/10 overflow-hidden relative group">
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 transition-colors duration-700 ${themeBg}`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className={themeText} size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Still Deciding?</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-4 leading-[0.9]">
                Not Sure <br />Where to <span className={themeText}>Start?</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-sm">
                Speak with our strategy team to determine the best model for your unique business goals.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto">
              <a 
                href="#" 
                className={`flex items-center justify-center gap-4 px-10 py-6 rounded-sm font-black text-lg uppercase italic transition-all shadow-2xl hover:scale-105 active:scale-95 ${themeBg} ${activeSide === 'client' ? 'text-black' : 'text-white'}`}
              >
                <CalendarDays size={24} />
                BOOK A FREE CONSULTATION
                <ArrowRight size={20} />
              </a>
              <p className="text-center md:text-left text-[9px] uppercase tracking-widest text-slate-600 mt-4 font-black">
                15-Minute Strategy Session • No Obligation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Freelancer Network CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className={`absolute inset-0 opacity-10 transition-colors duration-700 ${themeBg}`} style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' }}></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-8">
            <Award className={themeText} size={40} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-6 tracking-tighter leading-none">
            Are you part of the <span className={themeText}>Top 3%?</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join our elite network and work with world-class companies on meaningful, high-impact projects.
          </p>
          <button className={`group flex items-center gap-6 mx-auto px-12 py-6 rounded-sm font-black text-lg uppercase italic transition-all transform hover:scale-105 ${themeBg} ${activeSide === 'client' ? 'text-black' : 'text-white'}`}>
            APPLY AS FREELANCER
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <JDILogo side={activeSide} />
            <p className="text-slate-500 mt-6 mb-8 leading-relaxed font-medium">
              The platform bridging the gap between high-stakes tech needs and world-class freelance talent. Built for speed, scale, and strange success.
            </p>
            <div className="flex gap-4">
               <div className="w-3 h-3 rounded-full bg-[#1bd2a4] animate-pulse" />
               <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse delay-75" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] uppercase font-black tracking-[0.3em]">
            <div className="flex flex-col gap-5 text-slate-500">
              <span className="text-white mb-2">Hire</span>
              <a href="#" className="hover:text-[#1bd2a4] transition-colors">Project Audit</a>
              <a href="#" className="hover:text-[#1bd2a4] transition-colors">Squad Search</a>
              <a href="#" className="hover:text-[#1bd2a4] transition-colors">Pricing</a>
            </div>
            <div className="flex flex-col gap-5 text-slate-500">
              <span className="text-white mb-2">Build</span>
              <a href="#" className="hover:text-blue-500 transition-colors">Talent Network</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Career Path</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Remote Roles</a>
            </div>
            <div className="flex flex-col gap-5 text-slate-500">
              <span className="text-white mb-2">Social</span>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-blue { -webkit-text-stroke: 1.5px #3b82f6; }
        .stroke-green { -webkit-text-stroke: 1.5px #1bd2a4; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-fast { animation: marquee-fast 15s linear infinite; }
        .pause { animation-play-state: paused !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default App;
