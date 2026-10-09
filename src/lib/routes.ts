import type { CountryCode } from "@/data/countries";

/** Every page below /[country]/, in sitemap order. "" is the home page. */
export const STATIC_PAGES = [
	"",
	"features",
	"ai",
	"pricing",
	"partners",
	"blog",
	"help",
	"contact",
	"terms",
	"privacy",
] as const;

export const CONTACT_TOPICS = ["demo", "sales", "partners", "support"] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

/** Address of a page inside a country, e.g. path("in", "pricing") -> "/in/pricing/". Always ends with a slash. */
export function path(country: CountryCode, page = ""): string {
	const clean = page.replace(/^\/+|\/+$/g, "");
	return clean ? `/${country}/${clean}/` : `/${country}/`;
}
