# Project Structure

> How the website project is organised. Follows the layout of the earlier DripFunnel website (`dripfunnel-pw-main`), adapted to Next.js.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router), fully static (`output: "export"`, SSG) |
| Language of the code | TypeScript |
| Styling | Plain CSS: design tokens in `src/app/globals.css`, component styles in CSS files / inline styles copied from the design |
| Hosting | Cloudflare Pages (static files in `out/`, plus two tiny Pages Functions) |
| Fonts | Self-hosted WOFF2 in `public/fonts/` (Manrope, Inter, IBM Plex Mono) |
| Website language | English only. There is no translation system. |

## Folders

| Path | What it holds |
|------|---------------|
| `src/app/` | Routes. `[country]/` holds every page, so each address starts with `/us/`, `/in/` or `/ae/`. Also the bare `/` page (a small forward to India, no country chooser), the 404 page, `robots.ts` and `sitemap.ts`. |
| `src/components/<page>/` | One folder per page. Each has a shared `...View` component and **one small file per country**: `HomeUs`, `HomeIn`, `HomeAe`, `PricingUs`, and so on. These are the per-country pages. |
| `src/components/chrome/` | Header, footer, country selector, currency selector, theme toggle, country banner. |
| `src/components/seo/` | Structured data (JSON-LD). |
| `src/data/countries/` | **One file per country** (`us.ts`, `in.ts`, `ae.ts`) with everything that can differ by country. `index.ts` lists the countries and currencies. |
| `src/data/*.ts` | Page content (features, blog, help, legal, partners, pricing) and `prices.ts` (all plan prices in one place) and `seo.ts` (titles and descriptions). |
| `src/lib/` | Small helpers: addresses, money format, SEO tags, structured data, constants. |
| `public/` | Static files: logos and favicons (`assets/`), fonts, the default share image (`og/`), `_headers`, `_routes.json`. |
| `functions/` | Cloudflare Pages Functions: `_middleware.js` (sends visitors on `/` to their country), `api/geo.js` (visitor country for the banner), `api/contact.js` (contact form). |
| `design/` | The original design file. Never edit. |
| `docs/` | Requirements (this folder). |

## Countries

- The address is `/<country>/<page>/`. English only.
- Each country has its **own data file** and its **own page components**. At launch they share the same design and wording; only the sample content, currency and prices differ. A country can later get different content by editing its own files.
- **Adding a country:** copy a file in `src/data/countries/`, register it in `index.ts`, add its currency in `index.ts` and `src/data/prices.ts`, copy the `...Us.tsx` files of each page component for the new country and register them in each route file, and add it to `AVAILABLE` in `functions/_middleware.js`.

## Currency

- A country page shows its own currency. The visitor can pick another currency in the footer; it is remembered in the browser and only changes the displayed prices.
- All plan prices are fixed values per currency in `src/data/prices.ts` (never converted with exchange rates).

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local development server |
| `npm run build` | Builds the static site into `out/` |
| `npm run typecheck` | Checks the TypeScript |
| `npm run preview:local` | Builds and serves `out/` with the Cloudflare Pages Functions (needs `wrangler`) |

Environment variables are listed in `.env.example` (site address, production flag, portal address) and `.dev.vars.example` (contact form webhook).

## Notes

- **Contact form:** the page posts to `/api/contact` (a Cloudflare Pages Function) which forwards the message to the webhook in `LEAD_WEBHOOK_URL`. Until a webhook is set, the form shows "We could not send your message. Please email sales@dripfunnel.com." The Book a demo topic address (`/<country>/contact/demo/`) uses the main contact page as its canonical address.
- **Windows builds:** on Windows, `next build` writes the small page-prefetch files in folders instead of dotted file names, so the browser's background prefetch requests return 404 there (links still work, they just load normally). Builds on Cloudflare (Linux) should be checked once for this after the first deployment.
- **Home page, "Local rules" table:** the original design file renders this table empty (its own template is incomplete). The website fills it with the three countries.
