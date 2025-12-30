
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
  const [needsKey, setNeedsKey] = useState(false);

  const getAIStudio = () => (window as any).aistudio;

  const checkAndOpenKeySelector = async () => {
    const aistudio = getAIStudio();
    if (aistudio) {
      try {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await aistudio.openSelectKey();
          return true;
        }
      } catch (e) {
        console.error("AIStudio key check failed", e);
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!behavior || loading) return;
    
    setLoading(true);
    setAdvice(null);
    setErrorMsg(null);
    setNeedsKey(false);
    
    try {
      // 规则要求：在使用高级模型前确保 key 授权
      await checkAndOpenKeySelector();

      const corePetType = petType.split(' | ')[0];
      const result = await getPetScentAdvice(corePetType, behavior, 'zh');
      setAdvice(result);
    } catch (error: any) { 
      console.error("Diagnosis Error:", error);
      
      const errorString = error?.message || String(error);
      
      // 捕获 API 异常，引导用户进行 Key 选择
      if (
        errorString.includes("missing") || 
        errorString.includes("API key") || 
        errorString.includes("403") || 
        errorString.includes("401") ||
        errorString.includes("Requested entity was not found")
      ) {
        setErrorMsg("API Key 未授权或已失效（美国 Vercel 环境可能需要重新确认）。请点击下方按钮选择有效的 API Key（需关联付费项目）。");
        setNeedsKey(true);
      } else {
        setErrorMsg("深度推理分析遇到技术阻碍，请检查您的网络连接或稍后再试。");
      }
    } 
    finally { setLoading(false); }
  };

  const handleOpenKey = async () => {
    const aistudio = getAIStudio();
    if (aistudio) {
      await aistudio.openSelectKey();
      setErrorMsg(null);
      setNeedsKey(false);
    }
  };

  return (
    <section id="ai-consultant" className="py-12 md:py-32 px-5 md:px-12 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-canvas/50 rounded-[2.5rem] md:rounded-[5rem] p-6 md:p-20 border border-brand-green/10 shadow-sm relative overflow-hidden">
          
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              <span className="text-brand-green text-[9px] md:text-[11px] uppercase tracking-[0.5em] font-bold italic">Deep Reasoning Advisor</span>
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

            <textarea 
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              placeholder="请描述宠物的异常行为（如：突然变得粘人、半夜嚎叫等）..."
              className="w-full bg-white border border-brand-green/5 rounded-[1.5rem] md:rounded-[3rem] py-6 md:py-10 px-6 md:px-12 text-xs md:text-base font-medium min-h-[160px] resize-none outline-none focus:ring-2 focus:ring-brand-green/10 transition-all"
            />

            {errorMsg && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[10px] md:text-xs font-medium text-center animate-fade-in">
                  {errorMsg}
                </div>
                {needsKey && getAIStudio() && (
                  <div className="space-y-3">
                    <button 
                      type="button"
                      onClick={handleOpenKey}
                      className="w-full py-4 bg-brand-green text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
                    >
                      重新选择并授权 API KEY
                    </button>
                    <p className="text-[9px] text-center text-ink/30 italic">
                      提示：请确保选择一个已开启账单（Paid Project）的 Google Cloud 项目。<br/>
                      <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline hover:text-brand-green">查看计费文档</a>
                    </p>
                  </div>
                )}
              </div>
            )}

            <button disabled={loading || !behavior} className="w-full py-5 md:py-8 bg-brand-green text-white rounded-full text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold shadow-2xl disabled:opacity-20 active:scale-95 transition-all overflow-hidden relative">
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="animate-pulse">正在进行深度逻辑推理...</span>
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
                    <p className="text-[8px] md:text-[10px] text-ink/30 uppercase tracking-[0.3em] font-bold">Logic Analysis Complete</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">行为逻辑推理 | Reasoning Logic</span>
                    <p className="text-ink/60 text-[11px] md:text-sm leading-relaxed mt-2 italic border-l-2 border-brand-green/10 pl-4">{advice.analysis}</p>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">分子干预路径 | Molecular Mechanism</span>
                    <p className="text-ink/60 text-[11px] md:text-sm leading-relaxed mt-2">{advice.scentLogic}</p>
                  </div>
                </div>
                <div className="bg-canvas/50 p-6 md:p-10 rounded-[2rem] border border-brand-green/5 space-y-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">Recommended Scheme</span>
                    <h4 className="text-xl md:text-2xl font-serif-brand font-bold text-brand-green mt-1">{advice.productRecommendation}</h4>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-ink/30 font-bold">Environmental Advice</span>
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
