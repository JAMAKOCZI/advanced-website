import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { trafficSources } from '../../data/content'
import { CHART_COLORS, chartTooltipStyle } from './chartTheme'

export function TrafficPie() {
  return (
    <>
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
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={chartTooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-2">
        {trafficSources.map((s, i) => (
          <li key={s.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-300">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
              />
              {s.name}
            </span>
            <span className="text-slate-400">{s.value}%</span>
          </li>
        ))}
      </ul>
    </>
  )
}
