import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { posts } from '../data/content'
import { Badge, Button, Container, FadeIn, Section } from '../components/ui'

export function BlogPostPage() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <Section>
        <Container>
          <h1 className="font-display text-3xl font-bold text-white">Nie znaleziono artykułu</h1>
          <p className="mt-3 text-slate-400">Ten slug nie istnieje w demo content.</p>
          <Link to="/blog" className="mt-6 inline-block">
            <Button variant="secondary">
              <ArrowLeft className="h-4 w-4" /> Wróć do bloga
            </Button>
          </Link>
        </Container>
      </Section>
    )
  }

  return (
    <Section>
      <Container className="max-w-3xl">
        <FadeIn>
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Blog
          </Link>
          <Badge>{post.category}</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-slate-400">
            {post.date} · {post.readTime} czytania
          </p>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">{post.excerpt}</p>
        </FadeIn>

        <article className="mt-10 space-y-5">
          {post.content.map((paragraph, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <p className="text-base leading-relaxed text-slate-300">{paragraph}</p>
            </FadeIn>
          ))}
        </article>

        <FadeIn>
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-semibold text-white">Podoba Ci się ten format?</p>
            <p className="mt-2 text-sm text-slate-400">
              To statyczny content w TypeScript — łatwo podmienić na MDX lub headless CMS.
            </p>
            <Link to="/contact" className="mt-4 inline-block">
              <Button size="sm">Porozmawiajmy</Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
