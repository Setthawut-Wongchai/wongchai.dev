'use client';

import { useState, useTransition } from 'react';
import { submitFeedback } from '@/actions/feedback';
import { Bug, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

interface FeedbackModalProps {
  buildVersion?: string;
}

export function FeedbackModal({ buildVersion = 'v2.4.0-beta.2' }: FeedbackModalProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const testerName = formData.get('testerName') as string;
    const deviceModel = formData.get('deviceModel') as string;
    const issueDescription = formData.get('issueDescription') as string;
    const severity = formData.get('severity') as string;

    startTransition(async () => {
      setStatus('idle');
      const res = await submitFeedback({
        testerName,
        buildVersion,
        deviceModel,
        issueDescription,
        severity,
      });

      if (res.success) {
        setStatus('success');
        setTimeout(() => {
          setIsOpen(false);
          setStatus('idle');
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage(res.error || 'Failed to submit feedback');
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-colors"
      >
        <Bug className="h-3.5 w-3.5" />
        {t('releases.reportBtn')}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                  <Bug className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-100">{t('modal.title')}</h3>
                  <p className="text-xs text-zinc-400">{t('modal.targetBuild')}: <span className="text-indigo-400 font-mono font-medium">{buildVersion}</span></p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 text-sm p-1"
              >
                ✕
              </button>
            </div>

            {status === 'success' ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                <CheckCircle2 className="h-12 w-12 text-emerald-400 animate-bounce" />
                <h4 className="text-base font-semibold text-zinc-100">{t('modal.successTitle')}</h4>
                <p className="text-xs text-zinc-400">{t('modal.successDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">{t('modal.testerName')}</label>
                    <input
                      name="testerName"
                      required
                      placeholder="e.g. James / QA Lead"
                      className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">{t('modal.deviceModel')}</label>
                    <input
                      name="deviceModel"
                      placeholder="e.g. Samsung S24 / Pixel 8 (Android 15)"
                      className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">{t('modal.severity')}</label>
                  <select
                    name="severity"
                    defaultValue="medium"
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="low">{t('modal.sevLow')}</option>
                    <option value="medium">{t('modal.sevMedium')}</option>
                    <option value="high">{t('modal.sevHigh')}</option>
                    <option value="critical">{t('modal.sevCritical')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">{t('modal.desc')}</label>
                  <textarea
                    name="issueDescription"
                    rows={4}
                    required
                    placeholder="1. Step one... 2. Step two... Expected vs Actual"
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                  >
                    {t('modal.cancel')}
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
                  >
                    {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    {t('modal.send')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
