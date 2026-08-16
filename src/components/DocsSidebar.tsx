'use client';

import Link from 'next/link';
import { BookOpen, Terminal, ChevronRight, FileText } from 'lucide-react';
import type { DocItem } from '@/lib/docs';
import { useLanguage } from '@/lib/LanguageContext';

interface DocsSidebarProps {
  currentSlug: string;
  docs: DocItem[];
}

export function DocsSidebar({ currentSlug, docs }: DocsSidebarProps) {
  const { t } = useLanguage();

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-800/80 p-4 lg:py-8 lg:px-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-3">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            {t('docs.title')}
          </h3>
          <nav className="space-y-1">
            {docs.map((doc) => {
              const isActive = currentSlug === doc.slug || (currentSlug === '' && doc.slug === 'index');
              return (
                <Link
                  key={doc.slug}
                  href={doc.slug === 'index' ? '/docs' : `/docs/${doc.slug}`}
                  className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className={`h-3.5 w-3.5 ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`} />
                    <span className="truncate">{doc.title}</span>
                  </div>
                  {isActive && <ChevronRight className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-4 space-y-2">
          <div className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            {t('docs.needApk')}
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            {t('docs.needApkDesc')}
          </p>
          <Link
            href="/releases"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 pt-1"
          >
            {t('docs.goToReleases')}
          </Link>
        </div>
      </div>
    </aside>
  );
}
