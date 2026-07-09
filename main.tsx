import React, { useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import './index.css';

import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Layers3,
  LibraryBig,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
  X,
} from 'lucide-react';

type PageKey =
  | 'ballina'
  | 'programi'
  | 'pranimet'
  | 'aplikimi'
  | 'tarifat'
  | 'jeta-studentore'
  | 'kontakt';

type Semester = {
  id: string;
  label: string;
  subtitle: string;
  color: string;
  glow: string;
  modules: string[];
};

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type AdmissionForm = {
  emri: string;
  mbiemri: string;
  email: string;
  telefoni: string;
  qyteti: string;
  shkolla: string;
  mesatarja: string;
  semestri: string;
  mesazhi: string;
  dokumente: boolean;
  deklarata: boolean;
};

type ContactForm = {
  emri: string;
  email: string;
  tema: string;
  mesazhi: string;
};

const collegeName = 'Kolegji Nexora';
const locationText = 'Prishtinë, Kosovë';
const degreeText = 'Shkenca Kompjuterike';
const levelText = 'Bachelor';
const durationText = '3 vite studime';
const recipientEmail = 'leart.demaku20006@gmail.com';
const storageKey = 'nexora-admission-draft';

const navigation: Array<{ key: PageKey; label: string }> = [
  { key: 'ballina', label: 'Ballina' },
  { key: 'programi', label: 'Programi' },
  { key: 'pranimet', label: 'Pranimet' },
  { key: 'aplikimi', label: 'Aplikimi' },
  { key: 'tarifat', label: 'Tarifat' },
  { key: 'jeta-studentore', label: 'Jeta Studentore' },
  { key: 'kontakt', label: 'Kontakt' },
];

const statistics = [
  { value: '1', label: 'degë e vetme akademike' },
  { value: '3', label: 'vite bachelor' },
  { value: '12', label: 'laboratorë praktikë' },
  { value: '100%', label: 'fokus në IT' },
];

const features: Feature[] = [
  {
    icon: Laptop,
    title: 'Mësim praktik',
    description: 'Ligjërata të strukturuara, ushtrime, projekte reale dhe mentorim teknik në çdo semestër.',
  },
  {
    icon: Microscope,
    title: 'Laboratorë modernë',
    description: 'Pajisje për programim, baza të të dhënave, rrjete kompjuterike, siguri dhe web development.',
  },
  {
    icon: Users,
    title: 'Përkujdesje studentore',
    description: 'Këshillim akademik, orientim karriere, konsultime dhe mbështetje në planifikimin e studimeve.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparencë e plotë',
    description: 'Program i qartë 3-vjeçar, procedura të kuptueshme pranimi dhe informim i saktë për tarifat.',
  },
];

const semesters: Semester[] = [
  {
    id: 'sem1',
    label: 'Semestri I',
    subtitle: 'Themelet e programimit',
    color: 'from-sky-400 to-cyan-300',
    glow: 'shadow-sky-500/20',
    modules: ['Hyrje në Programim', 'Matematikë Diskrete', 'Bazat e Databazave'],
  },
  {
    id: 'sem2',
    label: 'Semestri II',
    subtitle: 'Aftësi teknike themelore',
    color: 'from-cyan-400 to-teal-300',
    glow: 'shadow-cyan-500/20',
    modules: ['Sisteme Operative', 'Gjuhë Angleze për IT', 'Algoritmet dhe Strukturat e të Dhënave', 'Programimi i Orientuar në Objekte (POO)', 'Zhvillim në Web'],
  },
  {
    id: 'sem3',
    label: 'Semestri III',
    subtitle: 'Inxhinieri dhe rrjete',
    color: 'from-teal-400 to-emerald-300',
    glow: 'shadow-teal-500/20',
    modules: ['Inxhinieri Softuerike', 'Rrjete Kompjuterike', 'Çështje Legale dhe Etike në IT', 'Cloud Fundamentals', 'Menaxhim Projekti'],
  },
  {
    id: 'sem4',
    label: 'Semestri IV',
    subtitle: 'Teknologji të avancuara',
    color: 'from-violet-400 to-purple-300',
    glow: 'shadow-violet-500/20',
    modules: ['Inteligjencë Artificiale', 'Siguri Kibernetike', 'Testimi dhe Analiza e Softuerit', 'Internet of Things (IoT)', 'Programimi i Aplikacioneve Mobile iOS'],
  },
  {
    id: 'sem5',
    label: 'Semestri V',
    subtitle: 'Specializim profesional',
    color: 'from-orange-400 to-amber-300',
    glow: 'shadow-orange-500/20',
    modules: ['Programimi me .NET Core', 'Programimi me Python', 'Programimi Biznesor Analitik', 'DevOps dhe CI/CD', 'Arkitektura e Mikroshërbimeve (Microservices Architecture)'],
  },
  {
    id: 'sem6',
    label: 'Semestri VI',
    subtitle: 'Praktika dhe diplomimi',
    color: 'from-rose-400 to-pink-300',
    glow: 'shadow-rose-500/20',
    modules: ['Punë Praktike (Internship)', 'Projekti i Diplomës (Capstone Project)', 'Zhvillimi i Aplikacioneve Cloud-Native'],
  },
];

