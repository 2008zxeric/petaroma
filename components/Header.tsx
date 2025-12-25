
import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import Logo from './Logo';

interface Props { 
  lang: 'zh' | 'en'; 
  setLang: (l: 'zh' | 'en') => void; 
  onOpenConsole: () => void;
}

const Header: React.FC<Props> = ({ lang, setLang, onOpenConsole }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:text-sage transition-colors">{t.nav.story}</a>
      <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:text-sage transition-colors">{t.nav.series}</a>
      <a href="#image-lab" onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:text-sage transition-colors">{t.nav.lab}</a>
      <a href="#ai-consultant" onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:text-sage transition-colors">{t.nav.consultant}</a>
    </>
  );

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-700 px-6 py-5 md:px-12 ${isScrolled || mobileMenuOpen ? 'glass-nav shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Component */}
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo className="w-8 h-8 md:w-9 md:h-9" color="#1B241B" showText lang={lang} />
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10 text-[9px] tracking-[0.4em] uppercase font-bold">
            <NavLinks />
            <button onClick={onOpenConsole} className="text-slate-500 hover:text-sage transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2"/></svg>
            </button>
            <div className="flex items-center gap-3">
              <button onClick={() => setLang('zh')} className={`${lang === 'zh' ? 'text-sage' : 'text-slate-300'}`}>CN</button>
              <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-sage' : 'text-slate-300'}`}>EN</button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="text-[10px] text-slate-500 font-bold tracking-widest">{lang === 'zh' ? 'EN' : 'CN'}</button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1 text-forest"
            >
              <span className={`h-0.5 w-5 bg-current transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`h-0.5 w-5 bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-5 bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-oatmeal transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col h-full pt-32 px-10 gap-10 text-xl font-light tracking-[0.2em] text-forest">
          <NavLinks />
          <button onClick={() => { onOpenConsole(); setMobileMenuOpen(false); }} className="text-left text-slate-500">{t.nav.console}</button>
          <div className="mt-auto pb-12">
            <button className="w-full bg-forest text-white py-5 rounded-full text-xs tracking-[0.4em] uppercase font-bold">
               {lang === 'zh' ? '立即咨询' : 'INQUIRY'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
