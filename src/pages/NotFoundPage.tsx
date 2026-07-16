import { Link } from 'react-router-dom'
import { Button, Container, Section } from '../components/ui'

export function NotFoundPage({
  title = 'Strona nie istnieje',
  description = 'Ten URL nie pasuje do żadnej trasy w Aether. Sprawdź nawigację albo wróć na start.',
}: {
  title?: string
  description?: string
} = {}) {
  return (
    <Section>
      <Container className="py-20 text-center">
        <p className="font-display text-8xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-400">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Wróć do startu</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/blog">Blog</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
