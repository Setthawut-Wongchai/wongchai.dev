'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-black py-16 text-[#9aa0a6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 font-bold text-white text-base">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#4285f4] to-[#9b72cb]">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <span>James — Android Developer Portal</span>
            </div>
            <p className="text-xs text-[#dadce0] max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">{t('footer.navTitle')}</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-white transition-colors">{t('nav.overview')}</Link></li>
              <li><Link href="/docs" className="hover:text-white transition-colors">{t('nav.docs')}</Link></li>
              <li><Link href="/releases" className="hover:text-white transition-colors">{t('nav.releases')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">{t('footer.stackTitle')}</h4>
            <ul className="space-y-2 text-xs text-[#dadce0]">
              <li className="flex items-center gap-1.5"><span className="text-[#4285f4] font-medium">Kotlin & Java</span> (Android SDK)</li>
              <li className="flex items-center gap-1.5"><span className="text-[#9b72cb] font-medium">MVVM</span> & Clean Architecture</li>
              <li className="flex items-center gap-1.5"><span className="text-[#34a853] font-medium">Next.js</span> & Supabase Postgres</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9aa0a6]">
          <p>© {new Date().getFullYear()} James. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34a853]" />
              Google Android Design Language
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
