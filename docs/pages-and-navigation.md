# Pages, Navigation, Header and Footer

> Requirements document. No code is written at this stage.
>
> **Rule from the owner:** the pages, navigation, header and footer must be **exactly the same as the original design file** (`DripFunnel Website v2.dc.html`). Nothing is added or removed unless the owner says so. This document lists what that file contains.

## 1. Pages

The original file has **10 pages** plus two kinds of detail pages.

| # | Page | Original address | Resources menu? | Notes |
|---|------|------------------|-----------------|-------|
| 1 | Home | `#/` | No | Landing page with hero, "Describe your shop" box, merchants strip, features, pricing teaser. |
| 2 | Features | `#/features` | No | Feature groups (Storefront and AI, Catalogue, Orders and shipping, Payments and tax, Suppliers, Plans and billing, and more). |
| 3 | AI Builder | `#/ai` | No | |
| 4 | Pricing | `#/pricing` | No | Plans, comparison table, FAQs. Prices change with the selected currency. |
| 5 | Partners | `#/partners` | No | |
| 6 | Blog | `#/blog` | Yes | List with category filter and search. |
| 7 | Help centre | `#/help` | Yes | Categories and search. |
| 8 | Contact and demo | `#/contact` | Yes | One form with four topics (see below). |
| 9 | Terms of Service | `#/terms` | No | Legal. In the footer only. |
| 10 | Privacy Policy | `#/privacy` | No | Legal. In the footer only. |

### Detail pages

- **Blog article** (`#/blog/<article>`): breadcrumb "Blog / category", title, date, reading time and body. The original has **6 articles**:
  1. How to describe your shop so the AI gets it right (Storefront and AI)
  2. Selling into Europe: VAT, duties and what shoppers see at checkout (Selling abroad)
  3. Abandoned-cart reminders: when to send them and what to say (Offers)
  4. Moving from Shopify: what comes across and what to check (Guides)
  5. Size charts that answer the question before it's asked (Catalogue)
  6. Letting suppliers add products without losing control (Suppliers)
- **Help article** (`#/help/<article>`): breadcrumb "Help centre / category", steps, and a "Was this helpful?" control. The original has **8 categories with 3 articles each (24 articles)**:

  | Category | Articles |
  |----------|----------|
  | Getting started | Set up your store in your first 10 minutes · Go live: what to check before you share your shop · How the 10-day trial works |
  | Catalogue | Add a product with sizes and colours · Import products from a spreadsheet · Bring your products from Shopify |
  | Orders and shipping | Ship an order and add tracking · Refund all or part of an order · Print invoices, packing slips and labels |
  | Payments and tax | Connect a payment method · How tax is worked out in each country · Offer cash on delivery |
  | Storefront and AI | Describe a change to your storefront · Go back to an earlier version · Connect your own AI key |
  | Selling abroad | Add a market · Set prices per currency · Charge duties at checkout |
  | Team and suppliers | Invite staff and choose their role · Invite a supplier · Turn on approval for supplier products |
  | Billing and plans | Change your plan · Download your invoices · Cancel your subscription |

  In the original, only some articles have a full body written. The rest show a placeholder. See open question 3.
- **Contact topics** (`#/contact/<topic>`): Book a demo (`demo`), Sales question (`sales`), Partners (`partners`), Support (`support`). The topic is chosen by the link used to reach the page and can be changed on the form.

## 2. Header

Sticky at the top of every page. Shown on wide screens:

| Position | Item |
|----------|------|
| Left | DripFunnel logo (links to Home). A light version and a dark version are used for the light and dark themes. |
| Centre | **Home · Features · AI Builder · Pricing · Partners · Resources ▾** |
| Right | Theme toggle (light / dark) · **Region and language drop-down (new, not in the original)** · **Sign in** · **Start free** |

- **Decision (owner, 9 Oct 2026):** a **region drop-down sits right after the theme toggle** in the header, so visitors can choose their region from any page and there is no separate "choose your region" page. On mobile it also sits next to the theme toggle, beside the menu button.
  - **Look:** a small button with the flag and the region code (`IN`, `US`, `AE`) and an arrow. It opens a list: **India (INR)**, **United States (USD)**, **United Arab Emirates (AED)** with a flag for each; the current one is highlighted in orange.
  - **Choosing a region** opens the same page in that region (and so its currency). The language stays when the new region has it, otherwise English.
  - **In the UAE** the list also has a **Language** part with **English** and **العربية**. On India and US pages there is no language part (only English exists there).
  - Esc or a click outside closes it. The links are always in the page (hidden while closed), so search engines and visitors without scripts can still follow them.

- **Resources ▾** opens a dropdown with three items, each with a short description:
  - **Blog**: "Guides for running and growing a shop"
  - **Help centre**: "How-to articles and support"
  - **Contact and demo**: "Talk to sales or book a demo"
