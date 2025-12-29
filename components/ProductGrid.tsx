
import React from 'react';
import { translations } from '../translations';

interface Props {
  onSelectProduct: (id: string) => void;
}

const ProductGrid: React.FC<Props> = ({ onSelectProduct }) => {
  const t = translations.zh.products;
  const products = [
    { id: '1', ...t.items["1"], img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=1200' }, 
    { id: '2', ...t.items["2"], img: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=1200' }, 
    { id: '3', ...t.items["3"], img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1200' }, 
    { id: '4', ...t.items["4"], img: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1200' }
  ];

  return (
    <section id="products" className="py-10 md:py-32 px-4 md:px-12 bg-canvas">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-20 animate-fade-in-up">
          <div className="flex flex-col items-center gap-1 mb-2">
             <h2 className="text-2xl md:text-5xl font-bold text-ink font-serif-brand">{t.title}</h2>
             <p className="text-[9px] md:text-sm font-display italic text-brand-green/40 tracking-[0.2em]">{t.titleEn}</p>
          </div>
          <div className="w-8 h-0.5 bg-leaf-green/20 mx-auto mb-3"></div>
          <p className="text-ink/50 font-medium text-[10px] md:text-base max-w-xl mx-auto leading-relaxed px-4">
            {t.sub}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-12">
          {products.map((p) => (
            <div 
              key={p.id} 
              onClick={() => onSelectProduct(p.id)}
              className="flex flex-col group cursor-pointer"
            >
              <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-[1rem] md:rounded-[4rem] bg-white border border-brand-green/5 shadow-sm">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[4s] ease-out z-10" 
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 md:top-6 md:left-6 px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-full z-30">
                   <span className="text-[6px] md:text-[9px] uppercase tracking-widest text-brand-green font-bold">{p.series}</span>
                </div>
                {/* 悬浮覆盖层 */}
                <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/10 transition-colors z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500">
                   <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-white bg-brand-green px-4 py-2 rounded-full shadow-2xl">查看详情 Explore</span>
                </div>
              </div>

              <div className="text-center px-1">
                <h3 className="text-[11px] md:text-2xl font-serif-brand font-bold text-ink leading-tight">{p.name}</h3>
                <p className="text-[7px] md:text-xs text-brand-green/40 font-display italic mt-0.5 uppercase tracking-wider">{p.en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
