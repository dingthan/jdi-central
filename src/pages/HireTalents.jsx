import React from 'react';
import { Code2, Cpu, Database, Layout, Search, ArrowRight } from 'lucide-react';

const HireTalents = ({ themeText = 'text-[#1bd2a4]', themeBg = 'bg-[#1bd2a4]' }) => {
  const talents = [
    { 
      role: "Senior Full-Stack Engineers", 
      stack: "React, Node.js, AWS", 
      experience: "8+ Years",
      icon: Layout,
      availability: "Immediate"
    },
    { 
      role: "AI / ML Specialists", 
      stack: "Python, PyTorch, LLMs", 
      experience: "5+ Years",
      icon: Cpu,
      availability: "In 2 Weeks"
    },
    { 
      role: "Backend Architects", 
      stack: "Go, Kubernetes, Kafka", 
      experience: "10+ Years",
      icon: Database,
      availability: "Immediate"
    }
  ];

  return (
    <div className="pt-48 pb-24 px-6 animate-in">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-[7vw] font-black uppercase italic leading-none tracking-tighter">
            HIRE THE <span className={themeText}>TOP 3%</span>
          </h2>
          <div className="max-w-md text-right">
            <p className="text-white/40 text-lg font-medium italic mb-4">
              Our rigorous 5-stage vetting process ensures only the most elite technical talent joins your team.
            </p>
            <div className="flex gap-2 justify-end">
              {['Vetted', 'Ready', 'Remote-First'].map(tag => (
                <span key={tag} className="text-[9px] border border-white/20 px-3 py-1 rounded-full uppercase font-black tracking-widest">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {talents.map((role, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-12 rounded-[2rem] group hover:border-white transition-all cursor-pointer">
              <role.icon size={40} className={`${themeText} mb-8`} />
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tight">{role.role}</h3>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-8">{role.stack}</p>
              
              <div className="space-y-4 mb-12">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="opacity-30">Avg. Experience</span>
                  <span>{role.experience}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="opacity-30">Availability</span>
                  <span className={themeText}>{role.availability}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-8">
                <button className={`${themeText} text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all`}>
                  View Talent Pool <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-20 bg-white/5 rounded-[4rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
          <div>
            <h4 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Need a custom squad?</h4>
            <p className="text-white/40 max-w-lg uppercase font-bold text-xs tracking-widest leading-loose">
              We can assemble a dedicated team of developers, designers, and PMs tailored to your specific tech stack within 14 days.
            </p>
          </div>
          <button className={`${themeBg} text-black px-12 py-6 rounded-full font-black uppercase italic tracking-tighter hover:scale-105 transition-transform`}>
            Request Custom Hiring
          </button>
        </div>
      </div>
    </div>
  );
};

export default HireTalents;
