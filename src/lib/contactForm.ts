export type FormState = {
  name: string
  email: string
  company: string
  budget: string
  message: string
}

export const emptyForm: FormState = {
  name: '',
  email: '',
  company: '',
  budget: '',
  message: '',
}

export type FormErrors = Partial<Record<keyof FormState, string>>

export function validateContactForm(values: FormState): FormErrors {
  const next: FormErrors = {}
  if (values.name.trim().length < 2) next.name = 'Podaj imię (min. 2 znaki).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Niepoprawny e-mail.'
  if (values.message.trim().length < 10) next.message = 'Wiadomość min. 10 znaków.'
  return next
}

/** Focus first invalid control via HTMLFormElement.elements.namedItem */
export function focusFormField(form: HTMLFormElement, name: string) {
  const item = form.elements.namedItem(name)
  if (!item) return
  if (item instanceof RadioNodeList) {
    const first = item[0]
    if (first instanceof HTMLElement) first.focus()
    return
  }
  if (item instanceof HTMLElement) item.focus()
}
