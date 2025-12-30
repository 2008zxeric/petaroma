import React, { useState } from 'react';
import { getPetScentAdvice } from '../services/geminiService';
import { translations } from '../translations';

const AIConsultant: React.FC = () => {
  const t = translations.zh.consultant;
  const [petType, setPetType] = useState(t.petTypes[0]);
  const [behavior, setBehavior] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!behavior || loading) return;
    setLoading(true);
    setAdvice(null);
    try {
      const corePetType = petType.split(' | ')[0];
      const result = await getPetScentAdvice(corePetType, behavior, 'zh');
      setAdvice(result);
    } catch (error) { 
      console.error(error); 
      alert("深度推理引擎连接超时，请检查您的网络环境。");
    } 
    finally { setLoading(false); }
  };

  return (
    <section id="ai-consultant" className="py-12 md:py-32 px-5 md:px-12 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-canvas/50 rounded-[2.5rem] md:rounded-[5rem] p-6 md:p-20 border border-brand-green/10 shadow-sm relative overflow-hidden">
          
          {/* 背景装饰：科技感线条 */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-64 h-64 rotate-45" viewBox="0 0 200 200" fill="none">
              <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="0.5"/>
              <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
          </div>

          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              <span className="text-brand-green text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-bold">Powered by Deep Reasoning Engine</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-ink font-serif-brand mb-3">{t.title}</h2>
            <p className="text-ink/40 text-[10px] md:text-base font-medium italic tracking-tight">{t.desc}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-12 relative z-10">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
              {t.petTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPetType(type)}
                  className={`py-3 rounded-2xl border transition-all flex flex-col items-center justify-center gap-0.5 ${
                    petType === type 
                      ? 'bg-brand-green text-white border-brand-green shadow-lg scale-105' 
                      : 'bg-white text-ink/40 border-brand-green/5 hover:border-brand-green/20'
                  }`}
                >
                  <span className="text-[11px] md:text-sm font-bold">{type.split(' | ')[0]}</span>
                  <span className="text-[7px] md:text-[8px] opacity-60 uppercase font-display">{type.split(' | ')[1]}</span>
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea 
                value={behavior}
                onChange={(e) => setBehavior(e.target.value)}
                placeholder="描述宠物的异常行为，我们的深度推理引擎将为您分析..."
                className="w-full bg-white border border-brand-green/5 rounded-[1.5rem] md:rounded-[3rem] py-6 md:py-10 px-6 md:px-12 text-xs md:text-base font-medium shadow-inner min-h-[100px] md:min-h-[160px] resize-none outline-none focus:ring-2 focus:ring-brand-green/10 transition-all"
              />
              <div className="absolute bottom-6 right-8 text-[9px] uppercase tracking-widest text-ink/20 font-bold hidden md:block">
                Reasoning Logic Input
              </div>
            </div>

            <button disabled={loading || !behavior} className="w-full py-5 md:py-8 bg-brand-green text-white rounded-full text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold shadow-2xl disabled:opacity-20 active:scale-95 transition-all overflow-hidden relative">
              <span className={loading ? 'opacity-0' : 'opacity-100'}>{t.btnSubmit}</span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-duration:1s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:1s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:1s]"></span>
                  </div>
                  <span className="animate-pulse">深度逻辑推理中 (Reasoning...)</span>
                </div>
              )}
            </button>
          </form>

          {advice && (
            <div className="mt-10 md:mt-20 bg-white rounded-[2rem] p-6 md:p-16 shadow-2xl border border-brand-green/5 animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-green/5 pb-6 mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-green/5 rounded-full flex items-center justify-center text-brand-green shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.5"/></svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl text-ink font-serif-brand font-bold">{t.resultTitle}</h3>
                    <p className="text-[8px] md:text-[10px] text-ink/30 uppercase tracking-[0.3em] font-bold">Thinking Chain Complete</p>
                  </div>
                </div>
                <div className="flex flex-col md:items-end">
                  <span className="text-[8px] font-bold text-brand-green px-3 py-1 bg-brand-green/5 rounded-full border border-brand-green/10">32768 TOKENS BUDGET UTILIZED</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">深度行为建模 | Model Analysis</span>
                    </div>
                    <p className="text-ink/60 text-[11px] md:text-sm leading-relaxed italic border-l-2 border-brand-green/10 pl-4">{advice.analysis}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">分子干预路径 | Molecular Path</span>
                    <p className="text-ink/60 text-[11px] md:text-sm leading-relaxed">{advice.scentLogic}</p>
                  </div>
                </div>
                <div className="bg-canvas/50 p-6 md:p-10 rounded-[2rem] border border-brand-green/5 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">Recommendation</span>
                    <h4 className="text-xl md:text-2xl font-serif-brand font-bold text-brand-green">{advice.productRecommendation}</h4>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-widest text-ink/30 font-bold">Environmental Strategy</span>
                    <p className="text-[11px] text-ink/50 leading-relaxed">{advice.envAdvice}</p>
                  </div>
                  <div className="pt-4 border-t border-brand-green/10">
                    <p className="text-[9px] md:text-[11px] text-ink/40 leading-tight">安全声明: {advice.safetyNote}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;
