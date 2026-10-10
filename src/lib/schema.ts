// Structured data (JSON-LD). Must always match what the visitor sees on the page.
// Company address and social profiles are not known yet (docs/seo.md, open question 4), so they are left out.

import { SITE_NAME, SITE_URL } from "./site";

type Json = Record<string, unknown>;

export function organizationSchema(): Json {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: SITE_NAME,
		url: SITE_URL,
		logo: `${SITE_URL}/assets/icon-ink-512.png`,
		parentOrganization: { "@type": "Organization", name: "Softobotics" },
	};
}

export function websiteSchema(): Json {
	return { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: item.name,
			item: `${SITE_URL}${item.path}`,
		})),
	};
}

export function articleSchema(a: { title: string; description: string; path: string; published: string }): Json {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: a.title,
		description: a.description,
		datePublished: a.published,
		mainEntityOfPage: `${SITE_URL}${a.path}`,
		author: { "@type": "Organization", name: SITE_NAME },
		publisher: { "@type": "Organization", name: SITE_NAME },
	};
}

export function faqSchema(items: { q: string; a: string }[]): Json {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((i) => ({
			"@type": "Question",
			name: i.q,
			acceptedAnswer: { "@type": "Answer", text: i.a },
		})),
	};
}
