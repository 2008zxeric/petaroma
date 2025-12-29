import React from 'react';
import { translations } from '../translations';

const Philosophy: React.FC = () => {
  const t = translations.zh.philosophy;

  return (
    <section className="py-24 md:py-48 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-20 md:gap-32 items-center">
          <div className="space-y-12 md:space-y-20">
            <div className="space-y-4 md:space-y-8 text-center md:text-left">
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-brand-green font-bold bg-canvas px-6 py-2 rounded-full inline-block">{t.tag}</span>
              <h3 className="text-4xl md:text-7xl font-bold text-ink leading-[1.1] font-serif-brand">
                {t.title} <br/>
                <span className="text-ink/10 font-light text-2xl md:text-5xl mt-3 block italic">{t.titleEn}</span>
              </h3>
            </div>
            
            <div className="relative pl-8 md:pl-16 border-l-[3px] border-brand-green/10">
              <p className="text-2xl md:text-5xl text-ink/90 font-light leading-snug italic font-serif-brand tracking-tight">
                {t.quote}
              </p>
            </div>

            <p className="text-[14px] md:text-lg text-ink/50 leading-relaxed font-medium text-center md:text-left max-w-xl">
              {t.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-10">
              {[
                { label: "无毒等级", en: "LD50 SAFE", icon: "🛡️" },
                { label: "0% 合成", en: "BOTANICAL", icon: "🌿" },
                { label: "猫咪友好", en: "CAT FRIENDLY", icon: "🐾" },
                { label: "分子萃取", en: "MOLECULAR", icon: "🔬" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-4 p-8 md:p-12 bg-canvas rounded-[3rem] md:rounded-[5rem] border border-brand-green/5 group hover:bg-white hover:shadow-2xl transition-all duration-700">
                  <span className="text-3xl md:text-5xl opacity-40 group-hover:scale-110 transition-transform origin-left">{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-[11px] md:text-[14px] uppercase tracking-[0.3em] text-brand-green font-bold">{item.label}</span>
                    <span className="text-[9px] md:text-[11px] text-brand-green/20 italic font-display tracking-widest mt-1">{item.en}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full relative">
            <div className="aspect-[4/5] bg-canvas rounded-[4rem] md:rounded-[8rem] overflow-hidden shadow-2xl border-[8px] md:border-[16px] border-white transform transition-transform duration-[2.5s] hover:scale-[1.02]">
               <img 
                 src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200" 
                 alt="Sleeping calm cat" 
                 className="w-full h-full object-cover"
               />
            </div>

            <div className="mt-12 lg:absolute lg:-bottom-20 lg:-left-24 w-full lg:max-w-sm">
              <div className="backdrop-blur-3xl bg-white/95 p-10 md:p-16 rounded-[4rem] md:rounded-[6rem] shadow-2xl border border-white/50">
                <div className="space-y-12">
                  {[t.row1, t.row4].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-ink/30 font-bold">{item.label}</span>
                        <span className="text-[16px] md:text-[20px] text-ink font-serif-brand font-bold mt-2">{item.val}</span>
                      </div>
                      <span className="text-[10px] md:text-[14px] text-brand-green font-bold px-5 py-2 rounded-full bg-brand-green/5 border border-brand-green/10">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;