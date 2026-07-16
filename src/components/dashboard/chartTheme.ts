import type { CSSProperties } from 'react'

export const CHART_COLORS = ['#7c5cff', '#22d3ee', '#34d399', '#fbbf24', '#f472b6']

export const chartTooltipStyle: CSSProperties = {
  background: 'var(--chart-tooltip-bg)',
  border: '1px solid var(--chart-tooltip-border)',
  borderRadius: 12,
  color: 'var(--fg)',
}

export const chartGridProps = {
  stroke: 'var(--chart-grid)' as const,
  vertical: false as const,
}
