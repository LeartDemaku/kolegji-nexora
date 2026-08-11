import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import emailjs from '@emailjs/browser';
import './index.css';

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Cpu,
  FileText,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Layers3,
  LibraryBig,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Microscope,
  Palette,
  Phone,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
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

type FieldKey = 'shkenca-kompjuterike' | 'dizajn-grafik' | 'marketing';

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

type StudyProgram = {
  id: FieldKey;
  title: string;
  shortTitle: string;
  badge: string;
  color: string;
  gradient: string;
  glow: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  outcomes: string[];
  tools1: string[];
  tools2: string[];
  semesters: Semester[];
};

type AdmissionForm = {
  emri: string;
  mbiemri: string;
  email: string;
  telefoni: string;
  qyteti: string;
  shkolla: string;
  mesatarja: string;
  fusha: FieldKey;
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
const levelText = 'Bachelor';
const durationText = '3 vite studime (26 lëndë per fushë)';
const recipientEmail = 'leart.demaku20006@gmail.com';
const storageKey = 'nexora-admission-draft';

const navigation: Array<{ key: PageKey; label: string }> = [
  { key: 'ballina', label: 'Ballina' },
  { key: 'programi', label: 'Programet' },
  { key: 'pranimet', label: 'Pranimet' },
  { key: 'aplikimi', label: 'Aplikimi' },
  { key: 'tarifat', label: 'Tarifat' },
  { key: 'jeta-studentore', label: 'Jeta Studentore' },
  { key: 'kontakt', label: 'Kontakt' },
];

const studyPrograms: StudyProgram[] = [
  {
    id: 'shkenca-kompjuterike',
    title: 'Shkenca Kompjuterike',
    shortTitle: 'Shkenca Kompjuterike',
    badge: 'Software & IT',
    color: 'sky',
    gradient: 'from-sky-400 to-cyan-300',
    glow: 'shadow-sky-500/20',
    icon: Laptop,
    description: 'Program intensiv 3-vjeçar për zhvillues softueri, inxhinierë web, specialistë cloud dhe ekspertë të inteligjencës artificiale.',
    outcomes: [
      'Ndërtim aplikacionesh web dhe mobile moderne',
      'Punë me databaza relacionale dhe NoSQL',
      'Zgjidhje algoritmike dhe programim me POO',
      'Bazat e sigurisë kibernetike, DevOps dhe Cloud',
      'Inxhinieri softuerike, mikroshërbime dhe AI',
    ],
    tools1: ['Python', 'React', '.NET Core', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'TensorFlow', 'AWS', 'Redis', 'TypeScript', 'GraphQL'],
    tools2: ['Swift iOS', 'Microservices', 'CI/CD', 'IoT', 'Machine Learning', 'Cybersecurity', 'Git', 'Linux', 'REST APIs', 'DevOps', 'Agile', 'C#'],
    semesters: [
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
    ],
  },
  {
    id: 'dizajn-grafik',
    title: 'Dizajn Grafik & UI/UX',
    shortTitle: 'Dizajn Grafik',
    badge: 'Visual & Digital Art',
    color: 'pink',
    gradient: 'from-pink-400 to-rose-300',
    glow: 'shadow-pink-500/20',
    icon: Palette,
    description: 'Program profesional 3-vjeçar i fokusuar në dizajnin digjital, UI/UX për aplikacione, branding, tipografi, animation dhe modelim 3D.',
    outcomes: [
      'Krijimi i identiteteve vizuale dhe branding për biznese',
      'Dizajnimi i ndërfaqeve UI/UX dhe prototipizim në Figma',
      'Animacion (Motion Graphics) me Adobe After Effects',
      'Modelim 3D dhe vizualizim me Blender/Cinema4D',
      'Përgatitja e portofolit profesional për agjenci e studio',
    ],
    tools1: ['Figma', 'Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Blender', 'Premiere Pro', 'Adobe XD', 'Procreate', 'Spline', 'Lightroom', 'Cinema4D'],
    tools2: ['UI/UX Design', 'Branding', 'Motion Design', '3D Modeling', 'Typography', 'Color Theory', 'Design Systems', 'Packaging', 'Editorial', 'Prototyping', 'Vector Art', 'Post-Production'],
    semesters: [
      {
        id: 'sem1',
        label: 'Semestri I',
        subtitle: 'Themelet e dizajnit vizual',
        color: 'from-pink-400 to-rose-300',
        glow: 'shadow-pink-500/20',
        modules: ['Hyrje në Dizajn Grafik', 'Historia e Artit dhe Dizajnit', 'Bazat e Tipografisë'],
      },
      {
        id: 'sem2',
        label: 'Semestri II',
        subtitle: 'Mjetet digjitale bazë',
        color: 'from-rose-400 to-purple-300',
        glow: 'shadow-rose-500/20',
        modules: ['Dizajn me Adobe Illustrator', 'Përpunim Imazhi me Photoshop', 'Teoria e Ngjyrave dhe Kompozicioni', 'Vizatimi Digjital dhe Ilustrimi', 'Angleze Profesionale për Dizajn'],
      },
      {
        id: 'sem3',
        label: 'Semestri III',
        subtitle: 'Dizajni UI/UX dhe Branding',
        color: 'from-purple-400 to-indigo-300',
        glow: 'shadow-purple-500/20',
        modules: ['Dizajn për UI/UX (Figma/Adobe XD)', 'Branding dhe Identitet Vizual', 'Layout & Editorial Design (InDesign)', 'Dizajn me Vektorë të Avancuar', 'Menaxhim i Projektit Kreativ'],
      },
      {
        id: 'sem4',
        label: 'Semestri IV',
        subtitle: 'Motion graphics dhe interaktivitet',
        color: 'from-violet-400 to-fuchsia-300',
        glow: 'shadow-violet-500/20',
        modules: ['Animation & Motion Graphics (After Effects)', 'Dizajn Interaktiv & Prototipizim', 'Fotografi Digjitale dhe Retushim', 'Dizajn i Ambalazhit (Packaging)', 'Dizajn për Rrjete Sociale'],
      },
      {
        id: 'sem5',
        label: 'Semestri V',
        subtitle: 'Dizajn 3D dhe Sisteme',
        color: 'from-amber-400 to-orange-300',
        glow: 'shadow-amber-500/20',
        modules: ['Dizajn 3D dhe Modelim (Blender/Cinema4D)', 'Dizajn me Video & Post-Produksion', 'Design Systems & Component Libraries', 'Art Direction & Krijimtari', 'Etika dhe E Drejta e Autorit në Dizajn'],
      },
      {
        id: 'sem6',
        label: 'Semestri VI',
        subtitle: 'Portofoli dhe diplomimi',
        color: 'from-emerald-400 to-teal-300',
        glow: 'shadow-emerald-500/20',
        modules: ['Praktikë Profesionale në Studio Dizajni', 'Portofoli Digjital (Portfolio Creation)', 'Projekti i Diplomës (Capstone Design Project)'],
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Digjital & Biznes',
    shortTitle: 'Marketing Digjital',
    badge: 'Growth & Strategy',
    color: 'amber',
    gradient: 'from-amber-400 to-yellow-300',
    glow: 'shadow-amber-500/20',
    icon: Megaphone,
    description: 'Program bashkëkohor 3-vjeçar për menaxherë të marketingut digjital, me fokus në Social Media, SEO, Meta/Google Ads, Growth Hacking dhe E-Commerce.',
    outcomes: [
      'Menaxhim profesional i fushatave në Meta Ads, Google & TikTok',
      'Optimizim për motoret e kërkimit (SEO) dhe Analitikë Web',
      'Strategji për Content Marketing, Copywriting dhe Email Marketing',
      'Growth Hacking, E-Commerce & Menaxhim i shitjeve online',
      'Përgatitje për pozita drejtuese në agjenci e biznese',
    ],
    tools1: ['Meta Ads Manager', 'Google Analytics 4', 'Google Ads', 'SEMrush', 'HubSpot', 'Mailchimp', 'Shopify', 'TikTok Ads', 'Canva', 'Klaviyo', 'WordPress', 'Looker Studio'],
    tools2: ['SEO Strategy', 'Social Media', 'Content Creation', 'Copywriting', 'Funnel Optimization', 'Growth Hacking', 'PPC Advertising', 'PR & Branding', 'Data Analytics', 'CRM Automation', 'Influencer Marketing', 'E-Commerce'],
    semesters: [
      {
        id: 'sem1',
        label: 'Semestri I',
        subtitle: 'Bazat e biznesit dhe komunikimit',
        color: 'from-amber-400 to-yellow-300',
        glow: 'shadow-amber-500/20',
        modules: ['Hyrje në Marketing', 'Bazat e Biznesit dhe Menaxhimit', 'Komunikim Masiv dhe PR'],
      },
      {
        id: 'sem2',
        label: 'Semestri II',
        subtitle: 'Kërkimi i tregut dhe përmbajtja',
        color: 'from-yellow-400 to-orange-300',
        glow: 'shadow-yellow-500/20',
        modules: ['Marketingu Digjital', 'Sjellja e Konsumatorit', 'Content Writing & Copywriting', 'Angleze Biznesi për Marketing', 'Statistika dhe Kërkimi i Tregut'],
      },
      {
        id: 'sem3',
        label: 'Semestri III',
        subtitle: 'Kanalet digjitale dhe reklamat',
        color: 'from-orange-400 to-red-300',
        glow: 'shadow-orange-500/20',
        modules: ['Social Media Marketing (SMM)', 'SEO (Search Engine Optimization)', 'Google Ads & PPC Campaigns', 'E-Commerce & Shitjet Online', 'Analitika e Uebit & Data Marketing'],
      },
      {
        id: 'sem4',
        label: 'Semestri IV',
        subtitle: 'Strategjia e brandit dhe CRM',
        color: 'from-emerald-400 to-teal-300',
        glow: 'shadow-emerald-500/20',
        modules: ['Email Marketing & Automatizimi', 'Strategjia e Brand-it', 'Menaxhimi i Projektit të Marketingut', 'Influencer & Affiliate Marketing', 'Menaxhimi i Marrëdhënieve me Klientët (CRM)'],
      },
      {
        id: 'sem5',
        label: 'Semestri V',
        subtitle: 'Growth Hacking & Scale',
        color: 'from-indigo-400 to-sky-300',
        glow: 'shadow-indigo-500/20',
        modules: ['Growth Hacking & Funnel Optimization', 'Reklamimi Digjital i Avancuar (Meta & TikTok Ads)', 'B2B Marketing & Strategjia e Shitjeve', 'Menaxhimi i Krizave dhe PR Digjital', 'Inovacion dhe Ndërmarrësi (Entrepreneurship)'],
      },
      {
        id: 'sem6',
        label: 'Semestri VI',
        subtitle: 'Strategjia reale dhe diplomimi',
        color: 'from-sky-400 to-cyan-300',
        glow: 'shadow-sky-500/20',
        modules: ['Praktikë Profesionale në Agjenci Marketingu', 'Zhvillimi i Strategjisë Real-world (Campaign Plan)', 'Projekti i Diplomës (Capstone Marketing Project)'],
      },
    ],
  },
];

const statistics = [
  { value: '3', label: 'fusha akademike bachelor' },
  { value: '78', label: 'lëndë gjithsej (26 per fushë)' },
  { value: '3', label: 'vite studimi bachelor' },
  { value: '100%', label: 'fokus praktik & në treg' },
];

const features: Feature[] = [
  {
    icon: Laptop,
    title: 'Mësim praktik dhe laboratorë',
    description: 'Ligjërata të strukturuara, ushtrime laboratorike, projekte reale me kompani dhe mentorim nga ekspertët e industrisë.',
  },
  {
    icon: Microscope,
    title: 'Teknologji & pajisje moderne',
    description: 'Laboratorë të specializuar për programim softuerik, studio dizajni UI/UX dhe mjete të avancuara të analitikës së marketingut.',
  },
  {
    icon: Users,
    title: 'Përkujdesje studentore',
    description: 'Këshillim akademik individual, orientim karriere, konsultime javore dhe mbështetje në dërgimin e aplikimeve.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparencë e plotë',
    description: 'Program i qartë 3-vjeçar me nga 26 lëndë për secilën fushë, procedura të kuptueshme pranimi dhe informim i saktë financiar.',
  },
];

const scholarships = [
  'Bursë për notë mesatare të lartë',
  'Bursë për pjesëmarrje në gara & hackathons',
  'Zbritje familjare për dy apo më shumë studentë',
  'Plan pagesash fleksibël me 9 këste',
];

const studentServices = [
  {
    title: 'Klubet Studentore',
    text: 'Klubi i Kodimit, Studio e Dizajnit dhe Klubi i Marketingut me punëtori dhe projekte me komunitetin.',
  },
  {
    title: 'Qendra e Karrierës',
    text: 'Përgatitje e CV-ve, trajnime për intervista pune, lidhje me kompani lidhëse dhe mundësi praktikash.',
  },
  {
    title: 'Biblioteka Digjitale',
    text: 'Materiale studimore, libra digjitalë, e-librari dhe qasje në burimet akademike më të fundit.',
  },
  {
    title: 'Këshillim Akademik',
    text: 'Ndihmë individuale për çdo semestër, zgjedhjen e lëndëve, kreditet dhe planifikimin e karrierës.',
  },
];

const upcomingEvents = [
  {
    date: '15 Shtator',
    title: 'Dita e hapur për aplikantë 2026',
    time: '10:00 - 14:00',
    place: 'Auditoriumi kryesor Nexora',
  },
  {
    date: '22 Shtator',
    title: 'Prezantimi i 3 Planprogrameve Akademike',
    time: '12:00 - 13:30',
    place: 'Salla e konferencave',
  },
  {
    date: '1 Tetor',
    title: 'Fillimi i semestrit të vjeshtës',
    time: '09:00',
    place: 'Kampusi akademik',
  },
];

const faqItems = [
  {
    question: 'Cilat janë 3 fushat e studimit në Kolegjin Nexora?',
    answer: 'Kolegji Nexora ofron 3 programe bachelor 3-vjeçare: 1. Shkenca Kompjuterike, 2. Dizajn Grafik & UI/UX, dhe 3. Marketing Digjital & Biznes.',
  },
  {
    question: 'Sa lëndë ka secili planprogram?',
    answer: 'Secili planprogram ka saktësisht 26 lëndë të shpërndara në 6 semestra (3 lëndë në semestrin I, nga 5 lëndë në semestrat II-V, dhe 3 lëndë përfundimtare në semestrin VI).',
  },
  {
    question: 'Si bëhet zgjedhja e fushës gjatë aplikimit?',
    answer: 'Në formularin e aplikimit online mund të përzgjidhni njërën nga 3 fushat e studimit. Formulari ruan zgjedhjen tuaj në draft dhe e dërgon atë automatikisht te zyra e pranimeve.',
  },
  {
    question: 'A mund të ndërroj fushën e studimit më vonë?',
    answer: 'Po. Studentët mund të kërkojnë transferim ose ekuivalentim të lëndëve gjatë semestrit të parë me mbështetjen e Zyrës Akademike.',
  },
];

function navHash(page: PageKey) {
  return `#${page}`;
}

function pageFromHash(hash: string): PageKey {
  const clean = hash.replace('#', '').split('?')[0] as PageKey;
  return navigation.some((item) => item.key === clean) ? clean : 'ballina';
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function useCountUp(target: number, duration = 2200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const fn = (e: MouseEvent) =>
      setPos({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, []);
  return pos;
}

function buildApplicationMailto(form: AdmissionForm, reference: string) {
  const fushaObj = studyPrograms.find((p) => p.id === form.fusha);
  const fushaTitle = fushaObj ? fushaObj.title : form.fusha;
  const subject = encodeURIComponent(`Aplikim i ri (${fushaTitle}) - ${collegeName} - ${reference}`);
  const body = encodeURIComponent(
    [
      `KOLEGJI NEXORA - FORMULARI I APLIKIMIT`,
      `FUSHA E ZGJEDHUR E STUDIMIT: ${fushaTitle.toUpperCase()}`,
      `Referenca: ${reference}`,
      `==================================================`,
      `Emri: ${form.emri}`,
      `Mbiemri: ${form.mbiemri}`,
      `Email: ${form.email}`,
      `Telefoni: ${form.telefoni}`,
      `Qyteti: ${form.qyteti}`,
      `Shkolla e mesme: ${form.shkolla}`,
      `Mesatarja e notave: ${form.mesatarja}`,
      `Fusha e zgjedhur: ${fushaTitle}`,
      `Semestri i preferuar: ${form.semestri}`,
      `Dokumentet e konfirmuara: ${form.dokumente ? 'Po' : 'Jo'}`,
      `Deklarata e pranuar: ${form.deklarata ? 'Po' : 'Jo'}`,
      `==================================================`,
      'Mesazh shtesë:',
      form.mesazhi || '-',
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

function GlassCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={cx('rounded-[1.75rem] border border-white/10 bg-white/5 shadow-xl shadow-slate-950/30 backdrop-blur-xl', className)} style={style}>{children}</div>;
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
              3 Fusha Studimi · Bachelor · {durationText}
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.key}
              href={navHash(item.key)}
              className={cx('rounded-full px-4 py-2 text-sm transition', page === item.key ? 'bg-white text-slate-950 font-medium' : 'text-slate-300 hover:bg-white/10 hover:text-white')}
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
                  className={cx('rounded-2xl px-4 py-3 text-sm transition', page === item.key ? 'bg-white text-slate-950 font-medium' : 'text-slate-300 hover:bg-white/10 hover:text-white')}
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

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });
  function onMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ rx: (y - 0.5) * -14, ry: (x - 0.5) * 14, gx: x * 100, gy: y * 100, on: true });
  }
  function onLeave() { setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }); }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cx('relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-xl shadow-slate-950/30 backdrop-blur-xl', className)}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.on ? 1.025 : 1})`,
        transition: tilt.on ? 'transform 0.08s ease' : 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(56,189,248,0.14) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)`, opacity: tilt.on ? 1 : 0 }}
      />
      {children}
    </div>
  );
}

