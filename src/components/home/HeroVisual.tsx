import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { Badge } from '../ui'

export function HeroVisual() {
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
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-left">
        Product preview
      </p>
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
