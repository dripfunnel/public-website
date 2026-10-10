# SEO (Search Engine Optimization)

> Requirements document. No code is written at this stage.
>
> Goal: the website is easy for Google and other search engines to find, read and rank, for each of the three countries (United States, India, United Arab Emirates), in English. Pages must also share well when a link is posted on social media or in chat.

## 1. Starting point (what the original file has)

The original design file is a prototype and has almost no SEO setup:

| Item | In the original |
|------|-----------------|
| Page titles and descriptions | None. Every page has the same (empty) title. |
| Real addresses | No. Pages use `#/pricing` style addresses that search engines treat as one page. |
| Social sharing tags | None |
| Sitemap, robots file | None |
| Language tags | None |
| Favicons | Yes. Light and dark versions and an Apple icon. |
| Headings | Pages use heading levels, with a main heading (h1) on pages. Needs checking page by page. |

So all SEO items below are **new work**, not copied from the original. The visible design stays exactly the same.

## 2. Requirements

### 2.1 Pages must be readable by search engines

- Every page is built ahead of time (SSG) as full HTML, so search engines see the real content without running scripts.
- Every page has its own real address (see [pages-and-navigation.md](pages-and-navigation.md)).
- Content must **not** depend on location detection or on the visitor's currency choice to appear. Each address always returns its own country's page, with that country's own currency.
- Text that matters for search must be real text, not text inside images.

### 2.2 Page title, description and address

Every page has:

- A unique **title** (pattern: `Page name | DripFunnel`, about 50–60 characters).
- A unique **description** (about 140–160 characters).
- A **canonical address** (the one official address of the page).
- **Exactly one main heading (h1)**, with sub-headings (h2, h3) in order.

Blog and help articles take their title from the article title and their description from the opening text of the article.

### 2.3 Countries (English only)

- There is one language, English. Each country has its own set of pages and its own address (`/us/`, `/in/`, `/ae/`), so each is indexed on its own (see [pages-and-navigation.md](pages-and-navigation.md)).
- Every page tells search engines about the same page in the other countries using **alternate links (hreflang)**: `en-US`, `en-IN` and `en-AE`, plus a default (India).
- The page declares its language as English.
- Because the three countries share most of their wording, each country page has its **own canonical address** (it points to itself) and the alternate links tell search engines they are country versions of one page, not duplicates. Titles and descriptions may be adjusted per country (for example naming the currency).
- **Currency is not part of the address.** Each country page shows that country's own currency by default; this is what search engines see. A visitor can change the currency in the footer, and it only changes the display in the browser.

### 2.4 Automatic detection must not hurt SEO

The owner wants the country (and so the currency) detected from the visitor's location. To keep this safe for SEO:

- **Search-engine crawlers are never redirected** based on location. Each address always returns its own country's page.
- On the bare address `/`, a real visitor is sent to their own country (or India by default). Crawlers get a tiny non-indexed page that forwards to India (`/in/`) with a plain HTML redirect and a canonical link to `/in/`. There is no "choose your country" page.
- A visitor's own choice (country or currency selector) always wins and is remembered.
- **Decided:** the site does **not** redirect automatically from a country page. For a visitor whose detected country differs from the page, a small banner **suggests** their own country (for example "View the United Arab Emirates site?"). The visitor decides.

### 2.5 Sitemap and robots

- An automatic **sitemap** listing all pages in every country, with their country alternates. It includes the blog and help articles.
- A **robots file** that allows search engines to read the site and points to the sitemap.
- **Test (staging) sites are blocked from search engines.** Only the live site can be indexed. (Links to [deployment.md](deployment.md).)
- Do not index: the "Page not found" page, which must return a real "not found" status.

### 2.6 Sharing previews (Open Graph and Twitter/X cards)

Each page has a title, description and a preview image used when the link is shared on LinkedIn, WhatsApp, X, Slack and similar. A default share image is needed, with optional per-page images for the home page and blog posts. See open question 2.

### 2.7 Structured data (helps search results look richer)

