"use client";

import Link from "next/link";
import { useSite } from "@/components/site-context";
import { path } from "@/lib/routes";

/** "See plans and prices in {currency}": follows the currency the visitor picked. */
export default function PricingLink() {
	const { country, currency } = useSite();
	return (
		<Link href={path(country.code, "pricing")} style={{ minHeight: 44, display: "flex", alignItems: "center", fontWeight: 500 }}>
			See plans and prices in {currency} →
		</Link>
	);
}
