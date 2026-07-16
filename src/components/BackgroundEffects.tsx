import { motion } from 'framer-motion'

export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 noise opacity-60" />
      <motion.div
        className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
