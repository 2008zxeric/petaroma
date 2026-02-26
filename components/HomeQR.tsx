
import React from 'react';
import { translations } from '../translations';

const HomeQR: React.FC = () => {
  const t = translations.zh.homeQr;
  const xhsLink = "https://xhslink.com/m/aqTp5izPC8";

  return (
    <section className="py-24 md:py-32 px-6 bg-oatmeal relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-block p-4 bg-white rounded-full mb-4 shadow-sm border border-brand-green/5">
            <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif-brand text-ink">
            {t.title} <br/>
            <span className="text-brand-green italic text-xl md:text-3xl mt-2 block">{t.titleEn}</span>
          </h2>
          <p className="text-ink/50 text-xs md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.desc}
          </p>
        </div>

        <a 
          href={xhsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-block p-4 bg-white rounded-[2.5rem] shadow-2xl transition-all hover:rotate-2 hover:scale-105 active:scale-95 border-4 border-white"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 overflow-hidden rounded-[2rem]">
            <img 
              src="/qr-code.png" 
              alt="Xiaohongshu QR" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              onError={(e) => {
                // 如果本地图片加载失败，显示品牌占位
                (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(xhsLink)}`;
              }}
            />
          </div>
          <div className="absolute inset-x-0 -bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all">
            <span className="bg-[#FF2442] text-white text-[9px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
              Follow us on RED
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default HomeQR;

