# Deployment

> Requirements document. No code is written at this stage.

## Decisions

- **Hosting:** Cloudflare Pages.
- **Domain:** not decided yet. The owner will provide it later.
- **Environments:** more than one is needed, so changes can be tested on a test site before going live.

## How It Will Work

- The website is static (SSG, see [overview.md](overview.md)): pages are built ahead of time and served from Cloudflare's global network, close to each visitor. This supports the "very fast" goal.
- Code is kept in Git. Pushing changes triggers an automatic build and deployment.
- Visitor location (for language and currency) is read at Cloudflare's edge from the country information Cloudflare adds to each request. The visitor is then sent to the matching version (for example English with INR for India, English or Arabic with AED for the UAE). The visitor can always change language and currency manually.
- Search engines must still be served a stable default version of each page.

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
4. **Next.js on Cloudflare:** the exact way to run Next.js on Cloudflare (fully static files, or an adapter for some server features) and any limits must be checked against the current documentation before building. To be verified at the start of development.
5. **Domain:** name, who owns it, and where its DNS is managed (moving it to Cloudflare is the simplest).
