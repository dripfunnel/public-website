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
| Right | **Country selector (new, not in the original)** · Theme toggle (light / dark) · **Sign in** · **Start free** |

- **Decision:** the country selector (United States, India, United Arab Emirates) sits **next to the theme toggle** in the header. Choosing a country opens the same page for that country. On mobile it also sits next to the theme toggle, beside the menu button.

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
  - **"Show prices in"** currency selector. **Decision:** the currency selector stays in the footer only, as in the original (not added to the header).
  - **Country selector (new, not in the original):** placed **beside the currency selector**.
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
| Country | One page set, no country selector | English only. One page set **per country**, country in the URL, switchable | A country selector is added in the header (next to the theme toggle) and in the footer (beside the currency selector). No languages, no right-to-left layout. |
| Addresses | Hash addresses (`#/pricing`) | Real addresses per country (`/in/pricing`) for SEO | Same pages, new address format (see below). |
| Currency detection | Detected from the browser language | Detected from the visitor's location, with manual override | Detection method changes. |

## 6. Address format (decided)

The country comes first in every address. There is no language in the address, because there is only one language (English).

| Country | Address start | Default currency |
|---------|---------------|------------------|
| United States | `/us/` | USD |
| India (default country) | `/in/` | INR |
| United Arab Emirates | `/ae/` | AED |

| Page | Address (shown for India) |
|------|---------------------------|
| Home | `/in/` |
| Features | `/in/features/` |
| AI Builder | `/in/ai/` |
| Pricing | `/in/pricing/` |
| Partners | `/in/partners/` |
| Blog / article | `/in/blog/` · `/in/blog/<article>/` |
| Help centre / article | `/in/help/` · `/in/help/<article>/` |
| Contact | `/in/contact/` · `/in/contact/demo/` · `/in/contact/sales/` · `/in/contact/partners/` · `/in/contact/support/` |
| Terms / Privacy | `/in/terms/` · `/in/privacy/` |

For the other countries, `/in/` becomes `/us/` or `/ae/`.

- **The bare address `/`** is not a content page. A visitor is sent to their own country (`/us/`, `/in/` or `/ae/`) from their location, or to India if their country is not one of the three. There is **no "choose your country" page** (owner decision): visitors change country from the header. Search engines and link previews are not redirected by location; they get a tiny, non-indexed page that forwards to India (`/in/`) with a plain HTML redirect. The same page is what shows when running the site locally, where there is no location lookup.
- **Currency is not part of the address.** It starts as the country's own currency and the visitor can change it in the footer. The choice is remembered in the browser.
- **Pages are separate per country.** Each country has its own page files and data file in the project, so any country can later show different wording, offers, prices or sample content without affecting the others. At launch the content is the same except for country-specific sample content, currency and prices.
- **Switching country** keeps the visitor on the same page (for example `/in/pricing/` becomes `/us/pricing/`) and resets the currency to that country's own.

## Open Questions

### Decided

- Country selector (replaces the earlier language selector): next to the theme toggle in the header, and beside the currency selector in the footer.
- Address format: `/<country>/<page>/` with country first (`/us`, `/in`, `/ae`). No language in the address.
- Currency selector: stays in the footer only.
- A proper **"Page not found"** page is added (instead of sending unknown addresses to Home).

### Still open (owner did not have a final answer yet)

1. **Help and blog content:** many help and blog articles in the original are placeholders. Is real content coming, and from whom? Should unfinished articles be hidden or shown as they are?
2. **Sign in / Start free link:** which address do they go to? The original points to a local prototype file. (Same open point as the store/portal address.)
3. **EUR content:** the original shows Germany / EUR sample content. It is replaced by a sample UAE shop in AED ("Dune & Date", Dubai, VAT 5% included), **written by Claude as a proposal**. Owner to approve or rewrite. AED plan prices are also placeholders (US dollar price x 3.67, rounded) until confirmed.
