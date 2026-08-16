'use client';

import { useState } from 'react';
import type { Release } from '@/db/schema';
import { FeedbackModal } from './FeedbackModal';
import { Download, QrCode, Smartphone, Sparkles, ShieldCheck, Calendar, HardDrive, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface ReleaseDashboardClientProps {
  initialReleases: Release[];
}

export function ReleaseDashboardClient({ initialReleases }: ReleaseDashboardClientProps) {
  const { t } = useLanguage();
  const [selectedEnv, setSelectedEnv] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrOpenId, setQrOpenId] = useState<string | null>(null);

  const filteredReleases = selectedEnv === 'All'
    ? initialReleases
    : initialReleases.filter(r => r.environment.toLowerCase() === selectedEnv.toLowerCase());

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getEnvBadge = (env: string) => {
    switch (env.toLowerCase()) {
      case 'prod':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'uat':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section with Language Support */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-zinc-800/80 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
            <Smartphone className="h-3.5 w-3.5" />
            {t('releases.badge')}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t('releases.title')}
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            {t('releases.desc')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3.5 text-center min-w-[130px]">
            <span className="text-xs text-zinc-500 block font-medium">{t('releases.activeBuilds')}</span>
            <span className="text-2xl font-black text-indigo-400">{initialReleases.length}</span>
          </div>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3.5 text-center min-w-[130px]">
            <span className="text-xs text-zinc-500 block font-medium">{t('releases.targetSdk')}</span>
            <span className="text-2xl font-black text-emerald-400">35 (Android 15)</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
          {['All', 'Staging', 'UAT', 'Prod'].map((env) => (
            <button
              key={env}
              onClick={() => setSelectedEnv(env)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedEnv === env
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              {env}
            </button>
          ))}
        </div>

        <div className="text-xs text-zinc-400 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {t('releases.showing')} <span className="font-semibold text-zinc-200">{filteredReleases.length}</span> {t('releases.activeReleases')}
        </div>
      </div>

      {/* Release List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredReleases.map((release, index) => {
          const isLatest = index === 0 && selectedEnv === 'All';
          return (
            <div
              key={release.id}
              className={`relative overflow-hidden rounded-2xl border transition-all ${
                isLatest
                  ? 'border-indigo-500/40 bg-gradient-to-b from-indigo-950/20 via-zinc-900 to-zinc-900/90 shadow-xl shadow-indigo-950/20'
                  : 'border-zinc-800 bg-zinc-900/70 hover:border-zinc-700'
              } p-6 sm:p-7`}
            >
              {isLatest && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> {t('releases.latestBadge')}
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Left build info */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getEnvBadge(release.environment)}`}>
                      {release.environment}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                      {release.versionName}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                      code: {release.versionCode}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Smartphone className="h-3.5 w-3.5 text-zinc-500" />
                      {release.platform}
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{new Date(release.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    {release.fileSize && (
                      <div className="flex items-center gap-1.5">
                        <HardDrive className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{release.fileSize}</span>
                      </div>
                    )}
                    {release.minAndroidVersion && (
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Min: {release.minAndroidVersion}</span>
                      </div>
                    )}
                  </div>

                  {/* Changelog / Release Notes */}
                  {release.releaseNotes && (
                    <div className="mt-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 p-4 text-xs text-zinc-300">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">{t('releases.changelogTitle')}</div>
                      <div className="whitespace-pre-line leading-relaxed font-sans space-y-1">
                        {release.releaseNotes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Action buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:items-center lg:items-end shrink-0">
                  <a
                    href={release.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02]"
                  >
                    <Download className="h-4 w-4" />
                    {t('releases.downloadBtn')}
                  </a>

                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => setQrOpenId(qrOpenId === release.id ? null : release.id)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors"
                      title={t('releases.qrTitle')}
                    >
                      <QrCode className="h-3.5 w-3.5 text-zinc-400" />
                      {t('releases.qrBtn')}
                    </button>

                    <button
                      onClick={() => handleCopy(release.downloadUrl, release.id)}
                      className="inline-flex items-center justify-center p-2 rounded-xl text-xs font-medium bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition-colors"
                      title="Copy Download Link"
                    >
                      {copiedId === release.id ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                      )}
                    </button>
                  </div>

                  <div className="pt-2 w-full flex justify-end">
                    <FeedbackModal buildVersion={release.versionName} />
                  </div>
                </div>
              </div>

              {/* QR Code expansion dropdown */}
              {qrOpenId === release.id && (
                <div className="mt-6 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center gap-6 animate-in slide-in-from-top-2">
                  <div className="p-3 bg-white rounded-xl shadow-lg shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(release.downloadUrl)}`}
                      alt={`QR for ${release.versionName}`}
                      className="w-32 h-32"
                    />
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-sm font-semibold text-zinc-100">{t('releases.qrTitle')}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                      {t('releases.qrDesc')}
                    </p>
                    <p className="text-[11px] font-mono text-zinc-500 break-all pt-1">{release.downloadUrl}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
