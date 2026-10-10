import { CURRENCIES, type CurrencyCode } from "@/data/countries";

/** Formats an amount in a currency, e.g. money("INR", 4999) -> "₹4,999". Whole numbers show no decimals. */
export function money(currency: CurrencyCode, value: number): string {
	const locale = CURRENCIES.find((c) => c.code === currency)?.intlLocale ?? "en-US";
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		maximumFractionDigits: value % 1 ? 2 : 0,
	}).format(value);
}
