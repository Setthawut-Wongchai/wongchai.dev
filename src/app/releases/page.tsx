import { getReleases } from '@/actions/releases';
import { getUserSession } from '@/actions/auth';
import { ReleaseDashboardClient } from '@/components/ReleaseDashboardClient';
import { Smartphone, Download, Layers, ShieldCheck, Bug, Terminal } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Tester Builds & Releases | James Dev Portal',
  description: 'Download latest Android APK builds, review release changelogs, and submit QA feedback.',
};

export const dynamic = 'force-dynamic';

export default async function ReleasesPage() {
  const { role } = await getUserSession();
  if (role === 'public') {
    redirect('/');
  }

  const initialReleases = await getReleases();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-zinc-800/80 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
              <Smartphone className="h-3.5 w-3.5" />
              Build Distribution Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              App Releases & Tester Builds
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Direct access to verified Staging, UAT, and Production binaries with complete changelogs, checksum verification, and fast QA reporting pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3.5 text-center min-w-[130px]">
              <span className="text-xs text-zinc-500 block font-medium">Active Builds</span>
              <span className="text-2xl font-black text-indigo-400">{initialReleases.length}</span>
            </div>
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-3.5 text-center min-w-[130px]">
              <span className="text-xs text-zinc-500 block font-medium">Target SDK</span>
              <span className="text-2xl font-black text-emerald-400">35 (Android 15)</span>
            </div>
          </div>
        </div>

        {/* Releases List & Dashboard */}
        <ReleaseDashboardClient initialReleases={initialReleases} />
      </div>
    </div>
  );
}