| Where | Type |
|-------|------|
| Whole site | Organization (DripFunnel, a Softobotics company) and WebSite |
| Pages with breadcrumbs (blog and help articles) | Breadcrumb |
| Blog articles | Article (title, date, author) |
| Pricing page | Product/Offer details for the plans, with prices (see open question 3) |
| Pricing FAQ | FAQ (Google shows these results only for some sites, so this is a small bonus) |

Structured data must match what the visitor actually sees on the page.

### 2.8 Page content quality

- Descriptive link text (not "click here").
- Every image has a short description (alt text). Decorative images have an empty description.
- Readable address words (English words, lowercase, with hyphens).
- Internal links between related pages (for example blog articles to help articles and to Pricing).
- Same-address rules: one version only (with or without `www`, with or without a trailing slash, HTTPS only), and the others redirect to it.

### 2.9 Speed counts as SEO

Search engines measure how fast and stable a page feels (Core Web Vitals). Target for the **"good"** range on mobile:

| Measure | Target |
|---------|--------|
| Main content visible (LCP) | 2.5 seconds or less |
| Response to a tap or click (INP) | 200 milliseconds or less |
| Layout does not jump (CLS) | 0.1 or less |

Rules that support this: fonts served from the website (already decided), images sized and compressed, the hero animation must not delay the main content, and no unnecessary scripts. The full list will go into a separate performance document.

### 2.10 Setup after launch

- Register the website in **Google Search Console** and **Bing Webmaster Tools**, and submit the sitemap. This needs the domain (not decided yet).
- Check the site with a crawler tool before launch (broken links, missing titles, duplicate pages).

## 3. Draft titles and descriptions (English)

These are drafts written from the content of the original file, **for the owner to approve or rewrite**. Each country can later get its own wording.

| Page | Draft title | Draft description |
|------|-------------|-------------------|
| Home | DripFunnel: Describe your shop, AI builds your store | Tell us what you sell and AI designs your homepage, pages, menus and product pages. Nothing goes live until you approve it. Start free. |
| Features | Features \| DripFunnel | Catalogue, orders and shipping, payments and tax, suppliers and selling abroad, all in one portal. |
| AI Builder | AI Store Builder \| DripFunnel | Describe a change in plain words, preview it on desktop, tablet and phone, then approve and publish. Undo any time. |
| Pricing | Pricing \| DripFunnel | See plans and prices in your currency. Starter is free forever, and paid plans start with a 10-day trial. |
| Partners | Partners \| DripFunnel | Run shops for clients under your own brand. Talk to us about the DripFunnel partner programme. |
| Blog | Blog \| DripFunnel | Guides for running and growing an online shop. |
| Help centre | Help Centre \| DripFunnel | How-to articles and support for running your DripFunnel shop. |
| Contact and demo | Contact and Book a Demo \| DripFunnel | Talk to sales, book a demo, become a partner or get support. |
| Terms of Service | Terms of Service \| DripFunnel | The agreement between you and DripFunnel when you use DripFunnel to run an online shop. |
| Privacy Policy | Privacy Policy \| DripFunnel | What personal data DripFunnel collects, why, and the choices you have. |

## Decisions

- Real addresses per page and country; all SEO tags are new work.
- Search engines always receive the page of the address they asked for, with no location-based redirects for crawlers.
- Currency is not part of the address.
- Alternate links (hreflang) for the three countries on every page.
- Staging sites are hidden from search engines.
- Core Web Vitals "good" targets as listed above.
- **No automatic redirect from a country page.** A banner suggests the detected country instead.
- **One address per country** (`/us/`, `/in/`, `/ae/`), all in English.

## Open Questions

1. **Titles and descriptions:** are the drafts above acceptable, or should the owner supply the wording?
2. **Share image:** a default preview image (about 1200 × 630) is needed. Will the owner supply one, or should the logo on a brand-color background be used?
3. **Prices in search results:** structured data would show one currency per page. Show the country's own currency, or leave prices out of structured data?
4. **Company details:** for the Organization data, what are the company's official name, address, and social media profile links?
5. **Domain:** needed for the sitemap, canonical addresses and Search Console. (Already pending in [deployment.md](deployment.md).)
