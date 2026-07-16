import { Link } from 'react-router-dom'
import { Button, Container, Section } from '../components/ui'

export function NotFoundPage() {
  return (
    <Section>
      <Container className="py-20 text-center">
        <p className="font-display text-8xl font-bold text-gradient">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">Strona nie istnieje</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-400">
          Ten URL nie pasuje do żadnej trasy w Aether. Sprawdź nawigację albo wróć na start.
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button>Wróć do startu</Button>
        </Link>
      </Container>
    </Section>
  )
}
