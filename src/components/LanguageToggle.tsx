'use client';

import { useLanguage, type Language } from '@/lib/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-semibold">
      <button
        type="button"
        onClick={() => setLang('th')}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
          lang === 'th'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <span className="text-[11px]">🇹🇭</span> TH
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
          lang === 'en'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        <span className="text-[11px]">🇺🇸</span> EN
      </button>
    </div>
  );
}
