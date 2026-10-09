import { SITE_URL, IS_PRODUCTION } from '@/lib/site';

export const dynamic = 'force-static';

// Only the live website may be indexed. Test (staging) sites are hidden from search engines.
export default function robots() {
  if (!IS_PRODUCTION) return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` };
}
