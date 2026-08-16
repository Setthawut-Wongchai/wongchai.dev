import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// ตารางเก็บ Release Builds สำหรับ Tester
export const releases = pgTable('releases', {
  id: uuid('id').defaultRandom().primaryKey(),
  versionName: varchar('version_name', { length: 50 }).notNull(),
  versionCode: varchar('version_code', { length: 50 }).notNull(),
  platform: varchar('platform', { length: 20 }).default('Android').notNull(),
  downloadUrl: text('download_url').notNull(),
  releaseNotes: text('release_notes'),
  environment: varchar('environment', { length: 20 }).default('Staging').notNull(), // Staging / UAT / Prod
  fileSize: varchar('file_size', { length: 30 }),
  minAndroidVersion: varchar('min_android_version', { length: 30 }).default('Android 8.0 (API 26)'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ตารางเก็บ Feedback จาก Tester
export const testerFeedbacks = pgTable('tester_feedbacks', {
  id: uuid('id').defaultRandom().primaryKey(),
  testerName: varchar('tester_name', { length: 100 }).notNull(),
  buildVersion: varchar('build_version', { length: 50 }),
  deviceModel: varchar('device_model', { length: 100 }),
  issueDescription: text('issue_description').notNull(),
  severity: varchar('severity', { length: 20 }).default('medium'), // low, medium, high, critical
  screenshotUrl: text('screenshot_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Release = typeof releases.$inferSelect;
export type NewRelease = typeof releases.$inferInsert;
export type TesterFeedback = typeof testerFeedbacks.$inferSelect;
export type NewTesterFeedback = typeof testerFeedbacks.$inferInsert;
