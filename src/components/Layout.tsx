import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { BackgroundEffects } from './BackgroundEffects'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <BackgroundEffects />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
