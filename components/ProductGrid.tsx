
import React from 'react';
import { translations } from '../translations';

interface Props { lang: 'zh' | 'en'; }

const ProductGrid: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].products;
  const products = [
    { id: '1', ...t.items["1"], img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=1200' },
    { id: '2', ...t.items["2"], img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200' },
    { id: '3', ...t.items["3"], img: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=1200' },
    { id: '4', ...t.items["4"], img: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1200' }
  ];

  return (
    <section id="products" className="py-12 md:py-24 px-4 md:px-12 bg-white" aria-labelledby="products-title">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16 animate-fade-in-up">
          <h2 id="products-title" className="text-2xl md:text-5xl font-normal mb-3 text-forest">{t.title}</h2>
          <p className="text-slate-500 font-light text-[10px] md:text-lg max-w-2xl mx-auto px-4 leading-relaxed italic">{t.sub}</p>
        </div>

        {/* 四宫格布局：移动端 grid-cols-2，桌面端 grid-cols-4 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
          {products.map((p) => (
            <div key={p.id} className="flex flex-col group" role="article">
              <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl md:rounded-[3rem] bg-oatmeal border border-sage/5 shadow-sm transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-xl">
                <img 
                  src={p.img} 
                  alt={`${p.name}`} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out z-10" 
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 md:px-3 md:py-1 bg-forest/80 backdrop-blur-md rounded-full z-30 shadow-md">
                   <span className="text-[6px] md:text-[8px] uppercase tracking-widest text-white font-bold">{p.series}</span>
                </div>
                
                {/* 悬浮细节层 */}
                <div className="absolute inset-0 bg-forest/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex flex-col items-center justify-center p-4 text-center text-white">
                  <div className="space-y-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[7px] tracking-[0.2em] uppercase opacity-70">Formula</p>
                    <p className="text-[9px] md:text-[11px] font-light leading-snug">{p.top} · {p.mid} · {p.base}</p>
                  </div>
                </div>
              </div>

              <div className="px-1 text-center">
                <h3 className="text-sm md:text-2xl font-serif text-forest mb-1">{p.name}</h3>
                <p className="text-slate-500 text-[8px] md:text-sm font-light leading-relaxed line-clamp-1 md:line-clamp-2">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
