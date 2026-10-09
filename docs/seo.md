# SEO (Search Engine Optimization)

> Requirements document. No code is written at this stage.
>
> Goal: the website is easy for Google and other search engines to find, read and rank, in both English and Arabic. Pages must also share well when a link is posted on social media or in chat.

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
- Content must **not** depend on location detection or on the visitor's currency choice to appear. Each region address always serves the same page, with that region's currency, to search engines.
- Text that matters for search must be real text, not text inside images.

### 2.2 Page title, description and address

Every page has:

- A unique **title** (pattern: `Page name | DripFunnel`, about 50–60 characters).
- A unique **description** (about 140–160 characters).
- A **canonical address** (the one official address of the page).
- **Exactly one main heading (h1)**, with sub-headings (h2, h3) in order.

Blog and help articles take their title from the article title and their description from the opening text of the article.

### 2.3 Languages (English and Arabic)

- Each region has its own address (`/in/`, `/us/`, `/ae/`, decided by the owner), so each is indexed on its own. Arabic adds `/ar` after the region and exists for the UAE only (see [pages-and-navigation.md](pages-and-navigation.md) section 6), so there are four versions of each page.
- Every page tells search engines about its other region and language versions using **alternate links (hreflang)**: English for India, the US and the UAE (`en-IN`, `en-US`, `en-AE`), Arabic for the UAE (`ar-AE`), plus a default (`x-default` points to `/in/`).
- The page itself declares its language, and for Arabic its right-to-left direction.
- Titles, descriptions and headings are translated. They are not copied from English.
- **Region is part of the address; currency follows the region.** `/in/` shows INR, `/us/` USD and `/ae/` AED by default. The three English versions are near copies, so each page needs a **canonical address** (its own) and hreflang links between them so search engines do not treat them as duplicates. (Replaces the earlier decision of one English address for all regions.)

### 2.4 Automatic detection must not hurt SEO

The owner wants language and currency detected from the visitor's location. To keep this safe for SEO:

- **Search-engine crawlers are never redirected** based on location. They always see the default page for the address they asked for.
- Location detection chooses the **currency** (shown on the page) and, on a visitor's first visit to the home address, can suggest or switch the **language**.
- A visitor's own choice (language or currency selector) always wins and is remembered.
- **Decided:** the site does **not** redirect automatically. For a first-time visitor whose detected language differs from the page, a small banner **suggests** the other language (for example "View this page in Arabic?"). The visitor decides.

### 2.5 Sitemap and robots

- An automatic **sitemap** listing all pages in every language, with their language alternates. It includes the blog and help articles.
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
- Every image has a short description (alt text), translated for Arabic. Decorative images have an empty description.
- Readable address words (English words, lowercase, with hyphens). Article and page addresses stay in English letters also on Arabic pages (decided).
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

These are drafts written from the content of the original file, **for the owner to approve or rewrite**. Arabic versions come with the translations.

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

- Real addresses per page and language; all SEO tags are new work.
- Search engines are never redirected by location. The bare address always sends crawlers to `/in/`. Each region address serves its own version to everyone.
- Region is part of the address (`/in/`, `/us/`, `/ae/`); the domain is `www.dripfunnel.com`.
- Alternate links (hreflang) between the region and language versions on every page.
- Staging sites are hidden from search engines.
- Core Web Vitals "good" targets as listed above.
- **No automatic language redirect.** A banner suggests the detected language instead. (Owner answered "yes" to the recommended option.)
- **Addresses stay in English letters** on Arabic pages.

## Built (what is in place)

- Every page has its own title, description, canonical address, alternate links (hreflang) for India, US, UAE English and UAE Arabic, plus `x-default` (India), and Open Graph / Twitter tags.
- `sitemap.xml` lists every page in every region and language with the alternates; `robots.txt` allows search engines on the live site and blocks everything when `NEXT_PUBLIC_SITE_ENV` is not `production` (test sites).
- Structured data: Home has Organization and WebSite; Pricing has FAQPage and Product/Offer; blog articles have Article and Breadcrumb; help articles have Breadcrumb.
- **Unfinished articles** (5 of 6 blog articles, 18 of 24 help articles) are `noindex` until they have real content.
- "Page not found" is a real 404 with `noindex`.
- Every page has exactly one `h1`, and pages are checked by `scripts/check-pages.mjs` (titles, descriptions, canonical, language and direction, alt text).
- **Share preview image:** until the owner supplies a 1200 x 630 image, the square DripFunnel icon (512 x 512) is used for all pages.
- The Organization data has only the name and parent company. Official company name, address and social profiles are still needed (open question 4).

## Open Questions

1. **Titles and descriptions:** are the drafts above acceptable, or should the owner supply the wording?
2. **Share image:** a default preview image (about 1200 × 630) is needed. Will the owner supply one, or should the logo on a brand-color background be used?
3. ~~Prices in search results~~ **Answered while building:** each region's Pricing page has Product/Offer data in **its own currency**, with the monthly price shown in the default Yearly view, exactly as visible. Partner (price "Custom") has no offer.
4. **Company details:** for the Organization data, what are the company's official name, address, and social media profile links?
5. **Domain:** decided: `www.dripfunnel.com`. Search Console and Bing still need to be set up after launch.
