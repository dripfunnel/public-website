"use client";

import { useSite } from "@/components/site-context";
import { PRICE_FOOT_REST } from "@/data/pricing";
import { PRICE_NOTE } from "@/data/prices";

/** Footnote under the comparison table: names the currency and tax of the prices shown. */
export default function PriceFoot() {
	const { currency } = useSite();
	return <span style={{ fontSize: 13, color: "var(--muted,#5A6472)" }}>{PRICE_NOTE[currency] + PRICE_FOOT_REST}</span>;
}