- The current page is marked with an orange underline. "Resources" is underlined when on Blog, Help centre or Contact.
- **Sign in** (plain link) and **Start free** (outlined button) go to the DripFunnel store/portal. This website does not handle sign-in or sign-up itself.
- Pressing Esc or clicking outside closes the Resources dropdown.
- A "Skip to content" link exists for keyboard users.

**On narrow (mobile) screens:**

- Logo on the left; theme toggle and a **menu button (☰)** on the right.
- The menu opens as a vertical list: **Home, Features, AI Builder, Pricing, Partners, Blog, Help centre, Contact and demo** (Resources items are shown directly, not in a dropdown), then two buttons side by side: **Sign in** and **Start free**.

## 3. Footer

Dark navy band at the bottom of every page.

- **Brand column:**
  - DripFunnel logo (inverse version).
  - Text: "Describe your business and AI builds your whole store. Then run catalogue, orders, offers, suppliers and selling abroad from one portal."
  - **"Show prices in"** selector. **Decision:** it stays in the footer only, as in the original (not added to the header). It now lists the three regions (India INR, United States USD, UAE AED) and moves the visitor to that region's address (section 6).
  - **Language selector (new, not in the original):** placed **beside the region selector**, on UAE pages only.
- **Link columns:**

  | Product | Resources | Company | Legal |
  |---------|-----------|---------|-------|
  | Features | Blog | Book a demo | Terms of Service |
  | AI Builder | Help centre | Talk to sales | Privacy Policy |
  | Pricing | Contact support | Become a partner | |
  | Partners | | | |

  Links go to: Book a demo → `contact/demo`, Talk to sales → `contact/sales`, Become a partner → `contact/partners`, Contact support → `contact/support`.
- **Bottom bar:** "© 2026 DripFunnel. A Softobotics company." and a theme button ("Switch to dark mode" / "Switch to light mode").

## 4. Not part of the website

The original file has a dark **"Prototype controls"** bar at the top (device size, currency and theme pickers). It exists only to preview the prototype. It is **not** part of the real website.

## 5. Differences between the original file and the decisions already made

These need a decision so the build stays "exactly the same" without conflicting with earlier requirements.

| Topic | Original file | Decision already made | What changes |
|-------|---------------|----------------------|--------------|
| Currencies | USD, EUR, INR | USD, INR, AED at launch | EUR is replaced by AED in the selector. Original regional example content (Germany, EUR) would need an equivalent for the UAE. |
| Language | English only, no language selector | English and Arabic (Arabic for the UAE only), switchable (section 6) | A region and language drop-down is added in the header (after the theme toggle) and in the footer (beside the currency selector). Arabic needs a mirrored (right-to-left) layout. |
| Addresses | Hash addresses (`#/pricing`) | Real addresses per region (`/in/pricing`, `/us/pricing`, `/ae/pricing`) for SEO | Same pages, new address format (see below). |
| Currency | Chosen in the footer, shown on the same page | The region in the address decides the currency. The footer selector moves to that region's address. | Selector options are India, United States and UAE. |
| Currency detection | Detected from the browser language | Detected from the visitor's location, only for the bare address | Detection method changes. |

## 6. Addresses (region in the address; partly decided)

**Decided by the owner:** the domain is `www.dripfunnel.com` and each launch region has its own address:

| Region | Address |
|--------|---------|
| India | `https://www.dripfunnel.com/in/` |
| United States | `https://www.dripfunnel.com/us/` |
| United Arab Emirates | `https://www.dripfunnel.com/ae/` |

Every page sits under its region. Same pages, region first:

| Page | India | United States | UAE |
|------|-------|---------------|-----|
| Home | `/in/` | `/us/` | `/ae/` |
| Features | `/in/features` | `/us/features` | `/ae/features` |
| AI Builder | `/in/ai` | `/us/ai` | `/ae/ai` |
| Pricing | `/in/pricing` | `/us/pricing` | `/ae/pricing` |
| Partners | `/in/partners` | `/us/partners` | `/ae/partners` |
| Blog / article | `/in/blog` · `/in/blog/<article>` | same under `/us/` | same under `/ae/` |
| Help centre / article | `/in/help` · `/in/help/<article>` | same under `/us/` | same under `/ae/` |
| Contact | `/in/contact` · `/in/contact/demo` · `/in/contact/sales` · `/in/contact/partners` · `/in/contact/support` | same under `/us/` | same under `/ae/` |
| Terms / Privacy | `/in/terms` · `/in/privacy` | same under `/us/` | same under `/ae/` |

Each region's pages show that region's currency by default (India INR, US USD, UAE AED). This replaces the earlier idea of one address for all regions with the currency not in the address (see [seo.md](seo.md)).

### Arabic (corrected by the owner: UAE only)

Arabic is available **only for the UAE**. India and the United States are English only. English has no extra part in the address. Arabic adds `/ar` after the region:

| | English | Arabic |
|---|---------|--------|
| India | `/in/pricing` | not available |
| United States | `/us/pricing` | not available |
| UAE | `/ae/pricing` | `/ae/ar/pricing` |

That is **four versions** of every page (India English, US English, UAE English, UAE Arabic). Article and page names stay in English letters, also on Arabic pages.

