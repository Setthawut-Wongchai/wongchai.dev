import type { Language } from '@/lib/LanguageContext';

interface Localized {
  th: string;
  en: string;
}

export interface ExperienceEntry {
  period: string;
  role: Localized;
  company: Localized;
  location: string;
  badge: Localized;
  description: Localized;
  skills: string[];
}

export const profile = {
  name: 'Setthawut Wongchai',
  displayName: 'James',
  title: {
    th: 'Android Developer',
    en: 'Android Developer',
  } satisfies Localized,
  yearsExperience: 5,
  contact: {
    email: 'jamez.stw@gmail.com',
    github: 'https://github.com/jameszimi',
    linkedin: 'https://www.linkedin.com/in/setthawut-wongchai-875252146/',
    location: {
      th: 'กรุงเทพฯ ประเทศไทย',
      en: 'Bangkok, Thailand',
    } satisfies Localized,
  },
  education: {
    school: 'Rangsit University',
    degree: {
      th: 'วิศวกรรมคอมพิวเตอร์',
      en: 'Computer Engineering',
    } satisfies Localized,
    period: '06/2015 - 07/2019',
    gpa: '2.92',
  },
  publishedApps: ['Welo', 'Mancool', 'Sobtid Gov', 'Sobtid Junior', 'NBTC Biometric', 'DBD e-PCL'],
  experiences: [
    {
      period: '12/2025 - Present',
      role: { th: 'Android Software Engineer', en: 'Android Software Engineer' },
      company: { th: 'Toyar Digital (Thailand) Co., Ltd. (HQ)', en: 'Toyar Digital (Thailand) Co., Ltd. (HQ)' },
      location: 'Bangkok',
      badge: { th: 'ตำแหน่งปัจจุบัน', en: 'Current Role' },
      description: {
        th: 'ดูแลแอป ShareApp แอปฝั่งผู้ใช้ของบริการเช่าจักรยานไฟฟ้า/ยานพาหนะแบบ Multi-tenant (แบรนด์ Welo และ Mancool) ครอบคลุมการปลดล็อกยานพาหนะ ติดตามการเดินทางแบบเรียลไทม์ และคิดค่าบริการแบบต่อทริปหรือสมาชิก ร่วมย้ายระบบจากแอปที่ฝัง Flutter แบบเดิมไปสู่สถาปัตยกรรม Kotlin/Compose แบบ Modular เต็มรูปแบบด้วย Hilt และ Coroutines พร้อมวิเคราะห์และแก้ปัญหา Google Sign-in ล่มบน Production โดยเพิ่ม Crashlytics telemetry จนพบสาเหตุที่แท้จริง (Play App Signing key mismatch) และปิดช่องโหว่ที่ token ของ Google/Facebook รั่วไหลเข้า log บน Production',
        en: 'Maintain ShareApp, the customer-facing Android app for a multi-tenant e-bike/vehicle rental service (Welo and Mancool brands) — vehicle unlocking, live ride tracking, and per-trip or membership billing. Contributing to the migration from a Flutter-embedded legacy app to a fully native, modular Kotlin/Compose architecture with Hilt and Coroutines. Diagnosed and resolved a production Google Sign-in outage by adding Crashlytics telemetry that surfaced a Play App Signing key mismatch, and closed a security issue where Google/Facebook auth tokens were leaking into production logs.',
      },
      skills: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Coroutines', 'Google Maps SDK', 'Crashlytics', 'Multi-tenant Architecture'],
    },
    {
      period: '02/2021 - 09/2024',
      role: { th: 'Mobile Engineer (Android)', en: 'Mobile Engineer (Android)' },
      company: { th: 'Finema Co., Ltd.', en: 'Finema Co., Ltd.' },
      location: 'Bangkok',
      badge: { th: 'ระบบยืนยันตัวตนดิจิทัล', en: 'Digital Identity' },
      description: {
        th: 'ออกแบบ พัฒนา และดูแลแอปพลิเคชัน Android และ SDK สำหรับแพลตฟอร์มยืนยันตัวตนดิจิทัลแบบ Self-Sovereign Identity ครอบคลุมการอ่านหนังสือเดินทางผ่าน NFC, ยืนยันบัตรประชาชนไทยผ่านระบบ DOPA, สแกน QR Code และแสดงผล PDF หลายภาษา พร้อมพัฒนาฟีเจอร์เซ็นข้อความอย่างปลอดภัยด้วยระบบ Android Keystore',
        en: 'Design, develop, and maintain Android apps and SDKs for a self-sovereign digital identity platform — including passport reading via NFC, Thai national ID verification through DOPA, QR code scanning, and multi-language PDF viewing. Built secure message-signing features using the Android Keystore system.',
      },
      skills: ['Kotlin', 'Java', 'Android Keystore', 'NFC', 'MVVM', 'Clean Architecture'],
    },
    {
      period: '08/2019 - 01/2021',
      role: { th: 'Android Developer', en: 'Android Developer' },
      company: { th: 'Sobtid Edutainment Co., Ltd.', en: 'Sobtid Edutainment Co., Ltd.' },
      location: 'Bangkok',
      badge: { th: 'ระบบชำระเงินและออฟไลน์', en: 'Payments & Offline Data' },
      description: {
        th: 'พัฒนาและดูแลแอปพลิเคชันข้อสอบออนไลน์เพื่อการศึกษา รวมถึงผลิตภัณฑ์สำหรับเด็กประถมที่มีระบบซื้อไอเทมในแอปผ่าน Omise ใช้ Realm เก็บคำตอบข้อสอบแบบออฟไลน์ก่อนส่งขึ้นเซิร์ฟเวอร์ ใส่แอนิเมชันด้วย Lottie รองรับหน้าจอแท็บเล็ตและ Dark Mode พร้อมเชื่อมต่อระบบชำระเงินผ่าน Omise และ 2C2P',
        en: 'Built and maintained an educational exam platform, including a junior product with in-app purchases via Omise. Used Realm to cache exam answers offline before syncing, added Lottie animations, supported tablet layouts and dark mode, and integrated Omise and 2C2P payment gateways.',
      },
      skills: ['Kotlin', 'Realm', 'Lottie', 'Omise', 'Google Play'],
    },
    {
      period: '06/2018 - 08/2018',
      role: { th: 'Developer Internship', en: 'Developer Internship' },
      company: { th: 'System Stone Co., Ltd.', en: 'System Stone Co., Ltd.' },
      location: 'Bangkok',
      badge: { th: 'ฝึกงาน', en: 'Internship' },
      description: {
        th: 'พัฒนาเว็บเครื่องมือภายในสำหรับทีมไอที ได้แก่ระบบสร้าง QR Code จากข้อมูลใน Excel พร้อมคำอธิบายให้พร้อมใช้งาน และเครื่องมือจัดการฐานข้อมูลสำหรับติดตามทรัพย์สินของบริษัท ด้วย JSP, JavaScript, J2EE และ SQL',
        en: 'Built internal web tools for the IT support team — a QR code generator that reads data from Excel and produces ready-to-use labeled codes, and a database management tool for tracking company assets, using JSP, JavaScript, J2EE, and SQL.',
      },
      skills: ['JSP', 'J2EE', 'JavaScript', 'SQL'],
    },
  ] satisfies ExperienceEntry[],
} as const;

export function localize(value: Localized, lang: Language): string {
  return value[lang] ?? value.en;
}
