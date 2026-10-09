"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { COUNTRIES, getCountry, isCountryCode, type CountryCode } from "@/data/countries";
import { CURRENCY_KEY } from "@/lib/site";
import { useDismiss } from "./useDismiss";

/** The same page in another country: /in/pricing/ -> /us/pricing/. */
export function swapCountryInPath(pathname: string, to: CountryCode): string {
	const parts = pathname.split("/").filter(Boolean);
	if (parts.length && isCountryCode(parts[0])) parts[0] = to;
	else parts.unshift(to);
	return `/${parts.join("/")}/`;
}

/** Picking a country also resets the currency to that country's own. */
export function clearCurrencyChoice() {
	try {
		localStorage.removeItem(CURRENCY_KEY);
	} catch {
		// Storage can be blocked: nothing to clear.
	}
}

export default function CountrySwitcher({ variant, current }: { variant: "header" | "footer"; current: CountryCode }) {
	const pathname = usePathname();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const close = useCallback(() => setOpen(false), []);
	useDismiss(ref, open, close);
	const here = getCountry(current);

	if (variant === "footer") {
		return (
			<label className="ft-select-label">
				Country
				<select
					className="ft-select"
					value={current}
					onChange={(e) => {
						const to = e.target.value;
						if (!isCountryCode(to)) return;
						clearCurrencyChoice();
						router.push(swapCountryInPath(pathname, to));
					}}
				>
					{COUNTRIES.map((c) => (
						<option key={c.code} value={c.code}>
							{c.name}
						</option>
					))}
				</select>
			</label>
		);
	}

	return (
		<div className="hd-dd" ref={ref}>
			<button
				type="button"
				className="hd-icon hd-country"
				aria-label={`Change country. Currently ${here.name}`}
				aria-haspopup="true"
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<path d="M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" />
				</svg>
				{current.toUpperCase()}
			</button>
			{open && (
				<div role="menu" className="hd-dd-panel" data-align="end">
					{COUNTRIES.map((c) => (
						<Link
							key={c.code}
							role="menuitem"
							href={swapCountryInPath(pathname, c.code)}
							className="hd-dd-item"
							aria-current={c.code === current ? "true" : undefined}
							onClick={() => {
								clearCurrencyChoice();
								setOpen(false);
							}}
						>
							<span className="hd-dd-title">{c.name}</span>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
