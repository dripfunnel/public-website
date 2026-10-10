"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getCountry, isCurrencyCode, type CountryCode, type CountryData, type CurrencyCode } from "@/data/countries";
import { PLAN_PRICES, type PlanPrices } from "@/data/prices";
import { money } from "@/lib/format";
import { CURRENCY_KEY } from "@/lib/site";

interface Site {
	/** The country of the page (from the address) and its content. */
	country: CountryData;
	/** Currency shown for plan prices: the country's own, unless the visitor picked another. */
	currency: CurrencyCode;
	setCurrency: (currency: CurrencyCode) => void;
	/** Plan prices in the shown currency. */
	prices: PlanPrices;
	/** Format an amount in the shown currency (plan prices). */
	fmt: (value: number) => string;
	/** Format an amount in the country's own currency (the country's sample-shop prices). */
	fmtLocal: (value: number) => string;
}

const SiteContext = createContext<Site | null>(null);

function readStoredCurrency(): CurrencyCode | null {
	try {
		const v = localStorage.getItem(CURRENCY_KEY);
		return isCurrencyCode(v) ? v : null;
	} catch {
		return null;
	}
}

/**
 * Holds the page's country (from the address) and the shown currency. The server renders the
 * country's own currency, which is what search engines see. After the page loads, a currency
 * the visitor chose earlier replaces it.
 */
export function SiteProvider({ country: code, children }: { country: CountryCode; children: ReactNode }) {
	const country = getCountry(code);
	const [override, setOverride] = useState<CurrencyCode | null>(null);

	useEffect(() => {
		const stored = readStoredCurrency();
		// Only an explicit choice that differs from the country's own currency is kept.
		setOverride(stored && stored !== country.currency ? stored : null);
	}, [country.currency]);

	const currency = override ?? country.currency;

	const setCurrency = useCallback(
		(next: CurrencyCode) => {
			try {
				if (next === country.currency) localStorage.removeItem(CURRENCY_KEY);
				else localStorage.setItem(CURRENCY_KEY, next);
			} catch {
				// Storage can be blocked. The choice then lasts until the page closes.
			}
			setOverride(next === country.currency ? null : next);
		},
		[country.currency],
	);

	const value = useMemo<Site>(
		() => ({
			country,
			currency,
			setCurrency,
			prices: PLAN_PRICES[currency],
			fmt: (v) => money(currency, v),
			fmtLocal: (v) => money(country.currency, v),
		}),
		[country, currency, setCurrency],
	);

	return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite(): Site {
	const ctx = useContext(SiteContext);
	if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
	return ctx;
}
