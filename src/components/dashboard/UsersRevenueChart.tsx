import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { dashboardSeries } from '../../data/content'
import { chartGridProps, chartTooltipStyle } from './chartTheme'

const seriesMeta = [
  { key: 'users', name: 'Users', color: '#a78bfa' },
  { key: 'revenue', name: 'Revenue (k PLN)', color: '#22d3ee' },
] as const

export function UsersRevenueChart() {
  return (
    <div>
      <div className="h-80 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dashboardSeries}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
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
            <CartesianGrid {...chartGridProps} />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              yAxisId="users"
              stroke="#a78bfa"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${Math.round(v / 1000)}k`}
              width={36}
            />
            <YAxis
              yAxisId="revenue"
              orientation="right"
              stroke="#22d3ee"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}k`}
              width={32}
            />
            <Tooltip contentStyle={chartTooltipStyle} />
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
      {/* External HTML legend — avoids Recharts Legend competing for plot height on small screens */}
      <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
        {seriesMeta.map((s) => (
          <li key={s.key} className="flex items-center gap-2 text-sm text-slate-300">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: s.color }}
              aria-hidden
            />
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
