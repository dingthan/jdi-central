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
  Trophy,
  CalendarDays,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

/**
 * JDI Central - Adaptive Theme Edition
 * Dark/Light Mode Support
 * "Hire Precision" -> Emerald Green (#1bd2a4)
 * "Build the Future" -> Electric Blue (#3b82f6)
 */

const apiKey = ""; 
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSide, setActiveSide] = useState('client'); 
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

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

  const themeMain = activeSide === 'client' ? '#1bd2a4' : '#3b82f6';
  const themeBg = activeSide === 'client' ? 'bg-[#1bd2a4]' : 'bg-blue-600';
  const themeText = activeSide === 'client' ? 'text-[#1bd2a4]' : 'text-blue-600';
  const themeBorder = activeSide === 'client' ? 'border-[#1bd2a4]/30' : 'border-blue-500/30';
  
  const isDark = theme === 'dark';

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
      <nav className={`fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center transition-all duration-500 ${scrollY > 50 ? (isDark ? 'mix-blend-difference bg-black/60 backdrop-blur-xl py-4' : 'bg-white/80 backdrop-blur-xl py-4') : 'bg-transparent'}`}>
        <JDILogo side={activeSide}/>
        
        <div className="hidden lg:flex items-center space-x-10 font-bold uppercase text-[10px] tracking-[0.3em]">
          <a href="#" className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}>Hire Talent</a>
          <a href="#" className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}>Solutions</a>
          <a href="#" className={`transition-colors ${isDark ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`}>Case Studies</a>
          <a href="#" className={`transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-blue-600'}`}>Client Login</a>
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

      {/* Hero Section */}
      <section className="relative pt-32 min-h-[90vh] flex flex-col justify-center px-6 z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-6 relative">
          
          {/* Hire Precision - EMERALD */}
          <div 
            onMouseEnter={() => { setActiveSide('client'); setAiResult(null); }} 
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-pointer ${activeSide === 'client' ? (isDark ? 'bg-[#1bd2a4]/5 border-[#1bd2a4]/40' : 'bg-[#1bd2a4]/10 border-[#1bd2a4]/60') : 'opacity-40 border-transparent hover:opacity-60'}`}
          >
            <div className={`mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${isDark ? 'border-[#1bd2a4]/50 text-[#1bd2a4] bg-[#1bd2a4]/10' : 'border-[#1bd2a4] text-[#0f8b6b] bg-white'}`}>
              <Star size={14} fill="currentColor" /> World-Class Talent
            </div>
            <h1 className={`text-5xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Hire <br /><span className={`text-transparent ${isDark ? 'stroke-green-dark' : 'stroke-green-light'}`}>Precision.</span>
            </h1>
            <p className={`text-lg mb-8 max-w-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Access individual elite software engineers and designers.</p>
            <button className={`flex items-center gap-4 bg-[#1bd2a4] hover:bg-[#18b88f] text-black px-8 py-4 rounded-sm font-black transition-all italic group shadow-lg`}>
              HIRE TOP TALENT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Build the Future - BLUE */}
          <div 
            onMouseEnter={() => { setActiveSide('talent'); setAiResult(null); }} 
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-pointer ${activeSide === 'talent' ? (isDark ? 'bg-blue-600/5 border-blue-500/40' : 'bg-blue-600/10 border-blue-500/60') : 'opacity-40 border-transparent hover:opacity-60'}`}
          >
            <div className={`mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border text-[10px] font-bold tracking-widest uppercase ${isDark ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' : 'border-blue-600 text-blue-700 bg-white'}`}>
              <Zap size={14} fill="currentColor" /> Full Solutions
            </div>
            <h1 className={`text-5xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Build <br /><span className={`text-transparent ${isDark ? 'stroke-blue-dark' : 'stroke-blue-light'}`}>The Future.</span>
            </h1>
            <p className={`text-lg mb-8 max-w-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Deploy a dedicated JDI squad to ship mission-critical products.</p>
            <button className={`flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-sm transition-all italic group shadow-lg`}>
              START A PROJECT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className={`py-16 overflow-hidden relative border-y cursor-grab active:cursor-grabbing ${isDark ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
        <div ref={marqueeRef} className={`flex whitespace-nowrap animate-marquee-fast ${isPaused ? 'pause' : ''}`}>
          {[...skillsets, ...skillsets, ...skillsets].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-8 mx-12 transition-all duration-300 select-none">
              <span className={`transition-colors duration-500 ${themeText} ${isDark ? 'opacity-40' : 'opacity-70'}`}>{skill.icon}</span>
              <span className={`text-3xl md:text-5xl font-black uppercase italic tracking-tighter transition-colors duration-300 ${isDark ? 'text-white/30 hover:text-white' : 'text-slate-300 hover:text-slate-900'}`}>{skill.role}</span>
              <span className={`w-2 h-2 rounded-full ${themeBg} opacity-20 mx-4 transition-colors duration-500`} />
            </div>
          ))}
        </div>
      </section>

      {/* AI SECTION */}
      <section className={`relative py-24 px-6 z-10 border-b ${isDark ? 'bg-[#050507] border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 transition-all duration-500">
            {activeSide === 'client' ? (
              <FileText className="text-[#1bd2a4] animate-pulse" size={28} />
            ) : (
              <Sparkles className="text-blue-600 animate-pulse" size={28} />
            )}
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-center">
              {activeSide === 'client' ? 'AI Job Architect' : 'AI Project Architect'}
            </h2>
          </div>
          <div className={`border rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl transition-all duration-700 ${isDark ? 'bg-white/5 ' + themeBorder : 'bg-white border-slate-200 shadow-slate-200'}`}>
            <p className={`mb-6 text-center text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
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
                  className={`w-full rounded-lg pl-12 pr-6 py-4 focus:outline-none transition-all ${isDark ? 'bg-black/50 border border-white/10 text-white placeholder:text-slate-600' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400'} ${activeSide === 'client' ? 'focus:border-[#1bd2a4]' : 'focus:border-blue-500'}`} 
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  {activeSide === 'client' ? <Search size={18} /> : <Terminal size={18} />}
                </div>
              </div>
              <button 
                onClick={handleAiConsult} 
                disabled={aiLoading} 
                className={`px-8 py-4 rounded-lg font-black italic transition-all disabled:opacity-50 min-w-[220px] shadow-lg hover:shadow-xl ${themeBg} ${activeSide === 'client' && isDark ? 'text-black hover:bg-[#18b88f]' : 'text-white hover:bg-blue-500'}`}
              >
                {aiLoading ? <Loader2 className="animate-spin mx-auto" /> : (activeSide === 'client' ? "GENERATE DESCRIPTION" : "DRAFT BLUEPRINT")}
              </button>
            </div>
            
            {aiResult && (
              <div className={`p-8 rounded-lg border animate-in fade-in slide-in-from-bottom-4 duration-700 max-h-[500px] overflow-y-auto custom-scrollbar ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-start gap-4">
                  <MessageSquare className={themeText} />
                  <div className={`text-sm leading-relaxed whitespace-pre-wrap font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {aiResult}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-24 relative z-10 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-6xl font-black italic mb-2 tracking-tighter">{s.value}</div>
              <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'opacity-50' : 'opacity-40'}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className={`absolute right-0 top-0 text-[10rem] font-black select-none pointer-events-none -mr-20 uppercase ${isDark ? 'opacity-[0.03]' : 'opacity-[0.02]'}`}>SYSTEMS</div>
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
                <div key={idx} className={`flex items-center gap-4 font-bold uppercase italic tracking-wider text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
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
              <div key={idx} className={`p-8 rounded-[2rem] border transition-all duration-700 hover:${themeBorder} ${card.offset ? 'mt-12' : ''} ${isDark ? 'bg-[#0a0a0c] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className={`mb-6 transition-colors duration-700 ${themeText}`}>{card.icon}</div>
                <h4 className={`font-black uppercase italic mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.title}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION SECTION */}
      <section className={`py-24 px-6 relative z-10 border-y ${isDark ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-5xl mx-auto">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-12 p-8 md:p-16 rounded-[3rem] border overflow-hidden relative group transition-colors duration-500 ${isDark ? 'bg-[#0a0a0c] border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 transition-colors duration-700 ${themeBg}`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className={themeText} size={24} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Still Deciding?</span>
              </div>
              <h2 className={`text-4xl md:text-6xl font-black uppercase italic mb-4 leading-[0.9] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Not Sure <br />Where to <span className={themeText}>Start?</span>
              </h2>
              <p className={`text-lg font-medium max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Speak with our strategy team to determine the best model for your unique business goals.
              </p>
            </div>

            <div className="relative z-10 w-full md:w-auto">
              <a 
                href="#" 
                className={`flex items-center justify-center gap-4 px-10 py-6 rounded-sm font-black text-lg uppercase italic transition-all shadow-2xl hover:scale-105 active:scale-95 ${themeBg} ${activeSide === 'client' && isDark ? 'text-black' : 'text-white'}`}
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
          <div className={`inline-flex items-center justify-center p-4 rounded-full border mb-8 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
            <Award className={themeText} size={40} />
          </div>
          <h2 className={`text-5xl md:text-7xl font-black uppercase italic mb-6 tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Are you part of the <span className={themeText}>Top 3%?</span>
          </h2>
          <p className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Join our elite network and work with world-class companies on meaningful, high-impact projects.
          </p>
          <button className={`group flex items-center gap-6 mx-auto px-12 py-6 rounded-sm font-black text-lg uppercase italic transition-all transform hover:scale-105 shadow-xl ${themeBg} ${activeSide === 'client' && isDark ? 'text-black' : 'text-white'}`}>
            APPLY AS FREELANCER
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 px-6 border-t transition-colors duration-500 ${isDark ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <JDILogo side={activeSide} />
            <p className="text-slate-500 mt-6 mb-8 leading-relaxed font-medium">
              The platform bridging the gap between high-stakes tech needs and world-class freelance talent. Built for speed, scale, and strategic success.
            </p>
            <div className="flex gap-4">
               <div className="w-3 h-3 rounded-full bg-[#1bd2a4] animate-pulse" />
               <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse delay-75" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] uppercase font-black tracking-[0.3em]">
            <div className="flex flex-col gap-5 text-slate-500">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Hire</span>
              <a href="#" className={`transition-colors ${isDark ? 'hover:text-[#1bd2a4]' : 'hover:text-[#0f8b6b]'}`}>Project Audit</a>
              <a href="#" className={`transition-colors ${isDark ? 'hover:text-[#1bd2a4]' : 'hover:text-[#0f8b6b]'}`}>Pricing</a>
            </div>
            <div className="flex flex-col gap-5 text-slate-500">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Build</span>
              <a href="#" className="hover:text-blue-600 transition-colors">Talent Network</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Remote Roles</a>
            </div>
            <div className="flex flex-col gap-5 text-slate-500">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Social</span>
              <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>LinkedIn</a>
              <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-blue-dark { -webkit-text-stroke: 1.5px #3b82f6; }
        .stroke-green-dark { -webkit-text-stroke: 1.5px #1bd2a4; }
        .stroke-blue-light { -webkit-text-stroke: 1.5px #2563eb; }
        .stroke-green-light { -webkit-text-stroke: 1.5px #0f8b6b; }
        
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-fast { animation: marquee-fast 15s linear infinite; }
        .pause { animation-play-state: paused !important; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${isDark ? '#334155' : '#cbd5e1'}; 
          border-radius: 10px; 
        }
      `}} />
    </div>
  );
};

export default App;