const outcomes = [
  'Ndërtim aplikacionesh web moderne',
  'Punë me databaza dhe modele të dhënash',
  'Zgjidhje algoritmike dhe logjikë kompjuterike',
  'Bazat e sigurisë kibernetike dhe rrjeteve',
  'Përgatitje për tregun e punës dhe praktikat',
];

const admissionChecklist = [
  'Plotësimi i formularit të aplikimit',
  'Diploma e shkollës së mesme',
  'Dëftesat e shkollës së mesme 10-12',
  'Letërnjoftimi kopje',
  'Certifikata e Testit të Maturës',

];

const tuitionHighlights = [
  'Tarifë vjetore e qartë',
  'Pagesë me këste mujore',
  'Bursa për sukses akademik',
  'Zbritje për raste të veçanta'
];

const scholarships = [
  'Bursë për notë mesatare të lartë',
  'Bursë për pjesëmarrje në gara teknologjike',
  'Zbritje familjare për dy apo më shumë studentë',
  'Plan pagesash fleksibël',
];

const studentServices = [
  {
    title: 'Klubi i Kodimit',
    text: 'Punëtori, hackathon-e dhe projekte të organizuara me studentë të tjerë.',
  },
  {
    title: 'Qendra e Karrierës',
    text: 'CV, intervista, praktika profesionale dhe lidhje me kompani teknologjike.',
  },
  {
    title: 'Biblioteka Digjitale',
    text: 'Materiale studimore, e-librari dhe qasje në burime akademike.',
  },
  {
    title: 'Këshillim Akademik',
    text: 'Ndihmë për semestrin, lëndët, kreditet dhe planifikimin e rrugës studimore.',
  },
];

const upcomingEvents = [
  {
    date: '15 Shtator',
    title: 'Dita e hapur për aplikantë',
    time: '10:00 - 14:00',
    place: 'Auditoriumi kryesor',
  },
  {
    date: '22 Shtator',
    title: 'Prezantimi i programit',
    time: '12:00 - 13:30',
    place: 'Salla e konferencave',
  },
  {
    date: '1 Tetor',
    title: 'Fillimi i semestrit',
    time: '09:00',
    place: 'Kampusi akademik',
  },
];

const faqItems = [
  {
    question: 'A ka vetëm një degë?',
    answer: 'Po. Kolegji është i fokusuar vetëm në Shkenca Kompjuterike për cilësi më të lartë akademike.',
  },
  {
    question: 'A është programi vetëm bachelor?',
    answer: 'Po. Programi zyrtar është bachelor 3-vjeçar.',
  },
  {
    question: 'A mund të përdoret në mobile?',
    answer: 'Po. Struktura është responsive dhe e përshtatur për telefona, tableta dhe desktop.',
  },
  {
    question: 'A është projekt i plotë?',
    answer: 'Po. Ka faqe të ndara, formularë funksionalë dhe përmbajtje të organizuar si website real.',
  },
];

function navHash(page: PageKey) {
  return `#${page}`;
}

