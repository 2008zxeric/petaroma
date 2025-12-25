
import React from 'react';
import { translations } from '../translations';

interface Props { lang: 'zh' | 'en'; }

const SafetyStandard: React.FC<Props> = ({ lang }) => {
  return (
    <section className="py-12 md:py-24 bg-oatmeal px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 items-center">
          <div className="text-center md:text-left">
             <div className="inline-block p-4 bg-white rounded-2xl mb-6 shadow-sm">
                <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
             </div>
             <h3 className="text-xl md:text-3xl font-light mb-4 tracking-tight text-forest">{lang === 'zh' ? '不仅是气味，更是承诺' : 'Not just a scent, a promise.'}</h3>
             <p className="text-gray-500 font-light text-[11px] md:text-base leading-relaxed mb-6">
               {lang === 'zh' 
                ? '业内首个宠物嗅觉实验室，通过严苛感官压力测试。' 
                : 'The first pet-olfactory lab in the industry.'}
             </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3 md:gap-6">
            {[
              { title: "LD50 Non-Toxic", icon: "🧪" },
              { title: "Vet-Audited", icon: "📋" },
              { title: "IFRA Certified", icon: "🌍" },
              { title: "Full Disclosure", icon: "🛡️" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 md:p-10 rounded-xl md:rounded-[2.5rem] shadow-sm text-center">
                <div className="text-xl md:text-4xl mb-2 grayscale opacity-50">{item.icon}</div>
                <div className="text-[8px] md:text-xl font-light text-forest leading-tight">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetyStandard;
