
import React from 'react';
import { translations } from '../translations';
import Logo from './Logo';

interface Props { lang: 'zh' | 'en'; }

const Hero: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].hero;
  return (
    <section className="relative h-[85vh] md:h-[95vh] flex items-center justify-center overflow-hidden bg-oatmeal px-4 pt-12">
      {/* 背景层 */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=85&w=2400" 
          alt="Peaceful pet in nature" 
          className="w-full h-full object-cover animate-breathe"
        />
        {/* 精致的遮罩：为文字区域预留亮度 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-oatmeal"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl w-full flex flex-col items-center animate-fade-in-up px-2">
        {/* 文字容器：采用高透玻璃态，显著提升阅读效率 */}
        <div className="backdrop-blur-xl bg-white/75 p-8 md:p-14 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/80 max-w-2xl mx-auto mb-10">
          <div className="mb-8 opacity-90 transform scale-90 md:scale-100 flex justify-center">
             <Logo className="w-16 md:w-20" color="#1B241B" showText lang={lang} />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-6 leading-[1.4] text-forest whitespace-pre-line font-serif">
            {t.title}
          </h1>
          <div className="w-12 h-0.5 bg-sage/20 mx-auto mb-6"></div>
          <p className="text-[12px] md:text-lg text-forest/70 font-medium max-w-lg mx-auto leading-relaxed text-balance">
            {t.desc}
          </p>
        </div>

        {/* 交互按钮：色彩微调 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-[280px] sm:max-w-md mx-auto">
          <a href="#products" className="w-full sm:w-auto px-12 py-4 bg-deep-sage text-white rounded-full text-[10px] tracking-[0.4em] uppercase font-bold shadow-xl hover:shadow-sage/20 transition-all active:scale-95">
            {t.btnProducts}
          </a>
          <a href="#ai-consultant" className="w-full sm:w-auto px-12 py-4 border-2 border-deep-sage/20 text-deep-sage rounded-full text-[10px] tracking-[0.4em] uppercase font-bold backdrop-blur-md bg-white/40 hover:bg-white/80 transition-all active:scale-95">
            {t.btnTest}
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 hidden md:block">
        <div className="w-px h-12 bg-forest animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
