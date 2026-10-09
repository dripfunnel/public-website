"use client";

import { useSite } from "@/components/site-context";

/** "₹7,000 on Growth, ₹9,000 on Growth Pro, ₹12,000 on Business" in the shown currency. */
export default function AiSetupLine() {
	const { prices, fmt } = useSite();
	return (
		<>
			{fmt(prices.starter[1])} on Growth, {fmt(prices.growth[1])} on Growth Pro, {fmt(prices.business[1])} on Business
		</>
	);
}
