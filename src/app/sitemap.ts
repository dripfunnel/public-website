import type { MetadataRoute } from "next";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/data/countries";
import { POSTS } from "@/data/blog";
import { ALL_ARTICLES } from "@/data/help";
import { CONTACT_TOPICS, STATIC_PAGES, path } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Every page in every country, each with its alternates in the other countries. The bare "/"
// and the "Page not found" page are not listed.
export default function sitemap(): MetadataRoute.Sitemap {
	const pages = [
		...STATIC_PAGES,
		...CONTACT_TOPICS.map((t) => `contact/${t}`),
		...POSTS.map((p) => `blog/${p.id}`),
		...ALL_ARTICLES.map((a) => `help/${a.id}`),
	];

	return pages.flatMap((page) =>
		COUNTRIES.map((c) => ({
			url: `${SITE_URL}${path(c.code, page)}`,
			alternates: {
				languages: {
					...Object.fromEntries(COUNTRIES.map((o) => [o.hreflang, `${SITE_URL}${path(o.code, page)}`])),
					"x-default": `${SITE_URL}${path(DEFAULT_COUNTRY, page)}`,
				},
			},
		})),
	);
}
