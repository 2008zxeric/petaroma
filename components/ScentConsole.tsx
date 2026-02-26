
import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';

interface Props {
  lang: 'zh' | 'en';
  onClose: () => void;
}

const ScentConsole: React.FC<Props> = ({ lang, onClose }) => {
  const t = translations[lang].console;
  const [history, setHistory] = useState<string[]>([t.welcome, t.ready]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, `${t.prompt} ${input}`];
    if (cmd === 'help') newHistory.push(t.help);
    else if (cmd === 'status') newHistory.push(t.statusMsg);
    else if (cmd === 'about') newHistory.push(t.aboutMsg);
    else if (cmd === 'clear') { setHistory([]); setInput(''); return; }
    else if (cmd === 'exit') { onClose(); return; }
    else if (cmd.startsWith('analyze')) {
      const target = cmd.split(' ')[1];
      if (!target) newHistory.push("Specify target aroma...");
      else newHistory.push(`[${target} Molecular Analysis] Stability: 100% | Purity: 100%`);
    } else newHistory.push(t.unknown);

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-ink flex flex-col md:p-6 animate-fade-in">
      {/* Console Header */}
      <div className="bg-black/40 px-6 py-4 flex items-center justify-between border-b border-white/5 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" onClick={onClose}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/30"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/30"></div>
        </div>
        <span className="text-[8px] tracking-[0.3em] uppercase text-white/40 font-bold">MOLECULAR CONTROL CONSOLE</span>
        <button onClick={onClose} className="text-white/40"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2"/></svg></button>
      </div>

      {/* Output Area */}
      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto font-mono text-[11px] leading-relaxed text-mint/80 space-y-2 whitespace-pre-wrap">
        {history.map((line, i) => <div key={i}>{line}</div>)}
        <form onSubmit={handleCommand} className="flex items-start gap-2 pt-2">
          <span className="text-brand-green shrink-0">{t.prompt}</span>
          <input 
            autoFocus
            className="bg-transparent border-none outline-none ring-0 p-0 m-0 flex-grow text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default ScentConsole;
