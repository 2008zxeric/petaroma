
import React, { useState, useRef } from 'react';
import { editPetImage } from '../services/geminiService';
import { translations } from '../translations';

interface Props { lang: 'zh' | 'en'; }

const ImageLab: React.FC<Props> = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[lang].lab;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!selectedImage || !finalPrompt) return;

    setLoading(true);
    try {
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];
      const result = await editPetImage(base64Data, mimeType, finalPrompt, lang);
      setEditedImage(result);
    } catch (error) {
      console.error(error);
      alert(lang === 'zh' ? '视觉实验室正在维护' : 'Laboratory is busy.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setEditedImage(null);
    setPrompt('');
  };

  return (
    <section id="image-lab" className="py-20 px-6 md:px-12 bg-oatmeal">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row lg:items-center">
        {/* Visual Preview Area */}
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-[2.5rem] shadow-xl overflow-hidden group border border-white">
            {!selectedImage && !loading && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-oatmeal rounded-full flex items-center justify-center mb-4 text-sage transition-transform group-active:scale-95">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="1.5"/></svg>
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">{t.upload}</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                 <div className="w-12 h-12 border-2 border-sage border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-[9px] uppercase tracking-[0.3em] text-deep-sage animate-pulse font-bold">{t.loading}</p>
              </div>
            )}

            {(editedImage || selectedImage) && !loading && (
              <img src={editedImage || selectedImage} className="w-full h-full object-cover animate-fade-in" />
            )}

            {selectedImage && (
              <div className="absolute top-6 right-6 flex gap-3 z-30">
                <button onClick={handleReset} className="w-10 h-10 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2"/></svg></button>
                {editedImage && <a href={editedImage} download="petsent.png" className="w-10 h-10 bg-sage text-white rounded-full flex items-center justify-center shadow-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2"/></svg></a>}
              </div>
            )}
          </div>
        </div>

        {/* Info & Inputs Area */}
        <div className="w-full lg:w-2/5 order-1 lg:order-2 space-y-8">
          <div>
            <span className="text-sage text-[9px] uppercase tracking-[0.3em] font-bold mb-4 block">{t.tag}</span>
            <h2 className="text-3xl font-light mb-4 text-forest leading-tight">{t.title}</h2>
            <p className="text-gray-400 font-light text-xs leading-relaxed">{t.desc}</p>
          </div>

          <div className="space-y-4">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.placeholder}
              className="w-full p-6 bg-white border-transparent rounded-3xl shadow-sm focus:border-sage focus:ring-0 text-sm font-light min-h-[100px] resize-none"
            />
            <button 
              onClick={() => handleEdit()}
              disabled={loading || !selectedImage || !prompt}
              className="w-full py-4 bg-forest text-white rounded-full text-[10px] tracking-[0.3em] uppercase font-bold shadow-lg disabled:opacity-30"
            >
              {lang === 'zh' ? '生成视觉炼金' : 'Generate Alchemy'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {t.presets.map(p => (
              <button 
                key={p}
                onClick={() => { setPrompt(p); handleEdit(p); }}
                className="px-4 py-2 bg-white/50 border border-white rounded-full text-[9px] tracking-widest text-gray-400 active:border-sage transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
    </section>
  );
};

export default ImageLab;
