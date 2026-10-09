"use client";

import { useSite } from "@/components/site-context";

/** "from ₹7,000 one-time": the cheapest storefront build price in the shown currency. */
export default function SetupFrom() {
	const { prices, fmt } = useSite();
	return <>from {fmt(prices.starter[1])} one-time</>;
}
