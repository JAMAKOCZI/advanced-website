import { Check } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, Container, FadeIn, PageHeader, Section } from '../components/ui'
import { pricingPlans } from '../data/content'
import { cn, formatCurrency } from '../lib/utils'

export function PricingPage() {
  const [yearly, setYearly] = useState(true)

  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Cennik"
          title="Proste plany, enterprise na życzenie"
          description="Toggle miesięcznie / rocznie. Kwoty demo w PLN — podłącz Stripe gdy będziesz gotowy."
        />

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <div
            className="inline-flex min-h-11 flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
            role="group"
            aria-label="Okres rozliczeniowy"
          >
            <button
              type="button"
              onClick={() => setYearly(false)}
              aria-pressed={!yearly}
              className={cn(
                'min-h-11 rounded-full px-4 text-sm font-medium transition',
                !yearly
                  ? 'bg-white/10 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-300',
              )}
            >
              Miesięcznie
            </button>
            <button
              type="button"
              onClick={() => setYearly(true)}
              aria-pressed={yearly}
              className={cn(
                'inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition',
                yearly
                  ? 'bg-violet-500/30 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-300',
              )}
            >
              Rocznie <Badge className="!py-0">−20%</Badge>
            </button>
          </div>
        </div>

        <div className="grid gap-5 pt-4 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => {
            const price = yearly ? plan.priceYearly : plan.priceMonthly
            return (
              <FadeIn key={plan.name} delay={i * 0.06}>
                <Card
                  className={cn(
                    'relative flex h-full flex-col',
                    plan.highlighted && 'border-violet-400/40 pt-4 shadow-[var(--shadow-glow)]',
                  )}
                  hover={false}
                >
                  {plan.highlighted ? (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 !border-violet-400/40 !bg-violet-500/30">
                      Najczęściej wybierany
                    </Badge>
                  ) : null}
                  <p className="font-display text-xl font-semibold text-white">{plan.name}</p>
                  <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                  <div className="mt-6">
                    <span className="font-display text-4xl font-bold text-white">
                      {price === 0 ? '0 zł' : formatCurrency(price)}
                    </span>
                    {price > 0 ? (
                      <span className="text-sm text-slate-500"> / mies.</span>
                    ) : null}
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="mt-8 w-full"
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                  >
                    <Link to="/contact">{plan.cta}</Link>
                  </Button>
                </Card>
              </FadeIn>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
