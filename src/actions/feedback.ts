'use server';

import { db } from '@/db';
import { testerFeedbacks, type NewTesterFeedback, type TesterFeedback } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function submitFeedback(data: NewTesterFeedback) {
  try {
    if (db) {
      const [feedback] = await db.insert(testerFeedbacks).values(data).returning();
      revalidatePath('/releases');
      return { success: true, data: feedback };
    }
    // Simulation fallback if DB not yet connected
    console.log('Mock saved feedback:', data);
    return { success: true, message: 'Feedback submitted (Local Mode)' };
  } catch (error: any) {
    console.error('Failed to submit feedback:', error);
    return { success: false, error: error.message || 'Failed to submit feedback' };
  }
}

export async function getFeedbacks(): Promise<TesterFeedback[]> {
  try {
    if (db) {
      return await db.select().from(testerFeedbacks).orderBy(desc(testerFeedbacks.createdAt));
    }
  } catch (error) {
    console.warn('DB not connected for feedback query:', error);
  }
  return [];
}
