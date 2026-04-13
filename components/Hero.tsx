
import React from 'react';
import { translations } from '../translations';

const Hero: React.FC = () => {
  const t = translations.zh.hero;

  const scrollToConsultant = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('ai-consultant');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-oatmeal">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=85&w=2400" 
          alt="Puppy in Nature" 
          className="w-full h-full object-cover animate-breathe brightness-[0.8] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-oatmeal"></div>
        <div className="absolute top-1/3 right-1/4 w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl w-full flex flex-col items-center px-6 pt-20">
        <div className="animate-fade-in-up space-y-6 md:space-y-10">
          
          <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-3xl px-8 py-3 rounded-full border border-white/20 shadow-xl">
             <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse"></span>
             <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-white/80 font-bold">
               {t.badge}
             </span>
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-4xl md:text-[7rem] font-bold tracking-tight text-white font-serif-brand leading-none">
              {t.title}
            </h1>
            <p className="text-xl md:text-5xl font-personal text-mint/90 tracking-widest drop-shadow-lg opacity-90">
              {t.titleEn}
            </p>
          </div>

          <div className="w-20 h-[0.5px] bg-white/20 mx-auto"></div>

          <p className="text-[14px] md:text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto italic">
            {t.desc}
          </p>

          <div className="pt-10 md:pt-16 flex flex-col md:flex-row gap-5 md:gap-8 w-full justify-center max-w-xs md:max-w-xl mx-auto">
            <button 
              onClick={scrollToProducts}
              className="flex-1 px-10 py-5 bg-brand-green text-white rounded-full text-xs uppercase tracking-[0.3em] font-bold shadow-2xl hover:bg-leaf-green hover:-translate-y-1 transition-all active:scale-95"
            >
              探索方案 / Explore
            </button>
            <button 
              onClick={scrollToConsultant}
              className="flex-1 px-10 py-5 border border-white/40 text-white rounded-full text-xs uppercase tracking-[0.3em] font-bold backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all active:scale-95"
            >
              {t.btnTest}
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
