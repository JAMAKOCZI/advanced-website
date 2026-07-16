export type Project = {
  id: string
  title: string
  category: 'Product' | 'Brand' | 'Platform' | 'AI'
  year: string
  summary: string
  metrics: string[]
  color: string
}

export type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  content: string[]
}

export type TeamMember = {
  name: string
  role: string
  bio: string
  initials: string
}

export const navLinks = [
  { to: '/', label: 'Start' },
  { to: '/features', label: 'Funkcje' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/work', label: 'Portfolio' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Cennik' },
  { to: '/about', label: 'O nas' },
  { to: '/contact', label: 'Kontakt' },
] as const

export const stats = [
  { label: 'Aktywnych workspace', value: 12840 },
  { label: 'Zdarzeń / min', value: 94200 },
  { label: 'Uptime SLA', value: 99.98, suffix: '%' },
  { label: 'Krajów', value: 42 },
]

export const features = [
  {
    title: 'Realtime observability',
    description:
      'Strumienie metryk, logów i śladów z opóźnieniem poniżej 200 ms. Korelacja zdarzeń między serwisami w jednym widoku.',
    icon: 'Activity',
  },
  {
    title: 'AI copilots',
    description:
      'Asystenci generują raporty, proponują alerty i wyjaśniają anomalie w języku naturalnym — z pełnym kontekstem danych.',
    icon: 'Sparkles',
  },
  {
    title: 'Composable design system',
    description:
      'Tokeny, warianty i komponenty zsynchronizowane z Figma. Dark mode, a11y i animacje out of the box.',
    icon: 'Layers',
  },
  {
    title: 'Edge-ready delivery',
    description:
      'Statyczne assety, edge functions i cache policy dopasowane do regionu użytkownika. Szybki TTFB globalnie.',
    icon: 'Globe2',
  },
  {
    title: 'Governance & RBAC',
    description:
      'Role, polityki, audit log i SSO. Kontrola dostępu na poziomie workspace, projektu i pojedynczego dashboardu.',
    icon: 'Shield',
  },
  {
    title: 'Developer experience',
    description:
      'CLI, webhooks, SDK TypeScript i OpenAPI. Integracje z GitHub Actions, Slack i Linear w kilka minut.',
    icon: 'Terminal',
  },
]

export const projects: Project[] = [
  {
    id: 'nova-commerce',
    title: 'Nova Commerce OS',
    category: 'Platform',
    year: '2026',
    summary: 'System operacyjny e-commerce z live inventory i personalizacją w czasie rzeczywistym.',
    metrics: ['+38% konwersji', '12 rynków', '4.2M SKU'],
    color: 'from-violet-500 to-cyan-400',
  },
  {
    id: 'helix-health',
    title: 'Helix Health Graph',
    category: 'AI',
    year: '2025',
    summary: 'Graf wiedzy medycznej z asystentem diagnostycznym i panelami compliance.',
    metrics: ['HIPAA ready', '87% accuracy', '3 kliniki'],
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 'orbit-bank',
    title: 'Orbit Private Banking',
    category: 'Product',
    year: '2025',
    summary: 'Aplikacja wealth management z micro-interactions i pełnym dark UI.',
    metrics: ['AUM +1.2 mld', 'NPS 72', 'iOS + Web'],
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'lumen-brand',
    title: 'Lumen Identity System',
    category: 'Brand',
    year: '2024',
    summary: 'Rebrand i design system dla fintechu expanding do EU.',
    metrics: ['180 tokenów', '64 komponenty', '2 języki'],
    color: 'from-fuchsia-500 to-pink-400',
  },
  {
    id: 'pulse-city',
    title: 'Pulse City Twin',
    category: 'Platform',
    year: '2026',
    summary: 'Cyfrowy bliźniak miasta: ruch, energia i air quality w 3D mapie.',
    metrics: ['1.4M punktów', '15 FPS WebGL', 'Open data'],
    color: 'from-sky-400 to-indigo-500',
  },
  {
    id: 'cipher-ops',
    title: 'Cipher Ops Console',
    category: 'Product',
    year: '2024',
    summary: 'Konsola SOC z korelacją alertów i playbookami automatyzacji.',
    metrics: ['-54% MTTR', 'SOAR hooks', 'SSO + SCIM'],
    color: 'from-rose-500 to-violet-500',
  },
]

