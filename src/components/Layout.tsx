import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { navLinks } from '../data/content'
import { BackgroundEffects } from './BackgroundEffects'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'

/** Titles derived from navLinks; dynamic routes handled below */
const titlesFromNav: Record<string, string> = Object.fromEntries(
  navLinks.map((l) => [l.to, l.label]),
)

function resolveTitle(pathname: string) {
  if (titlesFromNav[pathname]) return titlesFromNav[pathname]
  if (pathname.startsWith('/blog/')) return 'Artykuł'
  return '404'
}

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const page = resolveTitle(location.pathname)
    document.title =
      page === 'Start'
        ? 'Aether — Advanced Digital Platform'
        : `${page} · Aether`
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <BackgroundEffects />
      <Navbar />
      <main className="flex-1" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
