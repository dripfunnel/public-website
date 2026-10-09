import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import type { CountryData } from "@/data/countries";
import { faqAnswer, FAQS, setupLine } from "@/data/pricing";
import { PLAN_PRICES } from "@/data/prices";
import { money } from "@/lib/format";
import { path } from "@/lib/routes";
import { faqSchema } from "@/lib/schema";
import { PORTAL_URL } from "@/lib/site";
import PricingFaq from "./PricingFaq";
import PricingTable from "./PricingTable";
import PricingTop from "./PricingTop";
import styles from "./pricing.module.css";

/** Pricing page. Static text is rendered on the server; everything that shows a price is in client components. */
export default function PricingView({ country }: { country: CountryData }) {
	// Structured data uses the country's own currency (what the server renders for this address).
	const setup = setupLine(PLAN_PRICES[country.currency], (v) => money(country.currency, v));
	const faqData = faqSchema(FAQS.map((f) => ({ q: f.q, a: faqAnswer(f, setup) })));

	return (
		<>
			<JsonLd data={faqData} />
			<PricingTop>
				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					<span style={{ width: 32, height: 2, background: "#EC844F", display: "block" }} />
					<span
						style={{
							fontFamily: "'IBM Plex Mono',monospace",
							fontSize: 12,
							letterSpacing: "0.14em",
							textTransform: "uppercase",
							color: "var(--muted,#5A6472)",
						}}
					>
						Pricing
					</span>
				</div>
				<h1
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(32px,5.5cqw,60px)",
						lineHeight: 1.04,
						letterSpacing: "-0.035em",
						margin: 0,
						maxWidth: "18ch",
						color: "var(--head,#0A2A4A)",
					}}
				>
					Start free. Pay when your shop grows.
				</h1>
				<span
					style={{
						display: "inline-flex",
						padding: "6px 14px",
						borderRadius: 20,
						background: "var(--okbg,#EEF7F2)",
						color: "var(--okfg,#1D6B47)",
						fontFamily: "Manrope,sans-serif",
						fontWeight: 700,
						fontSize: 14,
					}}
				>
					Try everything in Business free for 10 days · no credit card required
				</span>
				<p style={{ margin: 0, maxWidth: "60ch", fontSize: 17, color: "var(--muted,#5A6472)" }}>
					Every plan has a real shop, unlimited orders, zero fees on your orders and the legal details your markets need. Paid plans add
					more products, a team, suppliers and selling abroad.
				</p>
			</PricingTop>
			<PricingTable />
			<section
				style={{
					maxWidth: 880,
					margin: "0 auto",
					padding: "0 clamp(16px,4cqw,24px) 80px",
					display: "flex",
					flexDirection: "column",
					gap: 14,
				}}
			>
				<div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
					<span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.14em", color: "var(--link,#B8541F)" }}>
						02
					</span>
					<h2
						style={{
							fontFamily: "Manrope,sans-serif",
							fontWeight: 800,
							fontSize: "clamp(22px,3.4cqw,34px)",
							letterSpacing: "-0.025em",
							margin: 0,
							color: "var(--head,#0A2A4A)",
						}}
					>
						Questions
					</h2>
				</div>
				<PricingFaq />
			</section>
			<section data-band="" style={{ background: "var(--band,#0A2A4A)", color: "#FFFFFF" }}>
				<div
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						padding: "clamp(44px,7cqw,80px) clamp(16px,4cqw,24px)",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 24,
						flexWrap: "wrap",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
						<span
							style={{
								fontFamily: "Manrope,sans-serif",
								fontWeight: 800,
								fontSize: "clamp(22px,3.6cqw,36px)",
								letterSpacing: "-0.025em",
							}}
						>
							Your shop can be live today.
						</span>
						<span style={{ fontSize: 16, color: "#B8C7D6" }}>Try everything in Business free for 10 days. No credit card required.</span>
					</div>
					<div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
						<a
							href={PORTAL_URL}
							className={styles.bandBtn}
							style={{
								height: 48,
								padding: "0 24px",
								borderRadius: 8,
								background: "#EC844F",
								color: "#FFFFFF",
								textDecoration: "none",
								display: "flex",
								alignItems: "center",
								fontFamily: "Manrope,sans-serif",
								fontWeight: 700,
							}}
						>
							Start free
						</a>
						<Link
							href={path(country.code, "contact/sales")}
							className={styles.bandLink}
							style={{ minHeight: 44, display: "flex", alignItems: "center", color: "#F09A6D", fontWeight: 500 }}
						>
							Talk to us
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
