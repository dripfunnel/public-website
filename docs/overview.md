# Project Overview

> Requirements document. No code is written at this stage. Items are added as the owner explains them.

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
| 7 | **Multi-language support** | Default is **English**. Language is part of the URL. Detected from the visitor's location. Visitor can change it manually. |
| 8 | **Multi-currency support** | For **displaying prices only** (no payment on this site). Each region shows its own currency. Default at launch is **INR**. Detected from the visitor's location. Visitor can change it manually. |

## Design Source

- One existing HTML file is the single source of truth for the design.
- The finished website must match it exactly (layout, spacing, colors, typography, behavior).
- The file is `DripFunnel Website v2.dc.html` in the repo root. Confirmed as the final design file.

## Decisions

- **Default language:** English.
- **Language in the URL:** yes. Each language has its own URLs (e.g. `/en/pricing`, `/ar/pricing`), so each language is indexed separately by search engines.
- **Launch regions:** United States, India, United Arab Emirates.
- **Currency per region:** each region has its own currency.

  | Region | Currency |
  |--------|----------|
  | United States | USD |
  | India | INR (default) |
  | United Arab Emirates | AED |

- **UAE language:** both **English and Arabic**. Decided by Claude on the owner's instruction ("take the decision on your own"). Arabic requires a right-to-left (RTL) layout. English remains the default.
- **Automatic detection:** language and currency are detected from the visitor's location.
- **Manual override:** if detection is wrong, the visitor can change language and currency themselves.
- **Only three regions for now:** United States, India and UAE. More countries can be added later; this is out of scope at launch.
- **Visitors from other countries:** since only three regions exist, they see the defaults (English and INR) and can switch manually to any available language and currency. (Assumed by Claude; see open question 1.)
- **Prices are fixed per currency:** each currency (INR, USD, AED) has its own fixed price. Prices are **not** converted automatically with exchange rates.
- **Prices are managed from the back end:** an admin will be able to change prices from the back end, and the website must show the updated prices.
- **Back end:** not ready yet. Whether pages stay static or become dynamic will be decided later.
- **For now, fully static:** at launch the website is static only, with prices stored in the website itself (fixed values per currency). Connecting to the back end comes later.
- **Display only:** language and currency are for **showing content and prices only**. This is a public marketing website. Customers see the prices; no payment or checkout happens here, and no currency data needs to be passed to any payment system.
- **Design file:** `DripFunnel Website v2.dc.html` is final.

## Notes

- The earlier Next.js code in this repo uses hash-based routing (`/#/pricing`). That is poor for SEO because search engines treat hash routes as one page. Real URLs per page and per language are required.
- With SSG, pages are built ahead of time, so anything that depends on the visitor (language and currency detected from location) has to be handled in the browser or at the hosting edge, not at build time. Search engines should still see a stable default version of each page.
- Arabic means the design in the HTML file must also work mirrored (right-to-left). The HTML file is English only, so the Arabic layout will need to be defined.
- The site is static (SSG) for now. Later, when the back end exists, prices will change from there, and the website will need a way to pick up those changes (for example rebuilding pages, or loading prices from the back end). To keep that possible, the prices should be kept in one separate place and not scattered through the pages.
- Since nothing is paid on this site, the payment provider and its supported currencies do not limit which currencies can be shown.
- Hosting and environments are described in [deployment.md](deployment.md).
- Pages, navigation, header and footer (copied from the original design) are described in [pages-and-navigation.md](pages-and-navigation.md).
- SEO requirements are described in [seo.md](seo.md).
- Colors, fonts, spacing, components, themes and assets (taken from the original design) are described in [design.md](design.md).
- Details for pages, features, design, content, languages and currencies will go in separate files in `docs/`.

## Open Questions

1. **Visitors from other countries:** is it correct that they see English and INR (the defaults) and can switch manually?
2. **Later, with the back end:** how will the website get prices from it, and how fast must a price change appear? To be decided when the back end is planned.
