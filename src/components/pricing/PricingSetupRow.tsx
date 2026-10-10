"use client";

import { useSite } from "@/components/site-context";
import type { Row } from "@/data/pricing";
import { cellLabel, cellStyle, ROW_GRID, RowName } from "./tableShared";

/** The comparison-table row that shows one-time set-up prices, so it follows the shown currency. */
export default function PricingSetupRow({ row }: { row: Row }) {
	const { prices, fmt } = useSite();
	return (
		<div role="row" style={{ ...ROW_GRID, fontSize: 14 }}>
			<RowName name={row.name} note={row.note} />
			{row.v.map((c, i) => {
				const v = typeof c === "string" ? c : `${fmt(prices[c.setup][1])} one-time`;
				return (
					<span key={i} role="cell" aria-label={cellLabel(v)} style={cellStyle(v, i)}>
						{v}
					</span>
				);
			})}
		</div>
	);
}
