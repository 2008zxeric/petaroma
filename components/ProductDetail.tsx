
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
  
  // ==========================================
  // 【二维码与链接配置区域】
  // ==========================================
  
  // 1. 您想让用户扫码后跳转到的链接
  const myDestinationUrl = "https://xhslink.com/m/aqTp5izPC8"; 

  // 2. 默认尝试加载您在 public 文件夹下的图片路径
  const [qrSrc, setQrSrc] = useState("/qr-code.png");

  // 3. 备选方案：如果本地图片加载失败，则使用 API 在线生成跳转到上述链接的二维码
  const fallbackQrApi = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(myDestinationUrl)}`;

  const handleQrError = () => {
    console.warn("未找到本地图片 /qr-code.png，已自动切换为指向最新链接的动态二维码。");
    setQrSrc(fallbackQrApi);
  };
  
  // ==========================================

  const heroImage = "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=85&w=2400";
  const bottleImage = "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600";
  const boxImage = "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=600";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-[#FDFBF7] overflow-y-auto animate-fade-in font-serif-brand text-ink selection:bg-brand-green/10 pb-32">
      
      {/* 1. 顶部导航 */}
      <header className="sticky top-0 z-[110] bg-white/95 backdrop-blur-xl border-b border-brand-green/5 px-4 md:px-12 py-3 md:py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <Logo imgClassName="w-8 h-8 md:w-10 md:h-10" align="left" />
          <span className="text-[9px] md:text-xs font-bold tracking-[0.2em] text-ink/40 uppercase truncate max-w-[100px] md:max-w-none">
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
            <div className="mb-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 hidden md:block">
               <span className="text-white/80 text-[10px] uppercase tracking-[0.6em] font-bold">
                 Scent Protection
               </span>
            </div>
            <h1 className="text-4xl md:text-[10rem] text-white font-bold leading-tight mb-4 md:mb-8 drop-shadow-2xl">
              {product.name}
            </h1>
            <p className="text-white/90 text-sm md:text-3xl font-light italic max-w-4xl leading-relaxed">
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
                <div className="min-w-[70%] md:min-w-0 aspect-[3/4] bg-white rounded-[3rem] p-8 shadow-lg border border-brand-green/5 shrink-0">
                  <img src={bottleImage} className="w-full h-full object-contain mix-blend-multiply" alt="Bottle" />
                </div>
                <div className="min-w-[70%] md:min-w-0 aspect-[3/4] bg-white rounded-[3rem] p-8 shadow-lg border border-brand-green/5 shrink-0">
                  <img src={boxImage} className="w-full h-full object-contain mix-blend-multiply" alt="Box" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'science' && (
          <div className="py-12 md:py-24 animate-fade-in space-y-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-5xl font-bold">气味炼金图谱</h3>
              <p className="text-[10px] uppercase tracking-[0.5em] text-ink/30 mt-2">Molecular Synthesis</p>
            </div>
            <div className="flex overflow-x-auto gap-6 pb-8 px-2 -mx-2 no-scrollbar md:grid md:grid-cols-3">
              {[
                { n: product.top.split(' ')[0], e: product.top.split(' ')[1], role: "神经消防员", d: "舒缓神经元异常放电。", i: "🌿", tag: "即时安抚" },
                { n: product.mid.split(' ')[0], e: product.mid.split(' ')[1], role: "呼吸稳速器", d: "稳定应激下的呼吸频率。", i: "🌼", tag: "生理调节" },
                { n: product.base.split(' ')[0], e: product.base.split(' ')[1], role: "心理安全堤", d: "建立感官上的稳定锚点。", i: "🪵", tag: "深层防御" }
              ].map((item, idx) => (
                <div key={idx} className="min-w-[85%] md:min-w-0 bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl border border-brand-green/5 shrink-0">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-5xl">{item.i}</div>
                    <span className="px-3 py-1 bg-brand-green/5 text-brand-green text-[9px] font-bold rounded-full uppercase">{item.tag}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-1">{item.n}</h4>
                  <p className="text-[10px] font-bold text-brand-green/40 uppercase mb-6">{item.e}</p>
                  <p className="text-sm text-ink/50 leading-relaxed italic">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="py-12 md:py-24 animate-fade-in space-y-16">
            <div className="bg-sage p-8 md:p-16 rounded-[3.5rem] text-white space-y-10">
              <h3 className="text-2xl md:text-4xl font-bold">专业干预指南</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">🌫️</div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">全屋扩香</span>
                    <p className="text-sm font-light mt-1">压力预期前30分钟开启。</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">点涂记忆</span>
                    <p className="text-sm font-light mt-1">针对突发变动精准唤醒安全感。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="py-16 border-t border-ink/10 mt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left space-y-4">
                <div className="bg-[#FF2442] px-6 py-1.5 rounded-full inline-flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-widest">小红书</span>
                </div>
                <h4 className="text-xl md:text-3xl text-ink/60 font-medium">扫码找到我们</h4>
              </div>
              
              {/* 二维码区域：包裹链接使其可点击 */}
              <a 
                href={myDestinationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                title="点击跳转到小红书"
                className="w-32 h-32 md:w-48 md:h-48 p-2 bg-white rounded-2xl shadow-lg border border-brand-green/5 overflow-hidden block transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <img 
                  src={qrSrc} 
                  className="w-full h-full object-contain" 
                  alt="QR Code" 
                  onError={handleQrError}
                />
              </a>
            </div>
        </section>
      </main>

      {/* 底部购买/咨询栏 */}
      <div className="fixed bottom-0 inset-x-0 z-[120] bg-white/95 backdrop-blur-2xl border-t border-brand-green/10 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-ink/30 uppercase tracking-[0.2em] hidden md:block">{product.en}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg md:text-2xl font-bold text-brand-green">欢迎小红书咨询</span>
            </div>
          </div>
          <a 
            href={myDestinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 md:px-16 py-4 md:py-6 bg-brand-green text-white rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.3em] shadow-xl hover:scale-105 active:scale-95 transition-all text-center"
          >
            Consult / 立即咨询
          </a>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
