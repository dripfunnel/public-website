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
- Content must **not** depend on location detection or on the visitor's currency choice to appear. Search engines always get the default version of a page (English, INR).
- Text that matters for search must be real text, not text inside images.

### 2.2 Page title, description and address

Every page has:

- A unique **title** (pattern: `Page name | DripFunnel`, about 50–60 characters).
- A unique **description** (about 140–160 characters).
- A **canonical address** (the one official address of the page).
- **Exactly one main heading (h1)**, with sub-headings (h2, h3) in order.

Blog and help articles take their title from the article title and their description from the opening text of the article.

### 2.3 Languages (English and Arabic)

- Each language has its own address, so each is indexed on its own (decided earlier; the address format is still pending in [pages-and-navigation.md](pages-and-navigation.md)).
- Every page tells search engines about its other-language version using **alternate-language links (hreflang)** for English and Arabic, plus a default.
- The page itself declares its language, and for Arabic its right-to-left direction.
- Titles, descriptions and headings are translated. They are not copied from English.
- **Currency is not part of the address.** US, India and UAE visitors see the same page address in the same language; only the displayed currency differs. This avoids duplicate pages. Search engines see INR (the default).

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
- Search engines always receive the default version (English, INR), with no location-based redirects for crawlers.
- Currency is not part of the address.
- English and Arabic alternate-language links on every page.
- Staging sites are hidden from search engines.
- Core Web Vitals "good" targets as listed above.
- **No automatic language redirect.** A banner suggests the detected language instead. (Owner answered "yes" to the recommended option.)
- **One English address** for the US, India and UAE. Only the currency changes by region.
- **Addresses stay in English letters** on Arabic pages.

## Open Questions

1. **Titles and descriptions:** are the drafts above acceptable, or should the owner supply the wording?
2. **Share image:** a default preview image (about 1200 × 630) is needed. Will the owner supply one, or should the logo on a brand-color background be used?
3. **Prices in search results:** structured data would show one currency per page. Show only the default (INR) or leave prices out of structured data?
4. **Company details:** for the Organization data, what are the company's official name, address, and social media profile links?
5. **Domain:** needed for the sitemap, canonical addresses and Search Console. (Already pending in [deployment.md](deployment.md).)
