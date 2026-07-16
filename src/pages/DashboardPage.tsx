import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge, Card, Container, FadeIn, PageHeader, Section } from '../components/ui'
import { activityFeed, dashboardSeries, trafficSources } from '../data/content'
import { cn, formatNumber } from '../lib/utils'

const COLORS = ['#7c5cff', '#22d3ee', '#34d399', '#fbbf24', '#f472b6']

const kpi = [
  { label: 'MAU', value: '128.4k', delta: '+12.4%', up: true },
  { label: 'MRR', value: '842k PLN', delta: '+6.1%', up: true },
  { label: 'Churn', value: '2.1%', delta: '-0.4%', up: true },
  { label: 'p95 latency', value: '142 ms', delta: '+8 ms', up: false },
]

const tooltipStyle = {
  background: 'var(--chart-tooltip-bg)',
  border: '1px solid var(--chart-tooltip-border)',
  borderRadius: 12,
  color: 'var(--fg)',
}

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
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dashboardSeries}>
                    <defs>
                      <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c5cff" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#7c5cff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis
                      yAxisId="users"
                      stroke="#a78bfa"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                      width={42}
                    />
                    <YAxis
                      yAxisId="revenue"
                      orientation="right"
                      stroke="#22d3ee"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `${v}k`}
                      width={40}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    <Area
                      yAxisId="users"
                      type="monotone"
                      dataKey="users"
                      name="Users"
                      stroke="#a78bfa"
                      fill="url(#users)"
                      strokeWidth={2}
                    />
                    <Area
                      yAxisId="revenue"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue (k PLN)"
                      stroke="#22d3ee"
                      fill="url(#revenue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card hover={false} className="h-full">
              <h2 className="font-display text-lg font-semibold text-white">Traffic sources</h2>
              <p className="mb-2 text-sm text-slate-400">Share of sessions</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {trafficSources.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-2">
                {trafficSources.map((s, i) => (
                  <li key={s.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: COLORS[i % COLORS.length] }}
                      />
                      {s.name}
                    </span>
                    <span className="text-slate-400">{s.value}%</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <Card hover={false}>
              <h2 className="mb-4 font-display text-lg font-semibold text-white">Error volume</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardSeries}>
                    <CartesianGrid stroke="var(--chart-grid)" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="errors" name="Errors" fill="#f43f5e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.06}>
            <Card hover={false}>
              <h2 className="mb-4 font-display text-lg font-semibold text-white">Activity feed</h2>
              <ul className="space-y-3">
                {activityFeed.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3"
                  >
                    <span
                      className={cn(
                        'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                        item.tone === 'ok' && 'bg-emerald-400',
                        item.tone === 'warn' && 'bg-amber-400',
                        item.tone === 'danger' && 'bg-rose-400',
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-200">{item.action}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        @{item.user} · {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Sample events · {formatNumber(94200)} events/min peak capacity
              </p>
            </Card>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
