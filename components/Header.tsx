
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import Logo from './Logo';

interface Props { onOpenConsole: () => void; }

const Header: React.FC<Props> = ({ onOpenConsole }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations.zh.nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string, e?: React.MouseEvent) => {
    // 阻止默认行为和冒泡
    if (e) {
      // 检查点击目标是否是 Logo 放大逻辑
      // 如果 Logo 正在处理放大，我们不在这里处理滚动
    }
    
    setMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLinks = ({ mobile }: { mobile?: boolean }) => (
    <>
      <button onClick={() => scrollTo('top')} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.story.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.story.split(' ')[1]}</span>}
      </button>
      <button onClick={() => scrollTo('products')} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.series.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.series.split(' ')[1]}</span>}
      </button>
      <button onClick={() => scrollTo('image-lab')} className={`group text-left ${mobile ? 'text-lg py-5 border-b border-brand-green/5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.lab.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.lab.split(' ')[1]}</span>}
      </button>
      <button onClick={() => scrollTo('ai-consultant')} className={`group text-left ${mobile ? 'text-lg py-5' : 'flex flex-col items-center'}`}>
        <span className="text-ink group-hover:text-brand-green transition-colors">{t.consultant.split(' ')[0]}</span>
        {!mobile && <span className="text-[7px] text-ink/20 font-display italic uppercase mt-0.5 tracking-widest">{t.consultant.split(' ')[1]}</span>}
      </button>
    </>
  );

  return (
    <>
      <nav className={`fixed w-full z-[60] transition-all duration-500 px-5 py-4 md:px-12 md:py-2 ${isScrolled || mobileMenuOpen ? 'glass-nav shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo 容器：允许点击放大，双击或长按可以考虑回顶，目前直接处理放大 */}
          <div className="cursor-pointer">
            <Logo imgClassName="w-16 md:w-20" align="left" isExpandable={true} />
          </div>
          
          <div className="hidden lg:flex items-center gap-12 text-[10px] tracking-[0.25em] uppercase font-bold">
            <NavLinks />
            <button onClick={onOpenConsole} className="w-10 h-10 flex items-center justify-center bg-brand-green/5 text-brand-green rounded-full hover:bg-brand-green hover:text-white transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2"/></svg>
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-ink">
              <span className={`h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-6 bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-50 bg-canvas/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-28 px-10 font-serif-brand">
          <NavLinks mobile />
        </div>
      </div>
    </>
  );
};

export default Header;
