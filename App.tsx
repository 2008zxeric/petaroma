
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProductGrid from './components/ProductGrid';
import AIConsultant from './components/AIConsultant';
import ImageLab from './components/ImageLab';
import ScentConsole from './components/ScentConsole';
import Footer from './components/Footer';
import { translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [consoleOpen, setConsoleOpen] = useState(false);

  useEffect(() => {
    const t = translations[lang];
    document.title = `${t.brandName} ${t.brandSub} | ${t.hero.title.replace('\n', ' ')}`;
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-fog-green selection:text-white">
      <Header lang={lang} setLang={setLang} onOpenConsole={() => setConsoleOpen(true)} />
      <main className="flex-grow">
        <Hero lang={lang} />
        {/* Safety standards are now part of the Philosophy section for a more compact flow */}
        <Philosophy lang={lang} />
        <div id="products">
          <ProductGrid lang={lang} />
        </div>
        <ImageLab lang={lang} />
        <AIConsultant lang={lang} />
      </main>
      <Footer lang={lang} />

      {consoleOpen && (
        <ScentConsole lang={lang} onClose={() => setConsoleOpen(false)} />
      )}
    </div>
  );
};

export default App;
