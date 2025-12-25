
import React from 'react';
import { translations } from '../translations';

interface Props {
  className?: string;
  color?: string;
  showText?: boolean;
  showSlogan?: boolean;
  lang?: 'zh' | 'en';
}

const Logo: React.FC<Props> = ({ 
  className = "w-10 h-10", 
  color = "#1B241B", 
  showText = false, 
  showSlogan = false,
  lang = 'zh' 
}) => {
  const t = translations[lang];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 精准还原参考图的品牌标识 */}
      <div className="relative w-full aspect-[1/1.3] flex items-center justify-center">
        <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* 顶部脉络叶片 */}
          <g transform="translate(50, 20)">
            <path 
              d="M0 -18C0 -18 8 -12 10 -4C12 4 4 6 0 2C-4 6 -12 4 -10 -4C-8 -12 0 -18 0 -18Z" 
              stroke={color} 
              strokeWidth="2.5" 
              strokeLinejoin="round"
            />
            <path d="M0 -14V2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 -10L5 -12M0 -6L6 -8M0 -10L-5 -12M0 -6L-6 -8" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* 核心水滴边界 */}
          <path 
            d="M50 22C32 22 15 42 15 78C15 108 30 125 50 125C70 125 85 108 85 78C85 42 68 22 50 22Z" 
            stroke={color} 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* 嵌套剪影：人、犬、猫 (精准路径还原) */}
          <g transform="translate(0, 5)">
            {/* 人的剪影 (左侧) */}
            <circle cx="43" cy="72" r="7" stroke={color} strokeWidth="3" />
            <path d="M30 110C30 95 35 85 43 85C51 85 55 92 55 105" stroke={color} strokeWidth="3" strokeLinecap="round" />
            
            {/* 犬的剪影 (右侧) */}
            <path 
              d="M78 88C80 82 75 75 68 78C62 80 58 85 58 95C58 105 65 115 82 115" 
              stroke={color} 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path d="M72 82L78 78" stroke={color} strokeWidth="2" strokeLinecap="round" />
            
            {/* 猫的剪影 (中央底部嵌套) */}
            <path 
              d="M48 115C48 102 55 95 62 95C69 95 72 102 72 115" 
              stroke={color} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            <path d="M58 95L56 90M66 95L68 90" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col items-center text-center mt-4">
          <span 
            className="text-2xl md:text-3xl font-serif tracking-[0.4em] leading-none uppercase mb-2" 
            style={{ fontFamily: "'Noto Serif SC', serif", fontWeight: 700, color: color }}
          >
            {t.brandName}
          </span>
          {showSlogan && (
            <div className="flex flex-col items-center gap-1 opacity-80" style={{ color: color }}>
              <p className="text-[9px] md:text-[11px] font-normal tracking-[0.2em]">
                {t.slogan}
              </p>
              <p className="text-[7px] md:text-[9px] font-medium tracking-[0.15em] uppercase">
                {t.sloganEn}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
