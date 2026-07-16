import { activityFeed } from '../../data/content'
import { cn, formatNumber } from '../../lib/utils'

export function ActivityFeed() {
  return (
    <>
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
    </>
  )
}
