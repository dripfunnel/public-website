# DripFunnel Public Website

Instructions for AI coding agents working in this repository.

## Current phase: building the website

The requirements are written down in [`docs/`](docs/) and the owner has asked for the project to be built. The project follows the structure of the earlier DripFunnel website (`dripfunnel-pw-main`): see [`docs/project-structure.md`](docs/project-structure.md). Things not decided yet are tracked in [`PLACEHOLDERS.md`](PLACEHOLDERS.md).

- Do not delete files the owner has not asked to delete.
- Never edit `design/`.

## What this project is

A public marketing website for DripFunnel (a Softobotics company), built with **Next.js**. It is SEO optimized, very fast, statically generated (SSG), mobile-first, multi-country (United States, India, United Arab Emirates; **English only, no other languages**) and multi-currency (INR default, USD, AED). It only **shows** prices; no payment, sign-in or checkout happens on it.

## Where things are

| Path | What it holds |
|------|---------------|
| [`docs/overview.md`](docs/overview.md) | Goal, core requirements, decisions, open questions |
| [`docs/deployment.md`](docs/deployment.md) | Hosting (Cloudflare Pages) and environments |
| [`docs/pages-and-navigation.md`](docs/pages-and-navigation.md) | Pages, header, footer, addresses |
| [`docs/design.md`](docs/design.md) | Colors, fonts, spacing, components, themes, assets |
| [`docs/seo.md`](docs/seo.md) | SEO requirements |
| [`docs/project-structure.md`](docs/project-structure.md) | Folders, stack, how countries work, commands |
| [`PLACEHOLDERS.md`](PLACEHOLDERS.md) | What is not final and what is needed from the owner |
| [`design/`](design/) | The original design: `DripFunnel Website v2.dc.html`, its `support.js` and `assets/` |

## The original design is the source of truth

The website must match `design/DripFunnel Website v2.dc.html` **exactly**: pages, navigation, header, footer, colors, fonts, spacing, components and light/dark themes. Read values from that file rather than guessing. Where this repo's docs list a deliberate difference (for example AED instead of EUR, a country selector, real addresses instead of `#/` addresses), the docs win.

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
- Hosting: Cloudflare Pages, with production and test environments. Domain not decided yet.
- Language: **English only**. There is **no i18n / translation system**, no Arabic and no right-to-left layout (owner decision, replaces the earlier English + Arabic plan).
- Countries: United States, India (default), United Arab Emirates. The country is the first part of every address: `/us/`, `/in/`, `/ae/`. **Each country has its own page files and its own data file** (like `dripfunnel-pw-main`), so content can differ per country later. No automatic redirect from a country page; a banner suggests the detected country. The bare `/` sends visitors to their country (never crawlers).
- Currencies: INR (default), USD, AED. Detected from location, user can change. Currency is not in the address.
- Fonts: Manrope, Inter, IBM Plex Mono. Served from the website itself.
- Assets in `public/assets/`; reuse the earlier logos and favicons (commit `8945784`).

Check the docs for the current state; they may be newer than this summary.

## Writing code

- This Next.js version has breaking changes from older versions (for example `params` is a Promise). Before using any Next.js API, read the matching guide in `node_modules/next/dist/docs/`.
- Guard browser storage access (`localStorage`) with try/catch.
- Every page exists once per country as its own component (`HomeUs`, `HomeIn`, `HomeAe`, ...) and country content lives in `src/data/countries/<country>.ts`. Do not add a translation system.
- Keep server and first client render identical (apply stored choices in effects, not in initial state).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
