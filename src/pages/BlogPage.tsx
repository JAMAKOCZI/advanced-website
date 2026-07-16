import { Link } from 'react-router-dom'
import { posts } from '../data/content'
import { Badge, Card, Container, FadeIn, PageHeader, Section } from '../components/ui'

export function BlogPage() {
  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Blog"
          title="Notatki o złożonych frontendach"
          description="Engineering, design, product i AI — artykuły demo z pełną stroną szczegółów."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.05}>
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <Card className="flex h-full flex-col">
                  <div className="flex items-center gap-2">
                    <Badge>{post.category}</Badge>
                    <span className="text-xs text-slate-500">
                      {post.date} · {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold text-white group-hover:text-violet-200">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-violet-300">Czytaj dalej →</p>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
