
import React from 'react';
import { translations } from '../translations';

interface Props { lang: 'zh' | 'en'; }

const Philosophy: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].philosophy;
  return (
    <section className="py-12 md:py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Decorative pet silhouettes in background */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <svg className="w-[400px] h-[400px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-oatmeal px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse"></span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-sage font-bold">{t.tag}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-normal text-forest leading-tight">{t.title}</h3>
            <p className="text-slate-600 text-xs md:text-base font-light italic border-l-2 border-sage/40 pl-4 py-1 leading-relaxed">
              {t.quote}
            </p>
            
            {/* Safety Badges Integration */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "LD50 Non-Toxic", val: "Vet-Audited", icon: "🛡️" },
                { label: "0% Synthetic", val: "Pure Essence", icon: "🌿" },
                { label: "Cat Friendly", val: "Phenol-Free", icon: "🐾" },
                { label: "Bird Safe", val: "Alcohol-Free", icon: "🕊️" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col p-3 bg-oatmeal/30 rounded-2xl border border-sage/5 hover:bg-white hover:shadow-lg transition-all">
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-[7px] uppercase tracking-widest text-slate-400 font-bold">{item.label}</span>
                  <span className="text-[10px] text-sage font-bold">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:pl-10">
            <div className="bg-oatmeal/40 rounded-[2.5rem] p-6 md:p-10 border border-sage/10 relative">
               <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-inner flex items-center justify-center p-4">
                  <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200" alt="Cute Cat" className="rounded-full object-cover w-full h-full grayscale opacity-60" />
               </div>
               <h4 className="text-xs md:text-lg mb-6 font-normal tracking-wide text-forest border-b border-sage/10 pb-4">{t.tableTitle}</h4>
               <div className="space-y-4">
                  {[t.row1, t.row2, t.row3, t.row4].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start group">
                      <div className="flex flex-col">
                        <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-slate-500 font-bold group-hover:text-sage transition-colors">{item.label}</span>
                        <span className="text-[9px] text-slate-400 font-light mt-0.5">{item.desc}</span>
                      </div>
                      <span className="text-[9px] md:text-[11px] text-sage font-bold bg-white px-3 py-1 rounded-full shadow-sm">{item.val}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
