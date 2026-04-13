
import React from 'react';
import { translations } from '../translations';

const Philosophy: React.FC = () => {
  const t = translations.zh.philosophy;

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-20 md:gap-24 items-center">
          <div className="space-y-12 md:space-y-16">
            <div className="space-y-4 md:space-y-6 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.5em] text-brand-green/60 font-bold border-b border-brand-green/20 pb-2">{t.tag}</span>
              <h3 className="text-3xl md:text-5xl font-bold text-ink leading-[1.3] font-serif-brand">
                {t.title}
                <span className="text-brand-green/40 font-personal text-xl md:text-3xl mt-5 block tracking-widest">{t.titleEn}</span>
              </h3>
            </div>
            
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-green/40 to-transparent"></div>
              <p className="text-2xl md:text-4xl text-ink/80 font-light leading-snug italic font-serif-brand tracking-tight">
                {t.quote}
              </p>
            </div>

            <p className="text-[15px] md:text-lg text-ink/40 leading-relaxed font-light text-center md:text-left max-w-xl">
              {t.desc}
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              {[
                { label: "无毒等级", en: "LD50 SAFE", icon: "🛡️" },
                { label: "主理人选", en: "BOTANICAL", icon: "🌿" },
                { label: "猫咪友好", en: "CAT FRIENDLY", icon: "🐾" },
                { label: "实验精神", en: "MOLECULAR", icon: "🔬" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-4 p-6 md:p-10 bg-canvas/50 rounded-[2.5rem] border border-brand-green/5 group hover:bg-white transition-all duration-500">
                  <span className="text-2xl md:text-4xl opacity-30 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-[12px] md:text-[14px] font-bold text-ink/70 tracking-widest">{item.label}</span>
                    <span className="text-[10px] text-brand-green/30 font-display italic tracking-[0.2em] mt-1">{item.en}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full relative">
            <div className="aspect-[4/5] bg-canvas rounded-[3.5rem] md:rounded-[6rem] overflow-hidden shadow-2xl transform hover:rotate-1 transition-transform duration-700">
               <img 
                 src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200" 
                 alt="Sleeping calm cat" 
                 className="w-full h-full object-cover"
               />
            </div>

            <div className="mt-8 lg:absolute lg:-bottom-12 lg:-left-20 w-full lg:max-w-xs">
              <div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/50">
                <div className="space-y-8">
                  {[t.row1, t.row4].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-ink/30 font-bold">{item.label}</span>
                        <span className="text-[16px] md:text-[18px] text-ink font-serif-brand font-bold mt-1 underline-sketch inline-block">{item.val}</span>
                      </div>
                      <span className="text-[10px] md:text-[12px] text-brand-green/60 font-hand text-lg">
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
