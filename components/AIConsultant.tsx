
import React, { useState } from 'react';
import { getPetScentAdvice } from '../services/geminiService';
import { translations } from '../translations';

const AIConsultant: React.FC = () => {
  const t = translations.zh.consultant;
  const [petType, setPetType] = useState(t.petTypes[0]);
  const [behavior, setBehavior] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!behavior || loading) return;
    
    setLoading(true);
    setAdvice(null);
    setErrorMsg(null);
    
    try {
      const corePetType = petType.split(' | ')[0];
      const result = await getPetScentAdvice(corePetType, behavior, 'zh');
      setAdvice(result);
    } catch (error: any) { 
      console.error("Reasoning Error:", error);
      const errorString = error?.message || String(error);
      
      if (
        errorString.includes("missing") || 
        errorString.includes("API key") || 
        errorString.includes("403") || 
        errorString.includes("Requested entity was not found")
      ) {
        setErrorMsg("API Key 缺失或无效。请检查您的环境变量配置。");
      } else {
        setErrorMsg("分析暂时遇到阻碍，请稍后重试。");
      }
    } 
    finally { setLoading(false); }
  };

  return (
    <section id="ai-consultant" className="py-12 md:py-32 px-5 md:px-12 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-canvas/50 rounded-[2.5rem] md:rounded-[5rem] p-6 md:p-20 border border-brand-green/10 shadow-sm relative overflow-hidden">
          
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              <span className="text-brand-green text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-bold italic">Logic Reasoning Notes</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-ink font-serif-brand mb-3">{t.title}</h2>
            <p className="text-ink/40 text-[10px] md:text-base font-medium italic tracking-tight">{t.desc}</p>
            {/* 免责声明提示语 */}
            <p className="text-ink/30 text-[9px] md:text-[11px] mt-4 max-w-lg mx-auto leading-relaxed italic border-t border-brand-green/5 pt-4">
              {t.disclaimer}
            </p>
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

            <textarea 
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              placeholder="请描述观察到的行为细节..."
              className="w-full bg-white border border-brand-green/5 rounded-[1.5rem] md:rounded-[3rem] py-6 md:py-10 px-6 md:px-12 text-xs md:text-base font-medium min-h-[160px] resize-none outline-none focus:ring-2 focus:ring-brand-green/10 transition-all"
            />

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] md:text-xs font-medium text-center">
                {errorMsg}
              </div>
            )}

            <button disabled={loading || !behavior} className="w-full py-5 md:py-8 bg-brand-green text-white rounded-full text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold shadow-2xl disabled:opacity-20 active:scale-95 transition-all overflow-hidden relative">
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="animate-pulse">正在进行逻辑推演...</span>
                </div>
              ) : t.btnSubmit}
            </button>
          </form>

          {advice && (
            <div className="mt-10 md:mt-20 bg-white rounded-[2rem] p-6 md:p-16 shadow-2xl border border-brand-green/5 animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-green/5 pb-6 mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-green/5 rounded-full flex items-center justify-center text-brand-green">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.5"/></svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl text-ink font-serif-brand font-bold">{t.resultTitle}</h3>
                    <p className="text-[8px] md:text-[10px] text-ink/30 uppercase tracking-[0.3em] font-bold">Personal Logic Report</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">行为逻辑推演</span>
                    <p className="text-ink/60 text-[11px] md:text-sm leading-relaxed mt-2 italic border-l-2 border-brand-green/10 pl-4">{advice.analysis}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">分子干预路径</span>
                    <p className="text-ink/60 text-[11px] md:text-sm leading-relaxed mt-2">{advice.scentLogic}</p>
                  </div>
                </div>
                <div className="bg-canvas/50 p-6 md:p-10 rounded-[2rem] border border-brand-green/5 space-y-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">建议方案</span>
                    <h4 className="text-xl md:text-2xl font-serif-brand font-bold text-brand-green mt-1">{advice.productRecommendation}</h4>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-ink/30 font-bold">环境建议</span>
                    <p className="text-[11px] text-ink/50 leading-relaxed mt-1">{advice.envAdvice}</p>
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
