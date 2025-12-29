
import React, { useState, useRef } from 'react';
import { editPetImage } from '../services/geminiService';
import { translations } from '../translations';

interface Props { lang: 'zh' | 'en'; }

const ImageLab: React.FC<Props> = ({ lang }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [editedImage, setEditedImage] = useState<string | undefined>(undefined);
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
        setEditedImage(undefined);
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
      const result = await editPetImage(base64Data, mimeType, finalPrompt);
      setEditedImage(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(undefined);
    setEditedImage(undefined);
    setPrompt('');
  };

  return (
    <section id="image-lab" className="py-10 md:py-24 px-6 md:px-12 bg-oatmeal/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 lg:flex-row lg:items-center relative z-10">
        <div className="w-full lg:w-3/5 order-2 lg:order-1">
          <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden border-2 md:border-4 border-white group">
            {!selectedImage && !loading && (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 md:w-20 md:h-20 bg-oatmeal rounded-full flex items-center justify-center mb-4 text-sage shadow-inner">
                  <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.5v15m7.5-7.5h-15" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">{t.upload}</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-md z-20 flex flex-col items-center justify-center">
                 <div className="w-12 h-12 md:w-20 md:h-20 border-[3px] border-sage/10 border-t-sage rounded-full animate-spin"></div>
                 <p className="mt-4 md:mt-8 text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-deep-sage animate-pulse font-bold text-center px-4">{t.loading}</p>
              </div>
            )}

            {(editedImage || selectedImage) && !loading && (
              <img src={editedImage || selectedImage} className="w-full h-full object-cover animate-fade-in" />
            )}

            {selectedImage && (
              <div className="absolute top-4 right-4 flex gap-2 z-30">
                <button onClick={handleReset} className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2"/></svg></button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/5 order-1 lg:order-2 space-y-4 md:space-y-10">
          <div className="space-y-2">
            <span className="text-sage text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold block">{t.tag}</span>
            <h2 className="text-2xl md:text-5xl font-light text-forest leading-tight font-serif-brand">{t.title}</h2>
          </div>

          <div className="space-y-4">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.placeholder}
              className="w-full p-4 md:p-8 bg-white border-transparent rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm text-xs md:text-sm font-light min-h-[80px] md:min-h-[140px] resize-none focus:ring-2 focus:ring-sage/20 transition-all outline-none"
            />
            
            <button 
              onClick={() => handleEdit()}
              disabled={loading || !selectedImage || !prompt}
              className="w-full py-4 md:py-6 bg-brand-green text-white rounded-full text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-bold shadow-xl transition-all disabled:opacity-20 active:scale-95"
            >
              {t.btnCreate}
            </button>
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
    </section>
  );
};

export default ImageLab;
