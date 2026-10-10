# Project Overview

> Requirements document. Items are added as the owner explains them.

## Goal

Build one **public website** using **Next.js**.

## Core Requirements

| # | Requirement | Notes |
|---|-------------|-------|
| 1 | Built with **Next.js** | |
| 2 | **SEO optimized** | Pages must be crawlable and indexable, with proper metadata. |
| 3 | **Very, very fast** | Performance is a top priority. |
| 4 | **Static site generation (SSG)** | Pages are pre-built as static files for speed and SEO. |
| 5 | **Match the design exactly** | The design source is one existing HTML file (see below). |
| 6 | **Mobile-first approach** | Design and build for mobile first, then scale up. |
| 7 | **Multi-country support (English only)** | There is **one language: English**. Each country (United States, India, UAE) has its **own set of pages** with its own address (e.g. `/us/pricing`, `/in/pricing`, `/ae/pricing`), so content can be made different per country later. Detected from the visitor's location. Visitor can change the country manually. |
| 8 | **Multi-currency support** | For **displaying prices only** (no payment on this site). Each region shows its own currency. Default at launch is **INR**. Detected from the visitor's location. Visitor can change it manually. |

## Design Source

- One existing HTML file is the single source of truth for the design.
- The finished website must match it exactly (layout, spacing, colors, typography, behavior).
- The file is `design/DripFunnel Website v2.dc.html` in the project. The `design/` folder also holds the script and assets it needs to open. Confirmed as the final design file.

## Decisions

- **Language:** English only. **No other languages and no translation system (i18n) are needed.** (Owner decision, replaces the earlier English + Arabic plan.)
- **Country in the URL:** yes. Each country has its own pages and URLs (e.g. `/us/pricing`, `/in/pricing`, `/ae/pricing`), so each country is indexed separately by search engines. The pages exist once per country (not one shared page with a switch), so data and wording can differ by country in the future.
- **Launch regions:** United States, India, United Arab Emirates.
- **Currency per region:** each region has its own currency.

  | Region | Currency |
  |--------|----------|
  | United States | USD |
  | India | INR (default) |
  | United Arab Emirates | AED |

- **UAE language:** English only, like every other country. No Arabic and no right-to-left (RTL) layout.
- **Automatic detection:** the country (and so the currency) is detected from the visitor's location.
- **Manual override:** if detection is wrong, the visitor can change the country and the currency themselves.
- **Only three regions for now:** United States, India and UAE. More countries can be added later; this is out of scope at launch.
- **Visitors from other countries:** since only three regions exist, they are sent to the default country (India, with INR) and can switch manually to any available country and currency. (Assumed by Claude; see open question 1.)
- **Prices are fixed per currency:** each currency (INR, USD, AED) has its own fixed price. Prices are **not** converted automatically with exchange rates.
- **Prices are managed from the back end:** an admin will be able to change prices from the back end, and the website must show the updated prices.
- **Back end:** not ready yet. Whether pages stay static or become dynamic will be decided later.
- **For now, fully static:** at launch the website is static only, with prices stored in the website itself (fixed values per currency). Connecting to the back end comes later.
- **Display only:** country and currency are for **showing content and prices only**. This is a public marketing website. Customers see the prices; no payment or checkout happens here, and no currency data needs to be passed to any payment system.
- **Design file:** `DripFunnel Website v2.dc.html` is final.

## Notes

- The earlier Next.js code in this repo uses hash-based routing (`/#/pricing`). That is poor for SEO because search engines treat hash routes as one page. Real URLs per page and per country are required.
- With SSG, pages are built ahead of time, so anything that depends on the visitor (country and currency detected from location) has to be handled in the browser or at the hosting edge, not at build time. Search engines should still see a stable default version of each page.
- **Pages per country:** each country has its own page files and its own data file (see [pages-and-navigation.md](pages-and-navigation.md)), as in the earlier DripFunnel website project (`dripfunnel-pw-main`). At launch the three countries use the same wording and design, with country-specific sample content, currency and prices. Because they are separate, any country can later get different content without touching the others.
- There is no translation system. All text is written once, in English.
- The site is static (SSG) for now. Later, when the back end exists, prices will change from there, and the website will need a way to pick up those changes (for example rebuilding pages, or loading prices from the back end). To keep that possible, the prices should be kept in one separate place and not scattered through the pages.
- Since nothing is paid on this site, the payment provider and its supported currencies do not limit which currencies can be shown.
- Hosting and environments are described in [deployment.md](deployment.md).
- Pages, navigation, header and footer (copied from the original design) are described in [pages-and-navigation.md](pages-and-navigation.md).
- SEO requirements are described in [seo.md](seo.md).
- The folders, stack and how the per-country pages work are described in [project-structure.md](project-structure.md). Things still to be decided are listed in [PLACEHOLDERS.md](../PLACEHOLDERS.md).
- Colors, fonts, spacing, components, themes and assets (taken from the original design) are described in [design.md](design.md).
- Details for pages, features, design, content, countries and currencies will go in separate files in `docs/`.

## Open Questions

1. **Visitors from other countries:** is it correct that they are sent to India (INR, the default) and can switch manually?
2. **Later, with the back end:** how will the website get prices from it, and how fast must a price change appear? To be decided when the back end is planned.
