import { lazy, Suspense, type ComponentType } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ThemeProvider } from './hooks/useTheme'

/** Lazy-load a named export as the default component for React.lazy */
function lazyNamed(loader: () => Promise<unknown>, name: string) {
  return lazy(async () => {
    const mod = (await loader()) as Record<string, ComponentType>
    const Comp = mod[name]
    if (!Comp) throw new Error(`Missing export: ${name}`)
    return { default: Comp }
  })
}

const HomePage = lazyNamed(() => import('./pages/HomePage'), 'HomePage')
const FeaturesPage = lazyNamed(() => import('./pages/FeaturesPage'), 'FeaturesPage')
const DashboardPage = lazyNamed(() => import('./pages/DashboardPage'), 'DashboardPage')
const WorkPage = lazyNamed(() => import('./pages/WorkPage'), 'WorkPage')
const BlogPage = lazyNamed(() => import('./pages/BlogPage'), 'BlogPage')
const BlogPostPage = lazyNamed(() => import('./pages/BlogPostPage'), 'BlogPostPage')
const PricingPage = lazyNamed(() => import('./pages/PricingPage'), 'PricingPage')
const AboutPage = lazyNamed(() => import('./pages/AboutPage'), 'AboutPage')
const ContactPage = lazyNamed(() => import('./pages/ContactPage'), 'ContactPage')
const NotFoundPage = lazyNamed(() => import('./pages/NotFoundPage'), 'NotFoundPage')

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-400" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="features" element={<FeaturesPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="work" element={<WorkPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
