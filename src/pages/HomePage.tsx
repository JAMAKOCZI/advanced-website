import { ArrowRight, CheckCircle2, ChevronRight, Play, Quote } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FaqAccordion } from '../components/home/FaqAccordion'
import { AnimatedStat } from '../components/home/AnimatedStat'
import { HeroVisual } from '../components/home/HeroVisual'
import { ProjectCard } from '../components/ProjectCard'
import { Badge, Button, Card, Container, FadeIn, Section } from '../components/ui'
import { features, projects, stats } from '../data/content'
import { featureIcons } from '../lib/featureIcons'

export function HomePage() {
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
          <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-5 sm:grid-cols-4 sm:gap-6 sm:p-8">
            {stats.map((s) => (
              <AnimatedStat
                key={s.label}
                value={s.value}
                label={s.label}
                suffix={s.suffix ?? ''}
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
            {features.map((f, i) => {
              const Icon = featureIcons[f.icon]
              return (
                <FadeIn key={f.title} delay={i * 0.05}>
                  <Card className="h-full">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-violet-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
                  </Card>
                </FadeIn>
              )
            })}
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
                <ProjectCard project={p} variant="teaser" to="/work" />
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
              <FaqAccordion limit={3} />
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
