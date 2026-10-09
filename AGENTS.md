# DripFunnel Public Website

Instructions for AI coding agents working in this repository.

## Current phase: build

The owner has given the go-ahead to build the website (9 Oct 2026). Requirements are still recorded in [`docs/`](docs/) and the docs still win over code comments. Do not delete files the owner has not asked to delete, and never edit anything in `design/` (reference copy).

See "Code guide" at the end of this file for how the code is organised.

## What this project is

A public marketing website for DripFunnel (a Softobotics company), built with **Next.js**. It is SEO optimized, very fast, statically generated (SSG), mobile-first, multi-language (English default, Arabic) and multi-currency (INR default, USD, AED). It only **shows** prices; no payment, sign-in or checkout happens on it.

## Where things are

| Path | What it holds |
|------|---------------|
| [`docs/overview.md`](docs/overview.md) | Goal, core requirements, decisions, open questions |
| [`docs/deployment.md`](docs/deployment.md) | Hosting (Cloudflare Pages) and environments |
| [`docs/pages-and-navigation.md`](docs/pages-and-navigation.md) | Pages, header, footer, addresses |
| [`docs/design.md`](docs/design.md) | Colors, fonts, spacing, components, themes, assets |
| [`docs/seo.md`](docs/seo.md) | SEO requirements |
| [`docs/build-status.md`](docs/build-status.md) | What is built, how to run it, what still needs the owner |
| [`design/`](design/) | The original design: `DripFunnel Website v2.dc.html`, its `support.js` and `assets/` |

## The original design is the source of truth

The website must match `design/DripFunnel Website v2.dc.html` **exactly**: pages, navigation, header, footer, colors, fonts, spacing, components and light/dark themes. Read values from that file rather than guessing. Where this repo's docs list a deliberate difference (for example AED instead of EUR, a language selector, Arabic right-to-left layout, real addresses instead of `#/` addresses), the docs win.

## Working with the owner

- The owner explains requirements in chat, in plain language. Write them down in the matching file in `docs/`, or create a new file for a new topic.
- Record unclear points as **Open Questions** in the doc, and ask the owner directly when a decision is needed. Do not guess silently.
- Mark choices made by the agent on the owner's instruction as such in the doc (see "Decided by Claude" notes in `docs/design.md`).
- Keep docs short, factual and written for a non-technical reader. When a requirement is answered, move it from Open Questions to Decisions.
- Keep [`docs/overview.md`](docs/overview.md) linking to every other doc.

## Keep the documents up to date (always)

The docs must always match the website. This applies now and after the build starts.

- **Whenever a feature is added, changed or removed, update the matching doc in `docs/` in the same piece of work.** A change is not finished until the doc is updated.
- **Whenever the design changes** (a new version of `design/DripFunnel Website v2.dc.html`, or an owner decision that differs from it), update [`docs/design.md`](docs/design.md) and [`docs/pages-and-navigation.md`](docs/pages-and-navigation.md), and any other doc the change touches (for example `docs/seo.md` for titles, headings or addresses).
- When a doc changes, also check [`docs/overview.md`](docs/overview.md) and the **Decisions** summary below, and keep them consistent.
- When a feature needs a topic that has no doc yet, create a new file in `docs/` and link it from `docs/overview.md` and from the table above.
- If a doc and the website disagree, tell the owner and fix whichever is wrong. Do not leave both as they are.
- At the end of each change, say in the reply which docs were updated.

## Decisions already made (summary)

- Next.js, static generation (SSG). Back end does not exist yet; prices are fixed values per currency, kept in one place.
- Hosting: Cloudflare Pages, with production and test environments. Domain: `www.dripfunnel.com`.
- Regions in the address: `/in/` (India, default), `/us/`, `/ae/`. Each region shows its own currency by default. Arabic exists for the UAE only and adds `/ar` after the region (`/ae/ar/pricing`). The bare domain redirects by location (fallback `/in/`). The header drop-down (after the theme icon) and the footer selector move to the chosen region's address.
- Languages: English (default) and Arabic. No automatic redirect; a banner suggests the detected language.
- Currencies: INR (default), USD, AED. The region decides the currency.
- Fonts: Manrope, Inter, IBM Plex Mono, plus IBM Plex Sans Arabic for Arabic. Served from the website itself.
- Assets in `public/assets/`; reuse the earlier logos and favicons (commit `8945784`).

Check the docs for the current state; they may be newer than this summary.

## Code guide

- Next.js 16 (App Router), JavaScript/JSX, `output: 'export'` (plain static files in `.next` or `$NEXT_DIST_DIR`, see below). **Next.js has breaking changes from older versions: before using a Next.js API, read the matching guide in `node_modules/next/dist/docs/`.**
- Guard browser storage access (`localStorage`) with try/catch.

### How a page is built

