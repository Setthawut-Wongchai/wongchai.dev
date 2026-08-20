'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
  th: {
    // Navbar
    'nav.overview': 'ภาพรวม',
    'nav.experience': 'ประสบการณ์',
    'nav.features': 'ฟีเจอร์ & สถาปัตยกรรม',
    'nav.tryGemini': 'ติดต่อร่วมงาน',
    'nav.badge': 'Android Developer Portal',
    'nav.subtitle': 'Android Developer',

    // Hero
    'hero.eyebrow': 'พอร์ตโฟลิโอนักพัฒนา Android',
    'hero.title1': 'สร้างแอป Android ที่เชื่อถือได้',
    'hero.title2': 'ด้วยความแม่นยำและความปลอดภัย',
    'hero.sub': 'ผม เสฎฐวุฒิ (เจมส์) นักพัฒนา Android ที่มีประสบการณ์ 5 ปีในการสร้างและดูแลแอปที่ใช้งานจริง ตั้งแต่แอปเช่าจักรยานไฟฟ้าแบบ Multi-tenant ไปจนถึงระบบยืนยันตัวตนดิจิทัลและการเซ็นข้อมูลอย่างปลอดภัย',
    'hero.ctaPrimary': 'ติดต่อร่วมงาน',
    'hero.ctaSecondary': 'ดูประวัติบน LinkedIn',

    // Interactive Tabs (Real skill pillars)
    'tab.overview': 'Architecture',
    'tab.arch': 'Identity & Security',
    'tab.ai': 'Async & DI',
    'tab.perf': 'Testing & Delivery',

    'pillars.eyebrow': 'Engineering Pillars',
    'pillars.title': 'ความเชี่ยวชาญและมาตรฐานการพัฒนา Android',

    // Tab 1: Architecture
    'tab1.eyebrow': 'โครงสร้างที่ดูแลง่าย',
    'tab1.title': 'MVVM & Clean Architecture',
    'tab1.desc': 'แยกชั้น UI, Domain และ Data ออกจากกันด้วย MVVM และหลักการ Clean Architecture ทำให้แต่ละฟีเจอร์ทดสอบง่ายและดูแลรักษาได้แม้โค้ดเบสจะโตขึ้น',

    // Tab 2: Identity & Security
    'tab2.eyebrow': 'งานที่โดดเด่นที่สุด',
    'tab2.title': 'ระบบยืนยันตัวตนดิจิทัลที่ปลอดภัย',
    'tab2.desc': 'พัฒนาการอ่านหนังสือเดินทางผ่าน NFC, ยืนยันบัตรประชาชนไทยผ่านระบบ DOPA และเซ็นข้อความอย่างปลอดภัยด้วย Android Keystore — ส่วนประกอบหลักของแพลตฟอร์ม Self-Sovereign Identity ที่ Finema',

    // Tab 3: Async & DI
    'tab3.eyebrow': 'Data Flow ที่จัดการได้',
    'tab3.title': 'Coroutines, LiveData และ Dependency Injection',
    'tab3.desc': 'จัดการ Asynchronous Data ด้วย Kotlin Coroutines และ LiveData เชื่อมต่อ Dependency ระหว่างโมดูลอย่างเป็นระเบียบด้วย Dagger 2 และ Koin',

    // Tab 4: Testing & Delivery
    'tab4.eyebrow': 'ส่งงานอย่างมั่นใจ',
    'tab4.title': 'Testing, Agile และการส่งมอบขึ้น Play Store',
    'tab4.desc': 'เขียน Unit Test และ UI Test ด้วย JUnit และ Espresso ทำงานแบบ Scrum Sprint และดูแลเวอร์ชันด้วย Git/GitHub/GitLab จนถึงขึ้น Google Play จริง',

    // Metrics
    'stats.title': 'ภาพรวมประสบการณ์การทำงาน',
    'stats.years': 'ปีประสบการณ์',
    'stats.yearsVal': '5+',
    'stats.apps': 'แอปที่ขึ้น Play Store',
    'stats.appsVal': '6',
    'stats.companies': 'บริษัทที่ร่วมงาน',
    'stats.companiesVal': '4',
    'stats.stack': 'ภาษาหลักที่ใช้',
    'stats.stackVal': 'Kotlin',

    // Experience Section
    'exp.eyebrow': 'เส้นทางการทำงาน',
    'exp.title': 'ประสบการณ์การทำงาน',
    'exp.sub': 'สร้างและดูแลแอปพลิเคชัน Android ที่ใช้งานจริงมาตลอด 5 ปี',

    // Prompt Box
    'prompt.eyebrow': 'ถามเกี่ยวกับงานของผม',
    'prompt.title': 'ลองสอบถามเกี่ยวกับประสบการณ์ของเจมส์',
    'prompt.placeholder': 'ถามเกี่ยวกับระบบยืนยันตัวตน, Realm, หรือประสบการณ์ทำงาน...',
    'prompt.btn': 'ส่งคำถาม',
    'prompt.suggest1': '“พัฒนาการอ่านหนังสือเดินทางผ่าน NFC ยังไง”',
    'prompt.suggest2': '“ใช้ Realm เก็บข้อมูลออฟไลน์ยังไง”',

    // Contact
    'contact.eyebrow': 'ติดต่อ',
    'contact.title': 'ติดต่อร่วมงานหรือพูดคุยเรื่องงาน Android',
    'contact.sub': 'เปิดรับโอกาสงานตำแหน่ง Android Developer หรือพูดคุยแลกเปลี่ยนเรื่องงานพัฒนาแอป',
    'contact.email': 'อีเมลติดต่อ',
    'contact.github': 'GitHub ของโปรเจกต์',

    // Releases Page
    'releases.badge': 'ระบบกระจาย Build และไฟล์ติดตั้ง',
    'releases.title': 'รีลีสแอปและเวอร์ชันทดสอบสำหรับ Tester',
    'releases.desc': 'ดาวน์โหลดไฟล์ติดตั้งทั้ง Staging, UAT และ Production พร้อมรายละเอียด Changelog บันทึกการแก้ไข และระบบแจ้งปัญหาสำหรับ QA',
    'releases.activeBuilds': 'เวอร์ชันที่พร้อมใช้งาน',
    'releases.targetSdk': 'Target Android SDK',
    'releases.showing': 'กำลังแสดง',
    'releases.activeReleases': 'เวอร์ชันที่พร้อมดาวน์โหลด',
    'releases.latestBadge': 'เวอร์ชันล่าสุด',
    'releases.downloadBtn': 'ดาวน์โหลด APK / ติดตั้ง',
    'releases.qrBtn': 'สแกน QR Code',
    'releases.reportBtn': 'แจ้งปัญหา / ส่ง Feedback',
    'releases.qrTitle': 'สแกนเพื่อติดตั้งลงบนมือถือ',
    'releases.qrDesc': 'ใช้แอปกล้องหรือตัวสแกน QR Code บนมือถือ Android เพื่อดาวน์โหลด APK ติดตั้งได้โดยตรง ไม่ต้องต่อสาย USB',
    'releases.changelogTitle': 'บันทึกการเปลี่ยนแปลง (Changelog)',

    // Feedback Modal
    'modal.title': 'ส่งรายงานปัญหาจาก Tester',
    'modal.targetBuild': 'เวอร์ชันที่กำลังทดสอบ',
    'modal.testerName': 'ชื่อผู้ทดสอบ (Tester Name) *',
    'modal.deviceModel': 'รุ่นอุปกรณ์และเวอร์ชัน Android (Device Model & OS)',
    'modal.severity': 'ระดับความรุนแรง (Severity)',
    'modal.desc': 'รายละเอียดของปัญหาและขั้นตอนการเกิด (Reproduction Steps) *',
    'modal.cancel': 'ยกเลิก',
    'modal.send': 'ส่งรายงานปัญหา',
    'modal.successTitle': 'ส่งข้อมูลสำเร็จเรียบร้อย!',
    'modal.successDesc': 'ข้อมูลรายงานปัญหาถูกส่งไปยังทีมพัฒนาแล้ว ขอบคุณครับ',
    'modal.sevLow': 'ต่ำ (Low) - ความสวยงามหรือข้อความเล็กน้อย',
    'modal.sevMedium': 'ปานกลาง (Medium) - ฟังก์ชันมีปัญหาแต่มีวิธีเลี่ยง',
    'modal.sevHigh': 'สูง (High) - ฟีเจอร์หลักใช้งานไม่ได้ ขัดขวางการทดสอบ',
    'modal.sevCritical': 'วิกฤต (Critical) - แอป Crash หรือค้างเปิดไม่ได้',

    // Footer
    'footer.desc': 'พอร์ตโฟลิโอและพอร์ทัลกระจาย APK สำหรับทีม Tester ออกแบบด้วยสไตล์ Google Android Design Language',
    'footer.navTitle': 'เมนูนำทาง',
    'footer.stackTitle': 'เทคโนโลยีแกนหลัก',
    'footer.rights': 'สงวนลิขสิทธิ์ทั้งหมด',

    // Docs
    'docs.title': 'คู่มือและเอกสารประกอบ',
  },
  en: {
    // Navbar
    'nav.overview': 'Overview',
    'nav.experience': 'Experience',
    'nav.features': 'Architecture & Features',
    'nav.tryGemini': 'Get in Touch',
    'nav.badge': 'Android Developer Portal',
    'nav.subtitle': 'Android Developer',

    // Hero
    'hero.eyebrow': 'Android Developer Portfolio',
    'hero.title1': 'Building Reliable Android Experiences',
    'hero.title2': 'with Security & Precision',
    'hero.sub': "I'm Setthawut (James), an Android Developer with 5 years of experience building and maintaining production apps — from a multi-tenant e-bike rental platform to secure digital identity and signing systems.",
    'hero.ctaPrimary': 'Get in Touch',
    'hero.ctaSecondary': 'View Profile on LinkedIn',

    // Interactive Tabs (Real skill pillars)
    'tab.overview': 'Architecture',
    'tab.arch': 'Identity & Security',
    'tab.ai': 'Async & DI',
    'tab.perf': 'Testing & Delivery',

    'pillars.eyebrow': 'Engineering Pillars',
    'pillars.title': 'What I Actually Do in Android Development',

    // Tab 1: Architecture
    'tab1.eyebrow': 'Maintainable Structure',
    'tab1.title': 'MVVM & Clean Architecture',
    'tab1.desc': 'Structuring apps with clear separation between UI, domain, and data layers using MVVM and Clean Architecture principles — making features testable and easy to maintain as the codebase grows.',

    // Tab 2: Identity & Security
    'tab2.eyebrow': 'Signature Work',
    'tab2.title': 'Secure Digital Identity Systems',
    'tab2.desc': 'Built passport NFC reading, Thai national ID verification through DOPA, and secure message-signing with the Android Keystore — core building blocks of a self-sovereign identity platform at Finema.',

    // Tab 3: Async & DI
    'tab3.eyebrow': 'Manageable Data Flow',
    'tab3.title': 'Coroutines, LiveData & Dependency Injection',
    'tab3.desc': 'Managing asynchronous data with Kotlin Coroutines and LiveData, wiring dependencies cleanly across modules with Dagger 2 and Koin.',

    // Tab 4: Testing & Delivery
    'tab4.eyebrow': 'Shipping with Confidence',
    'tab4.title': 'Testing, Agile Delivery & Play Store Releases',
    'tab4.desc': 'Writing unit and UI tests with JUnit and Espresso, working in Scrum sprints, and managing versioning with Git/GitHub/GitLab through to real Google Play releases.',

    // Metrics
    'stats.title': 'Career Snapshot',
    'stats.years': 'Years of Experience',
    'stats.yearsVal': '5+',
    'stats.apps': 'Apps on Play Store',
    'stats.appsVal': '6',
    'stats.companies': 'Companies',
    'stats.companiesVal': '4',
    'stats.stack': 'Primary Language',
    'stats.stackVal': 'Kotlin',

    // Experience Section
    'exp.eyebrow': 'Career Trajectory',
    'exp.title': 'Work Experience',
    'exp.sub': 'Building and maintaining production Android apps for 5 years.',

    // Prompt Box
    'prompt.eyebrow': 'Ask About My Work',
    'prompt.title': "Explore James's Experience via Interactive Prompts",
    'prompt.placeholder': 'Ask about identity verification, Realm, or work experience...',
    'prompt.btn': 'Ask',
    'prompt.suggest1': '"How did you build NFC passport reading?"',
    'prompt.suggest2': '"How do you use Realm for offline caching?"',

    // Contact
    'contact.eyebrow': 'Get in Touch',
    'contact.title': 'Let\'s Talk About Android Development',
    'contact.sub': 'Open to Android Developer opportunities and technical conversations.',
    'contact.email': 'Direct Email',
    'contact.github': 'GitHub Repositories',

    // Releases Page
    'releases.badge': 'Build Distribution Portal',
    'releases.title': 'App Releases & Tester Builds',
    'releases.desc': 'Direct access to verified Staging, UAT, and Production binaries with complete changelogs, checksum verification, and fast QA reporting pipelines.',
    'releases.activeBuilds': 'Active Builds',
    'releases.targetSdk': 'Target SDK',
    'releases.showing': 'Showing',
    'releases.activeReleases': 'active releases',
    'releases.latestBadge': 'Latest Candidate',
    'releases.downloadBtn': 'Download APK / Build',
    'releases.qrBtn': 'QR Code',
    'releases.reportBtn': 'Report Issue / Feedback',
    'releases.qrTitle': 'Scan to Install on Device',
    'releases.qrDesc': 'Use the native Camera app or QR scanner on your Android test device to start the direct APK download without transferring files via USB.',
    'releases.changelogTitle': 'Changelog & Notes',

    // Feedback Modal
    'modal.title': 'Submit Tester Feedback',
    'modal.targetBuild': 'Target Build',
    'modal.testerName': 'Tester Name *',
    'modal.deviceModel': 'Device Model & OS',
    'modal.severity': 'Severity',
    'modal.desc': 'Issue Description & Reproduction Steps *',
    'modal.cancel': 'Cancel',
    'modal.send': 'Send Feedback',
    'modal.successTitle': 'Thank You!',
    'modal.successDesc': 'Feedback submitted successfully to Dev team.',
    'modal.sevLow': 'Low - Minor cosmetic or UI glitch',
    'modal.sevMedium': 'Medium - Functional bug with workaround',
    'modal.sevHigh': 'High - Feature broken / blocking testing',
    'modal.sevCritical': 'Critical - App Crash / ANR on startup',

    // Footer
    'footer.desc': 'Personal portfolio and APK distribution portal for testers, built with Google Android design language.',
    'footer.navTitle': 'Navigation',
    'footer.stackTitle': 'Core Foundation',
    'footer.rights': 'All rights reserved.',

    // Docs
    'docs.title': 'Documentation Guides',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'th',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('th');

  useEffect(() => {
    const saved = localStorage.getItem('app_lang') as Language | null;
    if (saved && (saved === 'th' || saved === 'en')) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
