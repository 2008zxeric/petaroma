
import React from 'react';
import { translations } from '../translations';
import Logo from './Logo';

interface Props { lang: 'zh' | 'en'; }

const Footer: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].footer;
  return (
    <footer className="bg-deep-sage text-oatmeal py-20 px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* 品牌信息：Logo 切换为亮色模式 */}
          <div className="space-y-8">
            <Logo className="w-36 md:w-44" color="#FDFBF7" showText showSlogan lang={lang} />
            <p className="text-fog-green/80 text-[11px] md:text-xs font-light leading-relaxed max-w-xs">{t.desc}</p>
          </div>

          {/* 链接网格：增强对比度 */}
          <div className="grid grid-cols-2 gap-x-16 md:gap-x-24 gap-y-10">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-fog-green">{t.links.explore}</h4>
              <ul className="space-y-4 text-[11px] md:text-xs font-light text-oatmeal/70">
                <li><a href="#" className="hover:text-white transition-colors">{t.links.p1}</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">{t.links.p2}</a></li>
                <li><a href="#image-lab" className="hover:text-white transition-colors">{t.links.p3}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6 text-fog-green">{t.links.service}</h4>
              <ul className="space-y-4 text-[11px] md:text-xs font-light text-oatmeal/70">
                <li><a href="#" className="hover:text-white transition-colors">{t.links.s1}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.links.s2}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.links.s3}</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 底部版权：提升亮度 */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] text-fog-green/60 tracking-widest uppercase">
          <div className="flex gap-8">
            {t.socials.map(s => <a key={s} href="#" className="hover:text-white transition-all duration-300">{s}</a>)}
          </div>
          <p className="font-medium text-oatmeal/40">{t.copy}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
