
import React, { useState } from 'react';
import { getPetScentAdvice } from '../services/geminiService';
import { translations } from '../translations';

interface Props { lang: 'zh' | 'en'; }

const AIConsultant: React.FC<Props> = ({ lang }) => {
  const t = translations[lang].consultant;
  const extendedPetTypes = lang === 'zh' 
    ? ['猫咪', '狗狗', '小宠', '鸟类', '其他'] 
    : ['Cat', 'Dog', 'Small', 'Bird', 'Other'];

  const [petType, setPetType] = useState(extendedPetTypes[0]);
  const [behavior, setBehavior] = useState('');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!behavior || loading) return;
    setLoading(true);
    setAdvice(null);
    try {
      const result = await getPetScentAdvice(petType, behavior, lang);
      setAdvice(result);
    } catch (error) {
      console.error(error);
      alert(lang === 'zh' ? '实验室繁忙，请稍后再试' : 'Consultant is busy.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="py-16 px-4 md:px-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="bg-oatmeal/60 rounded-[3rem] p-6 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white">
          <div className="text-center mb-8">
            <span className="text-sage uppercase text-[8px] tracking-[0.4em] font-bold mb-3 block">{t.tag}</span>
            <h2 className="text-2xl md:text-4xl font-light mb-4 text-forest font-serif">{t.title}</h2>
            <p className="text-gray-500 font-light text-[11px] md:text-sm max-w-lg mx-auto leading-relaxed">{t.desc}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[8px] uppercase tracking-[0.2em] text-gray-400 mb-2 pl-1 font-bold">{t.labelType}</label>
                <div className="grid grid-cols-5 gap-2">
                  {extendedPetTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPetType(type)}
                      className={`py-2 rounded-xl text-[8px] md:text-[10px] tracking-tight font-bold transition-all duration-300 ${
                        petType === type 
                          ? 'bg-deep-sage text-white shadow-lg shadow-sage/20' 
                          : 'bg-white text-gray-400 border border-gray-100 hover:border-sage/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-[8px] uppercase tracking-[0.2em] text-gray-400 mb-2 pl-1 font-bold">{t.labelBehavior}</label>
                <input 
                  type="text"
                  placeholder={lang === 'zh' ? '描述困扰，如：惊恐、舔毛...' : 'e.g., anxiety...'}
                  value={behavior}
                  onChange={(e) => setBehavior(e.target.value)}
                  className="w-full py-4 px-6 rounded-2xl text-[12px] bg-white border-transparent focus:border-sage/40 focus:ring-0 shadow-sm font-light placeholder:text-gray-300 transition-all"
                />
              </div>
            </div>

            <button 
              disabled={loading || !behavior}
              className={`w-full py-4 rounded-full text-[10px] tracking-[0.3em] uppercase font-bold transition-all shadow-xl active:scale-95 ${
                loading ? 'bg-gray-100 text-gray-400' : 'bg-sage text-white hover:bg-deep-sage'
              }`}
            >
              {loading ? t.loading : t.btnSubmit}
            </button>
          </form>

          {advice && (
            <div className="mt-10 p-6 md:p-8 bg-white rounded-3xl border border-sage/10 shadow-xl animate-fade-in-up">
              <h3 className="text-lg font-light mb-6 flex items-center gap-3 text-forest">
                <div className="w-8 h-8 bg-sage/10 text-sage rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" strokeWidth="3"/></svg>
                </div>
                {t.resultTitle}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[9px] uppercase tracking-[0.3em] text-sage font-bold mb-1.5">{t.field1}</h4>
                    <p className="text-slate-600 text-xs font-light leading-relaxed">{advice.analysis}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] uppercase tracking-[0.3em] text-sage font-bold mb-1.5">{t.field2}</h4>
                    <p className="text-slate-600 text-xs font-light leading-relaxed">{advice.scentSuggestion}</p>
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="p-4 bg-essence/10 rounded-2xl border border-essence/5">
                    <h4 className="text-[9px] uppercase tracking-[0.3em] text-clay font-bold mb-1.5 flex items-center gap-1">
                       ✦ {t.field3}
                    </h4>
                    <p className="text-slate-500 text-[11px] font-light leading-relaxed">{advice.warning}</p>
                  </div>
                  <div>
                    <h4 className="text-[9px] uppercase tracking-[0.3em] text-sage font-bold mb-1.5">{t.field4}</h4>
                    <div className="text-forest font-light text-base">
                       {lang === 'zh' ? '它香 · ' : 'PetScent · '} 
                       <span className="text-deep-sage font-bold">{advice.productRecommendation}</span>
                    </div>
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
