import type { Metadata } from "next";
import { COUNTRIES, DEFAULT_COUNTRY, getCountry, type CountryCode } from "@/data/countries";
import { path } from "./routes";
import { IS_PRODUCTION, SITE_NAME } from "./site";

export const DEFAULT_OG_IMAGE = "/og/default.png";

interface PageSeo {
	country: CountryCode;
	/** Page below the country, e.g. "pricing" or "blog/describe-your-shop". "" is the home page. */
	page?: string;
	/** Full title, e.g. "Pricing | DripFunnel". */
	title: string;
	description: string;
	ogImage?: string;
	type?: "website" | "article";
	noindex?: boolean;
}

/**
 * Title, description, canonical address, country alternates (hreflang) and sharing tags for one
 * page. The canonical address is the page's own, and the alternates point to the same page in
 * the other countries. Staging and preview builds are never indexed.
 */
export function buildMetadata({ country, page = "", title, description, ogImage, type = "website", noindex }: PageSeo): Metadata {
	const here = getCountry(country);
	const languages: Record<string, string> = {};
	for (const c of COUNTRIES) languages[c.hreflang] = path(c.code, page);
	languages["x-default"] = path(DEFAULT_COUNTRY, page);
	const image = ogImage ?? DEFAULT_OG_IMAGE;
	const hidden = noindex || !IS_PRODUCTION;

	return {
		title: { absolute: title },
		description,
		alternates: { canonical: path(country, page), languages },
		robots: hidden ? { index: false, follow: false } : undefined,
		openGraph: {
			title,
			description,
			url: path(country, page),
			siteName: SITE_NAME,
			type,
			locale: here.ogLocale,
			images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
		},
		twitter: { card: "summary_large_image", title, description, images: [image] },
	};
}
