# DripFunnel Public Website

Instructions for AI coding agents working in this repository.

## Current phase: documentation only

**Do not write code yet.** The owner is describing the requirements one topic at a time, and each topic is recorded in a Markdown file in [`docs/`](docs/). Until the owner says the build can start:

- Only create or edit `.md` files (and copy design reference files into `design/`).
- Do not create the Next.js app, `package.json`, components, styles or config files.
- Do not delete files the owner has not asked to delete.

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
- Hosting: Cloudflare Pages, with production and test environments. Domain not decided yet.
- Languages: English (default, no URL prefix proposed) and Arabic. Language in the address. No automatic redirect; a banner suggests the detected language.
- Currencies: INR (default), USD, AED. Detected from location, user can change. Currency is not in the address.
- Fonts: Manrope, Inter, IBM Plex Mono, plus IBM Plex Sans Arabic for Arabic. Served from the website itself.
- Assets in `public/assets/`; reuse the earlier logos and favicons (commit `8945784`).

Check the docs for the current state; they may be newer than this summary.

## When code starts later

- The earlier Next.js version used in this project had breaking changes from older versions. Before using any Next.js API, read the matching guide in `node_modules/next/dist/docs/` after installing.
- Guard browser storage access (`localStorage`) with try/catch.