(Earlier in this project Claude wrote "Arabic under every region". The owner said this should not happen, so it was removed.)

### Language selector

- On UAE pages the visitor can switch between English and Arabic in the **header drop-down** (and in the footer). It stays on the same page: `/ae/pricing` becomes `/ae/ar/pricing` and back.
- **Decided by Claude (owner to confirm):** on India and US pages, where only English exists, there is no language part in the menu and no language selector in the footer, because there would be a single choice.

### Region (currency) selector in the footer

- Same place and label as the original currency selector ("Show prices in"). It lists the three regions with their currency: **India (INR)**, **United States (USD)**, **United Arab Emirates (AED)**.
- **Decided by the owner:** choosing one **moves the visitor to that region's address**. The visitor stays on the same page. The language stays the same when the new region has it. For example, on `/ae/ar/pricing` choosing India goes to `/in/pricing`, because Arabic exists only for the UAE.
- The currency is therefore always the one of the region in the address. There is no separate currency setting.

### The bare address `https://www.dripfunnel.com/` (decided by the owner)

- Visitors are **sent to a region by their location**: India to `/in/`, United States to `/us/`, UAE to `/ae/`.
- Visitors from any other country are sent to **`/in/`** (the fallback).
- **Search-engine crawlers are always sent to `/in/`**, never by location (see [seo.md](seo.md)).
- Only the bare address redirects. A page address like `/us/pricing` is never redirected by location; visitors can always open any region.
- Pages are served from Cloudflare, which tells the website the visitor's country (see [deployment.md](deployment.md)).
- **No "choose your region" page** (owner, 9 Oct 2026): visitors choose a region from the header drop-down. The page at `/` itself only goes straight to `/in/` when the country redirect is not available (for example when the built site is opened on a computer without Cloudflare). It is hidden from search engines.

### Other

- Non-`www` address (`dripfunnel.com`): assumed to redirect to `www.dripfunnel.com`.

## Built details (decided while building)

- **Addresses end with a slash**, for example `/in/pricing/`, `/ae/ar/blog/describe-your-shop/`.
- **Page not found:** built. Any unknown address (for example `/in/ar/pricing/`, because Arabic does not exist for India) shows a "Page not found" page with links to the three regions, a real 404 status, and is hidden from search engines.
- **Language suggestion banner:** built. A small bar at the bottom of the screen says "View this page in Arabic?" with "Yes, switch" and "No thanks". It appears only on **English UAE pages** and only when the visitor's **browser language is Arabic**. It never redirects. Dismissing it is remembered in the browser. (Decided by Claude: the owner wanted detection by location; the browser language is used because it works without any server and is more reliable for language. Tell Claude if location should be used instead.)
- **Blog list:** all 6 articles are shown; the topic chips only filter after the page has loaded.
- **Help centre:** search filters the titles after load; the full list of categories is in the page itself.
- **Pricing page currency picker:** the original has a currency picker next to the Monthly / Yearly toggle. It is kept and now works as a region switch: choosing another currency opens the same page in that region.
- **Contact form:** see the open questions below. It checks the fields as the original does, but nothing is sent yet.

## Open Questions

### Decided

- Region and language drop-down: in the header after the theme toggle (owner request), and also in the footer: the "Show prices in" region selector, plus a language selector beside it on UAE pages.
- Region selector: in the footer as in the original, and now also in the header (owner request).
- A proper **"Page not found"** page is added (instead of sending unknown addresses to Home).
- **Unfinished blog and help articles** are shown as in the original (with their placeholder text) but hidden from search engines ("noindex") until real content is written. (Decided by Claude while building; the owner can change it.)
- **EUR / Germany sample content** is replaced by **AED / UAE** sample content on the Home, Features, AI Builder and Pricing pages. The sample UAE shop "Noor Linen House" (Dubai) and its AED amounts are made-up placeholders to be approved.

### Still open

1. **Real blog and help content:** is real content coming, and from whom? The blog article author line still reads "Author name placeholder", as in the original.
2. **Sign in / Start free link:** which address do they go to? Until it is decided the buttons point to `#` (they do nothing). It is one setting (`NEXT_PUBLIC_STORE_URL`, see [deployment.md](deployment.md)).
3. **Contact form:** where should the messages go (email, a form service, the future back end)? Today a visitor sees "Thanks, we'll email you" but **nothing is sent or stored**. Do not launch the Contact page before this is connected, or add a notice.
4. **Leftover Germany / EUR examples:** a few generic examples were kept from the original: the "Selling abroad" markets list (Germany, UK, with a UAE row), the contact form's country list and its example texts. Replace them?
5. **Partner statement example** (Partners page): the original shows fixed US dollar amounts. They are kept in every region. Show local currency instead?
6. **Placeholder boxes on the Home page** (merchant logos and a testimonial): shown as in the original. Hide them until real ones are supplied?
7. **Language selector outside the UAE:** hidden there (decided by Claude, because only English exists). Confirm.
