// Shared types for the per-country data files (us.ts, in.ts, ae.ts).

export type CountryCode = "us" | "in" | "ae";
export type CurrencyCode = "USD" | "INR" | "AED";

export interface RegionAfter {
	headline: string;
	sub: string;
	cta: string;
	accent: string;
	bg: string;
	fg: string;
	tile: string;
	bar: string;
	nav: string;
}

/** Sample-shop content used in the demos and examples on the pages. */
export interface Region {
	country: string;
	store: string;
	slug: string;
	city: string;
	owner: string;
	tax: string;
	taxLine: string;
	price: string;
	pay: string;
	couriers: string;
	compare: string;
	code: string;
	units: string;
	/** [name, price in the country's own currency] */
	items: [string, number][];
	today: number;
	after: RegionAfter;
	prompt: string;
	/** Sample tax rate and whether tax is already inside the listed price (home page receipt). */
	taxRate: number;
	taxIncluded: boolean;
}

/**
 * Everything that can differ between countries. Each country has its own file in this
 * folder, so wording, sample content or numbers can be changed for one country without
 * touching the others.
 */
export interface CountryData {
	code: CountryCode;
	name: string;
	/** hreflang value for this country's English pages. */
	hreflang: string;
	/** Open Graph locale. */
	ogLocale: string;
	/** The country's own currency (plan prices are in data/prices.ts). */
	currency: CurrencyCode;
	region: Region;
}
