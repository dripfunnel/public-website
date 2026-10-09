import { allRoutes } from '@/lib/pages';
import { VARIANTS, REGIONS, pagePath, absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

// Lists every address in every region and language, each with its alternate versions (hreflang).
export default function sitemap() {
  const entries = [];
  for (const route of allRoutes()) {
    const languages = { 'x-default': absoluteUrl(pagePath('in', 'en', route.slug)) };
    for (const v of VARIANTS) languages[v.locale === 'ar' ? 'ar-AE' : REGIONS[v.region].hreflang] = absoluteUrl(pagePath(v.region, v.locale, route.slug));
    for (const v of VARIANTS) {
      entries.push({ url: absoluteUrl(pagePath(v.region, v.locale, route.slug)), changeFrequency: route.slug.length > 1 ? 'monthly' : 'weekly', priority: route.slug.length === 0 ? 1 : route.slug.length === 1 ? 0.8 : 0.6, alternates: { languages } });
    }
  }
  return entries;
}
