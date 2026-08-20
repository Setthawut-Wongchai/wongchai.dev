'use client';

import Link from 'next/link';
import { Sparkles, Code2, Briefcase, Bot } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { profile } from '@/lib/profile';
import { LanguageToggle } from './LanguageToggle';
import { AuthButton } from './AuthButton';

interface NavbarClientProps {
  user?: {
    name?: string;
    email?: string;
    avatarUrl?: string;
  } | null;
  role?: 'admin' | 'tester' | 'public';
}

export function NavbarClient({ user, role }: NavbarClientProps) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full android-header-glass transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Android Bot Head / Icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#4285f4] via-[#9b72cb] to-[#d96570] shadow-md shadow-[#4285f4]/20 group-hover:scale-105 transition-transform">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight text-sm flex items-center gap-1.5 font-sans">
                James <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#4285f4] font-medium border border-white/10">Android Dev</span>
              </span>
              <span className="text-[11px] text-[#9aa0a6] font-medium">{t('nav.subtitle')}</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-[#9aa0a6]">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors"
            >
              {t('nav.overview')}
            </Link>
            <Link
              href="/#experience"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="h-3.5 w-3.5 text-[#34a853]" />
              {t('nav.experience')}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Auth Button */}
          <AuthButton initialUser={user} initialRole={role} />

          {/* Language Switcher */}
          <LanguageToggle />

          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-black hover:bg-[#dadce0] transition-all hover:scale-[1.02] shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#4285f4]" />
            {t('nav.tryGemini')}
          </Link>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-[#9aa0a6] hover:text-white hover:bg-white/10 transition-colors"
            aria-label="GitHub"
          >
            <Code2 className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
