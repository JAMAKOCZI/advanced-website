import { Menu, Moon, Sun, X, Zap } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/content'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../lib/utils'
import { Button, Container } from './ui'

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const closeMenu = () => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock while drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Mark main content inert / aria-hidden while menu open
  useEffect(() => {
    const main = document.getElementById('main-content')
    if (!main) return

    if (open) {
      main.setAttribute('aria-hidden', 'true')
      main.setAttribute('inert', '')
    } else {
      main.removeAttribute('aria-hidden')
      main.removeAttribute('inert')
    }

    return () => {
      main.removeAttribute('aria-hidden')
      main.removeAttribute('inert')
    }
  }, [open])

  // Escape + initial focus into panel
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }
    window.addEventListener('keydown', onKey)

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    focusable?.[0]?.focus()

    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition duration-300 pt-[env(safe-area-inset-top)]',
        scrolled
          ? 'surface-header-scrolled border-white/10 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2 font-display text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-[var(--shadow-glow)] transition group-hover:scale-105">
            <Zap className="h-4 w-4" />
          </span>
          <span>
            Aether<span className="text-gradient">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Główne">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white',
                  isActive && 'bg-white/10 text-white',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
            aria-label={theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/contact">Umów demo</Link>
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={open}
            aria-controls={menuId}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <>
          {/* Full-viewport backdrop — click to close */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-label="Zamknij menu"
            onClick={closeMenu}
          />
          {/* Scrollable drawer panel under sticky header */}
          <div
            id={menuId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu nawigacji"
            className="surface-header-mobile fixed inset-x-0 top-[calc(4rem+env(safe-area-inset-top))] z-50 max-h-[calc(100dvh-4rem-env(safe-area-inset-top))] overflow-y-auto border-t border-white/10 backdrop-blur-xl lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'min-h-11 rounded-xl px-4 py-3 text-base font-medium text-slate-300 transition hover:bg-white/5',
                      isActive && 'bg-white/10 text-white',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button asChild className="mt-2 w-full">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Umów demo
                </Link>
              </Button>
            </Container>
          </div>
        </>
      ) : null}
    </header>
  )
}
