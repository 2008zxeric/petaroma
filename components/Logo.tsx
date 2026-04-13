
import React, { useState } from 'react';
import { translations } from '../translations';

interface Props {
  className?: string;
  imgClassName?: string;
  align?: 'center' | 'left';
  isExpandable?: boolean;
}

const Logo: React.FC<Props> = ({ 
  className = "", 
  imgClassName = "w-32 h-auto md:w-48", 
  align = 'center',
  isExpandable = true
}) => {
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = translations.zh;
  
  const logoUrl = "/GLOGO.svg";

  const toggleExpand = (e: React.MouseEvent) => {
    if (!isExpandable) return;
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div 
        className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} ${className} ${isExpandable ? 'cursor-zoom-in' : ''}`}
        onClick={toggleExpand}
      >
        <div className={`relative transition-transform duration-500 hover:scale-[1.05] flex flex-col items-center justify-center`}>
          {!hasError ? (
            <div className="flex flex-col items-center">
              <img 
                src={logoUrl} 
                alt="它香" 
                className={`${imgClassName} block object-contain`}
                loading="eager"
                onError={() => setHasError(true)}
              />
              <div className="mt-2 text-center pointer-events-none">
                 <p className="text-[10px] md:text-xs font-serif-brand font-bold text-brand-green/80 tracking-[0.4em] uppercase">{t.brandSub}</p>
                 <p className="text-[9px] md:text-[11px] font-personal text-sage mt-0.5 tracking-[0.1em]">宠物芳香生活</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-2 px-4 border-brand-green/10">
              <span className="text-2xl md:text-3xl font-bold font-serif-brand text-brand-green tracking-widest">{t.brandName}</span>
              <div className="flex flex-col items-center mt-1">
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand-green/60 font-bold font-display">{t.brandSub}</span>
                <span className="text-[10px] md:text-xs font-personal text-sage mt-1 italic">宠物芳香生活</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/70 backdrop-blur-2xl animate-fade-in cursor-zoom-out"
          onClick={() => setIsExpanded(false)}
        >
          <button className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-[80vw] max-h-[70vh] flex flex-col items-center animate-fade-in-up">
            {!hasError ? (
              <div className="flex flex-col items-center">
                <img 
                  src={logoUrl} 
                  alt="Logo Large" 
                  className="w-full h-auto max-h-[40vh] object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]" 
                />
                <div className="mt-12 text-center space-y-2">
                   <p className="text-white font-serif-brand font-bold text-4xl tracking-widest">{t.brandName}</p>
                   <p className="text-white/40 text-sm uppercase tracking-[0.5em]">{t.brandSub}</p>
                   <p className="text-mint/60 font-personal text-2xl mt-4 tracking-widest">宠物芳香生活</p>
                </div>
              </div>
            ) : (
              <div className="text-center scale-150">
                <span className="text-6xl font-bold font-serif-brand text-white tracking-[0.5em]">{t.brandName}</span>
                <p className="text-white/40 text-xs uppercase tracking-[0.8em] mt-6">{t.brandSub}</p>
                <p className="text-mint/60 font-personal text-xl mt-4">宠物芳香生活</p>
              </div>
            )}
            
            <div className="mt-12 text-center space-y-4">
              <div className="w-12 h-[1px] bg-white/10 mx-auto"></div>
              <p className="text-white/30 font-serif-brand italic text-sm md:text-lg">“{t.slogan}”</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logo;
