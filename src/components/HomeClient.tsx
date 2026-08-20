'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Layers,
  Code2,
  Mail,
  CheckCircle2,
  Cpu,
  Bot
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { profile, localize } from '@/lib/profile';

const HeroScene = dynamic(() => import('@/components/HeroScene').then((mod) => mod.HeroScene), {
  ssr: false,
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export function HomeClient() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'compose' | 'arch' | 'ai' | 'perf'>('compose');
  const [promptText, setPromptText] = useState('');
  const [promptAnswer, setPromptAnswer] = useState<string | null>(null);

  // Scroll-linked hero parallax: content drifts up & fades as you scroll past it
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.2]);
  const prefersReducedMotion = useReducedMotion();

  const promptAnswers: Record<string, { th: string }> = {
    nfc: {
      th: '🪪 **NFC Passport Reading:** อ่านข้อมูลจากชิป NFC ในหนังสือเดินทาง (ICAO 9303) ผ่าน `IsoDep`/`NfcA` แล้วตรวจสอบลายเซ็นดิจิทัลของข้อมูล จากนั้นยืนยันตัวตนเพิ่มเติมผ่านระบบ DOPA ของบัตรประชาชนไทย ก่อนเซ็นรับรองข้อมูลด้วย Android Keystore',
    },
    realm: {
      th: '💾 **Realm Offline Caching:** เก็บคำตอบข้อสอบของผู้ใช้ลง Realm ระหว่างทำข้อสอบแบบออฟไลน์ก่อน แล้วค่อย sync ขึ้นเซิร์ฟเวอร์ตอนเชื่อมต่อเน็ตกลับมา ป้องกันข้อมูลหายระหว่างทำข้อสอบกรณีสัญญาณขาดหาย',
    },
    default: {
      th: `🚀 **สรุปสั้นๆ:** เจมส์เป็น Android Developer ประสบการณ์ ${profile.yearsExperience} ปี เชี่ยวชาญ Kotlin, MVVM/Clean Architecture และงานด้านความปลอดภัย/ยืนยันตัวตน ลองถามเรื่อง NFC หรือ Realm ดูได้ครับ`,
    },
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    const query = promptText.toLowerCase();
    if (query.includes('nfc') || query.includes('passport') || query.includes('หนังสือเดินทาง')) {
      setPromptAnswer(promptAnswers.nfc.th);
    } else if (query.includes('realm') || query.includes('offline') || query.includes('ออฟไลน์')) {
      setPromptAnswer(promptAnswers.realm.th);
    } else {
      setPromptAnswer(promptAnswers.default.th);
    }
  };

  const tabs = [
    { id: 'compose', name: t('tab.overview'), icon: Layers },
    { id: 'arch', name: t('tab.arch'), icon: ShieldCheck },
    { id: 'ai', name: t('tab.ai'), icon: Cpu },
    { id: 'perf', name: t('tab.perf'), icon: CheckCircle2 },
  ];

  const metrics = [
    { label: t('stats.years'), value: t('stats.yearsVal'), color: 'text-[#4285f4]' },
    { label: t('stats.apps'), value: t('stats.appsVal'), color: 'text-[#34a853]' },
    { label: t('stats.companies'), value: t('stats.companiesVal'), color: 'text-[#9b72cb]' },
    { label: t('stats.stack'), value: t('stats.stackVal'), color: 'text-[#fbbc04]' },
  ];

  const experiences = profile.experiences.map((exp) => ({
    period: exp.period,
    role: localize(exp.role, lang),
    company: localize(exp.company, lang),
    desc: localize(exp.description, lang),
    skills: exp.skills,
    badge: localize(exp.badge, lang),
  }));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#4285f4]/30 font-sans">
      {/* =========================================================================
          1. HERO SECTION (Identical to Android.com / Gemini Hero)
          ========================================================================= */}
      <section ref={heroRef} className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden gemini-halo text-center">
        {!prefersReducedMotion && (
          <div className="absolute inset-x-0 top-0 h-screen z-0" aria-hidden="true">
            <HeroScene scrollProgress={heroProgress} eventSource={heroRef} />
          </div>
        )}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10 space-y-6"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl text-xs sm:text-sm font-medium text-white/90">
            <span className="h-2 w-2 rounded-full bg-[#34a853] animate-pulse" />
            <span className="font-semibold text-white">Android</span>
            <span className="text-white/40">•</span>
            <span className="text-[#dadce0]">{t('hero.eyebrow')}</span>
          </div>

          {/* Main Huge Headline with Gemini Gradient Text */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            {t('hero.title1')} <br />
            <span className="gemini-gradient-text">
              {t('hero.title2')}
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-[#dadce0] font-normal leading-relaxed">
            {t('hero.sub')}
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/#contact"
              className="android-pill-cta"
            >
              <b>{t('hero.ctaPrimary')}</b>
              <ArrowRight className="h-4 w-4 text-black" />
            </Link>

            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="android-pill-secondary"
            >
              <span>{t('hero.ctaSecondary')}</span>
              <ExternalLink className="h-4 w-4 text-white/70" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          2. ANDROID GEMINI INTERACTIVE TAB CAROUSEL
          ========================================================================= */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center space-y-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#9b72cb] font-bold">
              {t('pillars.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t('pillars.title')}
            </h2>
          </motion.div>

          {/* Tab Selection Bar (Pill Group like Android.com) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'bg-[#111214] text-[#9aa0a6] hover:text-white hover:bg-[#1e1f22] border border-white/10'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#4285f4]' : 'text-[#9aa0a6]'}`} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Dynamic Tab Content Showcase Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="android-surface-card bg-gradient-to-b from-[#111214] to-black p-8 sm:p-12 border border-white/10"
          >
            {activeTab === 'compose' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center reveal-down">
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[#4285f4] font-bold">
                    {t('tab1.eyebrow')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {t('tab1.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-[#dadce0] leading-relaxed">
                    {t('tab1.desc')}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#000000] border border-white/10 p-6 font-mono text-xs text-[#9aa0a6] space-y-2 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[#4285f4]">
                    <span>// ViewModel + LiveData</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4285f4]/10 border border-[#4285f4]/30">MVVM</span>
                  </div>
                  <pre className="overflow-x-auto text-[#dadce0] pt-2 leading-relaxed">
{`class VerifyIdViewModel(
    private val repo: IdVerifyRepository
) : ViewModel() {

    private val _state = MutableLiveData<UiState>()
    val state: LiveData<UiState> = _state

    fun verify(idNumber: String) = viewModelScope.launch {
        _state.value = UiState.Loading
        _state.value = repo.verifyWithDopa(idNumber)
    }
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'arch' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center reveal-down">
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[#34a853] font-bold">
                    {t('tab2.eyebrow')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {t('tab2.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-[#dadce0] leading-relaxed">
                    {t('tab2.desc')}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#000000] border border-white/10 p-6 font-mono text-xs space-y-3">
                  <div className="text-white font-bold border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>Finema Identity Platform</span>
                    <span className="text-[#34a853] text-[11px]">Android SDK</span>
                  </div>
                  <div className="space-y-1.5 text-[#9aa0a6] text-[11px]">
                    <div className="text-[#4285f4]">🛂 Passport NFC read (ICAO 9303)</div>
                    <div className="text-[#9b72cb]">🪪 Thai ID verification via DOPA</div>
                    <div className="text-[#34a853]">🔏 Message signing via Android Keystore</div>
                    <div className="text-[#fbbc04]">📷 QR code scanner + PDF viewer</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center reveal-down">
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[#9b72cb] font-bold">
                    {t('tab3.eyebrow')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {t('tab3.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-[#dadce0] leading-relaxed">
                    {t('tab3.desc')}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#000000] border border-white/10 p-6 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-[#9b72cb] font-bold">
                    <Cpu className="h-4 w-4" />
                    <span>Coroutines + Dependency Injection</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['Kotlin Coroutines', 'LiveData', 'RxJava', 'Dagger 2', 'Koin'].map((item) => (
                      <span
                        key={item}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'perf' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center reveal-down">
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-wider text-[#fbbc04] font-bold">
                    {t('tab4.eyebrow')}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {t('tab4.title')}
                  </h3>
                  <p className="text-sm sm:text-base text-[#dadce0] leading-relaxed">
                    {t('tab4.desc')}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-black border border-white/10 text-center space-y-1">
                    <span className="text-[11px] text-[#9aa0a6] uppercase font-mono">Apps Shipped</span>
                    <div className="text-3xl font-extrabold text-[#34a853]">{profile.publishedApps.length}</div>
                    <span className="text-[10px] text-[#9aa0a6]">Live on Google Play</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-black border border-white/10 text-center space-y-1">
                    <span className="text-[11px] text-[#9aa0a6] uppercase font-mono">Testing Tools</span>
                    <div className="text-xl font-extrabold text-[#4285f4] pt-1.5">JUnit • Espresso</div>
                    <span className="text-[10px] text-[#9aa0a6]">Scrum / Agile Delivery</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE GEMINI PROMPT DEMO WIDGET (Like Gemini Prompt Box)
          ========================================================================= */}
      <section className="py-20 border-t border-white/10 bg-[#0d0e11]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#9b72cb] font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              {t('prompt.eyebrow')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {t('prompt.title')}
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="rounded-3xl bg-black border border-white/15 p-4 sm:p-6 shadow-2xl space-y-4"
          >
            <form onSubmit={handlePromptSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder={t('prompt.placeholder')}
                className="flex-1 bg-[#111214] border border-white/15 rounded-2xl px-4 py-3 text-sm text-white placeholder-[#9aa0a6] focus:outline-none focus:border-[#4285f4]"
              />
              <button
                type="submit"
                className="android-pill-cta py-3 px-6 text-xs whitespace-nowrap self-stretch sm:self-auto justify-center"
              >
                {t('prompt.btn')}
              </button>
            </form>

            {/* Quick Suggestions Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs">
              <button
                onClick={() => {
                  setPromptText(t('prompt.suggest1'));
                  setPromptAnswer(promptAnswers.nfc.th);
                }}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#dadce0] transition-colors"
              >
                {t('prompt.suggest1')}
              </button>
              <button
                onClick={() => {
                  setPromptText(t('prompt.suggest2'));
                  setPromptAnswer(promptAnswers.realm.th);
                }}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#dadce0] transition-colors"
              >
                {t('prompt.suggest2')}
              </button>
            </div>

            {/* Result Box */}
            {promptAnswer && (
              <div className="p-4 rounded-2xl bg-[#111214] border border-[#4285f4]/30 text-xs sm:text-sm text-white/90 leading-relaxed reveal-down">
                <div className="flex items-center gap-2 text-[#4285f4] font-bold text-xs uppercase tracking-wider mb-1">
                  <Bot className="h-4 w-4" /> Answer:
                </div>
                <div>{promptAnswer}</div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          4. STATS & METRICS MATRIX
          ========================================================================= */}
      <section className="py-16 border-y border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="text-xs uppercase tracking-widest text-[#9aa0a6] text-center font-bold">
            {t('stats.title')}
          </h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="android-surface-card p-6 text-center space-y-2 hover:border-white/30"
              >
                <div className={`text-4xl sm:text-5xl font-black ${m.color}`}>
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm text-[#dadce0] font-medium">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          5. CAREER TRAJECTORY & PROVEN IMPACT
          ========================================================================= */}
      <section id="experience" className="py-24 bg-[#0a0a0c]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="text-center space-y-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#34a853] font-bold">
              {t('exp.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t('exp.title')}
            </h2>
            <p className="text-sm text-[#dadce0] max-w-xl mx-auto">
              {t('exp.sub')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {experiences.map((exp) => (
              <motion.div
                key={exp.role}
                variants={fadeUp}
                className="android-surface-card p-6 sm:p-8 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-[#4285f4] uppercase tracking-wider">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1">
                      {exp.role}
                    </h3>
                    <div className="text-xs text-[#9aa0a6] font-medium">
                      {exp.company}
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white self-start sm:self-auto">
                    {exp.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#dadce0] leading-relaxed">
                  {exp.desc}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-3 py-1 rounded-full bg-black border border-white/10 text-[#9aa0a6]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          6. STRATEGIC COLLABORATION / CONTACT
          ========================================================================= */}
      <section id="contact" className="py-20 border-t border-white/10 bg-black">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="space-y-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#4285f4] font-bold">
              {t('contact.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t('contact.title')}
            </h2>
            <p className="text-sm text-[#dadce0] max-w-lg mx-auto">
              {t('contact.sub')}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <a
              href={`mailto:${profile.contact.email}`}
              className="android-pill-cta text-xs"
            >
              <Mail className="h-4 w-4" />
              <span>{profile.contact.email}</span>
            </a>

            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="android-pill-secondary text-xs"
            >
              <Code2 className="h-4 w-4" />
              <span>GitHub / jameszimi</span>
            </a>

            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="android-pill-secondary text-xs"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
