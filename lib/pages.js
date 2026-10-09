// The list of pages and everything that is derived from it: static addresses, sitemap, page lookup, metadata.
//
// Each page file in components/pages/ exports:
//   default            the page (a server component) taking { ctx, rest }
//   meta({ ctx, rest }) the SEO title and description (already translated). Optional: noindex: true, type: 'article', image
//   paths()            optional. The extra address parts that exist for this page, e.g. blog articles: [[], ['article-id']]
//                      Defaults to [[]] (only the page itself).

import * as Home from '@/components/pages/Home';
import * as Features from '@/components/pages/Features';
import * as AiBuilder from '@/components/pages/AiBuilder';
import * as Pricing from '@/components/pages/Pricing';
import * as Partners from '@/components/pages/Partners';
import * as Blog from '@/components/pages/Blog';
import * as Help from '@/components/pages/Help';
import * as Contact from '@/components/pages/Contact';
import * as Terms from '@/components/pages/Terms';
import * as Privacy from '@/components/pages/Privacy';
import { VARIANTS, REGIONS, REGION_CODES, pagePath, absoluteUrl, SITE_URL, IS_PRODUCTION } from './site';
import { makeCtx } from './ctx';

export const PAGES = [
  { key: 'home', path: '', mod: Home },
  { key: 'features', path: 'features', mod: Features },
  { key: 'ai', path: 'ai', mod: AiBuilder },
  { key: 'pricing', path: 'pricing', mod: Pricing },
  { key: 'partners', path: 'partners', mod: Partners },
  { key: 'blog', path: 'blog', mod: Blog },
  { key: 'help', path: 'help', mod: Help },
  { key: 'contact', path: 'contact', mod: Contact },
  { key: 'terms', path: 'terms', mod: Terms },
  { key: 'privacy', path: 'privacy', mod: Privacy },
];

// Every address under a region, as { page, rest, slug }: slug is what comes after the region (and /ar).
export function allRoutes() {
  return PAGES.flatMap((page) => {
    const list = page.mod.paths ? page.mod.paths() : [[]];
    return list.map((rest) => ({ page, rest, slug: [...(page.path ? [page.path] : []), ...rest] }));
  });
}

export function findRoute(slug = []) {
  const key = slug.join('/');
  return allRoutes().find((r) => r.slug.join('/') === key) || null;
}

// Static params for the English route (/{region}/...) and the Arabic route (/ae/ar/...).
export function staticParamsEn() {
  return VARIANTS.filter((v) => v.locale === 'en').flatMap(({ region }) => allRoutes().map((r) => ({ region, slug: r.slug })));
}
export function staticParamsAr() {
  return allRoutes().map((r) => ({ slug: r.slug }));
}

// Page metadata: title, description, canonical address, alternate language/region versions and share preview.
export function buildMetadata({ region, locale, slug }) {
  const route = findRoute(slug);
  if (!route) return {};
  const ctx = makeCtx(region, locale);
  const m = route.page.mod.meta({ ctx, rest: route.rest });
  const canonical = pagePath(region, locale, slug);
  const languages = { 'x-default': absoluteUrl(pagePath('in', 'en', slug)) };
  for (const v of VARIANTS) {
    const code = v.locale === 'ar' ? 'ar-AE' : REGIONS[v.region].hreflang;
    languages[code] = absoluteUrl(pagePath(v.region, v.locale, slug));
  }
  const image = m.image || '/assets/favicon/icon-ink-512.png';
  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    alternates: { canonical, languages },
    // Staging sites are hidden from search engines. A page can also hide itself (meta() returns noindex: true), e.g. unfinished articles.
    robots: IS_PRODUCTION && !m.noindex ? { index: true, follow: true } : { index: false, follow: IS_PRODUCTION },
    openGraph: {
      type: m.type || 'website',
      siteName: 'DripFunnel',
      title: m.title,
      description: m.description,
      url: canonical,
      locale: locale === 'ar' ? 'ar_AE' : REGIONS[region].ogLocale,
      images: [{ url: image, width: 512, height: 512, alt: 'DripFunnel' }],
    },
    twitter: { card: 'summary', title: m.title, description: m.description, images: [image] },
    icons: {
      icon: [
        { url: '/assets/favicon/round-light-64.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
        { url: '/assets/favicon/round-dark-64.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      ],
      apple: '/assets/favicon/apple-touch-icon-180.png',
    },
  };
}

export { REGION_CODES };
