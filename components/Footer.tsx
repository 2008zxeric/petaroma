
import React from 'react';
import { translations } from '../translations';
import Logo from './Logo';

const Footer: React.FC = () => {
  const tZh = translations.zh.footer;
  return (
    <footer className="bg-ink text-canvas py-16 md:py-24 px-8 border-t border-brand-green/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 text-center lg:text-left">
          <div className="space-y-8 flex flex-col items-center lg:items-start">
            <Logo imgClassName="w-40 md:w-56 brightness-0 invert" />
            <p className="text-mint/60 text-xs md:text-sm font-medium leading-relaxed max-w-xs">{tZh.desc}</p>
          </div>

          <div className="grid grid-cols-2 gap-16 md:gap-24">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-mint mb-6">{tZh.links.explore}</h4>
              <ul className="space-y-4 text-xs md:text-sm font-medium text-canvas/50">
                <li><a href="#" className="hover:text-mint transition-colors">{tZh.links.p1}</a></li>
                <li><a href="#products" className="hover:text-mint transition-colors">{tZh.links.p2}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-mint mb-6">{tZh.links.service}</h4>
              <ul className="space-y-4 text-xs md:text-sm font-medium text-canvas/50">
                <li><a href="#" className="hover:text-mint transition-colors">{tZh.links.s1}</a></li>
                <li><a href="#" className="hover:text-mint transition-colors">{tZh.links.s2}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-canvas/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] tracking-widest uppercase">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="font-bold tracking-[0.2em] text-canvas/30">{tZh.copy}</p>
            {/* 增强备案号对比度：使用 text-mint/80 替换原有的低透明度 */}
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold tracking-[0.1em] text-mint/80 hover:text-mint transition-all border-b border-mint/20 hover:border-mint"
            >
              {tZh.icp}
            </a>
          </div>
          <div className="flex gap-10 text-canvas/20">
            {tZh.socials.map(s => <a key={s} href="#" className="hover:text-mint transition-all">{s}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
