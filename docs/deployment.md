# Deployment

> Hosting and deployment: decisions and how it is set up.

## Decisions

- **Hosting:** Cloudflare Workers (static assets). Changed from Cloudflare Pages on 10 Oct 2026: the project was created in Cloudflare as a Worker, and the owner chose to adapt the code to it.
- **Cloudflare project name:** `dripfunnel-pw` (set by the owner).
- **Domain:** not decided yet. The owner will provide it later.
- **Environments:** more than one is needed, so changes can be tested on a test site before going live.

## How It Will Work

- The website is static (SSG, see [overview.md](overview.md)): pages are built ahead of time and served from Cloudflare's global network, close to each visitor. This supports the "very fast" goal.
- Code is kept in Git. Pushing changes triggers an automatic build and deployment.
- Visitor location (for country and currency) is read at Cloudflare's edge from the country information Cloudflare adds to each request. On the bare address `/` the visitor is sent to the matching country (`/us/`, `/in/` or `/ae/`; India for any other country). On a country page a banner only suggests the visitor's own country. The visitor can always change country and currency manually.
- Search engines are never redirected: every address always returns its own country's page. Only the bare address `/`, a tiny location lookup (`/api/geo`) and the contact form (`/api/contact`) run code (the Worker); all other pages are plain static files.

## How it is set up (built)

- **Settings file:** `wrangler.jsonc`. It names the Worker (`dripfunnel-pw`, must match the project name in Cloudflare), points to the built site (`out/`) and lists the only addresses that run code (`/` and `/api/*`). Unknown addresses show the 404 page.
- **Cloudflare build settings (dashboard, Worker > Settings > Build):** build command `npm run build`, deploy command `npx wrangler deploy`. For other branches the preview command is `npx wrangler versions upload`.
- **Code:** `worker/index.js` and the files next to it (country redirect, location lookup, contact form).
- **Headers:** `public/_headers` sets caching and security headers. Every `*.workers.dev` address (the test and preview addresses) is hidden from search engines.
- **Settings in the dashboard:** the contact form webhook `LEAD_WEBHOOK_URL` is a secret (Worker > Settings > Variables and Secrets). The site settings in `.env.example` are used during the build, so they go under the build settings' variables.
- **Try it locally:** `npm run preview:local` (http://localhost:8787/).

## Environments

| Environment | Purpose | Notes |
|-------------|---------|-------|
| **Production** | The live public website | Deployed from the main branch, on the final domain. |
| **Staging / Preview** | Test changes before they go live | Cloudflare can upload a preview version for other branches (see "How it is set up"). Exact setup to be decided. |

## Later

- When the back end exists, prices will come from it. The website will then need a way to pick up price changes (see [overview.md](overview.md)). Cloudflare hosting must be able to support whichever approach is chosen.
- Once the domain is chosen: connect the domain, set up HTTPS, and decide how `www` and non-`www` addresses behave.

## Open Questions

1. **Cloudflare account:** is there already a company Cloudflare account, and who will manage it?
2. **Environments:** is "production + test (staging)" enough, or are more needed? Should the test site be private (password protected) or open?
3. **Git hosting:** where is the code stored (GitHub, GitLab, Bitbucket)? Which branch is the live one?
4. ~~Next.js on Cloudflare~~ **Answered:** fully static files plus a small Worker for `/` and `/api/*` (see "How it is set up"). Tested locally with Cloudflare's own tool; to be checked once on the real deployment.
5. **Domain:** name, who owns it, and where its DNS is managed (moving it to Cloudflare is the simplest).
