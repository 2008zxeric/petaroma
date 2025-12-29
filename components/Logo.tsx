
import React, { useState } from 'react';

interface Props {
  className?: string;
  imgClassName?: string;
  align?: 'center' | 'left';
}

/**
 * 它香 (Pet Aroma) 品牌 Logo 组件
 * 
 * 逻辑：
 * 1. 尝试加载 /GLOGO.svg (用户已上传的文件)
 * 2. 如果加载失败，自动切换为品牌文字排版。
 */
const Logo: React.FC<Props> = ({ 
  className = "", 
  imgClassName = "w-32 h-auto md:w-48", 
  align = 'center'
}) => {
  const [hasError, setHasError] = useState(false);
  
  // 指向您上传到根目录或 public 文件夹下的 GLOGO.svg
  const logoUrl = "/GLOGO.svg";

  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      <div className={`relative transition-transform duration-500 hover:scale-[1.05] flex items-center justify-center ${imgClassName}`}>
        {!hasError ? (
          <img 
            src={logoUrl} 
            alt="它香 Pet Aroma" 
            className="w-full h-auto block object-contain max-h-full"
            loading="eager"
            onError={() => {
              console.warn("Logo file not found at /GLOGO.svg. Showing text fallback.");
              setHasError(true);
            }}
          />
        ) : (
          /* 降级视觉方案：精致的品牌文字排版 */
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
  );
};

export default Logo;
