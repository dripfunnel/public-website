# DripFunnel Public Website

Next.js (App Router) version of the DripFunnel marketing site, converted from `DripFunnel Website v2.dc.html`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

- `app/` – layout, global CSS, the home route (`/`) and a `/portal` placeholder
- `components/Site.jsx` – the site's state and content (pricing, features, blog, help, legal, contact form)
- `components/SiteView.jsx` – the markup, generated from the original template
- `components/Hv.jsx`, `lib/css.js` – small helpers for hover styles and inline-style strings
- `public/assets/` – logos and favicons

Pages use hash routes (`/#/pricing`, `/#/blog`, `/#/help`, `/#/contact/sales` and so on), as in the original.

## Configuration

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_STORE_URL` sets where "Sign in" and "Start free" go
(default `/portal`, a placeholder page).

`DripFunnel Website v2.dc.html` is kept as the original reference.
