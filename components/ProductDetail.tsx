import React, { useEffect, useState } from 'react';
import { translations } from '../translations';
import Logo from './Logo';

interface Props {
  productId: string;
  onBack: () => void;
}

const ProductDetail: React.FC<Props> = ({ productId, onBack }) => {
  const t = translations.zh.products;
  const product = (t.items as any)[productId];
  const [activeTab, setActiveTab] = useState<'story' | 'science' | 'guide'>('story');
  
  // 目标小红书链接
  const myDestinationUrl = "https://xhslink.com/m/aqTp5izPC8"; 

  const [qrSrc, setQrSrc] = useState("/qr-code.png");
  const fallbackQrApi = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(myDestinationUrl)}`;

  const handleQrError = () => {
    setQrSrc(fallbackQrApi);
  };
  
  const heroImage = "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=85&w=2400";
  const bottleImage = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600";
  const boxImage = "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=600";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-[#FDFBF7] overflow-y-auto animate-fade-in font-serif-brand text-ink pb-32">
      
      {/* 1. 顶部导航 */}
      <header className="sticky top-0 z-[110] bg-white/95 backdrop-blur-xl border-b border-brand-green/5 px-4 md:px-12 py-3 md:py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <Logo imgClassName="w-8 h-8 md:w-10 md:h-10" align="left" />
          <span className="text-[9px] md:text-xs font-bold tracking-[0.2em] text-ink/40 uppercase truncate">
            {product.name}
          </span>
        </div>
        <button onClick={onBack} className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase hover:text-brand-green transition-all px-4 py-2 bg-brand-green/5 rounded-full border border-brand-green/10">
          Close / 关闭
        </button>
      </header>

      {/* 2. Hero Section */}
      <section className="relative px-2 md:px-8 py-2 md:py-4">
        <div className="relative aspect-[4/3] md:aspect-[21/9] w-full rounded-[2.5rem] md:rounded-[5rem] overflow-hidden shadow-xl">
          <img src={heroImage} className="w-full h-full object-cover" alt="Hero Vibe" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center text-center p-6 md:p-10">
            <h1 className="text-4xl md:text-[8rem] text-white font-bold leading-tight mb-4 drop-shadow-2xl">
              {product.name}
            </h1>
            <p className="text-white/90 text-sm md:text-3xl font-light italic max-w-4xl leading-relaxed px-4">
              "{product.story}"
            </p>
          </div>
        </div>
      </section>

      {/* 3. Tab Navigation */}
      <div className="sticky top-[52px] md:top-[80px] z-[100] bg-[#FDFBF7]/90 backdrop-blur-md border-b border-brand-green/5">
        <div className="max-w-7xl mx-auto flex justify-around items-center h-12 md:h-16 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-ink/40">
          {[
            { id: 'story', label: '故事 Story' },
            { id: 'science', label: '成分 Science' },
            { id: 'guide', label: '指南 Guide' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`h-full px-4 border-b-2 transition-all ${activeTab === tab.id ? 'border-brand-green text-brand-green' : 'border-transparent'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-24">
        {activeTab === 'story' && (
          <div className="py-12 md:py-24 animate-fade-in space-y-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-6xl font-bold leading-tight tracking-tight">回归本能，<br/><span className="text-brand-green italic">跨物种共情。</span></h2>
                <p className="text-ink/60 text-base md:text-xl leading-relaxed font-light">{product.logic}</p>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                <img src={bottleImage} className="min-w-[70%] md:min-w-0 aspect-[3/4] bg-white rounded-[3rem] p-8 shadow-lg object-contain mix-blend-multiply" alt="Bottle" />
                <img src={boxImage} className="min-w-[70%] md:min-w-0 aspect-[3/4] bg-white rounded-[3rem] p-8 shadow-lg object-contain mix-blend-multiply" alt="Box" />
              </div>
            </div>
          </div>
        )}

        {/* 气味炼金图谱内容 */}
        {activeTab === 'science' && (
          <div className="py-12 md:py-24 animate-fade-in space-y-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-5xl font-bold">气味炼金图谱</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: product.top, role: "神经消防员", d: "舒缓神经元异常放电。", i: "🌿" },
                { n: product.mid, role: "呼吸稳速器", d: "稳定应激下的呼吸频率。", i: "🌼" },
                { n: product.base, role: "心理安全堤", d: "建立感官上的稳定锚点。", i: "🪵" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[3.5rem] shadow-xl border border-brand-green/5">
                  <div className="text-5xl mb-8">{item.i}</div>
                  <h4 className="text-xl font-bold mb-4">{item.n}</h4>
                  <p className="text-sm text-ink/50 italic leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="py-12 md:py-24 animate-fade-in space-y-16">
            <div className="bg-sage p-8 md:p-16 rounded-[3.5rem] text-white space-y-10">
              <h3 className="text-2xl md:text-4xl font-bold">专业干预指南</h3>
              <div className="grid md:grid-cols-2 gap-8 text-sm font-light">
                 <p>🌫️ 建议压力预期前30分钟开启扩散，营造感官舒适区。</p>
                 <p>📍 可配合记忆垫使用，针对特定行为习惯进行定向引导。</p>
              </div>
            </div>
          </div>
        )}

        {/* 二维码部分：保留点击功能 */}
        <section className="py-16 border-t border-ink/10 mt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left space-y-4">
                <div className="bg-[#FF2442] px-6 py-1.5 rounded-full inline-flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-widest uppercase">Red / 小红书</span>
                </div>
                <h4 className="text-xl md:text-3xl text-ink/60 font-medium italic">点击或扫码，与专家开启深度对话</h4>
              </div>
              
              <a 
                href={myDestinationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-40 h-40 md:w-56 md:h-56 p-2 bg-white rounded-2xl shadow-xl border border-brand-green/5 overflow-hidden block transition-all hover:rotate-3 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <img 
                  src={qrSrc} 
                  className="w-full h-full object-contain" 
                  alt="Consult QR" 
                  onError={handleQrError}
                />
              </a>
            </div>
        </section>
      </main>

      {/* 底部购买/咨询栏：已移除数字价格 */}
      <div className="fixed bottom-0 inset-x-0 z-[120] bg-white/95 backdrop-blur-2xl border-t border-brand-green/10 p-4 md:p-8 shadow-[0_-15px_50px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-ink/20 uppercase tracking-[0.3em] mb-1">{product.en} Series</span>
            <span className="text-lg md:text-3xl font-bold text-brand-green tracking-tight">欢迎小红书咨询</span>
          </div>
          <a 
            href={myDestinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 md:px-20 py-4 md:py-7 bg-brand-green text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.4em] shadow-2xl hover:bg-leaf-green hover:shadow-brand-green/40 hover:-translate-y-1 transition-all text-center"
          >
            Consult / 立即咨询
          </a>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
