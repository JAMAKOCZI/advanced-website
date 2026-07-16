# Aether — Advanced Website

Skomplikowana, multi-page strona produktowa (demo / playground) zbudowana jako nowoczesny frontend.

**Repo:** [github.com/JAMAKOCZI/advanced-website](https://github.com/JAMAKOCZI/advanced-website)

## Co jest w środku

| Obszar | Opis |
|--------|------|
| **Start** | Hero z 3D tilt, live mock dashboard, animated stats, FAQ, CTA |
| **Funkcje** | 6 feature cards (ikona + opis) |
| **Dashboard** | KPI, dual-axis AreaChart, PieChart, BarChart, activity feed |
| **Portfolio** | Filtry kategorii + live search |
| **Blog** | Lista + dynamiczne artykuły (`/blog/:slug`) |
| **Cennik** | Toggle miesięcznie / rocznie, 3 plany |
| **O nas** | Team grid + timeline |
| **Kontakt** | Formularz z walidacją i success state |
| **404** | Dedykowana strona błędu |

Dodatkowo: sticky nav + mobile drawer (a11y), dark/light theme (FOUC-safe), reduced motion, scroll progress, glassmorphism, Framer Motion, design tokens Tailwind v4.

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

### Podgląd w LAN (telefon / inne urządzenie)

```bash
npm run dev:lan
```

Otwórz `http://<IP-CT>:5173` na urządzeniu w **tej samej sieci**.

> **Bezpieczeństwo:** `dev:lan` i `preview:lan` bindują Vite na `0.0.0.0` — używaj tylko w zaufanej sieci (dom / lab). Na publicznych Wi‑Fi HMR i źródła są widoczne dla innych hostów w LAN.

Build produkcyjny:

```bash
npm run build
npm run preview
# albo: npm run preview:lan
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

## Production headers

Demo ustawia **CSP** w `index.html` (meta tag) tak, aby działał FOUC-safe theme script oraz Google Fonts:

```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self';
base-uri 'self';
frame-ancestors 'none';
object-src 'none'
```

**Uwaga produkcyjna:** `'unsafe-inline'` w `script-src` jest potrzebne dla inline theme scriptu. W produkcji przenieś skrypt do pliku albo użyj **nonce / hash** i usuń `'unsafe-inline'`.

Na CDN / reverse proxy (Nginx, Cloudflare, Vercel headers) dodaj też:

| Header | Wartość (przykład) |
|--------|--------------------|
| `Content-Security-Policy` | jak wyżej (preferuj HTTP header zamiast meta) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `X-Frame-Options` | `DENY` (lub polegaj na `frame-ancestors 'none'`) |

### Google Fonts a prywatność

Ładowanie fontów z `fonts.googleapis.com` / `fonts.gstatic.com` ujawnia IP użytkowników Google. W produkcji rozważ **self-host** (np. `@fontsource`) i zawęż CSP bez domen Google.

### Formularz kontaktowy / Formspree

Demo nie wysyła danych na zewnętrzny endpoint. Gdy podłączysz **Formspree** (lub podobny), użyj publicznego form endpoint ID w froncie — **bez sekretnych kluczy API** w repozytorium. Secrety trzymaj tylko po stronie serwera / CI.

### Zależności

```bash
npm audit
# opcjonalnie: npm audit fix
```

Uruchamiaj okresowo przed release.

## Design tokens (light / brand)

- Semantic utilities: `.text-fg`, `.text-muted`, `.bg-elevated`, `.bg-input`, `.border-subtle`, `.bg-footer` (`--footer-bg`).
- Tekst na brand surfaces (gradient CTA, logo square, avatar na gradientcie): użyj **`.text-on-brand`** albo `[data-on-brand]` — light theme nie remapuje wtedy koloru na foreground.

## Licencja

MIT
