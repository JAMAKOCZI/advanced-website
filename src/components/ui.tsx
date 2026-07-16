import { motion, useReducedMotion } from 'framer-motion'
import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '../lib/utils'

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-24', className)}>
      {children}
    </section>
  )
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-slate-200',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 shadow-[var(--shadow-card)] transition duration-300',
        hover && 'hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[var(--shadow-glow)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-[var(--shadow-glow)] hover:brightness-110',
  secondary:
    'border border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 hover:border-white/25',
  ghost: 'text-slate-200 hover:bg-white/5',
} as const

const buttonSizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
} as const

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  asChild?: boolean
}

function buttonClassName(
  variant: keyof typeof buttonVariants,
  size: keyof typeof buttonSizes,
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-50',
    buttonVariants[variant],
    buttonSizes[size],
    className,
  )
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = buttonClassName(variant, size, className)

  if (asChild && isValidElement(children)) {
    const child = Children.only(children) as ReactElement<{ className?: string }>
    return cloneElement(child, {
      className: cn(classes, child.props.className),
      ...props,
    } as never)
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20',
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-32 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20',
        className,
      )}
      {...props}
    />
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.45 }}
      className="mb-12 max-w-3xl"
    >
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-slate-400">{description}</p>
      ) : null}
    </motion.div>
  )
}

export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
