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
  Search
} from 'lucide-react';


/**
 * JDI Central - Reimagined
 * A premium landing page for elite technical talent and solutions.
 * Features: 
 * - Split Hero Interaction with AI Context Switching
 * - Gemini AI Dynamic Architect (Job Descriptions vs Project Blueprints)
 * - High-Speed Interactive Marquee with Swipe & Pause
 * - Freelancer Network CTA
 */

// API Configuration
const apiKey = ""; // The execution environment provides the key at runtime
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSide, setActiveSide] = useState('client'); 
  
  // Marquee Swipe State
  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // AI Feature States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Swipe Handlers for Marquee
   */
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

  /**
   * Gemini API call with exponential backoff logic
   */
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
          if (response.status === 429 && retries < 5) {
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
      setError("The AI Engine is at capacity. Please try again in a moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiConsult = () => {
    if (!userInput.trim()) return;
    
    // Dynamic Prompting based on activeSide
    let systemPrompt, prompt;
    
    if (activeSide === 'client') {
      systemPrompt = "You are an expert Technical Recruiter at JDI Central. Generate a high-impact, professional Job Description for a Top 3% candidate based on the role name provided. Include: 1. A summary that sells the vision. 2. Key responsibilities for a senior-level role. 3. Required tech stack and cultural traits.";
      prompt = `Create an elite Job Description for: ${userInput}. Focus on attracting the world's best talent.`;
    } else {
      systemPrompt = "You are an elite Technical Architect at JDI Central. Analyze the user's project vision and recommend: 1. A sophisticated tech stack. 2. A 'Dream Team' squad composition. 3. Estimated deployment time.";
      prompt = `Project Vision: ${userInput}. Architect the ideal JDI squad and tech stack for this specific build.`;
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

  // Custom Logo Component
  const JDILogo = ({ side }) => (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Rotating Ecosystem Ring */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeDasharray="10 15"
            className={side === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'}
          />
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="6" 
            strokeDasharray="1 98" 
            strokeLinecap="round"
            className={side === 'client' ? 'text-blue-400' : 'text-[#1bd2a4]/80'}
          />
        </svg>
        {/* Core Node */}
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
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      {/* Background Glow */}
      <div 
        className="fixed pointer-events-none transition-all duration-1000 ease-out z-0 opacity-40"
        style={{
          width: '1000px',
          height: '1000px',
          background: activeSide === 'client' ? 'radial-gradient(circle, #2563eb 0%, transparent 70%)' : 'radial-gradient(circle, #1bd2a4 0%, transparent 70%)',
          left: activeSide === 'client' ? '30%' : '70%',
          top: '30%',
          transform: `translate(-50%, -50%) translate(${scrollY * 0.05}px, ${scrollY * 0.02}px)`,
          filter: 'blur(140px)'
        }}
      />

      {/* Navigation 
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center border-b border-white/5 backdrop-blur-xl bg-black/20">
        <JDILogo />
        <div className="hidden md:flex space-x-10 font-bold uppercase text-[10px] tracking-[0.3em]">
          <a href="#" className="hover:text-blue-400 transition-colors">Hire Talent</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Solutions</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Case Studies</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">Client Login</a>
        </div>
        <button className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl ${activeSide === 'client' ? 'bg-blue-600 text-white' : 'bg-[#1bd2a4] text-black'}`}>
          Hire Top 3%
        </button>
      </nav>

      Navigation */}
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

      {/* Hero Section */}
      <section className="relative pt-32 min-h-[90vh] flex flex-col justify-center px-6 z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-6 relative">
          {/* HIRE PRECISION CARD */}
          <div 
            onMouseEnter={() => {
              setActiveSide('client');
              setAiResult(null); // Clear previous AI context when switching
            }} 
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-pointer ${activeSide === 'client' ? 'bg-blue-600/5 border-blue-500/40' : 'opacity-40 border-transparent hover:opacity-60'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-blue-500/50 text-blue-400 text-[10px] font-bold tracking-widest uppercase bg-blue-500/10">
              <Star size={14} fill="currentColor" /> World-Class Talent
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Hire <br /><span className="text-transparent stroke-blue">Precision.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">Access individual elite software engineers and designers.</p>
            <button className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-sm font-black transition-all italic group">
              HIRE TOP TALENT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* BUILD THE FUTURE CARD */}
          <div 
            onMouseEnter={() => {
              setActiveSide('talent');
              setAiResult(null); // Clear previous AI context when switching
            }} 
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-pointer ${activeSide === 'talent' ? 'bg-[#1bd2a4]/5 border-[#1bd2a4]/40' : 'opacity-40 border-transparent hover:opacity-60'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#1bd2a4]/50 text-[#1bd2a4] text-[10px] font-bold tracking-widest uppercase bg-[#1bd2a4]/10">
              <Zap size={14} fill="currentColor" /> Full Solutions
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Build <br /><span className="text-transparent stroke-green">The Future.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">Deploy a dedicated JDI squad to ship mission-critical products.</p>
            <button className="flex items-center gap-4 bg-[#1bd2a4] hover:bg-[#18b88f] text-black font-black px-8 py-4 rounded-sm transition-all italic group">
              START A PROJECT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* High-Speed Swipe Marquee */}
      <section 
        className="py-24 bg-black overflow-hidden relative border-y border-white/5 group/marquee cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={marqueeRef} className={`flex whitespace-nowrap animate-marquee-fast ${isPaused ? 'pause' : ''}`}>
          {[...skillsets, ...skillsets, ...skillsets, ...skillsets].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-8 mx-12 transition-all duration-300 hover:scale-110 select-none">
              <span className={`transition-colors duration-500 ${activeSide === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'} opacity-40`}>{skill.icon}</span>
              <span className="text-5xl font-black uppercase italic tracking-tighter text-white/30 hover:text-white transition-colors duration-300">{skill.role}</span>
              <span className={`w-2 h-2 rounded-full ${activeSide === 'client' ? 'bg-blue-600' : 'bg-[#1bd2a4]'} opacity-20 mx-4`} />
            </div>
          ))}
        </div>
      </section>

      {/* DYNAMIC AI SECTION: Context changes based on Hero Hover */}
      <section className="relative py-24 px-6 z-10 border-b border-white/5 bg-[#050507]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 transition-all duration-500">
            {activeSide === 'client' ? (
              <FileText className="text-blue-500 animate-pulse" size={28} />
            ) : (
              <Sparkles className="text-[#1bd2a4] animate-pulse" size={28} />
            )}
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-center">
              {activeSide === 'client' ? 'AI Job Architect' : 'AI Project Architect'}
            </h2>
          </div>
          <div className={`bg-white/5 border rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl transition-all duration-700 ${activeSide === 'client' ? 'border-blue-500/30' : 'border-[#1bd2a4]/30'}`}>
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
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-12 pr-6 py-4 focus:outline-none focus:border-blue-500 text-white placeholder:text-slate-600 transition-all" 
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  {activeSide === 'client' ? <Search size={18} /> : <Terminal size={18} />}
                </div>
              </div>
              <button 
                onClick={handleAiConsult} 
                disabled={aiLoading} 
                className={`px-8 py-4 rounded-lg font-black italic transition-all disabled:opacity-50 min-w-[220px] shadow-lg hover:shadow-xl ${activeSide === 'client' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-[#1bd2a4] text-black hover:bg-[#18b88f]'}`}
              >
                {aiLoading ? <Loader2 className="animate-spin mx-auto" /> : (activeSide === 'client' ? "GENERATE DESCRIPTION" : "DRAFT BLUEPRINT")}
              </button>
            </div>
            
            {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-4 text-center">{error}</div>}
            
            {aiResult && (
              <div className="p-8 rounded-lg bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-h-[500px] overflow-y-auto custom-scrollbar">
                <div className="flex items-start gap-4">
                  <MessageSquare className={activeSide === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'} />
                  <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {aiResult}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Global Performance Statistics */}
      <section className="py-24 bg-white text-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16">
          {stats.map((s, i) => (
            <div key={i} className="group cursor-default">
              <div className="text-6xl font-black italic mb-2 tracking-tighter">
                {s.value}
              </div>
              <div className="text-xs font-black uppercase tracking-[0.3em] opacity-50">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8 leading-tight">The <span className="text-blue-500">Top 3%</span> Screening Process.</h2>
            <div className="space-y-6">
              {["Language & Personality Evaluation", "In-Depth Technical Deep Dive", "Live Technical Screening", "Trial-to-Hire Guarantee"].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white font-bold uppercase italic tracking-wider text-sm">
                  <CheckCircle2 className="text-blue-500" size={20} /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1: Build Teams */}
            <div className="bg-[#0a0a0c] p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all">
                <Users size={32} className="text-blue-500 mb-6" />
                <h4 className="font-black uppercase italic mb-2">Build Teams</h4>
                <p className="text-xs text-slate-500 uppercase tracking-tighter">Scale with pre-vetted seniors.</p>
            </div>
            {/* Card 2: Tech Depth */}
            <div className="bg-[#0a0a0c] p-8 rounded-[2rem] border border-white/5 mt-12 hover:border-blue-500/30 transition-all">
                <Terminal size={32} className="text-blue-500 mb-6" />
                <h4 className="font-black uppercase italic mb-2">Tech Depth</h4>
                <p className="text-xs text-slate-500 uppercase tracking-tighter">AI, Fintech, Web Specialists.</p>
            </div>
            {/* Card 3: Zero Risk (Added) */}
            <div className="bg-[#0a0a0c] p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all">
                <ShieldCheck size={32} className="text-blue-500 mb-6" />
                <h4 className="font-black uppercase italic mb-2">Zero Risk</h4>
                <p className="text-xs text-slate-500 uppercase tracking-tighter leading-relaxed">Trial periods ensure the perfect match every single time.</p>
            </div>
            {/* Card 4: Global Reach (Added) */}
            <div className="bg-[#0a0a0c] p-8 rounded-[2rem] border border-white/5 mt-12 hover:border-blue-500/30 transition-all">
                <Globe size={32} className="text-blue-500 mb-6" />
                <h4 className="font-black uppercase italic mb-2">Global Reach</h4>
                <p className="text-xs text-slate-500 uppercase tracking-tighter leading-relaxed">Talent across every timezone, ready to integrate now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Freelancer Network CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className={`absolute inset-0 opacity-10 transition-colors duration-700 ${activeSide === 'client' ? 'bg-blue-600' : 'bg-[#1bd2a4]'}`} style={{ clipPath: 'polygon(0 15%, 100% 0, 100% 85%, 0 100%)' }}></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-8">
            <Award className={activeSide === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'} size={40} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-6 tracking-tighter leading-none">
            Are you part of the <span className={activeSide === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'}>Top 3%?</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join our elite network and work with world-class companies on meaningful, high-impact projects.
          </p>
          <button className={`group flex items-center gap-6 mx-auto px-12 py-6 rounded-sm font-black text-lg uppercase italic transition-all transform hover:scale-105 ${activeSide === 'client' ? 'bg-blue-600 text-white' : 'bg-[#1bd2a4] text-black'}`}>
            APPLY AS FREELANCER
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <JDILogo />
          <div className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">© 2025 JDI CENTRAL. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-blue { -webkit-text-stroke: 1.5px #3b82f6; }
        .stroke-green { -webkit-text-stroke: 1.5px #1bd2a4; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-fast { animation: marquee-fast 6s linear infinite; }
        .pause { animation-play-state: paused !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default App;