function pageFromHash(hash: string): PageKey {
  const key = hash.replace('#', '') as PageKey;
  return navigation.some((item) => item.key === key) ? key : 'ballina';
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function buildApplicationMailto(form: AdmissionForm, reference: string) {
  const subject = encodeURIComponent(`Aplikim i ri - ${collegeName} - ${reference}`);
  const body = encodeURIComponent(
    [
      `Kolegji: ${collegeName}`,
      `Referenca: ${reference}`,
      '',
      `Emri: ${form.emri}`,
      `Mbiemri: ${form.mbiemri}`,
      `Email: ${form.email}`,
      `Telefoni: ${form.telefoni}`,
      `Qyteti: ${form.qyteti}`,
      `Shkolla e mesme: ${form.shkolla}`,
      `Mesatarja: ${form.mesatarja}`,
      `Semestri i preferuar: ${form.semestri}`,
      `Dokumentet e konfirmuara: ${form.dokumente ? 'Po' : 'Jo'}`,
      `Deklarata e pranuar: ${form.deklarata ? 'Po' : 'Jo'}`,
      '',
      'Mesazh shtesë:',
      form.mesazhi || '-',
    ].join('\n')
  );
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

function buildContactMailto(form: ContactForm) {
  const subject = encodeURIComponent(`Kontakt - ${collegeName} - ${form.tema}`);
  const body = encodeURIComponent(
    [
      `Kolegji: ${collegeName}`,
      '',
      `Emri: ${form.emri}`,
      `Email: ${form.email}`,
      `Tema: ${form.tema}`,
      '',
      'Mesazhi:',
      form.mesazhi,
    ].join('\n')
  );
  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

function useHashNavigation() {
  const [page, setPage] = useState<PageKey>(() => (typeof window !== 'undefined' ? pageFromHash(window.location.hash) : 'ballina'));

  useEffect(() => {
    const onHashChange = () => setPage(pageFromHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      window.location.hash = navHash('ballina');
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${collegeName} · ${navigation.find((item) => item.key === page)?.label ?? 'Ballina'}`;
    document.documentElement.lang = 'sq';
  }, [page]);

  return page;
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx('rounded-[1.75rem] border border-white/10 bg-white/5 shadow-xl shadow-slate-950/30 backdrop-blur-xl', className)}>{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">{children}</span>;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">{eyebrow}</div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}

function AppHeader({
  page,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  page: PageKey;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href={navHash('ballina')} className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 shadow-lg shadow-sky-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-white">{collegeName}</div>
            <div className="text-xs text-slate-400">
              {degreeText} · {levelText} · {durationText}
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.key}
              href={navHash(item.key)}
              className={cx('rounded-full px-4 py-2 text-sm transition', page === item.key ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 lg:hidden"
          aria-label="Meny mobile"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:hidden lg:px-8">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/96 p-3 shadow-2xl shadow-slate-950/40">
            <div className="grid gap-2">
              {navigation.map((item) => (
                <a
                  key={item.key}
                  href={navHash(item.key)}
                  className={cx('rounded-2xl px-4 py-3 text-sm transition', page === item.key ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/10 hover:text-white')}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function HomePage() {
  return (
    <>
      <section id="ballina" className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-14">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Kolegj i fokusuar vetëm në një degë akademike
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Mëso Shkenca Kompjuterike në një kolegj të ndërtuar për rezultate reale.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {collegeName} në {locationText} është konceptuar si një website i plotë për aplikim: program i vetëm bachelor, faqe të ndara, formularë funksionalë dhe përvojë mobile të rafinuar.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={navHash('aplikimi')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">
              Fillo aplikimin
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={navHash('programi')} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
              Shiko programin
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {statistics.map((stat) => (
              <GlassCard key={stat.label} className="p-4">
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-sky-500/20 blur-2xl" />
          <GlassCard className="overflow-hidden">
            <div className="border-b border-white/10 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-400">Panel aplikimi</div>
                  <div className="mt-1 text-2xl font-semibold text-white">Aplikim i qartë dhe i strukturuar</div>
                </div>
                <Pill>Regjistrim i hapur</Pill>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-slate-300">
                  {degreeText} · {levelText}
                </div>
                <a href={navHash('pranimet')} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:bg-sky-300">
                  Kushtet e pranimit
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="grid gap-4 p-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white">{feature.title}</div>
                        <div className="mt-1 text-sm leading-6 text-slate-400">{feature.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-7 lg:col-span-2">
            <SectionHeading
              eyebrow="Pse ky projekt"
              title="I ndërtuar si website real i një institucioni arsimor"
              description="Kjo strukturë e bën faqen të duket profesionale: sekcione të dallueshme, navigim i qartë dhe përmbajtje e organizuar për përdoruesit që kërkojnë informacion të shpejtë dhe të besueshëm."
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                'Fokus vetëm në Shkenca Kompjuterike',
                'Program 3-vjeçar bachelor',
                'Faqe të veçanta për secilin qëllim',
                'Përshtatur për ekranet mobile',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-cyan-200" />
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Misioni</div>
                <div className="text-sm text-slate-400">Bachelor i fokusuar</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Të përgatisë studentë me bazë të fortë në programim, databaza, rrjete dhe zhvillim aplikacionesh moderne, të gatshëm për tregun e punës.
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Mësim praktik dhe laboratorik</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Përvojë akademike e qartë</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Dizajn modern dhe i lexueshëm</div>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}

function SemesterCard({ sem, index, isOpen, onToggle }: { sem: Semester; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300"
      style={{ boxShadow: isOpen ? '0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.35)' : undefined }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left group transition-colors hover:bg-white/[0.04]"
      >
        <div className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${sem.color} shadow-lg ${sem.glow} text-slate-900 font-bold text-sm`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r ${sem.color} bg-clip-text text-transparent`}>{sem.label}</div>
          <div className="mt-0.5 text-base sm:text-lg font-semibold text-white truncate">{sem.subtitle}</div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            {sem.modules.length} lëndë
          </span>
          <div className={`flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 5l4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="h-px w-full bg-white/[0.07] mb-4" />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sem.modules.map((mod, i) => (
              <div
                key={mod}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.06]"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className={`flex-shrink-0 h-2 w-2 rounded-full bg-gradient-to-br ${sem.color}`} />
                {mod}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProgramPage() {
  const [openSem, setOpenSem] = useState<string | null>('sem1');

  const totalModules = semesters.reduce((acc, s) => acc + s.modules.length, 0);

  return (
    <section id="programi" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Programi akademik"
        title="Bachelor në Shkenca Kompjuterike"
        description="Programi 3-vjeçar bachelor i organizuar në 6 semestra, me progresion të qartë nga bazat deri tek specializimi dhe diplomimi."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{totalModules}</div>
            <div className="text-sm text-slate-400">lëndë gjithsej</div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-200">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">6</div>
            <div className="text-sm text-slate-400">semestra studimi</div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Bachelor</div>
            <div className="text-sm text-slate-400">diplomë zyrtare</div>
          </div>
        </GlassCard>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-3">
          {semesters.map((sem, index) => (
            <SemesterCard
              key={sem.id}
              sem={sem}
              index={index}
              isOpen={openSem === sem.id}
              onToggle={() => setOpenSem(openSem === sem.id ? null : sem.id)}
            />
          ))}
        </div>

        <div className="grid gap-4 lg:gap-5 content-start">
          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">Rezultatet e të nxënit</div>
                <div className="text-xs text-slate-400">Aftësitë kryesore</div>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              {outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                <LibraryBig className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">Vlerësimi</div>
                <div className="text-xs text-slate-400">Si matet suksesi</div>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              {['Detyra laboratorike', 'Projekte semestrale', 'Ekzaminime dhe prezantime', 'Diplomë finale'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-sky-500/10 to-violet-500/10">
            <div className="text-sm font-semibold text-white mb-3">Shpërndarja sipas viteve</div>
            {[['Viti I', 'sem1', 'sem2'], ['Viti II', 'sem3', 'sem4'], ['Viti III', 'sem5', 'sem6']].map(([label, s1, s2]) => {
              const count = semesters.filter(s => s.id === s1 || s.id === s2).reduce((a, s) => a + s.modules.length, 0);
              return (
                <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 mb-2 text-sm">
                  <span className="text-slate-300">{label}</span>
                  <span className="font-semibold text-white">{count} lëndë</span>
                </div>
              );
            })}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function PranimetPage() {
  return (
    <section id="pranimet" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Pranimet"
        title="Si aplikohet"
        description="Procesi i pranimit është i thjeshtë dhe i organizuar për studentët që duan të aplikojnë në bachelorin e Shkencave Kompjuterike."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Dokumentet e nevojshme</div>
              <div className="text-sm text-slate-400">Për aplikim fillestar</div>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {admissionChecklist.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                {item}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Hapat e pranimit</div>
              <div className="text-sm text-slate-400">Në rend të qartë</div>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {['Plotëso formularin e aplikimit', 'Dorëzo dokumentet në degën tonë', 'Merr konfirmimin nga stafi', 'Regjistrohu dhe fillo semestrin'].map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-semibold text-cyan-200">{index + 1}</div>
                <div className="text-sm text-slate-300">{step}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function AplikimiPage() {
  const defaultForm: AdmissionForm = {
    emri: '',
    mbiemri: '',
    email: '',
    telefoni: '',
    qyteti: '',
    shkolla: '',
    mesatarja: '',
    semestri: 'Vjeshtë 2026',
    mesazhi: '',
    dokumente: false,
    deklarata: false,
  };

  const [form, setForm] = useState<AdmissionForm>(() => {
    if (typeof window === 'undefined') return defaultForm;
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return defaultForm;
    try {
      return { ...defaultForm, ...(JSON.parse(saved) as Partial<AdmissionForm>) };
    } catch {
      return defaultForm;
    }
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form]);

  function update<K extends keyof AdmissionForm>(key: K, value: AdmissionForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(defaultForm);
    setSubmitted(false);
    setError('');
    setReference('');
    window.localStorage.removeItem(storageKey);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const required: Array<string> = [form.emri, form.mbiemri, form.email, form.telefoni, form.qyteti, form.shkolla, form.mesatarja];
    if (required.some((value) => !value.trim())) {
      setError('Ju lutem plotësoni të gjitha fushat e kërkuara.');
      setSubmitted(false);
      return;
    }
    if (!form.dokumente) {
      setError('Konfirmoni që i keni dokumentet e kërkuara.');
      setSubmitted(false);
      return;
    }
    if (!form.deklarata) {
      setError('Duhet të pranoni deklaratën e saktësisë së të dhënave.');
      setSubmitted(false);
      return;
    }
    const id = `AN-${Date.now().toString().slice(-6)}`;
    setReference(id);
    setError('');

    emailjs.send(
      'service_yfe3p6i',
      'template_vgk55c2',
      {
        emri: form.emri,
        mbiemri: form.mbiemri,
        email: form.email,
        telefoni: form.telefoni,
        qyteti: form.qyteti,
        shkolla: form.shkolla,
        mesatarja: form.mesatarja,
        referenca: id,
        mesazhi: form.mesazhi || '-',
      },
      'uuepEO5vRdX5iQflg'
    ).then(() => {
      setSubmitted(true);
      setError('');
    }).catch(() => {
      setError('Gabim gjatë dërgimit. Ju lutem provoni përsëri.');
    });
  }

  return (
    <section id="aplikimi" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Aplikimi online"
        title="Formular real i aplikimit"
        description="Formulari ruan draft-in në pajisje, pranon të dhëna bazike dhe hap emailin me të dhënat e plota për dërgim tek administrata."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Të dhënat e aplikantit</div>
          <div className="mt-1 text-sm text-slate-400">Të gjitha fushat janë në shqip.</div>
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.emri} onChange={(e) => update('emri', e.target.value)} placeholder="Emri" className="input-field" />
              <input value={form.mbiemri} onChange={(e) => update('mbiemri', e.target.value)} placeholder="Mbiemri" className="input-field" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" type="email" className="input-field" />
              <input value={form.telefoni} onChange={(e) => update('telefoni', e.target.value)} placeholder="Telefoni" className="input-field" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.qyteti} onChange={(e) => update('qyteti', e.target.value)} placeholder="Qyteti" className="input-field" />
              <input value={form.shkolla} onChange={(e) => update('shkolla', e.target.value)} placeholder="Shkolla e mesme" className="input-field" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.mesatarja} onChange={(e) => update('mesatarja', e.target.value)} placeholder="Mesatarja e notave" className="input-field" />
              <select value={form.semestri} onChange={(e) => update('semestri', e.target.value)} className="input-field">
                <option>Vjeshtë 2026</option>
                <option>Pranverë 2027</option>
                <option>Vjeshtë 2027</option>
              </select>
            </div>
            <textarea value={form.mesazhi} onChange={(e) => update('mesazhi', e.target.value)} placeholder="Mesazh shtesë" rows={5} className="input-field resize-none" />
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <input type="checkbox" checked={form.dokumente} onChange={(e) => update('dokumente', e.target.checked)} className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400" />
              Konfirmoj që i kam dokumentet e kërkuara për aplikim.
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <input type="checkbox" checked={form.deklarata} onChange={(e) => update('deklarata', e.target.checked)} className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400" />
              Pranoj që të dhënat e dhëna janë të sakta dhe mund të verifikohen.
            </label>
            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div> : null}
            {submitted ? (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                Aplikimi u përgatit. Referenca juaj është <span className="font-semibold">{reference}</span>.
              </div>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100">
                Dërgo aplikimin në email
                <Send className="h-4 w-4" />
              </button>
              <button type="button" onClick={resetForm} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                Fshij draftin
              </button>
            </div>
          </form>
        </GlassCard>

        <div className="grid gap-6">
          <GlassCard className="p-7">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">Afatet dhe hapat</div>
                <div className="text-sm text-slate-400">Për aplikim më të shpejtë</div>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {['Përgatit dokumentet', 'Plotëso formularin', 'Dërgo aplikimin', 'Prit konfirmimin'].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-semibold text-cyan-200">{index + 1}</div>
                  <div className="text-sm text-slate-300">{step}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-7">
            <div className="text-lg font-semibold text-white">Mbështetje për aplikantët</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Këshillim për zgjedhjen e semestrit</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Ndihmë për dokumente dhe procedura</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Kontakt i drejtpërdrejtë me zyrën e pranimit</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function TarifatPage() {
  return (
    <section id="tarifat" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Tarifat & bursat"
        title="Informacion financiar i qartë"
        description="Faqe transparente për tarifat, këstet dhe bursat që u ofrohen studentëve të programit bachelor."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-7 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
              <div className="text-sm text-slate-400">Tarifa vjetore</div>
              <div className="mt-2 text-3xl font-semibold text-white">1,350 €</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
              <div className="text-sm text-slate-400">Kësti mujor</div>
              <div className="mt-2 text-3xl font-semibold text-white">150 €</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
              <div className="text-sm text-slate-400">Këstet</div>
              <div className="mt-2 text-3xl font-semibold text-white">9</div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {tuitionHighlights.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Bursat</div>
              <div className="text-sm text-slate-400">Mbështetje financiare</div>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {scholarships.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function StudentLifePage() {
  return (
    <section id="jeta-studentore" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Jeta studentore"
        title="Kampusi, aktivitetet dhe mbështetja"
        description="Përvojë studentore e ndërtuar rreth mësimit, komunitetit dhe përgatitjes për karrierë në teknologji."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Shërbimet për studentët</div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {studentServices.map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="text-lg font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{item.text}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Ngjarjet e ardhshme</div>
          <div className="mt-5 grid gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-center text-sm font-semibold text-cyan-200">
                    {event.date}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white">{event.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{event.time}</div>
                    <div className="mt-1 text-sm text-slate-500">{event.place}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ emri: '', email: '', tema: '', mesazhi: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function update<K extends keyof ContactForm>(key: K, value: ContactForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.emri.trim() || !form.email.trim() || !form.tema.trim() || !form.mesazhi.trim()) {
      setError('Ju lutem plotësoni të gjitha fushat.');
      setSuccess(false);
      return;
    }
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/mredwzlj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          emri: form.emri,
          email: form.email,
          tema: form.tema,
          mesazhi: form.mesazhi,
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ emri: '', email: '', tema: '', mesazhi: '' });
      } else {
        setError('Gabim gjatë dërgimit. Provoni përsëri.');
      }
    } catch {
      setError('Gabim gjatë dërgimit. Provoni përsëri.');
    }
  }

  return (
    <section id="kontakt" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Kontakt"
        title="Na kontakto"
        description="Informacion bazë, rrjete sociale dhe formular kontaktues për pyetje rreth pranimeve dhe aplikimit."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Të dhënat e kolegjit</div>
          <div className="mt-5 grid gap-4 text-sm text-slate-300">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <MapPin className="mt-0.5 h-4 w-4 text-cyan-200" />
              <div>
                <div className="font-medium text-white">Adresa</div>
                <div className="mt-1">Rruga e Inovacionit 12, Prishtinë, Kosovë</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Phone className="mt-0.5 h-4 w-4 text-cyan-200" />
              <div>
                <div className="font-medium text-white">Telefoni</div>
                <div className="mt-1">+383 44 123 456</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Mail className="mt-0.5 h-4 w-4 text-cyan-200" />
              <div>
                <div className="font-medium text-white">Email</div>
                <div className="mt-1">{recipientEmail}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Clock3 className="mt-0.5 h-4 w-4 text-cyan-200" />
              <div>
                <div className="font-medium text-white">Orari i zyrës</div>
                <div className="mt-1">E hënë - E premte, 08:00 - 16:00</div>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {[Building2, Briefcase, HeartHandshake, GraduationCap].map((Icon, index) => (
              <div key={index} className="flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300">
                <Icon className="h-5 w-5" />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Formulari i kontaktit</div>
          <div className="mt-1 text-sm text-slate-400">Për pyetje rreth programit, pranimit dhe tarifave.</div>
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <input value={form.emri} onChange={(e) => update('emri', e.target.value)} placeholder="Emri dhe mbiemri" className="input-field" />
            <input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" type="email" className="input-field" />
            <input value={form.tema} onChange={(e) => update('tema', e.target.value)} placeholder="Tema" className="input-field" />
            <textarea value={form.mesazhi} onChange={(e) => update('mesazhi', e.target.value)} placeholder="Mesazhi" rows={6} className="input-field resize-none" />
            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div> : null}
            {success ? <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">Mesazhi u përgatit për email.</div> : null}
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100">
              Dërgo mesazhin në email
              <Send className="h-4 w-4" />
            </button>
          </form>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Pyetje të shpeshta</div>
          <div className="mt-5 grid gap-3">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-3xl border border-white/10 bg-slate-950/50 p-5">
                <div className="font-semibold text-white">{item.question}</div>
                <div className="mt-2 text-sm leading-6 text-slate-400">{item.answer}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Lokacioni</div>
          <div className="mt-5 flex min-h-[280px] items-center justify-center rounded-3xl border border-white/10 bg-slate-950/50 px-6 text-center">
            <div>
              <Building2 className="mx-auto h-10 w-10 text-cyan-200" />
              <div className="mt-4 text-lg font-semibold text-white">Kampusi në Prishtinë</div>
              <div className="mt-2 text-sm text-slate-400">Këtu mund të vendoset hartë reale kur projekti të lidhet me shërbim map.</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{collegeName}</div>
                <div className="text-sm text-slate-400">Projekt akademik i fokusuar vetëm në Shkenca Kompjuterike</div>
              </div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              Ky projekt është ndërtuar si bazë reale për një kolegj në Prishtinë me identitet modern, seksione të veçanta dhe përvojë mobile të mirë.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
            {navigation.map((item) => (
              <a key={item.key} href={navHash(item.key)} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 {collegeName}. Të gjitha të drejtat e rezervuara.</div>
          <div>{locationText}</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const page = useHashNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const content = useMemo(() => {
    switch (page) {
      case 'ballina':
        return <HomePage />;
      case 'programi':
        return <ProgramPage />;
      case 'pranimet':
        return <PranimetPage />;
      case 'aplikimi':
        return <AplikimiPage />;
      case 'tarifat':
        return <TarifatPage />;
      case 'jeta-studentore':
        return <StudentLifePage />;
      case 'kontakt':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        .input-field {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(2, 6, 23, 0.72);
          padding: 0.9rem 1rem;
          color: white;
          outline: none;
        }
        .input-field::placeholder {
          color: rgb(100 116 139);
        }
        .input-field:focus {
          border-color: rgba(56, 189, 248, 0.55);
          box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25);
        }
      `}</style>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.20),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_rgba(2,6,23,0.98)_0%,_rgba(15,23,42,1)_55%,_rgba(2,6,23,1)_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
        <AppHeader page={page} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main>{content}</main>
        <Footer />
      </div>
    </div>
  );
}
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')!).render(<App />);