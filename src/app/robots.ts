import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Only the live site may be indexed. Staging and preview builds block all search engines.
export default function robots(): MetadataRoute.Robots {
	if (!IS_PRODUCTION) return { rules: { userAgent: "*", disallow: "/" } };
	return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
