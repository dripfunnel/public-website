"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useSite } from "@/components/site-context";
import { CURRENCIES, isCurrencyCode } from "@/data/countries";
import { BANDWIDTH, PERIODS, PLANS, type Period } from "@/data/pricing";
import { path } from "@/lib/routes";
import { PORTAL_URL } from "@/lib/site";
import styles from "./pricing.module.css";

const CURRENCY_OPTION: Record<string, string> = { USD: "$ USD", INR: "₹ INR", AED: "AED" };

/**
 * Hero (static text passed in as children) with the billing-period toggle and currency select,
 * and the plan cards. The toggle and the cards share the period, so they live in one client component.
 */
export default function PricingTop({ children }: { children: ReactNode }) {
	const { country, currency, setCurrency, prices, fmt } = useSite();
	const [period, setPeriod] = useState<Period>("year");
	const yearly = period === "year";

	return (
		<>
			<section
				data-screen-label="Pricing"
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) 36px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
					gap: 18,
				}}
			>
				{children}
				<div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
					<div
						role="group"
						aria-label="Billing period"
						style={{
							display: "flex",
							gap: 4,
							padding: 4,
							border: "1px solid var(--border,#E8E2DC)",
							borderRadius: 10,
							background: "var(--surface,#FFFFFF)",
						}}
					>
						{PERIODS.map((p) => {
							const on = period === p.key;
							return (
								<button
									key={p.key}
									type="button"
									onClick={() => setPeriod(p.key)}
									aria-pressed={on}
									style={{
										height: 44,
										padding: "0 16px",
										border: 0,
										borderRadius: 8,
										background: on ? "var(--head,#0A2A4A)" : "transparent",
										color: on ? "var(--paper,#FDFAF7)" : "var(--text,#14181F)",
										fontFamily: "Manrope,sans-serif",
										fontWeight: 700,
										fontSize: 14,
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
										gap: 8,
									}}
								>
									{p.label}
									{p.tag && (
										<span
											style={{
												fontSize: 11,
												padding: "2px 8px",
												borderRadius: 10,
												background: "var(--okbg,#EEF7F2)",
												color: "var(--okfg,#1D6B47)",
											}}
										>
											{p.tag}
										</span>
									)}
								</button>
							);
						})}
					</div>
					<select
						value={currency}
						onChange={(e) => {
							if (isCurrencyCode(e.target.value)) setCurrency(e.target.value);
						}}
						aria-label="Currency"
						style={{
							height: 52,
							border: "1px solid var(--border,#E8E2DC)",
							borderRadius: 10,
							background: "var(--surface,#FFFFFF)",
							padding: "0 12px",
							fontFamily: "Inter,sans-serif",
							fontSize: 15,
							color: "var(--text,#14181F)",
						}}
					>
						{CURRENCIES.map((c) => (
							<option key={c.code} value={c.code}>
								{CURRENCY_OPTION[c.code] ?? c.code}
							</option>
						))}
					</select>
				</div>
			</section>
			<section
				aria-label="Plans"
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "12px clamp(16px,4cqw,24px) 64px",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
					gap: 14,
					alignItems: "stretch",
				}}
			>
				{PLANS.map((p) => {
					const hi = p.k === "growth";
					const dark = p.k === "ent";
					const paid = p.k === "starter" || p.k === "growth" || p.k === "business" ? prices[p.k] : null;
					const Y = paid ? paid[0] : 0;
					const setup = paid ? paid[1] : 0;
					const perMonthYearly = Y / 12;
					const perMonthBilledMonthly = (Y * 2) / 12;
					const price =
						p.k === "free" ? "Free" : dark ? "Custom" : fmt(Math.round(yearly ? perMonthYearly : perMonthBilledMonthly));
					const note =
						p.k === "free"
							? "Forever. No card needed."
							: dark
								? "Built around your business"
								: yearly
									? `${fmt(Y)} billed yearly, after 10 free days`
									: `Billed monthly, after 10 free days. ${fmt(Math.round(perMonthYearly))}/month if you pay yearly.`;
					const points = [
						...p.points,
						...(setup ? [`Optional: we build your storefront for you, ${fmt(setup)} one-time`] : []),
						BANDWIDTH[p.k],
					];
					const sub = dark ? "#B8C7D6" : "var(--muted,#5A6472)";
					const ctaStyle = {
						height: 44,
						borderRadius: 8,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						textDecoration: "none",
						fontFamily: "Manrope,sans-serif",
						fontWeight: 700,
						fontSize: 14,
						background: hi ? "#EC844F" : "transparent",
						color: hi ? "#FFFFFF" : dark ? "#F09A6D" : "var(--outline,#B8541F)",
						border: hi ? "1px solid #EC844F" : dark ? "1px solid #F09A6D" : "1px solid var(--outline,#B8541F)",
					};
					const ctaClass = hi ? styles.ctaHi : dark ? styles.ctaDark : styles.ctaNormal;
					return (
						<div
							key={p.k}
							style={{
								background: dark ? "#0A2A4A" : "var(--surface,#FFFFFF)",
								color: dark ? "#FFFFFF" : "var(--text,#14181F)",
								border: hi ? "2px solid #EC844F" : dark ? "1px solid #1C3F60" : "1px solid var(--border,#E8E2DC)",
								borderRadius: 12,
								padding: "24px 20px",
								display: "flex",
								flexDirection: "column",
								gap: 12,
								position: "relative",
							}}
						>
							{p.badge && (
								<span
									style={{
										position: "absolute",
										top: -12,
										left: 20,
										fontFamily: "'IBM Plex Mono',monospace",
										fontSize: 11,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										padding: "4px 10px",
										borderRadius: 12,
										background: "#0A2A4A",
										color: "#FFFFFF",
									}}
								>
									{p.badge}
								</span>
							)}
							<h2 style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20 }}>{p.name}</h2>
							<span style={{ fontSize: 14, color: sub, minHeight: 44 }}>{p.for}</span>
							<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
								<span style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
									<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em" }}>
										{price}
									</span>
									<span style={{ fontSize: 14, color: sub }}>{Y ? "/month" : ""}</span>
								</span>
								<span style={{ fontSize: 13, color: sub, minHeight: 40 }}>{note}</span>
							</div>
							{dark ? (
								<Link href={path(country.code, "contact/partners")} className={ctaClass} style={ctaStyle}>
									{p.cta}
								</Link>
							) : (
								<a href={PORTAL_URL} className={ctaClass} style={ctaStyle}>
									{p.cta}
								</a>
							)}
							<div style={{ height: 1, background: dark ? "rgba(255,255,255,0.16)" : "var(--border,#E8E2DC)" }} />
							<ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
								{points.map((pt) => (
									<li key={pt} style={{ display: "flex", gap: 8, fontSize: 14, lineHeight: 1.45 }}>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke={dark ? "#F09A6D" : "var(--link,#B8541F)"}
											strokeWidth="2.2"
											strokeLinecap="round"
											aria-hidden="true"
											style={{ flex: "none", marginTop: 2 }}
										>
											<path d="M5 12l5 5L20 7" />
										</svg>
										{pt}
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</section>
		</>
	);
}
