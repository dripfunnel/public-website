# Placeholders

Things in the project that are **not final** and need an answer or content from the owner. Nothing here was invented silently: each item is also marked where it appears.

| # | Placeholder | Where | Needed from the owner |
|---|-------------|-------|-----------------------|
| 1 | **Domain** (`https://www.dripfunnel.com` is used until decided) | `NEXT_PUBLIC_SITE_URL`, `src/lib/site.ts`, sitemap, canonical addresses | Final domain |
| 2 | **Sign in / Start free address** (links go to `#` until set) | `NEXT_PUBLIC_PORTAL_URL`, `src/lib/site.ts` | Address of the DripFunnel store portal |
| 3 | **AED plan prices** (US dollar price x 3.67, rounded) | `src/data/prices.ts` | Real dirham prices |
| 4 | **UAE sample shop** ("Dune & Date", Dubai) written by us, replacing the design's Germany/EUR example | `src/data/countries/ae.ts` | Approve or rewrite |
| 5 | **Titles and descriptions** (drafts from `docs/seo.md`) | `src/data/seo.ts` | Approve or rewrite |
| 6 | **Share image** (logo on navy) | `public/og/default.png` | A designed 1200 x 630 image, if wanted |
| 7 | **Merchant logos and testimonial pictures** (dashed boxes, as in the design) | Home page | Pictures |
| 8 | **Terms and Privacy** contain `[bracketed]` placeholders (legal entity, address, prohibited activities, liability, retention, cookies and more) | `src/data/legal.ts` | Text written by counsel |
| 9 | **Blog and help articles**: only some have a full body; the rest show a placeholder, as in the design | `src/data/blog.ts`, `src/data/help.ts` | Real article text |
| 10 | **Contact form delivery**: messages go to a webhook; none is chosen yet | `LEAD_WEBHOOK_URL` (`.dev.vars.example`), `functions/api/contact.js` | Where messages should go (email service, CRM, ...) |
| 11 | **Company details** for structured data (legal name, address, social profiles) | `src/lib/schema.ts` | Details |
| 12 | **Form error colour** (design defines it only on the contact form) | Contact form | Confirm |
