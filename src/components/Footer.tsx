import { AtSign, GitBranch, Mail, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks } from '../data/content'
import { Container } from './ui'

const social = [
  { Icon: GitBranch, href: 'https://github.com/JAMAKOCZI/advanced-website', label: 'GitHub' },
  { Icon: Share2, href: 'https://github.com/JAMAKOCZI/advanced-website', label: 'Share' },
  { Icon: AtSign, href: 'https://github.com/JAMAKOCZI/advanced-website', label: 'Social' },
  { Icon: Mail, href: 'mailto:hello@aether.demo', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-footer">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-bold">
            Aether<span className="text-gradient">.</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
            Zaawansowana platforma cyfrowa — dashboardy, motion design, portfolio i blog w jednym
            spójnym doświadczeniu. Demo open-source do nauki i dalszej rozbudowy.
          </p>
          <div className="mt-5 flex gap-3">
            {social.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="inline-flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-violet-400/40 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Nawigacja</p>
          <ul className="mt-4 space-y-0">
            {navLinks.slice(0, 5).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex min-h-11 items-center py-2 text-sm text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-300">Więcej</p>
          <ul className="mt-4 space-y-0">
            {navLinks.slice(5).map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex min-h-11 items-center py-2 text-sm text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/JAMAKOCZI/advanced-website"
                className="flex min-h-11 items-center py-2 text-sm text-slate-400 transition hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Aether Lab · MIT License</p>
          <p>Built with React · Vite · Tailwind · Framer Motion</p>
        </Container>
      </div>
    </footer>
  )
}
