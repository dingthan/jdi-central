import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2,
  Users,
  Star,
  Zap,
  Sparkles,
  Loader2,
  MessageSquare,
  Terminal
} from 'lucide-react';

/**
 * JDI Central - Reimagined
 * A premium landing page for elite technical talent and solutions.
 * Features: 
 * - Split Hero Interaction
 * - Gemini AI Project Architect
 * - Responsive Modern UI
 */

// API Configuration
const apiKey = ""; // The execution environment provides the key at runtime
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSide, setActiveSide] = useState('client'); 
  
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
          // Handle rate limiting (429)
          if (response.status === 429 && retries < 5) {
            const delay = Math.pow(2, retries) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(retries + 1);
          }
          throw new Error('Failed to connect to AI Architect');
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
      setError("The AI Architect is at capacity. Please try again in a moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAiConsult = () => {
    if (!userInput.trim()) return;
    
    const systemPrompt = "You are an elite Technical Consultant at JDI Central. Analyze the user's project idea and recommend: 1. A sophisticated tech stack for enterprise scale. 2. A 'Dream Team' squad composition (specific roles). 3. Estimated deployment time. Use professional, high-impact language and focus on Top 3% quality.";
    const prompt = `Project Vision: ${userInput}. Architect the ideal JDI squad for this specific build.`;
    
    callGemini(prompt, systemPrompt);
  };

  const stats = [
    { label: 'Talent Pass Rate', value: 'Top 3%' },
    { label: 'Client Retention', value: '97%' },
    { label: 'Global Availability', value: '24/7' },
    { label: 'Time to Hire', value: '< 48h' },
  ];

  const JDILogo = () => (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow">
          <circle 
            cx="50" cy="50" r="45" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeDasharray="10 15" 
            className={activeSide === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'} 
          />
        </svg>
        <div className={`w-6 h-6 flex items-center justify-center font-black text-[10px] italic rounded-sm transition-colors duration-500 ${activeSide === 'client' ? 'bg-blue-600' : 'bg-[#1bd2a4]'} text-white`}>
          JDI
        </div>
      </div>
      <div className="text-lg font-black tracking-tighter uppercase italic leading-none text-white">
        Central<span className={activeSide === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'}>.</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020203] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Dynamic Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      {/* Background Glow Effect */}
      <div 
        className="fixed pointer-events-none transition-all duration-1000 ease-out z-0 opacity-40"
        style={{
          width: '1000px',
          height: '1000px',
          background: activeSide === 'client' 
            ? 'radial-gradient(circle, #2563eb 0%, transparent 70%)' 
            : 'radial-gradient(circle, #1bd2a4 0%, transparent 70%)',
          left: activeSide === 'client' ? '30%' : '70%',
          top: '30%',
          transform: `translate(-50%, -50%) translate(${scrollY * 0.05}px, ${scrollY * 0.02}px)`,
          filter: 'blur(140px)'
        }}
      />

      {/* Navigation */}
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

      {/* Split Hero Section */}
      <section className="relative pt-32 min-h-[90vh] flex flex-col justify-center px-6 z-10">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-6 relative">
          
          {/* Card 1: Individual Talent (Precision) */}
          <div 
            onMouseEnter={() => setActiveSide('client')}
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-default ${activeSide === 'client' ? 'bg-blue-600/5 border-blue-500/40' : 'bg-transparent border-transparent opacity-40 hover:opacity-60'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-blue-500/50 text-blue-400 text-[10px] font-bold tracking-widest uppercase bg-blue-500/10">
              <Star size={14} fill="currentColor" /> World-Class Talent
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Hire <br /><span className="text-transparent stroke-blue">Precision.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">
              Access individual elite software engineers and designers. Integrated into your team in 48 hours.
            </p>
            <button className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-sm font-black transition-all italic group">
              HIRE TOP TALENT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Dedicated Squads (Solutions) */}
          <div 
            onMouseEnter={() => setActiveSide('talent')}
            className={`group relative p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 border-2 cursor-default ${activeSide === 'talent' ? 'bg-[#1bd2a4]/5 border-[#1bd2a4]/40' : 'bg-transparent border-transparent opacity-40 hover:opacity-60'}`}
          >
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#1bd2a4]/50 text-[#1bd2a4] text-[10px] font-bold tracking-widest uppercase bg-[#1bd2a4]/10">
              <Zap size={14} fill="currentColor" /> Full Solutions
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] uppercase italic mb-6">
              Build <br /><span className="text-transparent stroke-green">The Future.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-sm font-medium">
              From MVP to Enterprise scale. Deploy a dedicated JDI squad to ship mission-critical products.
            </p>
            <button className="flex items-center gap-4 bg-[#1bd2a4] hover:bg-[#18b88f] text-black font-black px-8 py-4 rounded-sm transition-all italic group">
              START A PROJECT <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* AI Project Architect Section */}
      <section className="relative py-24 px-6 z-10 border-y border-white/5 bg-[#050507]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className={activeSide === 'client' ? 'text-blue-500' : 'text-[#1bd2a4]'} />
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              AI Project Architect
            </h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
            <p className="text-slate-400 mb-6 text-center text-sm font-medium">
              Describe your vision (e.g., a real-time trading platform or a healthcare SaaS). ✨ Gemini will design your squad and roadmap.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAiConsult()}
                placeholder="What are you building?"
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-6 py-4 focus:outline-none focus:border-blue-500 transition-colors text-white placeholder:text-slate-600"
              />
              <button 
                onClick={handleAiConsult}
                disabled={aiLoading}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-black italic transition-all disabled:opacity-50 min-w-[200px] ${activeSide === 'client' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-[#1bd2a4] text-black hover:bg-[#18b88f]'}`}
              >
                {aiLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                DRAFT BLUEPRINT
              </button>
            </div>

            {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-4 text-center">{error}</div>}

            {aiResult && (
              <div className="p-8 rounded-lg bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
            <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8 leading-tight">
              The <span className="text-blue-500">Top 3%</span> <br />Screening Process.
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              We vet thousands of applicants. Only those with the highest scores in technical skill and communication enter our global network.
            </p>
            <div className="space-y-6">
              {[
                "Language & Personality Evaluation",
                "In-Depth Technical Deep Dive",
                "Live Technical Screening",
                "Trial-to-Hire Guarantee"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-white font-bold uppercase italic tracking-wider text-sm">
                  <CheckCircle2 className="text-blue-500" size={20} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#0a0a0c] p-8 rounded-[2rem] border border-white/5 hover:border-blue-500/20 transition-all">
              <Users size={32} className="text-blue-500 mb-6" />
              <h4 className="font-black uppercase italic mb-2">Build Teams</h4>
              <p className="text-xs text-slate-500 font-medium">Scale your engineering output with pre-vetted senior talent.</p>
            </div>
            <div className="bg-[#0a0a0c] p-8 rounded-[2rem] border border-white/5 mt-12 hover:border-blue-500/20 transition-all">
              <Terminal size={32} className="text-blue-500 mb-6" />
              <h4 className="font-black uppercase italic mb-2">Tech Depth</h4>
              <p className="text-xs text-slate-500 font-medium">Domain experts in AI, Fintech, and Modern Web Systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <JDILogo />
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Hire Talent</a>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <div className="text-[10px] text-slate-600 uppercase font-bold tracking-tighter">
            © 2025 JDI CENTRAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* Global Utility Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .stroke-blue { -webkit-text-stroke: 1.5px #3b82f6; }
        .stroke-green { -webkit-text-stroke: 1.5px #1bd2a4; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
        input::placeholder { color: #334155; }
      `}} />
    </div>
  );
};

export default App;
