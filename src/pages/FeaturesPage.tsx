import {
  Activity,
  Globe2,
  Layers,
  Shield,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { features } from '../data/content'
import { Card, Container, FadeIn, PageHeader, Section } from '../components/ui'

const icons = {
  Activity,
  Sparkles,
  Layers,
  Globe2,
  Shield,
  Terminal,
} as const

export function FeaturesPage() {
  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Funkcje"
          title="Wszystko, czego potrzebuje nowoczesna platforma"
          description="Moduły zaprojektowane jak prawdziwy product suite — observability, AI, design system, edge i governance."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {features.map((f, i) => {
            const Icon = icons[f.icon as keyof typeof icons] ?? Sparkles
            return (
              <FadeIn key={f.title} delay={i * 0.04}>
                <Card className="flex h-full gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-violet-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-white">{f.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{ width: `${72 + ((i * 7) % 24)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Adoption score · demo data</p>
                  </div>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn>
          <div className="mt-12 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:grid-cols-3 sm:p-8">
            {[
              { t: 'Latency budget', d: 'UI interactions < 100 ms perceived' },
              { t: 'Accessibility', d: 'Focus rings, contrast, reduced motion' },
              { t: 'Composition', d: 'Cards, badges, sections as reusable primitives' },
            ].map((item) => (
              <div key={item.t}>
                <p className="font-display text-lg font-semibold text-white">{item.t}</p>
                <p className="mt-2 text-sm text-slate-400">{item.d}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
