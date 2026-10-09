# Deployment

> Requirements document. No code is written at this stage.

## Decisions

- **Hosting:** Cloudflare Pages.
- **Domain:** `www.dripfunnel.com` (given by the owner). Regions live at `/in/`, `/us/` and `/ae/`.
- **Environments:** more than one is needed, so changes can be tested on a test site before going live.

## How It Will Work

- The website is static (SSG, see [overview.md](overview.md)): pages are built ahead of time and served from Cloudflare's global network, close to each visitor. This supports the "very fast" goal.
- Code is kept in Git. Pushing changes triggers an automatic build and deployment.
- Visitor location (for language and currency) is read at Cloudflare's edge from the country information Cloudflare adds to each request. Only the bare address `https://www.dripfunnel.com/` uses it: it sends the visitor to `/in/`, `/us/` or `/ae/` (fallback `/in/`; crawlers always `/in/`). This is done by a small Cloudflare Pages Function. The visitor can always change language and region manually.
- Search engines must still be served a stable default version of each page.

## How it is set up (built)

- **Build:** `npm run build` makes plain static files in the `out` folder (Next.js "static export"). No server code runs for pages. Needs Node 20.9 or newer.
- **Cloudflare Pages settings:** build command `npm run build`, output folder `out`.
- **Bare address:** one small Cloudflare Pages Function (`functions/index.js`) handles only `https://www.dripfunnel.com/`. It reads the visitor's country from Cloudflare and sends the visitor to `/in/`, `/us/` or `/ae/`. Other countries and search-engine crawlers go to `/in/`. Everything else is plain static files.
- **Headers:** `public/_headers` sets caching (fonts and built files are kept for a year) and basic security headers.
- **Settings (environment variables):**

  | Name | Meaning | Production | Test site |
  |------|---------|------------|-----------|
  | `NEXT_PUBLIC_SITE_URL` | The public address used in canonical links, the sitemap and share previews | `https://www.dripfunnel.com` | the test address |
  | `NEXT_PUBLIC_SITE_ENV` | `production` lets search engines index the site; any other value (for example `staging`) blocks them (robots file and "noindex" tags) | `production` | `staging` |
  | `NEXT_PUBLIC_STORE_URL` | Where "Sign in" and "Start free" go | store address (not decided) | same |

- **Page addresses end with a slash** (`/in/pricing/`), as in the owner's examples (`https://www.dripfunnel.com/ae/`).
- **"Page not found":** a real 404 page (`404.html`) that is kept out of search engines.

## Environments

| Environment | Purpose | Notes |
|-------------|---------|-------|
| **Production** | The live public website | Deployed from the main branch, on the final domain. |
| **Staging / Preview** | Test changes before they go live | Cloudflare Pages can create a separate preview site for each branch. Exact setup to be decided. |

## Later

- When the back end exists, prices will come from it. The website will then need a way to pick up price changes (see [overview.md](overview.md)). Cloudflare hosting must be able to support whichever approach is chosen.
- Once the domain is chosen: connect the domain, set up HTTPS, and decide how `www` and non-`www` addresses behave.

## Open Questions

1. **Cloudflare account:** is there already a company Cloudflare account, and who will manage it?
2. **Environments:** is "production + test (staging)" enough, or are more needed? Should the test site be private (password protected) or open?
3. **Git hosting:** where is the code stored (GitHub, GitLab, Bitbucket)? Which branch is the live one?
4. ~~Next.js on Cloudflare~~ **Answered:** fully static files plus one small Function for the bare address (see "How it is set up"). To be checked once on a real Cloudflare Pages deployment.
5. **Domain:** the name is decided. Who owns it, and where its DNS is managed (moving it to Cloudflare is the simplest), are still open.
