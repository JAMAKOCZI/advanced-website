# Aether — Advanced Website

Skomplikowana, multi-page strona produktowa (demo / playground) zbudowana jako nowoczesny frontend.

**Repo:** [github.com/JAMAKOCZI/advanced-website](https://github.com/JAMAKOCZI/advanced-website)

## Co jest w środku

| Obszar | Opis |
|--------|------|
| **Start** | Hero z 3D tilt, live mock dashboard, animated stats, FAQ, CTA |
| **Funkcje** | 6 feature cards + adoption bars |
| **Dashboard** | KPI, AreaChart, PieChart, BarChart (Recharts), activity feed |
| **Portfolio** | Filtry kategorii + live search |
| **Blog** | Lista + dynamiczne artykuły (`/blog/:slug`) |
| **Cennik** | Toggle miesięcznie / rocznie, 3 plany |
| **O nas** | Team grid + timeline |
| **Kontakt** | Formularz z walidacją i success state |
| **404** | Dedykowana strona błędu |

Dodatkowo: sticky nav + mobile drawer, dark/light toggle, scroll progress, glassmorphism, Framer Motion, design tokens Tailwind v4.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router 7
- Framer Motion
- Recharts
- Lucide icons

## Uruchomienie

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
npm run preview
```

## Struktura

```
src/
  components/   # Layout, Navbar, Footer, UI primitives
  data/         # Content (projects, posts, pricing…)
  hooks/        # Theme provider
  pages/        # Route pages
  lib/          # utils
```

## Licencja

MIT
