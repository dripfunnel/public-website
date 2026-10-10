// Plan prices. One place only, so a back end can replace this later.
// Prices are fixed per currency; they are never converted with exchange rates.
// Each entry is [yearly price, one-time "we build your storefront" price].
// The monthly figure shown on the page is yearly / 12. Billed monthly = yearly * 2 / 12.
//
// INR and USD come from the original design. AED is a PLACEHOLDER (USD x 3.67,
// rounded) until the owner confirms the real dirham prices: see PLACEHOLDERS.md.

import type { CurrencyCode } from "./countries/types";

export type PaidPlanKey = "starter" | "growth" | "business";
export type PlanPrices = Record<PaidPlanKey, [number, number]>;

export const PLAN_PRICES: Record<CurrencyCode, PlanPrices> = {
	INR: { starter: [4999, 7000], growth: [6999, 9000], business: [9999, 12000] },
	USD: { starter: [96, 149], growth: [144, 199], business: [240, 299] },
	AED: { starter: [349, 549], growth: [529, 729], business: [879, 1099] },
};

/** Start of the footnote under the plan prices. Shown with the currency being displayed. */
export const PRICE_NOTE: Record<CurrencyCode, string> = {
	INR: "Prices in Indian rupees, before GST.",
	USD: "Prices in US dollars, before sales tax.",
	AED: "Prices in UAE dirhams, before VAT.",
};
