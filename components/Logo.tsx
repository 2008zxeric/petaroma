
import React, { useState } from 'react';

interface Props {
  className?: string;
  imgClassName?: string;
  align?: 'center' | 'left';
  isExpandable?: boolean; // 允许配置是否可点击放大
}

/**
 * 它香 (Pet Aroma) 品牌 Logo 组件
 * 增加 Lightbox 放大功能
 */
const Logo: React.FC<Props> = ({ 
  className = "", 
  imgClassName = "w-32 h-auto md:w-48", 
  align = 'center',
  isExpandable = true
}) => {
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const logoUrl = "/GLOGO.svg";

  const toggleExpand = (e: React.MouseEvent) => {
    if (!isExpandable) return;
    // 阻止冒泡，防止触发 Header 的 scrollTo('top')
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div 
        className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} ${className} ${isExpandable ? 'cursor-zoom-in' : ''}`}
        onClick={toggleExpand}
      >
        <div className={`relative transition-transform duration-500 hover:scale-[1.05] flex items-center justify-center ${imgClassName}`}>
          {!hasError ? (
            <img 
              src={logoUrl} 
              alt="它香 Pet Aroma" 
              className="w-full h-auto block object-contain max-h-full"
              loading="eager"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="flex flex-col items-center py-2 px-4 border-l-2 border-brand-green/20">
              <span className="text-2xl md:text-3xl font-bold font-serif-brand text-brand-green tracking-widest">它香</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-[1px] w-4 bg-brand-green/20"></span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-brand-green/60 font-bold font-display">Pet Aroma</span>
                <span className="h-[1px] w-4 bg-brand-green/20"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 放大遮罩层 (Lightbox) */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/60 backdrop-blur-2xl animate-fade-in cursor-zoom-out"
          onClick={() => setIsExpanded(false)}
        >
          {/* 关闭按钮 */}
          <button className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="max-w-[80vw] max-h-[70vh] flex flex-col items-center animate-fade-in-up">
            {!hasError ? (
              <img 
                src={logoUrl} 
                alt="Logo Large" 
                className="w-full h-auto max-h-[50vh] object-contain brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
              />
            ) : (
              <div className="text-center scale-150">
                <span className="text-6xl font-bold font-serif-brand text-white tracking-[0.5em]">它香</span>
                <p className="text-white/40 text-xs uppercase tracking-[0.8em] mt-6">Pet Aroma Lab</p>
              </div>
            )}
            
            <div className="mt-12 text-center space-y-4">
              <div className="w-12 h-[1px] bg-white/20 mx-auto"></div>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">Interspecies Connection</p>
              <p className="text-white/60 font-serif-brand italic text-sm md:text-lg">“因为爱，所以它香。”</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logo;
