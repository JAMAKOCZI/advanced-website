import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { formatNumber } from '../../lib/utils'

export function AnimatedStat({
  value,
  label,
  suffix = '',
}: {
  value: number
  label: string
  suffix?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const duration = 1400
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, started, reduceMotion])

  const formatted =
    suffix === '%' ? display.toFixed(2) : formatNumber(Math.round(display))

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-2xl font-bold text-white sm:text-4xl">
        {formatted}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  )
}
