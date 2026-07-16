import { CheckCircle2, Send } from 'lucide-react'
import {
  cloneElement,
  isValidElement,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import {
  Button,
  Card,
  Container,
  FadeIn,
  Input,
  PageHeader,
  Section,
  Textarea,
} from '../components/ui'

type FormState = {
  name: string
  email: string
  company: string
  budget: string
  message: string
}

const empty: FormState = {
  name: '',
  email: '',
  company: '',
  budget: '',
  message: '',
}

export function ContactPage() {
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function validate(values: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (values.name.trim().length < 2) next.name = 'Podaj imię (min. 2 znaki).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Niepoprawny e-mail.'
    if (values.message.trim().length < 10) next.message = 'Wiadomość min. 10 znaków.'
    return next
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate(form)
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
      el?.focus()
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
    setForm(empty)
  }

  return (
    <Section>
      <Container>
        <PageHeader
          eyebrow="Kontakt"
          title="Opowiedz o projekcie"
          description="Formularz z walidacją po stronie klienta. W demo nie wysyła nic na serwer — pokazuje success state."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <FadeIn className="lg:col-span-3">
            <Card hover={false}>
              {sent ? (
                <div className="flex flex-col items-start gap-3 py-8" role="status">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  <h2 className="font-display text-2xl font-semibold text-white">
                    Wiadomość przyjęta (demo)
                  </h2>
                  <p className="max-w-md text-slate-400">
                    W produkcji podłączysz endpoint API / Formspree / Resend. Tutaj symulujemy
                    sukces po walidacji.
                  </p>
                  <Button variant="secondary" onClick={() => setSent(false)}>
                    Wyślij kolejną
                  </Button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Imię i nazwisko" error={errors.name}>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Anna Kowalska"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="E-mail" error={errors.email}>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="anna@firma.pl"
                        autoComplete="email"
                      />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Firma (opcjonalnie)">
                      <Input
                        name="company"
                        value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        placeholder="Acme Sp. z o.o."
                      />
                    </Field>
                    <Field label="Budżet">
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                        className="h-11 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-slate-100 outline-none focus:border-violet-400/60"
                      >
                        <option value="">Wybierz zakres</option>
                        <option value="<20k">&lt; 20k PLN</option>
                        <option value="20-80k">20–80k PLN</option>
                        <option value="80-200k">80–200k PLN</option>
                        <option value="200k+">200k+ PLN</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Wiadomość" error={errors.message}>
                    <Textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Opisz cele, timeline i stack…"
                    />
                  </Field>
                  <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                    {loading ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </Card>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-2">
            <div className="space-y-4">
              <Card hover={false}>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Response time
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-white">&lt; 24h</p>
                <p className="mt-2 text-sm text-slate-400">
                  W dni robocze odpowiadamy zwykle tego samego dnia (demo copy).
                </p>
              </Card>
              <Card hover={false}>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">HQ</p>
                <p className="mt-2 text-white">Warszawa · Remote-first EU</p>
                <p className="mt-2 text-sm text-slate-400">hello@aether.demo</p>
              </Card>
              <Card hover={false}>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Stack preferowany
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  React / Next, TypeScript, FastAPI / Node, Postgres, Cloudflare, design systems.
                </p>
              </Card>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })
    : children

  return (
    <div className="block">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      {control}
      {error ? (
        <span id={errorId} className="mt-1 block text-xs text-rose-400" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
