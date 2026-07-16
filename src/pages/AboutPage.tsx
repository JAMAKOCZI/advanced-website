import { team, timeline } from '../data/content'
import { Card, Container, FadeIn, PageHeader, Section } from '../components/ui'

export function AboutPage() {
  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="O nas"
          title="Zespół, który lubi złożone problemy"
          description="Aether Lab to fikcyjna marka demo — ale historia, role i timeline pokazują, jak budować stronę „About” z charakterem."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.05}>
              <Card className="h-full text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-lg font-bold text-white">
                  {member.initials}
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-white">
                  {member.name}
                </h2>
                <p className="text-sm text-violet-300">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{member.bio}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <h2 className="mt-16 font-display text-2xl font-bold text-white sm:text-3xl">Timeline</h2>
        </FadeIn>
        <div className="relative mt-8 space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-violet-500 before:to-cyan-400 sm:before:left-1/2 sm:before:-translate-x-px">
          {timeline.map((item, i) => (
            <FadeIn key={item.year} delay={i * 0.05}>
              <div
                className={`relative grid gap-4 sm:grid-cols-2 ${
                  i % 2 === 0 ? '' : 'sm:[&>*:first-child]:order-2'
                }`}
              >
                <div
                  className={`pl-10 sm:pl-0 ${i % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}
                >
                  <p className="font-display text-sm font-semibold text-violet-300">{item.year}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.text}</p>
                </div>
                <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-2 border-violet-400 bg-[var(--surface)] sm:left-1/2 sm:-translate-x-1/2" />
                <div />
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
