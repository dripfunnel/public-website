"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getCountry, type CountryCode } from "@/data/countries";
import { COUNTRY_BANNER_KEY } from "@/lib/site";
import { clearCurrencyChoice, swapCountryInPath } from "./CountrySwitcher";

const GULF = new Set(["AE", "SA", "KW", "QA", "OM", "BH"]);

/** Visitor's own country, if it is one of the launch countries. */
function launchCountryFor(iso: string): CountryCode | null {
	const code = iso.toUpperCase();
	if (GULF.has(code)) return "ae";
	if (code === "IN") return "in";
	if (code === "US") return "us";
	return null;
}

/**
 * Suggests the visitor's own country. It never redirects: the visitor decides, and a
 * "Stay here" answer is remembered. Search engines never see it: it appears only after
 * the page has loaded in a browser and /api/geo has answered.
 */
export default function CountryBanner({ current }: { current: CountryCode }) {
	const pathname = usePathname();
	const [suggested, setSuggested] = useState<CountryCode | null>(null);

	useEffect(() => {
		let cancelled = false;
		try {
			if (localStorage.getItem(COUNTRY_BANNER_KEY) === "stay") return;
		} catch {
			// Storage blocked: the banner may show again on the next page. That is acceptable.
		}
		const idle: (cb: () => void) => void =
			"requestIdleCallback" in window ? (cb) => window.requestIdleCallback(cb) : (cb) => setTimeout(cb, 1500);
		idle(() => {
			fetch("/api/geo", { cache: "no-store" })
				.then((r) => (r.ok ? r.json() : null))
				.then((data: { country?: string } | null) => {
					if (cancelled || !data?.country) return;
					const detected = launchCountryFor(data.country);
					if (detected && detected !== current) setSuggested(detected);
				})
				.catch(() => {
					// No geo service (local development, offline): no suggestion.
				});
		});
		return () => {
			cancelled = true;
		};
	}, [current]);

	if (!suggested) return null;
	const target = getCountry(suggested);

	const stay = () => {
		try {
			localStorage.setItem(COUNTRY_BANNER_KEY, "stay");
		} catch {
			// Storage blocked: the choice lasts until the page closes.
		}
		setSuggested(null);
	};

	return (
		<div className="cb" role="status" aria-live="polite">
			<p>
				It looks like you are in {target.name}. View the {target.name} site, with prices in {target.currency}?
			</p>
			<div className="cb-actions">
				<button
					type="button"
					className="cb-switch"
					onClick={() => {
						clearCurrencyChoice();
						window.location.assign(swapCountryInPath(pathname, target.code));
					}}
				>
					Switch
				</button>
				<button type="button" className="cb-stay" onClick={stay}>
					Stay here
				</button>
			</div>
		</div>
	);
}
