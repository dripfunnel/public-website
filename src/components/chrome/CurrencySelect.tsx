"use client";

import { CURRENCIES, isCurrencyCode } from "@/data/countries";
import { useSite } from "@/components/site-context";

/** "Show prices in" selector. Lives in the footer only (as in the original design). */
export default function CurrencySelect() {
	const { currency, setCurrency } = useSite();
	return (
		<label className="ft-select-label">
			Show prices in
			<select
				className="ft-select"
				value={currency}
				onChange={(e) => {
					if (isCurrencyCode(e.target.value)) setCurrency(e.target.value);
				}}
			>
				{CURRENCIES.map((c) => (
					<option key={c.code} value={c.code}>
						{c.label}
					</option>
				))}
			</select>
		</label>
	);
}
