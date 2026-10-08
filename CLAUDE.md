@AGENTS.md

# DripFunnel Public Website

Next.js (App Router) marketing site for DripFunnel, converted from `DripFunnel Website v2.dc.html` (kept as the original reference). React 19, plain JavaScript/JSX (no TypeScript), no test suite or linter configured.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Structure

- `app/` — `layout.jsx`, `globals.css`, the home route (`page.jsx`) and a `/portal` placeholder page.
- `components/Site.jsx` — client component (class-based) holding all site state and content: pricing, features, blog, help, legal, contact form.
- `components/SiteView.jsx` — the markup, generated from the original template. Expect inline-style strings run through `css()`.
- `components/Hv.jsx`, `lib/css.js` — hover-style helper and the inline-style-string → React style object converter.
- `public/assets/` — logos and favicons.

## Conventions and gotchas

- Routing is hash-based (`/#/pricing`, `/#/blog`, `/#/help`, `/#/contact/sales`, ...), as in the original. Don't convert to file-based routes unless asked.
- `NEXT_PUBLIC_STORE_URL` (see `.env.example`, copy to `.env.local`) sets where "Sign in" / "Start free" go; defaults to `/portal`.
- Theme preference is stored in `localStorage` under `df-site-theme`; guard storage access with try/catch as the existing code does.
- Next.js here has breaking changes from older versions — check `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md above).
- `next.config.mjs` pins `turbopack.root` to this directory because the parent folder is not part of the project.
