import { useState } from 'react'
import { faq } from '../../data/content'

type FaqAccordionProps = {
  items?: typeof faq
  /** Limit number of items shown (default: all) */
  limit?: number
  defaultOpen?: number | null
}

export function FaqAccordion({
  items = faq,
  limit,
  defaultOpen = 0,
}: FaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(defaultOpen)
  const list = limit != null ? items.slice(0, limit) : items

  return (
    <div className="space-y-3">
      {list.map((item, i) => {
        const open = openFaq === i
        const panelId = `faq-panel-${i}`
        const buttonId = `faq-button-${i}`
        return (
          <div
            key={item.q}
            className="glass rounded-2xl transition hover:border-violet-400/30"
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenFaq(open ? null : i)}
              className="w-full p-5 text-left"
              aria-expanded={open}
              aria-controls={panelId}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-semibold text-white">{item.q}</p>
                <span className="text-slate-400" aria-hidden>
                  {open ? '−' : '+'}
                </span>
              </div>
            </button>
            {open ? (
              <p
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 text-sm leading-relaxed text-slate-400"
              >
                {item.a}
              </p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
