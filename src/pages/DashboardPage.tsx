import { ActivityFeed } from '../components/dashboard/ActivityFeed'
import { ErrorBarChart } from '../components/dashboard/ErrorBarChart'
import { TrafficPie } from '../components/dashboard/TrafficPie'
import { UsersRevenueChart } from '../components/dashboard/UsersRevenueChart'
import { Badge, Card, Container, FadeIn, PageHeader, Section } from '../components/ui'
import { cn } from '../lib/utils'

const kpi = [
  { label: 'MAU', value: '128.4k', delta: '+12.4%', up: true },
  { label: 'MRR', value: '842k PLN', delta: '+6.1%', up: true },
  { label: 'Churn', value: '2.1%', delta: '-0.4%', up: true },
  { label: 'p95 latency', value: '142 ms', delta: '+8 ms', up: false },
]

export function DashboardPage() {
  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Live demo"
          title="Command center"
          description="Interaktywny dashboard z KPI, wykresami Recharts, źródłami ruchu i activity feedem. Dane są mockowane — UI jest produkcyjny."
        />

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge>Range: 7 dni</Badge>
          <Badge className="!border-emerald-400/30 !bg-emerald-400/10 !text-emerald-200">
            Healthy
          </Badge>
          <Badge className="!border-amber-400/30 !bg-amber-400/10 !text-amber-100">
            1 anomaly
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpi.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.04}>
              <Card hover={false}>
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-2 font-display text-2xl font-bold text-white">{item.value}</p>
                <p className={cn('mt-1 text-sm', item.up ? 'text-emerald-400' : 'text-rose-400')}>
                  {item.delta} vs last week
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <Card hover={false} className="h-full">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-lg font-semibold text-white">
                    Users & revenue
                  </h2>
                  <p className="text-sm text-slate-400">
                    Dual series · osobne osie Y · daily aggregation
                  </p>
                </div>
              </div>
              <UsersRevenueChart />
            </Card>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card hover={false} className="h-full">
              <h2 className="font-display text-lg font-semibold text-white">Traffic sources</h2>
              <p className="mb-2 text-sm text-slate-400">Share of sessions</p>
              <TrafficPie />
            </Card>
          </FadeIn>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <Card hover={false}>
              <h2 className="mb-4 font-display text-lg font-semibold text-white">Error volume</h2>
              <ErrorBarChart />
            </Card>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Card hover={false}>
              <h2 className="mb-4 font-display text-lg font-semibold text-white">Activity feed</h2>
              <ActivityFeed />
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
