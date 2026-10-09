# Build Status

> Where the website stands (9 Oct 2026), how to run it, and what still needs the owner.

## What is built

The whole website, in plain terms:

- **All 10 pages** of the original design, plus the 6 blog articles and 24 help articles, the 4 contact topics, and a "Page not found" page.
- **Four versions of every page:** India (`/in/`), United States (`/us/`), UAE in English (`/ae/`) and UAE in Arabic (`/ae/ar/`). In total 176 pages, built ahead of time as static files.
- **Region and currency:** each region shows its own currency (INR, USD, AED). A **drop-down in the header** (after the theme icon) and the footer selector move the visitor to another region on the same page. The bare address `www.dripfunnel.com` sends visitors to a region by location (fallback India; search-engine crawlers always to India).
- **Arabic:** right-to-left layout, IBM Plex Sans Arabic font, language choice in the header menu on UAE pages, a banner suggesting Arabic to Arabic-speaking visitors.
- **Light and dark theme** without a flash on load, remembered in the browser; works even if the browser blocks storage.
- **Fonts served from the website itself.** Logos and icons from the earlier project.
- **SEO:** titles, descriptions, canonical and alternate-language links, sitemap, robots file, share tags, structured data (see [seo.md](seo.md)).
- **Speed:** the home page is about 21 KB of HTML after compression and under 200 KB of JavaScript; most of each page is plain HTML. Only the interactive parts (menus, prompt box, pricing toggle, FAQ, filters, forms) load extra code.

## How it was checked

- Every page was compared with a screenshot of the original design, in light and dark theme, on desktop and phone width (India and US; the original has no UAE version, so UAE was checked for layout only).
- An automatic check visits all 176 pages on desktop and phone width and looks for sideways scrolling, a single main heading, title, description, canonical address, language and direction, alt text and errors. It passes.
- Another automatic check tries the region and language switching, theme (also with blocked storage), the menus and the language banner. It passes.
- The Arabic texts are checked for missing or inconsistent wording (`npm run i18n:check`).

## What still needs the owner

| # | What | Why it matters |
|---|------|----------------|
| 1 | **Contact form sends nothing.** Choose where messages go (email, a form service, the back end). | A visitor sees a "thank you" but we receive nothing. Do not launch the Contact page before this is connected. |
| 2 | **"Sign in" and "Start free" address** (`NEXT_PUBLIC_STORE_URL`). | Until it is set, these buttons do nothing. |
| 3 | **Arabic review by a native speaker** (and a lawyer for the legal pages). | All Arabic is a first draft written by Claude. |
| 4 | **Legal text.** Terms and Privacy still contain the original's bracketed placeholders (company name, address, dates, retention, cookies, and so on) and a yellow "Template text" note. | They would show publicly. |
| 5 | **AED prices and the UAE sample shop** ("Noor Linen House"). | Placeholders (US price x 3.67). Please supply the real prices. |
| 6 | **Placeholder boxes** on the Home page (merchant logos, testimonial) and the blog author line ("Author name placeholder"). | Shown as in the original. |
| 7 | **Real blog and help articles.** 5 of 6 blog articles and 18 of 24 help articles are placeholders (hidden from search engines until written). | Thin content. |
| 8 | **Leftover Germany / EUR examples** in a few generic places, and the **US dollar amounts** in the Partners statement example. | Decide whether to localise. |
| 9 | **Share image** (1200 x 630) and **company details** (official name, address, social profiles). | Better link previews and search results. |
| 10 | **Cloudflare:** account, domain and DNS, the `www` / non-`www` redirect, git hosting, test site access. See [deployment.md](deployment.md). | Needed to go live. |
| 11 | **Confirm Claude's decisions:** no language choice outside the UAE; language banner uses the browser language; unfinished articles hidden from search engines. | Marked "decided by Claude" in the docs. |

## Things to verify on the first real Cloudflare deployment

- The pages open and link prefetching works (file names containing `!` and `$` are used by Next.js for prefetching). If a problem appears, the site still works, only more slowly.
- The bare address redirect (`functions/index.js`) sends by country.
- The test site is hidden from search engines (`NEXT_PUBLIC_SITE_ENV=staging`).

## How to run it (for whoever builds)

| Command | What it does |
|---------|--------------|
| `npm install` | Installs what the site needs (once). |
| `npm run dev` | Opens the site for working on it, at http://localhost:3000/in/ |
| `npm run build` | Builds the final static site into the `out` folder. |
| `npm start` | Shows the built site at http://localhost:3000 (the bare address goes straight to India here; the country redirect works on Cloudflare). |
| `node scripts/check-pages.mjs http://localhost:3000` | Checks every page (needs `npm start` running). |
| `node scripts/check-interactions.mjs http://localhost:3000` | Checks switching, theme and menus. |
| `npm run i18n:check` | Checks the Arabic texts. |
| `node scripts/shot.mjs ...` | Screenshots to compare with the original (see AGENTS.md). |

Where things are in the code: see "Code guide" in [AGENTS.md](../AGENTS.md).