export const posts: Post[] = [
  {
    slug: 'architecture-of-realtime-dashboards',
    title: 'Architektura realtime dashboardów bez chaosu',
    excerpt:
      'Jak projektować warstwy ingest → stream → materialize, żeby UI nie dusił się pod lawiną eventów.',
    category: 'Engineering',
    date: '2026-06-12',
    readTime: '9 min',
    content: [
      'Realtime to nie „odśwież co 5 sekund”. To kontrakt między produkcją zdarzeń, warstwą agregacji i renderem UI.',
      'Na wejściu trzymamy event bus (Kafka / Redpanda). Dalej materializujemy widoki (ClickHouse / Materialize), a frontend subskrybuje delty przez SSE lub WebSocket.',
      'Klucz: backpressure. UI prosi o snapshot + sequence id, a potem tylko o delty. Nie re-renderujemy całej tabeli przy każdym ticku — wirtualizacja i memoizacja to must.',
      'Aether Dashboard używa tego modelu: metryki tickają 1 Hz, ale heatmapa i logi streamują niezależnie z własnym budżetem FPS.',
    ],
  },
  {
    slug: 'motion-design-that-earns-its-place',
    title: 'Motion design, który zarabia na uwagę',
    excerpt: 'Animacja nie jest ozdobą — to feedback, hierarchia i tempo narracji produktu.',
    category: 'Design',
    date: '2026-05-28',
    readTime: '6 min',
    content: [
      'Dobre motion design zaczyna się od intencji: co użytkownik ma zauważyć, a co ma pozostać w tle.',
      'Staggered reveal na hero jest OK, jeśli nie blokuje interakcji. Preferujemy transform/opacity, unikamy layout thrashing.',
      'Preferujemy springi o wysokim damping — „soft landing” zamiast bouncy carnival. Reduced motion zawsze respektujemy.',
      'W Aether animacje nawigacji i kart są spójne: 200–350 ms, easing cubic-bezier(0.22, 1, 0.36, 1).',
    ],
  },
  {
    slug: 'shipping-complex-frontends',
    title: 'Jak shipować skomplikowane frontendy bez spalonego zespołu',
    excerpt: 'Route-based code splitting, feature flags i kontrakty API, które nie rujnują sprintu.',
    category: 'Product',
    date: '2026-04-03',
    readTime: '8 min',
    content: [
      'Złożoność rośnie nieliniowo. Rozwiązanie: granice. Strony, feature foldery, shared UI kit i twarde reguły importów.',
      'CI powinno łapać regesje wizualne i performance (LCP, bundle size). Build fail > „zobaczymy na review”.',
      'Feature flags pozwalają merge’ować niedokończone ścieżki. Demo dashboardu w tym repo to właśnie izolowany feature slice.',
      'Najdroższa złożoność to ukryta: globalny stan, magic strings, CSS bez systemu. Tokeny + TypeScript to tania polisa.',
    ],
  },
  {
    slug: 'ai-ux-patterns-2026',
    title: 'Wzorce UX dla AI w produktach B2B (2026)',
    excerpt: 'Jak pokazywać niepewność modelu, cytowania i human-in-the-loop bez lęku użytkownika.',
    category: 'AI',
    date: '2026-03-18',
    readTime: '7 min',
    content: [
      'Użytkownik musi wiedzieć: skąd model wziął odpowiedź, jak pewny jest wynik i co może zrobić, gdy się myli.',
      'Pokaż źródła, confidence i akcję „popraw / zgłoś”. Streaming tokenów jest OK, ale finalny wynik musi dać się skopiować i zacytować.',
      'W Aether copiloci generują insighty na podstawie metryk — zawsze z linkiem do źródłowego panelu.',
      'Nie chowaj limitu kosztów i rate limitów. Transparentność buduje zaufanie szybciej niż „magia”.',
    ],
  },
]

