import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Play,
  Quote,
  Sparkles,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Container, FadeIn, Section } from '../components/ui'
import { faq, features, projects, stats } from '../data/content'
import { formatNumber } from '../lib/utils'

function AnimatedStat({
  value,
  label,
  suffix = '',
}: {
  value: number
  label: string
  suffix?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const duration = 1400
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, started, reduceMotion])

  const formatted =
    suffix === '%' ? display.toFixed(2) : formatNumber(Math.round(display))

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">
        {formatted}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  )
}

function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 })
  const sy = useSpring(my, { stiffness: 80, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10])

  return (
    <motion.div
      ref={ref}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1000 }
      }
      onMouseMove={(e) => {
        if (reduceMotion) return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        mx.set((e.clientX - rect.left) / rect.width - 0.5)
        my.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="relative"
    >
      <div className="glass relative overflow-hidden rounded-3xl border border-white/10 p-1 shadow-[var(--shadow-glow)]">
        <div className="rounded-[1.35rem] bg-gradient-to-br from-[#12141f] via-[#161825] to-[#0d1b2a] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <Badge className="!py-0.5 !text-slate-200">live · eu-central</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Latency p95', value: '118 ms', delta: '-12%' },
              { label: 'Active users', value: '7.1k', delta: '+8%' },
              { label: 'Error rate', value: '0.14%', delta: '-0.03' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs !text-slate-400">{item.label}</p>
                <p className="mt-1 font-display text-xl font-semibold !text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-emerald-400">{item.delta}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-3">
              <p className="mb-3 text-xs !text-slate-400">Throughput</p>
              <div className="flex h-28 items-end gap-1.5">
                {[40, 55, 48, 70, 62, 85, 78, 92, 88, 96, 90, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={reduceMotion ? false : { height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { delay: 0.2 + i * 0.05, duration: 0.6 }
                    }
                    className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600/40 to-cyan-400"
                  />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
              <p className="mb-3 text-xs !text-slate-400">AI insight</p>
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <p className="text-sm leading-relaxed !text-slate-300">
                  Spike w checkout koreluje z kampanią Paid PL. Sugeruję alert na funnel drop &gt;
                  8%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <Section className="overflow-hidden pb-10 pt-10 sm:pt-16">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <FadeIn>
                <Badge>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Advanced web playground · v1.0
                </Badge>
              </FadeIn>
              <FadeIn delay={0.05}>
                <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Skomplikowana strona,{' '}
                  <span className="text-gradient">która nadal jest czytelna</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-400">
                  Aether to multi-page product experience: animacje, dashboard z wykresami,
                  portfolio z filtrami, blog, cennik i formularz kontaktowy — w jednym spójnym
                  design systemie.
                </p>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/dashboard">
                      Otwórz dashboard <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/features">
                      <Play className="h-4 w-4" /> Zobacz funkcje
                    </Link>
                  </Button>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <ul className="mt-8 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                  {[
                    'React 19 + TypeScript',
                    'Tailwind CSS v4',
                    'Framer Motion',
                    'Recharts analytics',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
            <FadeIn delay={0.1}>
              <HeroVisual />
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="py-10">
        <Container>
          <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-6 sm:grid-cols-4 sm:p-8">
            {stats.map((s) => (
              <AnimatedStat
                key={s.label}
                value={s.value}
                label={s.label}
                suffix={'suffix' in s ? s.suffix : ''}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Badge className="mb-3">Platforma</Badge>
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  Warstwy złożoności, nie chaos
                </h2>
                <p className="mt-3 max-w-2xl text-slate-400">
                  Każda sekcja tej strony pokazuje inny pattern UI: navigation, data viz,
                  filtering, content, commerce, forms.
                </p>
              </div>
              <Link
                to="/features"
                className="text-sm font-semibold text-violet-300 hover:text-violet-200"
              >
                Wszystkie funkcje <ChevronRight className="inline h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 6).map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.05}>
                <Card className="h-full">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-violet-200">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <FadeIn>
            <div className="mb-10">
              <Badge className="mb-3">Case studies</Badge>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Wybrane projekty
              </h2>
            </div>
          </FadeIn>
          <div className="grid gap-5 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <Link to="/work" className="block h-full">
                  <Card className="group h-full overflow-hidden p-0">
                    <div
                      className={`h-28 bg-gradient-to-br ${p.color} opacity-80 transition group-hover:opacity-100`}
                    />
                    <div className="p-6">
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        {p.category} · {p.year}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-white">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">{p.summary}</p>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <Card className="h-full">
                <Quote className="h-8 w-8 text-violet-300" />
                <p className="mt-4 font-display text-2xl font-medium leading-snug text-white">
                  „Wreszcie demo, które wygląda jak produkt enterprise — a da się odpalić w 30
                  sekund lokalnie.”
                </p>
                <p className="mt-6 text-sm text-slate-400">— fictional design lead, 2026</p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="space-y-3">
                {faq.slice(0, 3).map((item, i) => {
                  const open = openFaq === i
                  const panelId = `faq-panel-${i}`
                  const buttonId = `faq-button-${i}`
                  return (
                    <div key={item.q} className="glass rounded-2xl transition hover:border-violet-400/30">
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => setOpenFaq(open ? null : i)}
                        className="w-full p-5 text-left"
                        aria-expanded={open}
                        aria-controls={panelId}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-semibold text-white">{item.q}</p>
                          <span className="text-slate-400" aria-hidden>
                            {open ? '−' : '+'}
                          </span>
                        </div>
                      </button>
                      {open ? (
                        <p
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="px-5 pb-5 text-sm leading-relaxed text-slate-400"
                        >
                          {item.a}
                        </p>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-24">
        <Container>
          <FadeIn>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/30 via-fuchsia-600/10 to-cyan-500/20 p-8 sm:p-12">
              <div className="relative z-10 max-w-2xl">
                <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  Gotowy zbudować coś jeszcze bardziej skomplikowanego?
                </h2>
                <p className="mt-4 text-slate-300">
                  Podepnij API, dodaj auth, wrzuć na edge. Ten scaffold jest punktem startu, nie
                  sufitem.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link to="/contact">Napisz do nas</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/pricing">Zobacz cennik</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