| Path | What it does |
|------|--------------|
| `app/(en)/[region]/[[...slug]]/page.jsx` | All English pages: `/in/...`, `/us/...`, `/ae/...` |
| `app/(ar)/ae/ar/[[...slug]]/page.jsx` | All Arabic pages (UAE only): `/ae/ar/...`. Right-to-left, Arabic font (`app/(ar)/arabic.css`) |
| `app/(root)/page.jsx` | Bare address `/`: goes to `/in/` (fallback). `functions/index.js` redirects it by country on Cloudflare |
| `components/Shell.jsx` | Header, `<main id="main">`, footer, language banner. Pages render **inside** `<main>` |
| `lib/pages.js` | The list of pages (`PAGES`), static addresses, SEO metadata (title, canonical, hreflang, share tags) |
| `components/pages/*.jsx` | One file per page (see contract below) |
| `lib/site.js` | Regions, languages, `pagePath()` address helper |
| `lib/ctx.js` | `makeCtx(region, locale)`: `t` (translate), `fmt` (price text), `href()`, `content` (region sample shop), `prices`, `cur` |
| `lib/regions.js` | Region sample content (store names, tax wording) and the fixed plan prices (INR, USD, AED) |
| `lib/i18n.js` + `content/ar/*.js` | Arabic dictionaries (English text -> Arabic text) |
| `lib/css.js` | `css("a-b:c;...")` turns an inline-style string from the original into a React style object (left/right become start/end so Arabic mirrors) |
| `app/globals.css` | Theme colors (`:root`, `:root[data-theme="dark"]`), fonts, shared classes (`df-h-link`, `df-wide`, ...) |
| `scripts/serve.mjs`, `scripts/shot.mjs` | Preview a build, take screenshots of the original and the new page to compare |

### Page contract (`components/pages/<Name>.jsx`)

```js
export default function Page({ ctx, rest }) { ... }   // server component. `rest` = address parts after the page, e.g. ['article-id']. Call notFound() (next/navigation) if invalid.
export function meta({ ctx, rest }) { return { title, description } }  // translated, e.g. title `${t('Pricing')} | DripFunnel`
export function paths() { return [[], ['article-id'], ...] }           // optional: which `rest` values exist (default [[]])
```

Rules for page code:

1. **Match the original exactly.** The source is the template in `design/DripFunnel Website v2.dc.html` (template lines ~8-656 and the script lines ~657-938, which hold the data). Copy styles, sizes and markup value for value. `style="..."` strings become `style={css('...')}` (import from `@/lib/css`) or a plain style object. Only the differences listed in `docs/` apply.
2. **Server components by default** (fast, no JavaScript sent). Only the interactive parts become small client components (`'use client'`), placed in `components/<page>/`. Pass them plain data (strings, numbers, arrays) only: **no functions** (`t`, `fmt`, `href`) as props. Format prices and translate on the server first.
3. **Static HTML must contain the real content** for search engines (default state: first tab, empty filters, "All"). Client islands only change what is shown afterwards.
4. **Responsive without JavaScript.** The original switches layouts with JavaScript (`wide`, `narrow`, `s.w`, `device`). Replace these with CSS: put the rules in a CSS file for the page (e.g. `styles/pricing.css`, imported by the page component, class names prefixed `df-<page>-`) using `@media` queries (header uses 980px; below that is the mobile layout). Do not build phone-frame preview logic from the "Prototype controls" bar: it is not part of the website.
5. **Hover** (`style-hover` in the original) becomes a CSS class with `:hover` and `!important` (the base look is inline). Shared ones are in `app/globals.css`.
6. **Currency:** the region decides it (`ctx.cur`). Use `ctx.fmt(number)` for every price. `ctx.content` replaces the original's `R` (store name, tax, couriers...). `ctx.prices` replaces `PT`. The original's EUR/Germany content is replaced by AED/UAE (data in `lib/regions.js`).
7. **Text:** every visible English text is wrapped in `ctx.t('English text')`; with variables `ctx.t('Hello {name}', { name })`. The argument must be a plain string (or a string from a data list passed to `t` at render). Never build a string with `+` or a template literal and then translate it. Then add the Arabic for every new text to your file in `content/ar/` (`'English text': 'Arabic text'`). Arabic is a first draft for a native speaker to review: natural modern standard Arabic, keep brand and product names (DripFunnel, Shopify, Stripe...) in Latin letters, keep digits 0-9, keep `{placeholders}` unchanged. To list missing Arabic: delete `.i18n-missing-<yourname>.txt`, run `I18N_REPORT=.i18n-missing-<yourname>.txt NEXT_DIST_DIR=.next-<yourname> npm run build`, then read that file (one JSON string per line; it is appended to on every build).
8. **Right-to-left:** use logical CSS (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `text-align:start`; `css()` converts left/right automatically). Arrows and chevrons that show direction get `className="df-flip"`. Do not use `letter-spacing` tricks for Arabic (already neutralised). Check the page also at `/ae/ar/...`.
9. **Links:** internal links use `Link` from `next/link` with `ctx.href('pricing')`, `ctx.href('contact/demo')` etc. "Sign in" / "Start free" use `ctx.storeUrl`.
10. **Accessibility** as in the original and `docs/design.md`: one `h1` per page, ordered headings, 44px tap targets, visible focus, `aria-*` from the original, alt text on meaningful images (translated), `aria-hidden` on decoration.
11. **Speed:** no images except the logos/assets in `public/assets`; SVG inline; no extra libraries; the hero animation must not delay content (it is CSS only).
12. Browser storage (`localStorage`) only inside try/catch.

### Building and checking

- Build: `npm run build`. To keep several builds from clashing, always set your own folder: `NEXT_DIST_DIR=.next-<yourname> npm run build` (the finished static site is then in `.next-<yourname>/`). Preview: `node scripts/serve.mjs .next-<yourname> <port>`.
- Screenshots (needs internet for the original): `node scripts/shot.mjs orig pricing out.png --w 1280 --theme light --cur INR` and `node scripts/shot.mjs new http://localhost:<port>/in/pricing/ out2.png --w 1280 --theme light`. Use `--w 390` for mobile, `--theme dark`, `--cur USD`. `--click "css selector"` clicks something first. Compare the two images.
- `.i18n-missing*.txt` and `.next-*` are scratch and ignored by git.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
