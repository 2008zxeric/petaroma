import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import SafetyStandard from './components/SafetyStandard';
import AIConsultant from './components/AIConsultant';
import ImageLab from './components/ImageLab';
import HomeQR from './components/HomeQR';
import ScentConsole from './components/ScentConsole';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // 强制设置网页标题，防止 HTML 缓存导致的旧标题显示
  useEffect(() => {
    document.title = "它香 宠物芳香生活";
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-brand-green/20 selection:text-brand-green bg-canvas">
      {/* 始终显示的 Header */}
      <Header onOpenConsole={() => setConsoleOpen(true)} />
      
      <main className="flex-grow">
        {/* 如果没有选中产品，显示首页内容 */}
        {!selectedProductId ? (
          <div className="animate-fade-in">
            <Hero />
            <Philosophy />
            <ProductGrid onSelectProduct={(id) => setSelectedProductId(id)} />
            <SafetyStandard lang="zh" />
            <div id="image-lab">
              <ImageLab lang="zh" />
            </div>
            <AIConsultant />
            <HomeQR />
          </div>
        ) : (
          /* 如果选中了产品，显示二级详情页 */
          <ProductDetail 
            productId={selectedProductId} 
            onBack={() => setSelectedProductId(null)} 
          />
        )}
      </main>
      
      <Footer />

      {consoleOpen && (
        <ScentConsole lang="zh" onClose={() => setConsoleOpen(false)} />
      )}
    </div>
  );
};

export default App;
