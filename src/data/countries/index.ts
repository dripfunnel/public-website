// The three launch countries. The country is part of the address (/us, /in, /ae).
// There is one language only (English), so there is no translation system.
//
// To add a country: copy one of the files in this folder, register it below, add its
// currency to CURRENCIES and its prices to data/prices.ts, and add a Xxx<Country>.tsx
// next to each page component in src/components/.

import { ae } from "./ae";
import { india } from "./in";
import type { CountryCode, CountryData, CurrencyCode } from "./types";
import { us } from "./us";

export type { CountryCode, CountryData, CurrencyCode, Region } from "./types";

export const COUNTRIES: CountryData[] = [us, india, ae];

/** Default country for visitors outside the three launch countries and for crawlers on "/". */
export const DEFAULT_COUNTRY: CountryCode = "in";

export function isCountryCode(value: unknown): value is CountryCode {
	return COUNTRIES.some((c) => c.code === value);
}

export function getCountry(code: string): CountryData {
	const found = COUNTRIES.find((c) => c.code === code);
	if (!found) throw new Error(`Unknown country "${code}"`);
	return found;
}

export interface Currency {
	code: CurrencyCode;
	/** Option text in the "Show prices in" selector. */
	label: string;
	/** Locale used to format amounts in this currency. */
	intlLocale: string;
}

export const CURRENCIES: Currency[] = [
	{ code: "USD", label: "US dollars (USD)", intlLocale: "en-US" },
	{ code: "INR", label: "Indian rupees (INR)", intlLocale: "en-IN" },
	{ code: "AED", label: "UAE dirhams (AED)", intlLocale: "en-AE" },
];

export function isCurrencyCode(value: unknown): value is CurrencyCode {
	return CURRENCIES.some((c) => c.code === value);
}

/** Country names, in order, for the contact form's country list ("Other" is added there). */
export const COUNTRY_NAMES = COUNTRIES.map((c) => c.name);