export const pricingPlans = [
  {
    name: 'Starter',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Do eksperymentów i side-projectów.',
    features: ['1 workspace', '3 dashboardy', 'Community support', 'Public templates'],
    cta: 'Zacznij za darmo',
    highlighted: false,
  },
  {
    name: 'Pro',
    priceMonthly: 149,
    priceYearly: 119,
    description: 'Dla zespołów produktowych i agency.',
    features: [
      'Unlimited dashboards',
      'AI copilots',
      'SSO (Google / GitHub)',
      'Priority support',
      'Custom domains',
    ],
    cta: 'Wybierz Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 499,
    priceYearly: 399,
    description: 'Governance, SLA i private cloud.',
    features: [
      'Dedicated VPC / on-prem',
      'SCIM + audit log',
      '99.99% SLA',
      'TAM + workshops',
      'Custom DPA',
    ],
    cta: 'Porozmawiaj z sales',
    highlighted: false,
  },
]

export const team: TeamMember[] = [
  {
    name: 'Maja Kowalska',
    role: 'CEO & Product',
    bio: 'Była PM w fintechu. Lubi mapować chaos na roadmapę.',
    initials: 'MK',
  },
  {
    name: 'Adam Nowak',
    role: 'CTO',
    bio: 'Distributed systems, observability i „czy da się to zmierzyć?”.',
    initials: 'AN',
  },
  {
    name: 'Zofia Lewandowska',
    role: 'Head of Design',
    bio: 'Motion systems, accessibility i dark mode z charakterem.',
    initials: 'ZL',
  },
  {
    name: 'Igor Wiśniewski',
    role: 'Staff Engineer',
    bio: 'Frontend performance, WebGL i edge rendering.',
    initials: 'IW',
  },
]

export const faq = [
  {
    q: 'Czy to prawdziwy produkt SaaS?',
    a: 'To zaawansowane demo / playground UI. Kod jest w pełni działający po stronie frontendu — idealny do nauki, portfolio i dalszej rozbudowy o API.',
  },
  {
    q: 'Jaki stack?',
    a: 'React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Recharts, React Router. Zero backendu w tym repo — czysty frontend.',
  },
  {
    q: 'Czy działa offline / lokalnie?',
    a: 'Tak. npm install && npm run dev. Build produkcyjny: npm run build.',
  },
  {
    q: 'Czy mogę to forknąć?',
    a: 'Tak — MIT. Zmień branding, podłącz API i shipuj.',
  },
]

export const timeline = [
  { year: '2023', title: 'Spark', text: 'Pierwszy prototype dashboardu w 48h hackathonie.' },
  { year: '2024', title: 'Design system', text: 'Tokeny, komponenty i motion language pod marką Aether.' },
  { year: '2025', title: 'Platforma', text: 'Multi-workspace, RBAC i AI insighty w beta.' },
  { year: '2026', title: 'Public playground', text: 'Open-source showcase — ta strona, którą właśnie przeglądasz.' },
]

export const dashboardSeries = [
  { name: 'Pon', users: 4200, revenue: 18, errors: 12 },
  { name: 'Wt', users: 5100, revenue: 22, errors: 9 },
  { name: 'Śr', users: 4800, revenue: 20, errors: 14 },
  { name: 'Czw', users: 6200, revenue: 28, errors: 7 },
  { name: 'Pt', users: 7100, revenue: 34, errors: 11 },
  { name: 'Sob', users: 3900, revenue: 16, errors: 5 },
  { name: 'Nd', users: 3500, revenue: 14, errors: 4 },
]

export const trafficSources = [
  { name: 'Organic', value: 38 },
  { name: 'Paid', value: 22 },
  { name: 'Referral', value: 18 },
  { name: 'Product', value: 14 },
  { name: 'Other', value: 8 },
]

export const activityFeed = [
  { id: 1, user: 'system', action: 'Deploy v2.4.1 rolled out to eu-central', time: '2 min temu', tone: 'ok' },
  { id: 2, user: 'maja', action: 'Utworzono alert: error rate > 2%', time: '14 min temu', tone: 'warn' },
  { id: 3, user: 'igor', action: 'Zmergowano PR #482 — motion polish', time: '1 h temu', tone: 'ok' },
  { id: 4, user: 'ai', action: 'Anomaly: spike w /checkout (PL)', time: '2 h temu', tone: 'danger' },
  { id: 5, user: 'adam', action: 'Rotacja kluczy API workspace acme', time: 'wczoraj', tone: 'ok' },
]
