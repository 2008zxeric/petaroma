
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
      {/* 视觉回归：宠物与自然亲近的治愈影像 */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=85&w=2400" 
          alt="Puppy in Nature" 
          className="w-full h-full object-cover animate-breathe brightness-[0.85] contrast-[1.05]"
        />
        
        {/* 高级感遮罩：从深林绿渐变到米白色，确保文字阅读深度 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-oatmeal"></div>
        
        {/* 动态光斑：模拟林间阳光，增加层次感 */}
        <div className="absolute top-1/4 left-1/4 w-[60%] h-[40%] bg-white/10 blur-[120px] rounded-full animate-pulse opacity-40"></div>
      </div>

      {/* 内容层 */}
      <div className="relative z-10 text-center max-w-6xl w-full flex flex-col items-center px-6 pt-20">
        <div className="animate-fade-in-up space-y-8 md:space-y-12">
          
          {/* 品牌徽章：带呼吸动画的临床背书标识 */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl px-8 py-2.5 rounded-full border border-white/30 shadow-2xl">
             <span className="w-2 h-2 rounded-full bg-leaf-green animate-pulse"></span>
             <span className="text-[10px] md:text-[13px] uppercase tracking-[0.5em] text-white font-bold drop-shadow-sm">
               {t.badge}
             </span>
          </div>
          
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-5xl md:text-[8.5rem] font-bold tracking-tighter text-white font-serif-brand leading-[1.1] drop-shadow-2xl">
              {t.title}
            </h1>
            <p className="text-2xl md:text-5xl font-display italic text-white/90 tracking-[0.1em] drop-shadow-lg">
              "{t.titleEn}"
            </p>
          </div>

          <div className="w-32 h-[1px] bg-white/30 mx-auto rounded-full"></div>

          <p className="text-[15px] md:text-2xl text-white/95 font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            {t.desc}
          </p>

          {/* 交互按钮：森林绿与磨砂白对比 */}
          <div className="pt-8 md:pt-14 flex flex-col md:flex-row gap-6 md:gap-10 w-full justify-center max-w-xs md:max-w-2xl mx-auto">
            <button 
              onClick={scrollToProducts}
              className="flex-1 px-12 py-6 bg-brand-green text-white rounded-full text-xs md:text-sm uppercase tracking-[0.4em] font-bold shadow-[0_25px_60px_rgba(46,139,87,0.4)] hover:bg-leaf-green hover:-translate-y-2 transition-all active:scale-95 text-center"
            >
              探索方案 Explore
            </button>
            <button 
              onClick={scrollToConsultant}
              className="flex-1 px-12 py-6 border border-white/60 text-white rounded-full text-xs md:text-sm uppercase tracking-[0.4em] font-bold backdrop-blur-2xl bg-white/5 hover:bg-white/20 transition-all active:scale-95 text-center"
            >
              获取关怀建议
            </button>
          </div>
        </div>
      </div>
      
      {/* 底部引导图标 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
