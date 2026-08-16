'use server';

import { db } from '@/db';
import { releases, type Release, type NewRelease } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const MOCK_RELEASES: Release[] = [
  {
    id: '1a91e5d7-44a7-47b7-b08c-9a4f61f71a01',
    versionName: 'v2.4.0-beta.2',
    versionCode: '20402',
    platform: 'Android',
    downloadUrl: 'https://github.com/androidtoyar/releases/download/v2.4.0/app-staging-release.apk',
    releaseNotes: '### What is New:\n- 🚀 Integrated Supabase Realtime sync for live test reports\n- ⚡ Improved Jetpack Compose startup render performance by 32%\n- 🛡️ Fixed OAuth refresh token race condition on Android 14/15\n- 🐞 Resolved Bluetooth LE background scan disconnection issue',
    environment: 'Staging',
    fileSize: '34.8 MB',
    minAndroidVersion: 'Android 9.0 (API 28)',
    createdAt: new Date('2026-08-15T14:30:00Z'),
  },
  {
    id: '2b82f6e8-55b8-48c8-c19d-0b5g72g82b02',
    versionName: 'v2.3.5',
    versionCode: '20305',
    platform: 'Android',
    downloadUrl: 'https://github.com/androidtoyar/releases/download/v2.3.5/app-uat-release.apk',
    releaseNotes: '### What is New:\n- 📦 Production Candidate Release for UAT testing team\n- 🔒 Biometric Prompt authentication fallback enhancement\n- 📊 Added Firebase Performance network latency monitors\n- 🎨 Dark mode contrast fix on OLED panels',
    environment: 'UAT',
    fileSize: '32.1 MB',
    minAndroidVersion: 'Android 8.0 (API 26)',
    createdAt: new Date('2026-08-10T09:15:00Z'),
  },
  {
    id: '3c73a7f9-66c9-49d9-d20e-1c6h83h93c03',
    versionName: 'v2.3.0',
    versionCode: '20300',
    platform: 'Android',
    downloadUrl: 'https://play.google.com/store/apps',
    releaseNotes: '### Production Release:\n- 🌟 General availability release on Google Play Store\n- ⚡ Full offline-first cache architecture with Room DB\n- 🌐 Multi-language localization (EN / TH / JA)',
    environment: 'Prod',
    fileSize: '29.5 MB',
    minAndroidVersion: 'Android 8.0 (API 26)',
    createdAt: new Date('2026-08-01T11:00:00Z'),
  }
];

export async function getReleases(environment?: string): Promise<Release[]> {
  try {
    if (db) {
      if (environment && environment !== 'All') {
        return await db.select().from(releases).where(eq(releases.environment, environment)).orderBy(desc(releases.createdAt));
      }
      return await db.select().from(releases).orderBy(desc(releases.createdAt));
    }
  } catch (error) {
    console.warn('Database query failed, returning fallback mock data:', error);
  }

  // Fallback
  if (environment && environment !== 'All') {
    return MOCK_RELEASES.filter((r) => r.environment.toLowerCase() === environment.toLowerCase());
  }
  return MOCK_RELEASES;
}

export async function createRelease(data: NewRelease) {
  try {
    if (!db) {
      throw new Error('Database is not connected. Please configure DATABASE_URL in .env.local');
    }
    const [inserted] = await db.insert(releases).values(data).returning();
    revalidatePath('/releases');
    return { success: true, data: inserted };
  } catch (error: any) {
    console.error('Failed to create release:', error);
    return { success: false, error: error.message || 'Failed to save release' };
  }
}
