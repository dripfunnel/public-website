// Page titles and descriptions. Drafts from docs/seo.md section 3, for the owner to approve.
// Pattern: "Page name | DripFunnel". Each country can get its own wording later: add an entry
// to COUNTRY_SEO (keyed by country, then page) and it replaces the default for that country only.

import type { CountryCode } from "./countries";

export type PageKey =
	| "home"
	| "features"
	| "ai"
	| "pricing"
	| "partners"
	| "blog"
	| "help"
	| "contact"
	| "terms"
	| "privacy";

export interface PageSeo {
	title: string;
	description: string;
}

const DEFAULT_SEO: Record<PageKey, PageSeo> = {
	home: {
		title: "DripFunnel: Describe your shop, AI builds your store",
		description:
			"Tell us what you sell and AI designs your homepage, pages, menus and product pages. Nothing goes live until you approve it. Start free.",
	},
	features: {
		title: "Features | DripFunnel",
		description: "Catalogue, orders and shipping, payments and tax, suppliers and selling abroad, all in one portal.",
	},
	ai: {
		title: "AI Store Builder | DripFunnel",
		description: "Describe a change in plain words, preview it on desktop, tablet and phone, then approve and publish. Undo any time.",
	},
	pricing: {
		title: "Pricing | DripFunnel",
		description: "See plans and prices in your currency. Starter is free forever, and paid plans start with a 10-day trial.",
	},
	partners: {
		title: "Partners | DripFunnel",
		description: "Run shops for clients under your own brand. Talk to us about the DripFunnel partner programme.",
	},
	blog: { title: "Blog | DripFunnel", description: "Guides for running and growing an online shop." },
	help: {
		title: "Help Centre | DripFunnel",
		description: "How-to articles and support for running your DripFunnel shop.",
	},
	contact: {
		title: "Contact and Book a Demo | DripFunnel",
		description: "Talk to sales, book a demo, become a partner or get support.",
	},
	terms: {
		title: "Terms of Service | DripFunnel",
		description: "The agreement between you and DripFunnel when you use DripFunnel to run an online shop.",
	},
	privacy: {
		title: "Privacy Policy | DripFunnel",
		description: "What personal data DripFunnel collects, why, and the choices you have.",
	},
};

/** Per-country overrides. Empty at launch: all three countries share the default wording. */
const COUNTRY_SEO: Partial<Record<CountryCode, Partial<Record<PageKey, PageSeo>>>> = {};

export function getPageSeo(country: CountryCode, page: PageKey): PageSeo {
	return COUNTRY_SEO[country]?.[page] ?? DEFAULT_SEO[page];
}