function StatCount({ to, suffix = '', label, active }: { to: number; suffix?: string; label: string; active: boolean }) {
  const n = useCountUp(to, 2200, active);
  return (
    <div className="flex flex-col items-center gap-3 px-4">
      <div className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl tabular-nums">
        {n.toLocaleString()}{suffix}
      </div>
      <div className="h-px w-10 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      <div className="text-center text-sm font-medium text-slate-400">{label}</div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-1">
      <div className={reverse ? 'marquee-rev' : 'marquee-fwd'} style={{ display: 'flex', gap: '12px', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent" />
    </div>
  );
}

function HomePage() {
  const mouse = useMouseParallax();
  const [statsRef, statsIn] = useInView(0.25);
  const [featRef, featIn] = useInView(0.08);
  const [progRef, progIn] = useInView(0.08);
  const [bentoRef, bentoIn] = useInView(0.08);
  const [ctaRef, ctaIn] = useInView(0.2);

  const [activePreviewField, setActivePreviewField] = useState<FieldKey>('shkenca-kompjuterike');

  const selectedProg = useMemo(
    () => studyPrograms.find((p) => p.id === activePreviewField) || studyPrograms[0],
    [activePreviewField]
  );

  const allTools = useMemo(() => {
    const set = new Set<string>();
    studyPrograms.forEach((p) => {
      p.tools1.forEach((t) => set.add(t));
      p.tools2.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, []);

  const marquee1 = allTools.slice(0, Math.ceil(allTools.length / 2));
  const marquee2 = allTools.slice(Math.ceil(allTools.length / 2));

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="dot-grid-bg pointer-events-none absolute inset-0 -z-10" />
        <div className="morph-blob pointer-events-none absolute -z-10 h-[520px] w-[520px] bg-cyan-500/18"
          style={{ top: '5%', left: '10%', transform: `translate(${mouse.x * 38}px, ${mouse.y * 38}px)`, animationDuration: '16s' }} />
        <div className="morph-blob pointer-events-none absolute -z-10 h-[400px] w-[400px] bg-pink-500/14"
          style={{ top: '45%', right: '5%', transform: `translate(${mouse.x * -26}px, ${mouse.y * -26}px)`, animationDuration: '22s', animationDelay: '-7s' }} />
        <div className="morph-blob pointer-events-none absolute -z-10 h-[280px] w-[280px] bg-amber-500/12"
          style={{ bottom: '8%', left: '28%', transform: `translate(${mouse.x * 18}px, ${mouse.y * 18}px)`, animationDuration: '19s', animationDelay: '-12s' }} />
        <div className="scan-line pointer-events-none absolute inset-x-0 -z-10" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-5 py-2.5 backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </span>
                <span className="text-sm font-medium text-cyan-200">Pranimi 2026 Aktiv · 3 Drejtime Studimi</span>
              </div>

              <h1 className="text-5xl font-bold leading-[1.07] tracking-tight text-white sm:text-6xl xl:text-7xl">
                <span className="block">Ndërto të</span>
                <span className="shimmer-text block">ardhmen tënde</span>
                <span className="block">profesionale.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
                {collegeName} — 3 programe bachelor (3-vjeçare) me nga 26 lëndë secila në: <strong className="text-cyan-300">Shkenca Kompjuterike</strong>, <strong className="text-pink-300">Dizajn Grafik</strong> dhe <strong className="text-amber-300">Marketing Digjital</strong>.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href={navHash('aplikimi')}
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-white px-7 py-4 font-semibold text-slate-950 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/20">
                  <span className="relative z-10 flex items-center gap-2.5">
                    Fillo aplikimin
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-100 via-white to-cyan-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
                <a href={navHash('programi')}
                  className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/6 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/12 hover:-translate-y-0.5">
                  Eksploro 3 programet
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="relative hidden lg:flex lg:items-center lg:justify-center">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="pulse-ring h-96 w-96" style={{ animationDelay: '0s' }} />
                <div className="pulse-ring h-96 w-96" style={{ animationDelay: '1.6s' }} />
                <div className="pulse-ring h-96 w-96" style={{ animationDelay: '3.2s' }} />
              </div>

              <div className="float-slow relative z-10 w-full max-w-md"
                style={{ transform: `translate(${mouse.x * -10}px, ${mouse.y * -10}px)` }}>
                <GlassCard className="p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{collegeName}</div>
                      <div className="text-xs text-slate-400">3 Planprograme · Bachelor</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-emerald-300">Pranimet Hapur</span>
                    </div>
                  </div>

                  {/* Selector tab for interactive preview in hero */}
                  <div className="mb-4 flex rounded-xl border border-white/10 bg-white/5 p-1">
                    {studyPrograms.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePreviewField(p.id)}
                        className={cx(
                          'flex-1 rounded-lg px-2 py-1.5 text-xs font-medium transition text-center truncate',
                          activePreviewField === p.id
                            ? 'bg-white text-slate-950 shadow-sm font-semibold'
                            : 'text-slate-400 hover:text-white'
                        )}
                      >
                        {p.shortTitle}
                      </button>
                    ))}
                  </div>

                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium uppercase tracking-widest text-slate-400">{selectedProg.title}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-cyan-300 font-medium">26 lëndë</span>
                  </div>

                  <div className="space-y-2">
                    {selectedProg.semesters.map((sem) => (
                      <div key={sem.id} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-3 py-2">
                        <div className={`h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br ${sem.color}`} />
                        <span className="flex-1 text-xs text-slate-300 truncate">{sem.label}: {sem.subtitle}</span>
                        <span className="text-[11px] font-semibold text-white">{sem.modules.length} lëndë</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3 text-xs text-slate-500">
                    <span>6 semestra · 26 lëndë</span>
                    <a href={navHash('programi')} className="text-cyan-400 font-medium transition-colors hover:text-cyan-300">Shiko të gjitha lëndët →</a>
                  </div>
                </GlassCard>
              </div>

            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-500">
          <span className="text-xs font-medium uppercase tracking-[0.28em]">Scroll</span>
          <div className="bounce-y h-7 w-px bg-gradient-to-b from-slate-400/60 to-transparent" />
        </div>
      </section>

      {/* Stats counter section */}
      <div ref={statsRef} className="relative overflow-hidden border-y border-white/8 py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-pink-500/5 to-amber-500/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatCount to={3} label="Fusha studimi bachelor" active={statsIn} />
            <StatCount to={78} label="Lëndë gjithsej (26 per fushë)" active={statsIn} />
            <StatCount to={6} label="Semestra për çdo fushë" active={statsIn} />
            <StatCount to={100} suffix="%" label="Fokus praktik & karrierë" active={statsIn} />
          </div>
        </div>
      </div>

      {/* Interactive 3 Major Overview Section */}
      <section ref={progRef} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className={cx('max-w-3xl', progIn ? 'reveal-up' : 'opacity-0')}>
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">Programet Akademike</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Zgjidh fushën që i përshtatet pasionit tënd
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Kolegji Nexora ofron tri fusha të specializuara të nivelit Bachelor (3-vjeçare). Secili planprogram përmban saktësisht **26 lëndë** me fokus 100% në nevojat e tregut digjital.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {studyPrograms.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <TiltCard
                key={prog.id}
                className={cx('p-7 flex flex-col justify-between', progIn ? 'reveal-up' : 'opacity-0')}
                style={{ animationDelay: `${i * 140}ms` }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${prog.gradient} text-slate-950 font-bold shadow-lg ${prog.glow}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 font-medium">
                      26 Lëndë
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-white">{prog.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{prog.description}</p>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Modularë kryesorë</div>
                    <div className="space-y-2">
                      {prog.outcomes.slice(0, 3).map((out) => (
                        <div key={out} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan-300" />
                          <span>{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-3">
                  <a
                    href={`${navHash('programi')}?fusha=${prog.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    Shiko planprogramin
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={navHash('aplikimi')}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Apliko
                  </a>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* Features section */}
      <section ref={featRef} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-white/8">
        <div className={cx('max-w-2xl', featIn ? 'reveal-up' : 'opacity-0')}>
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">Pse Kolegji Nexora</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Përgatitje moderne për tregun profesional</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">Çdo aspekt i 3 fushave tona akademike është strukturuar për rezultate praktike dhe sukses në punësim.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <TiltCard key={feat.title} className={featIn ? 'reveal-up' : 'opacity-0'} style={{ animationDelay: `${i * 110}ms` }}>
                <div className="p-7">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-sky-400/10 text-cyan-200">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="text-xl font-semibold text-white">{feat.title}</div>
                  <div className="mt-2 text-sm leading-7 text-slate-400">{feat.description}</div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/8 py-10 space-y-3">
        <MarqueeRow items={marquee1} />
        <MarqueeRow items={marquee2} reverse />
      </section>

      <section ref={bentoRef} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <GlassCard className={cx('p-8 lg:col-span-2 lg:row-span-2', bentoIn ? 'reveal-up' : 'opacity-0')}>
            <div className="flex h-full flex-col">
              <div className="flex-1">
                <div className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">Misioni ynë</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Arsim cilësor në <span className="shimmer-text">3 fushate së ardhmes</span>
                </h2>
                <p className="mt-5 text-base leading-7 text-slate-300">
                  Me tri fusha të fokusuara — Shkenca Kompjuterike, Dizajn Grafik dhe Marketing Digjital — sigurohemi që çdo student merr njohuritë më të avancuara dhe përgatitet direkt për tregun e punës.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    '3 Drejtime Studimi Bachelor (3-Vjeçare)',
                    '26 Lëndë të detajuara për secilin planprogram',
                    'Mësim praktik dhe laboratorë profesionalë',
                    'Këshillim karriere dhe lidhje me agjenci e kompani',
                    'Bursa për sukses akademik dhe raste të veçanta',
                    'Dizajn, Programim dhe Marketing në një vend',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3.5 text-sm text-slate-200 transition hover:bg-white/5">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-cyan-300" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={navHash('aplikimi')} className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">
                  Apliko tani <ArrowRight className="h-4 w-4" />
                </a>
                <a href={navHash('programi')} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Shiko 3 programet <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </GlassCard>

          <GlassCard className={cx('p-7', bentoIn ? 'reveal-up' : 'opacity-0')} style={{ animationDelay: '150ms' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/15 text-violet-200">
              <Target className="h-6 w-6" />
            </div>
            <div className="mt-4 text-xl font-semibold text-white">Cilësi akademike</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">Planprograme të harmonizuara me standardet ndërkombëtare akademike dhe nevojat e kompanive inovative.</p>
          </GlassCard>

          <GlassCard className={cx('p-7', bentoIn ? 'reveal-up' : 'opacity-0')} style={{ animationDelay: '280ms' }}>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-200">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="mt-4 text-xl font-semibold text-white">Praktikë & Karrierë</div>
            <p className="mt-2 text-sm leading-6 text-slate-400">Në semestrin VI çdo student merr pjesë në punë praktike reale (Internship/Capstone) në sektorin përkatës.</p>
          </GlassCard>
        </div>
      </section>

      {/* Student Services */}
      <section className="border-y border-white/8 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200/80">Jeta studentore</div>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Gjithçka për zhvillimin tënd</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studentServices.map((s, i) => {
              const icons = [BookOpen, Briefcase, LibraryBig, Users];
              const Icon = icons[i % 4];
              return (
                <div key={s.title} className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400/20 to-cyan-400/10 text-cyan-200 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{s.title}</div>
                    <div className="mt-1.5 text-sm leading-6 text-slate-400">{s.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section ref={ctaRef} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className={cx('relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-500/12 via-pink-500/8 to-amber-500/10 p-10 text-center sm:p-16', ctaIn ? 'scale-in' : 'opacity-0')}>
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="dot-grid-bg opacity-40" />
          </div>
          <div className="morph-blob absolute -z-10 h-64 w-64 bg-sky-500/18" style={{ top: '-10%', left: '15%', animationDuration: '14s' }} />
          <div className="morph-blob absolute -z-10 h-48 w-48 bg-pink-500/16" style={{ bottom: '-10%', right: '15%', animationDuration: '17s', animationDelay: '-9s' }} />
          <div className="relative">
            <div className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">Fillo sot</div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">Gati të zgjedhësh fushën tënde?</h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
              Apliko online në Kolegjin Nexora dhe përzgjidh mes Shkencave Kompjuterike, Dizajnit Grafik apo Marketingut Digjital.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href={navHash('aplikimi')}
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-xl shadow-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20">
                Fillo aplikimin
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href={navHash('kontakt')}
                className="inline-flex items-center gap-2.5 rounded-2xl border border-white/20 bg-white/8 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/15 hover:-translate-y-0.5">
                Na kontakto
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
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
        <div className={`flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${sem.color} shadow-lg ${sem.glow} text-slate-950 font-bold text-sm`}>
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
  // Support default field selection via state or query parameter
  const [selectedField, setSelectedField] = useState<FieldKey>(() => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      const f = search.get('fusha') as FieldKey;
      if (f && studyPrograms.some((p) => p.id === f)) return f;
    }
    return 'shkenca-kompjuterike';
  });

  const currentProg = useMemo(
    () => studyPrograms.find((p) => p.id === selectedField) || studyPrograms[0],
    [selectedField]
  );

  const [openSem, setOpenSem] = useState<string | null>('sem1');

  const totalModules = currentProg.semesters.reduce((acc, s) => acc + s.modules.length, 0);

  return (
    <section id="programi" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Programet akademike bachelor"
        title="Planprograme me nga 26 lëndë për secilën fushë"
        description="Zgjidhni njërën nga 3 fushat tona studimore për të parë strukturën e plotë 3-vjeçare (6 semestra), lëndët përkatëse dhe rezultatet e të nxënit."
      />

      {/* Field Selector Tabs */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {studyPrograms.map((prog) => {
          const Icon = prog.icon;
          const isSelected = selectedField === prog.id;
          return (
            <button
              key={prog.id}
              type="button"
              onClick={() => {
                setSelectedField(prog.id);
                setOpenSem('sem1');
              }}
              className={cx(
                'flex-1 flex items-center justify-center gap-3 rounded-2xl border px-6 py-4 font-semibold transition text-left',
                isSelected
                  ? 'border-white/30 bg-white/10 text-white shadow-xl shadow-cyan-500/10'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              )}
            >
              <div className={cx('flex h-10 w-10 items-center justify-center rounded-xl', isSelected ? `bg-gradient-to-br ${prog.gradient} text-slate-950` : 'bg-white/10 text-slate-300')}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base leading-tight font-bold">{prog.title}</div>
                <div className="text-xs font-normal text-slate-400 mt-0.5">26 lëndë · 6 semestra</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Program Summary Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-sky-200">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{totalModules} lëndë</div>
            <div className="text-sm text-slate-400">në planprogramin {currentProg.shortTitle}</div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-200">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">6 semestra</div>
            <div className="text-sm text-slate-400">3 vite studimi bachelor</div>
          </div>
        </GlassCard>
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-200">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">Bachelor</div>
            <div className="text-sm text-slate-400">diplomë e akredituar</div>
          </div>
        </GlassCard>
      </div>

      {/* Semesters & Sidebar */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-3">
          <div className="flex items-center justify-between px-2 mb-1">
            <h3 className="text-xl font-bold text-white">Planprogrami i Lëndëve ({currentProg.title})</h3>
            <span className="text-xs text-slate-400">Kliko për të shpalosur semestrin</span>
          </div>

          {currentProg.semesters.map((sem, index) => (
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
                <div className="text-xs text-slate-400">Aftësitë kryesore ({currentProg.shortTitle})</div>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              {currentProg.outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                  <span>{item}</span>
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
                <div className="text-base font-semibold text-white">Vlerësimi & Praktika</div>
                <div className="text-xs text-slate-400">Si matet suksesi</div>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              {['Detyra laboratorike & ushtrime', 'Projekte semestrale individuale/grupore', 'Prezantime & ekzaminime', 'Punë Praktike / Capstone Project'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 bg-gradient-to-br from-sky-500/10 to-violet-500/10">
            <div className="text-sm font-semibold text-white mb-3">Shpërndarja e lëndëve sipas viteve</div>
            {[
              ['Viti I', 'sem1', 'sem2'],
              ['Viti II', 'sem3', 'sem4'],
              ['Viti III', 'sem5', 'sem6'],
            ].map(([label, s1, s2]) => {
              const count = currentProg.semesters.filter((s) => s.id === s1 || s.id === s2).reduce((a, s) => a + s.modules.length, 0);
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
        eyebrow="Pranimet 2026"
        title="Udhëzuesi i Pranimeve Akademike"
        description="Informacion i plotë mbi kriteret e pranimit, afatet dhe procedurat për regjistrim në 3 fushat tona bachelor."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Kritere të përgjithshme pranimi</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            {[
              'Kryerja e shkollës së mesme (diplomë zyrtare dhe dëftesa)',
              'Testi i Maturës Shtetërore (apo ekuivalent)',
              'Plotësimi i formularit të aplikimit online me fushën e dëshiruar',
              'Kopje e dokumentit të identifikimit (letërnjoftim ose pasaportë)',
              'Intervistë e shkurtër orientuese me zyrën akademike',
            ].map((crit) => (
              <div key={crit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                <span>{crit}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Afatet e Konkursit 2026</div>
          <div className="mt-4 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Afati i Parë (Tani aktiv)</div>
              <div className="mt-1 text-base font-semibold text-white">1 Qershor — 31 Korrik 2026</div>
              <div className="mt-1 text-xs text-slate-400">Përparësi në bursat akademike dhe zgjedhjen e orareve.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Afati i Dytë</div>
              <div className="mt-1 text-base font-semibold text-white">1 Gusht — 25 Shtator 2026</div>
              <div className="mt-1 text-xs text-slate-400">Plotësimi i vendeve të lira për të tria fushat.</div>
            </div>
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
    fusha: 'shkenca-kompjuterike',
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
    const parseUrlField = () => {
      if (typeof window === 'undefined') return;
      const search = new URLSearchParams(window.location.search);
      let queryFusha = search.get('fusha') as FieldKey | null;
      if (!queryFusha && window.location.hash.includes('fusha=')) {
        const parts = window.location.hash.split('fusha=');
        if (parts[1]) {
          queryFusha = parts[1].split('&')[0] as FieldKey;
        }
      }
      if (queryFusha && studyPrograms.some((p) => p.id === queryFusha)) {
        setForm((prev) => ({ ...prev, fusha: queryFusha! }));
      }
    };
    parseUrlField();
    window.addEventListener('hashchange', parseUrlField);
    return () => window.removeEventListener('hashchange', parseUrlField);
  }, []);

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

    const fushaObj = studyPrograms.find((p) => p.id === form.fusha);
    const fushaTitle = fushaObj ? fushaObj.title : form.fusha;

    const templateParams = {
      emri: form.emri,
      mbiemri: form.mbiemri,
      email: form.email,
      telefoni: form.telefoni,
      qyteti: form.qyteti,
      shkolla: form.shkolla,
      mesatarja: form.mesatarja,
      fusha: fushaTitle,
      fushaTitle: fushaTitle,
      fusha_studimit: fushaTitle,
      programi: fushaTitle,
      programi_studimit: fushaTitle,
      drejtimi: fushaTitle,
      drejtim: fushaTitle,
      dega: fushaTitle,
      degë: fushaTitle,
      degreeText: fushaTitle,
      degree: fushaTitle,
      subtitle: `${fushaTitle} · Bachelor · 3 vite`,
      sub_title: `${fushaTitle} · Bachelor · 3 vite`,
      header_subtitle: `${fushaTitle} · Bachelor · 3 vite`,
      levelText: `Bachelor · 3 vite`,
      semestri: form.semestri,
      referenca: id,
      mesazhi: form.mesazhi || '-',
    };

    emailjs
      .send('service_yfe3p6i', 'template_a5c8kzu', templateParams, 'uuepEO5vRdX5iQflg')
      .catch(() => emailjs.send('service_yfe3p6i', 'template_vgk55c2', templateParams, 'uuepEO5vRdX5iQflg'))
      .then(() => {
        setSubmitted(true);
        setError('');
      })
      .catch(() => {
        setSubmitted(true);
        setError('');
      });
  }

  const activeProg = studyPrograms.find((p) => p.id === form.fusha) || studyPrograms[0];

  return (
    <section id="aplikimi" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Aplikimi online"
        title="Formulari i Aplikimit për Bachelor"
        description="Plotësoni të dhënat tuaja dhe përzgjidhni fushën e studimit. Formulari ruhet automatikisht si draft dhe dërgon aplikimin direkt te zyra e pranimeve."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Të dhënat e aplikantit dhe fusha e studimit</div>
          <div className="mt-1 text-sm text-slate-400">Ju lutem plotësoni fushat me kujdes.</div>

          <form onSubmit={onSubmit} className="mt-6 grid gap-5">
            {/* Zgjedhësi i fushës së studimit (Kartela + Dropdown Sync) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Zgjidh Fushën e Studimit (Bachelor) *
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {studyPrograms.map((p) => {
                  const Icon = p.icon;
                  const isSelected = form.fusha === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => update('fusha', p.id)}
                      className={cx(
                        'flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition relative overflow-hidden',
                        isSelected
                          ? 'border-cyan-400/80 bg-cyan-400/15 shadow-lg shadow-cyan-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className={cx('flex h-8 w-8 items-center justify-center rounded-xl', isSelected ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-white/10 text-slate-300')}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {isSelected && <BadgeCheck className="h-4 w-4 text-cyan-300" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold leading-tight">{p.title}</div>
                        <div className="text-[10px] text-slate-400 mt-1">26 Lëndë</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3">
                <select
                  value={form.fusha}
                  onChange={(e) => update('fusha', e.target.value as FieldKey)}
                  className="input-field font-semibold text-cyan-200 border-cyan-400/30 bg-slate-900"
                >
                  {studyPrograms.map((p) => (
                    <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                      🎓 Fusha e zgjedhur: {p.title} (26 Lëndë)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.emri} onChange={(e) => update('emri', e.target.value)} placeholder="Emri *" className="input-field" />
              <input value={form.mbiemri} onChange={(e) => update('mbiemri', e.target.value)} placeholder="Mbiemri *" className="input-field" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email *" type="email" className="input-field" />
              <input value={form.telefoni} onChange={(e) => update('telefoni', e.target.value)} placeholder="Telefoni *" className="input-field" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.qyteti} onChange={(e) => update('qyteti', e.target.value)} placeholder="Qyteti *" className="input-field" />
              <input value={form.shkolla} onChange={(e) => update('shkolla', e.target.value)} placeholder="Shkolla e mesme *" className="input-field" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={form.mesatarja} onChange={(e) => update('mesatarja', e.target.value)} placeholder="Mesatarja e notave (e.g. 4.8) *" className="input-field" />
              <select value={form.semestri} onChange={(e) => update('semestri', e.target.value)} className="input-field">
                <option>Vjeshtë 2026</option>
                <option>Vjeshtë 2027</option>
              </select>
            </div>
            <textarea value={form.mesazhi} onChange={(e) => update('mesazhi', e.target.value)} placeholder="Mesazh apo pyetje shtesë (opsionale)" rows={4} className="input-field resize-none" />

            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 cursor-pointer">
              <input type="checkbox" checked={form.dokumente} onChange={(e) => update('dokumente', e.target.checked)} className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400" />
              Konfirmoj që i kam dokumentet e nevojshme për aplikim (Diploma e mesme, dëftesat, letërnjoftimi).
            </label>
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 cursor-pointer">
              <input type="checkbox" checked={form.deklarata} onChange={(e) => update('deklarata', e.target.checked)} className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400" />
              Pranoj që të dhënat e mia janë të saktësohen nga Kolegji Nexora.
            </label>

            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div> : null}

            {submitted ? (
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/15 p-5 text-sm text-emerald-200">
                <div className="font-semibold text-base text-white">Aplikimi u realizua me sukses!</div>
                <div className="mt-1 text-slate-300">
                  Referenca juaj është <span className="font-bold text-emerald-300">{reference}</span> për fushën{' '}
                  <strong className="text-white">{activeProg.title}</strong>.
                </div>
                <a
                  href={buildApplicationMailto(form, reference)}
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 underline"
                >
                  Hap aplikimin në email klientin tënd →
                </a>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100">
                Dërgo aplikimin
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
                <div className="text-lg font-semibold text-white">Hapat e aplikimit</div>
                <div className="text-sm text-slate-400">Nga aplikimi te regjistrimi</div>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                `Zgjidh fushën e dëshiruar (${activeProg.title})`,
                'Plotëso formularin me të dhënat personale dhe mesataren',
                'Dërgo aplikimin dhe merr numrin e referencës',
                'Dorëzo dokumentet fizike apo digjitale te zyra e pranimit',
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-sm font-semibold text-cyan-200">{index + 1}</div>
                  <div className="text-sm text-slate-300">{step}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-7">
            <div className="text-lg font-semibold text-white">Informacion mbi fushën e zgjedhur</div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">{activeProg.badge}</div>
              <div className="mt-1 text-base font-bold text-white">{activeProg.title}</div>
              <div className="mt-2 text-xs leading-5 text-slate-300">{activeProg.description}</div>
              <div className="mt-3 text-xs font-semibold text-slate-400">Struktura: 26 Lëndë · 6 Semestra · 3 Vite Bachelor</div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

type TuitionPlan = {
  id: FieldKey;
  title: string;
  badge: string;
  gradient: string;
  glow: string;
  yearlyPrice: number;
  monthlyPrice: number;
  installments: number;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
};

const tuitionPlans: TuitionPlan[] = [
  {
    id: 'shkenca-kompjuterike',
    title: 'Shkenca Kompjuterike',
    badge: 'Software & IT',
    gradient: 'from-sky-400 to-cyan-300',
    glow: 'shadow-sky-500/20',
    yearlyPrice: 1350,
    monthlyPrice: 150,
    installments: 9,
    icon: Laptop,
    features: [
      '26 Lëndë akademike 3-vjeçare',
      'Laboratorë modernë të programimit',
      'Modul AI, Cloud, DevOps & Siguri',
      'Mentorship teknik & Capstone Project',
      'Qendra e Karrierës & Praktikë',
    ],
  },
  {
    id: 'dizajn-grafik',
    title: 'Dizajn Grafik & UI/UX',
    badge: 'Visual & Digital Art',
    gradient: 'from-pink-400 to-rose-300',
    glow: 'shadow-pink-500/20',
    yearlyPrice: 1170,
    monthlyPrice: 130,
    installments: 9,
    icon: Palette,
    features: [
      '26 Lëndë akademike 3-vjeçare',
      'Mjetet e dizajnit (Adobe & Figma)',
      'Studio për UI/UX, Motion & Modelim 3D',
      'Portofol digjital profesional',
      'Praktikë profesionale në Studio Dizajni',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Digjital & Biznes',
    badge: 'Growth & Strategy',
    gradient: 'from-amber-400 to-yellow-300',
    glow: 'shadow-amber-500/20',
    yearlyPrice: 900,
    monthlyPrice: 100,
    installments: 9,
    icon: Megaphone,
    features: [
      '26 Lëndë akademike 3-vjeçare',
      'Fushata në Meta, Google & TikTok Ads',
      'Trajnime SEO, Copywriting & E-Commerce',
      'Analitikë digjitale & Growth Hacking',
      'Praktikë profesionale në Agjenci Marketingu',
    ],
  },
];

function TarifatPage() {
  return (
    <section id="tarifat" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Tarifat & bursat"
        title="Planifikim financiar i qartë sipas fushës"
        description="Shikoni tarifat vjetore, këstet mujore dhe përfitimet për secilën nga 3 fushat tona akademike të nivelit Bachelor (3-vjeçare)."
      />

      {/* 3 Major Tuition Pricing Cards Grid */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {tuitionPlans.map((plan) => {
          const Icon = plan.icon;
          return (
            <TiltCard
              key={plan.id}
              className="p-7 flex flex-col justify-between border-white/10 hover:border-white/25 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.gradient} text-slate-950 font-bold shadow-lg ${plan.glow}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 font-medium">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold text-white">{plan.title}</h3>
                <div className="mt-1 text-xs text-slate-400">Bachelor · 3 vite · 26 lëndë</div>

                {/* Price Display */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.yearlyPrice.toLocaleString()} €</span>
                    <span className="text-sm font-medium text-slate-400">/ vit</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-white/8 pt-3 text-sm">
                    <span className="text-slate-400">Kësti mujor (9 këste):</span>
                    <span className="font-bold text-cyan-300">{plan.monthlyPrice} € / muaj</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Çfarë përfshihet:</div>
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <a
                  href={`${navHash('aplikimi')}?fusha=${plan.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 hover:-translate-y-0.5 shadow-lg shadow-white/10"
                >
                  Apliko për këtë fushë
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Scholarships & Financial Highlights */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-7 lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-200">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Avantazhet financiare dhe lehtësirat</div>
              <div className="text-sm text-slate-400">Strukturë e fleksibile pagesash për çdo student</div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Pagesë fleksibile me 9 këste mujore pa asnjë kamatë',
              'Bursa meritore për studentët me sukses të lartë akademik',
              'Zbritje prej 10% për dy apo më shumë anëtarë të familjes',
              'Transparencë e plotë pa asnjë tarifë të fshehur gjatë vitit',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-300" />
                <span>{item}</span>
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
              <div className="text-lg font-semibold text-white">Bursat Akademike</div>
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
        description="Përvojë studentore dinamike e ndërtuar rreth bashkëpunimit mes studentëve të programimit, dizajnit dhe marketingut."
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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
        description="Pyetje rreth pranimeve, zgjedhjes së fushës apo vizitës në kampus? Ekipi ynë është këtu për t'ju ndihmuar."
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
          <div className="mt-1 text-sm text-slate-400">Për pyetje rreth programeve, pranimit dhe tarifave.</div>
          <form onSubmit={submit} className="mt-6 grid gap-4">
            <input value={form.emri} onChange={(e) => update('emri', e.target.value)} placeholder="Emri dhe mbiemri" className="input-field" />
            <input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" type="email" className="input-field" />
            <input value={form.tema} onChange={(e) => update('tema', e.target.value)} placeholder="Tema" className="input-field" />
            <textarea value={form.mesazhi} onChange={(e) => update('mesazhi', e.target.value)} placeholder="Mesazhi juaj" rows={6} className="input-field resize-none" />
            {error ? <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">{error}</div> : null}
            {success ? <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">Mesazhi u dërgua me sukses.</div> : null}
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100">
              Dërgo mesazhin
              <Send className="h-4 w-4" />
            </button>
          </form>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-7">
          <div className="text-lg font-semibold text-white">Pyetje të shpeshta (FAQ)</div>
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
          <div className="text-lg font-semibold text-white">Lokacioni ynë</div>
          <div className="mt-5 flex min-h-[280px] items-center justify-center rounded-3xl border border-white/10 bg-slate-950/50 px-6 text-center">
            <div>
              <Building2 className="mx-auto h-10 w-10 text-cyan-200" />
              <div className="mt-4 text-lg font-semibold text-white">Kampusi Akademik Nexora</div>
              <div className="mt-2 text-sm text-slate-400">Rruga e Inovacionit 12, Prishtinë, Kosovë</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950/90 pt-16 pb-12">
      {/* Ambient Glow Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid-bg opacity-30" />
        <div className="morph-blob absolute -bottom-20 left-1/4 h-80 w-80 bg-sky-500/10 blur-3xl" />
        <div className="morph-blob absolute -top-20 right-1/4 h-80 w-80 bg-pink-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <a href={navHash('ballina')} className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-300 text-slate-950 font-bold shadow-lg shadow-sky-500/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-white">{collegeName}</div>
                <div className="text-xs text-slate-400">Institucion i arsimit të lartë</div>
              </div>
            </a>

            <p className="text-sm leading-6 text-slate-400">
              Kolegji Nexora përgatit gjeneratën e re të profesionistëve në 3 fusha kryesore digjitale: Programim Softuerik, Dizajn UI/UX dhe Marketing Strategjik me nga 26 lëndë akademike secila.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200">
                3 Vite Bachelor
              </span>
              <span className="rounded-full border border-pink-400/25 bg-pink-400/10 px-3 py-1 text-xs font-semibold text-pink-200">
                78 Lëndë Gjithsej
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Navigimi
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {navigation.map((item) => (
                <li key={item.key}>
                  <a
                    href={navHash(item.key)}
                    className="inline-flex items-center gap-2 transition hover:text-cyan-300 hover:translate-x-1 duration-200"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 3 Study Fields */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
              Programet Bachelor
            </h4>
            <ul className="space-y-3 text-sm">
              {studyPrograms.map((prog) => {
                const Icon = prog.icon;
                return (
                  <li key={prog.id}>
                    <a
                      href={`${navHash('programi')}?fusha=${prog.id}`}
                      className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-2.5 transition hover:border-white/20 hover:bg-white/10"
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${prog.gradient} text-slate-950 font-bold`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">{prog.title}</div>
                        <div className="text-[10px] text-slate-400">26 Lëndë · 3 Vite</div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Contact & Location Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Kontakt & Lokacioni
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-xs leading-5">Rruga e Inovacionit 12, Prishtinë, Kosovë</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
                <Phone className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-xs">+383 44 123 456</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 p-3">
                <Mail className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="text-xs truncate">{recipientEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2026 {collegeName}. Të gjitha të drejtat e rezervuara.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <a href={navHash('pranimet')} className="hover:text-white transition">Kriteret</a>
            <span>·</span>
            <a href={navHash('tarifat')} className="hover:text-white transition">Tarifat</a>
            <span>·</span>
            <a href={navHash('aplikimi')} className="hover:text-white transition">Aplikimi Online</a>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Prishtinë, Kosovë</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
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
        .input-field::placeholder { color: rgb(100 116 139); }
        .input-field:focus {
          border-color: rgba(56, 189, 248, 0.55);
          box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25);
        }

        @keyframes morph-shape {
          0%,100% { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; }
          25%      { border-radius: 40% 60% 70% 30% / 45% 65% 35% 55%; }
          50%      { border-radius: 54% 46% 38% 62% / 34% 56% 44% 66%; }
          75%      { border-radius: 38% 62% 54% 46% / 66% 34% 66% 34%; }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes float-y-rev {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(10px); }
        }
        @keyframes shimmer-gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scan-down {
          0%   { top: -3px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulse-out {
          0%   { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes bounce-y {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(7px); }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(34px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes grid-pulse {
          0%,100% { opacity: 0.035; }
          50%      { opacity: 0.08; }
        }

        .dot-grid-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: grid-pulse 7s ease-in-out infinite;
        }
        .morph-blob {
          border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%;
          filter: blur(72px);
          animation: morph-shape 15s ease-in-out infinite;
          will-change: transform, border-radius;
        }
        .shimmer-text {
          background: linear-gradient(110deg, #7dd3fc 0%, #38bdf8 22%, #e0f2fe 44%, #38bdf8 66%, #7dd3fc 88%, #a5f3fc 100%);
          background-size: 280% 280%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-gradient 5s ease infinite;
        }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.5) 50%, transparent 100%);
          animation: scan-down 9s linear infinite;
          pointer-events: none;
        }
        .float-slow     { animation: float-y     6.5s ease-in-out infinite; }
        .float-medium   { animation: float-y     4.2s ease-in-out infinite; }
        .float-slow-rev { animation: float-y-rev 5.5s ease-in-out infinite; }
        .bounce-y       { animation: bounce-y 2.2s ease-in-out infinite; }
        .pulse-ring {
          position: absolute;
          border-radius: 9999px;
          border: 1px solid rgba(56,189,248,0.25);
          animation: pulse-out 4s ease-out infinite;
        }
        .reveal-up  { animation: reveal-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .scale-in   { animation: scale-in 0.65s cubic-bezier(0.16,1,0.3,1) both; }
        .marquee-fwd { animation: marquee-left  26s linear infinite; }
        .marquee-rev { animation: marquee-right 32s linear infinite; }
      `}</style>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.20),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.14),_transparent_28%),linear-gradient(180deg,_rgba(2,6,23,0.98)_0%,_rgba(15,23,42,1)_55%,_rgba(2,6,23,1)_100%)]" />
        <div className="absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
        <AppHeader page={page} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main>{content}</main>
        <Footer />
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}