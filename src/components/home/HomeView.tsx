import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { CountryData } from "@/data/countries";
import { HERO_STRIP, HOME_REGIONS, LOGO_SLOTS, PORTAL_NAV, REGION_ROWS, SHOW_PLACEHOLDERS, homeFeatures, regionCell } from "@/data/home";
import { money } from "@/lib/format";
import { path } from "@/lib/routes";
import { PORTAL_URL } from "@/lib/site";
import HeroBg from "./HeroBg";
import HowItWorks from "./HowItWorks";
import PricingLink from "./PricingLink";
import PromptBox, { PromptExamples } from "./PromptBox";
import styles from "./home.module.css";

const mono = (size: number, spacing: string): CSSProperties => ({
	fontFamily: "'IBM Plex Mono',monospace",
	fontSize: size,
	letterSpacing: spacing,
	textTransform: "uppercase",
	color: "var(--muted,#5A6472)",
});

const gutter = "clamp(16px,4cqw,24px)";
const frame = (top: string | number, bottom: string | number, extra?: CSSProperties): CSSProperties => ({
	maxWidth: 1240,
	margin: "0 auto",
	paddingLeft: gutter,
	paddingRight: gutter,
	paddingTop: top,
	paddingBottom: bottom,
	...extra,
});
const h2Style: CSSProperties = {
	fontFamily: "Manrope,sans-serif",
	fontWeight: 800,
	fontSize: "clamp(28px,4.4cqw,56px)",
	lineHeight: 1.02,
	letterSpacing: "-0.035em",
	margin: 0,
	color: "var(--head,#0A2A4A)",
	maxWidth: "20ch",
};
const dashed = "1px dashed var(--field,#D7D3CD)";

/** Numbered section header: eyebrow on the left, title (and intro) on the right. */
function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
	return (
		<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "14px 40px", borderTop: "1px solid var(--text,#14181F)", paddingTop: 20 }}>
			<span style={mono(12, "0.14em")}>{eyebrow}</span>
			<div style={{ gridColumn: "span 3", minWidth: "min(100%,300px)", display: "flex", flexDirection: "column", gap: 12 }}>
				<h2 style={h2Style}>{title}</h2>
				{children && <p style={{ margin: 0, fontSize: 17, color: "var(--muted,#5A6472)", maxWidth: "60ch" }}>{children}</p>}
			</div>
		</div>
	);
}

const feeRow: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--border,#E8E2DC)", flexWrap: "wrap" };
const feeTerm: CSSProperties = { fontFamily: "Manrope,sans-serif", fontWeight: 700 };
const feeDef: CSSProperties = { margin: 0, color: "var(--muted,#5A6472)" };

const rcptRow: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12 };
const rcptRule = (margin: string): CSSProperties => ({ borderTop: "1px dashed #B8BEC6", margin });
const receiptMask =
	"conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/14px 51% repeat-x,conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/14px 51% repeat-x";

export default function HomeView({ country }: { country: CountryData }) {
	const R = country.region;
	const cc = country.code;
	const fmt = (v: number) => money(country.currency, v);

	// Sample receipt: tax is inside the price (GST, VAT) or added on top (US sales tax).
	const sub = R.items[0][1] + R.items[1][1];
	const tax = R.taxIncluded ? sub - sub / (1 + R.taxRate) : sub * R.taxRate;
	const total = R.taxIncluded ? sub : sub + tax;
	const receiptItems = [R.items[0], R.items[1]].map(([l, v]) => [l, fmt(v)]);
	const receiptLines = [
		["Subtotal", fmt(sub)],
		[R.taxIncluded ? R.tax + " included" : R.tax + " (sample)", fmt(Math.round(tax * 100) / 100)],
		["Delivery", "Free"],
		["Payment provider", "Their own fee"],
	];

	const waiting = [
		["4 orders to ship", "Oldest paid 2 hours ago", "Ship"],
		["2 abandoned carts to remind", "Worth " + fmt(R.items[0][1] + R.items[3][1]), "Remind"],
		["1 supplier product to approve", "Added by your supplier this morning", "Review"],
	];
	const nums = [
		["Takings today", fmt(R.today)],
		["Orders today", "12"],
		["Visitors today", "840"],
	];

	return (
		<>
			<section style={frame("clamp(28px,4cqw,48px)", "clamp(40px,7cqw,96px)", { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24, position: "relative", isolation: "isolate" })}>
				<HeroBg />
				<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 18px", ...mono(12, "0.14em") }}>
					{HERO_STRIP.map((t, i) => (
						<Fragment key={t}>
							{i > 0 && (
								<span aria-hidden="true" style={{ color: "#EC844F" }}>
									●
								</span>
							)}
							<span>{t}</span>
						</Fragment>
					))}
				</div>
				<h1 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(34px,6.6cqw,84px)", lineHeight: 1.02, letterSpacing: "-0.04em", margin: 0, color: "var(--head,#0A2A4A)", maxWidth: "15ch" }}>
					Tell Us What You Sell. We’ll Build{" "}
					<span style={{ background: "linear-gradient(transparent 62%, rgba(236,132,79,0.45) 62%, rgba(236,132,79,0.45) 92%, transparent 92%)", padding: "0 0.04em" }}>Your Store.</span>
				</h1>
				<p style={{ margin: 0, fontSize: "clamp(16px,1.7cqw,20px)", lineHeight: 1.55, color: "var(--muted,#5A6472)", maxWidth: "56ch" }}>
					No themes, no design skills, no code. Say what you sell and how it should feel. You get a homepage, pages, menus and product pages to check, and nothing goes live until you approve it.
				</p>
				<PromptBox />
				<PromptExamples city={R.city} />
				<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>Starter is free forever. Paid plans start with 10 days of Business, no credit card.</span>
			</section>

			<section aria-label="Merchants" style={{ borderTop: "1px solid var(--border,#E8E2DC)", borderBottom: "1px solid var(--border,#E8E2DC)", background: "var(--surface,#FFFFFF)" }}>
				<div style={frame(22, 22, { display: "flex", alignItems: "center", gap: "16px 32px", flexWrap: "wrap", justifyContent: "center" })}>
					<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "var(--head,#0A2A4A)" }}>700+ merchants sell on DripFunnel</span>
					{SHOW_PLACEHOLDERS && (
						<div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
							{Array.from({ length: LOGO_SLOTS }, (_, i) => (
								<span key={i} style={{ width: 112, height: 40, border: dashed, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", ...mono(9, "0.12em") }}>
									Merchant logo
								</span>
							))}
						</div>
					)}
				</div>
			</section>

			<section style={frame("clamp(48px,9cqw,120px)", "clamp(40px,7cqw,88px)", { display: "flex", flexDirection: "column", gap: 40 })}>
				<SectionHead eyebrow="01 — How it works" title="Describe, preview, publish. Undo whenever you like.">
					This is {R.store}, a sample shop in {R.country}. Click through the four steps.
				</SectionHead>
				<HowItWorks region={R} />
			</section>

			<section style={{ background: "var(--sunk,#F3EDE8)" }}>
				<div style={frame("clamp(48px,9cqw,120px)", "clamp(48px,9cqw,120px)", { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))", gap: "clamp(32px,6cqw,88px)", alignItems: "center" })}>
					<div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
						<span style={mono(12, "0.14em")}>02 — Fees</span>
						<h2 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(30px,5cqw,64px)", lineHeight: 1, letterSpacing: "-0.04em", margin: 0, color: "var(--head,#0A2A4A)" }}>Read the last line of the receipt.</h2>
						<p style={{ margin: 0, fontSize: 18, color: "var(--muted,#5A6472)", maxWidth: "46ch" }}>
							DripFunnel takes nothing from your orders, on every plan, including Starter. You pay your payment provider’s own fee and that’s it.
						</p>
						<dl style={{ margin: "8px 0 0", display: "flex", flexDirection: "column", borderTop: "1px solid var(--text,#14181F)" }}>
							<div style={feeRow}>
								<dt style={feeTerm}>Starter</dt>
								<dd style={feeDef}>Free forever · 10 products</dd>
							</div>
							<div style={feeRow}>
								<dt style={feeTerm}>Paid plans</dt>
								<dd style={feeDef}>10 days of Business first, no card</dd>
							</div>
							<div style={feeRow}>
								<dt style={feeTerm}>Changing plan</dt>
								<dd style={feeDef}>Upgrades now · downgrades at period end</dd>
							</div>
						</dl>
						<PricingLink />
					</div>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<div
							aria-label="Sample order receipt"
							role="img"
							style={{
								width: "100%",
								maxWidth: 380,
								background: "#FFFFFF",
								color: "#14181F",
								padding: "36px 28px 40px",
								fontFamily: "'IBM Plex Mono',monospace",
								fontSize: 13,
								lineHeight: 1.5,
								transform: "rotate(-1.5deg)",
								filter: "drop-shadow(0 18px 28px rgba(10,42,74,0.16))",
								WebkitMask: receiptMask,
								mask: receiptMask,
								display: "flex",
								flexDirection: "column",
								gap: 6,
							}}
						>
							<span style={{ textAlign: "center", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.01em" }}>{R.store}</span>
							<span style={{ textAlign: "center", color: "#5A6472", fontSize: 11 }}>Order #1042 · {R.city}</span>
							<span style={rcptRule("10px 0 6px")} />
							{receiptItems.map(([l, v]) => (
								<span key={l} style={rcptRow}>
									<span>{l}</span>
									<span>{v}</span>
								</span>
							))}
							<span style={rcptRule("6px 0")} />
							{receiptLines.map(([l, v]) => (
								<span key={l} style={{ ...rcptRow, color: "#434A55" }}>
									<span>{l}</span>
									<span style={{ textAlign: "right" }}>{v}</span>
								</span>
							))}
							<span style={rcptRule("6px 0")} />
							<span style={{ ...rcptRow, fontWeight: 500, fontSize: 14 }}>
								<span>Shopper paid</span>
								<span>{fmt(Math.round(total * 100) / 100)}</span>
							</span>
							<span style={{ ...rcptRow, alignItems: "center", marginTop: 10, padding: "10px 12px", border: "2px solid #EC844F", borderRadius: 6, fontWeight: 500, fontSize: 14 }}>
								<span>DripFunnel fee</span>
								<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20, color: "#B8541F" }}>{fmt(0)}</span>
							</span>
							<span style={{ textAlign: "center", color: "#5A6472", fontSize: 11, marginTop: 12 }}>Sample order · thank you for shopping small</span>
						</div>
					</div>
				</div>
			</section>

			<section style={frame("clamp(48px,9cqw,120px)", "clamp(40px,7cqw,88px)", { display: "flex", flexDirection: "column", gap: 28 })}>
				<SectionHead eyebrow="03 — What you get" title="Everything a shop needs, in one portal." />
				<div style={{ display: "flex", flexDirection: "column" }}>
					{homeFeatures(R.tax).map((f) => (
						<Link key={f.n} href={path(cc, f.page)} className={styles.feat}>
							<span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, color: "var(--muted,#5A6472)" }}>{f.n}</span>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(19px,2.6cqw,32px)", lineHeight: 1.15, letterSpacing: "-0.025em" }}>{f.title}</span>
							<span style={{ fontSize: 16, color: "var(--muted,#5A6472)", lineHeight: 1.55 }}>{f.text}</span>
							<span aria-hidden="true" style={{ fontSize: 22, color: "var(--link,#B8541F)", textAlign: "right" }}>
								→
							</span>
						</Link>
					))}
				</div>
			</section>

			<section style={frame("clamp(32px,6cqw,72px)", "clamp(48px,9cqw,120px)", { display: "flex", flexDirection: "column", gap: 32 })}>
				<SectionHead eyebrow="04 — Your portal" title="Open it and see what needs you.">
					Home starts with what’s waiting: orders to ship, carts to win back, supplier products to approve. Then today’s numbers.
				</SectionHead>
				<div aria-hidden="true" style={{ border: "1.5px solid var(--text,#14181F)", borderRadius: 12, overflow: "hidden", background: "var(--paper,#FDFAF7)", display: "flex", minHeight: 420 }}>
					<div className={styles.side} style={{ width: 210, flex: "none", background: "#0A2A4A", color: "#FFFFFF", flexDirection: "column", padding: "16px 0", gap: 1 }}>
						<img src="/assets/dripfunnel-logo-inverse.svg" alt="" width={118} height={20} style={{ height: 20, width: "auto", alignSelf: "flex-start", margin: "0 16px 14px" }} />
						{PORTAL_NAV.map(([label, badge, on]) => (
							<span
								key={label}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 8,
									padding: "8px 16px 8px 13px",
									fontSize: 13,
									background: on ? "rgba(255,255,255,0.10)" : "transparent",
									borderLeft: `3px solid ${on ? "#EC844F" : "transparent"}`,
									fontWeight: on ? 700 : 400,
								}}
							>
								{label}
								{badge && <span style={{ minWidth: 20, padding: "1px 6px", borderRadius: 10, background: "#EC844F", color: "#FFFFFF", fontSize: 11, fontWeight: 700, textAlign: "center" }}>{badge}</span>}
							</span>
						))}
					</div>
					<div style={{ flex: 1, minWidth: 0, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>Good morning, {R.owner}</span>
							<span style={mono(10, "0.12em")}>{R.store} · sample data</span>
						</div>
						<div style={{ background: "var(--surface,#FFFFFF)", border: "1px solid var(--border,#E8E2DC)", borderRadius: 12, overflow: "hidden" }}>
							<div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border,#E8E2DC)", fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 15 }}>Waiting for you</div>
							{waiting.map(([t, d, a]) => (
								<div key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border,#E8E2DC)" }}>
									<span style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
										<span style={{ fontSize: 14, fontWeight: 600 }}>{t}</span>
										<span style={{ fontSize: 12, color: "var(--muted,#5A6472)" }}>{d}</span>
									</span>
									<span style={{ height: 32, padding: "0 12px", border: "1px solid var(--field,#D7D3CD)", borderRadius: 8, display: "flex", alignItems: "center", fontSize: 13 }}>{a}</span>
								</div>
							))}
						</div>
						<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10 }}>
							{nums.map(([l, v]) => (
								<div key={l} style={{ background: "var(--surface,#FFFFFF)", border: "1px solid var(--border,#E8E2DC)", borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 2 }}>
									<span style={{ fontSize: 12, color: "var(--muted,#5A6472)" }}>{l}</span>
									<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.03em" }}>{v}</span>
								</div>
							))}
						</div>
					</div>
				</div>
				<a href={PORTAL_URL} style={{ minHeight: 44, display: "flex", alignItems: "center", fontWeight: 500, alignSelf: "flex-start" }}>
					Open the portal →
				</a>
			</section>

			<section style={frame(0, "clamp(48px,9cqw,120px)", { display: "flex", flexDirection: "column", gap: 32 })}>
				<SectionHead eyebrow="05 — Sell worldwide" title="Local rules, local payments, local couriers.">
					Your shop follows the rules of the country it sells in. Here is what changes in three of them.
				</SectionHead>
				<div role="region" aria-label="Country comparison" tabIndex={0} style={{ overflow: "auto" }}>
					<table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", fontSize: 15 }}>
						<thead>
							<tr>
								<th scope="col" style={{ textAlign: "left", padding: "14px 16px 14px 0", width: "18%" }}>
									<span className="sr-only">Feature</span>
								</th>
								{HOME_REGIONS.map((r) => {
									const on = r.code === cc;
									return (
										<th key={r.code} scope="col" style={{ textAlign: "left", padding: "14px 16px", borderBottom: "1.5px solid var(--text,#14181F)", background: on ? "var(--tint,#FDF0E8)" : "transparent", verticalAlign: "bottom" }}>
											<span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
												{on && <span style={{ ...mono(10, "0.12em"), color: "var(--tint-fg,#8F4017)" }}>Your region</span>}
												<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em" }}>{r.region.country}</span>
												<span style={{ fontSize: 13, fontWeight: 400, color: "var(--muted,#5A6472)" }}>Sample shop: {r.region.store}</span>
											</span>
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{REGION_ROWS.map((row) => (
								<tr key={row}>
									<th scope="row" style={{ textAlign: "left", padding: "14px 16px 14px 0", borderBottom: "1px solid var(--border,#E8E2DC)", ...mono(12, "0.14em"), fontWeight: 400 }}>
										{row}
									</th>
									{HOME_REGIONS.map((r) => (
										<td key={r.code} style={{ padding: "14px 16px", borderBottom: "1px solid var(--border,#E8E2DC)", background: r.code === cc ? "var(--tint,#FDF0E8)" : "transparent", verticalAlign: "top" }}>
											{regionCell(row, r)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{SHOW_PLACEHOLDERS && (
				<section aria-label="What merchants say" style={frame(0, "clamp(48px,9cqw,120px)")}>
					<figure style={{ margin: "0 auto", maxWidth: 900, border: dashed, borderRadius: 12, padding: "clamp(28px,5cqw,56px)", display: "flex", flexDirection: "column", gap: 18, alignItems: "center", textAlign: "center" }}>
						<span style={mono(12, "0.14em")}>Testimonial placeholder</span>
						<blockquote style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: "clamp(20px,3cqw,34px)", lineHeight: 1.25, letterSpacing: "-0.02em", color: "var(--muted,#5A6472)" }}>
							“A merchant’s own words go here, one or two sentences about what changed for their shop.”
						</blockquote>
						<figcaption style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>Name · Shop · Country</figcaption>
					</figure>
				</section>
			)}

			<section data-band="" style={{ background: "var(--band,#0A2A4A)", color: "#FFFFFF" }}>
				<div style={frame("clamp(48px,9cqw,120px)", "clamp(48px,9cqw,120px)", { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 })}>
					<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(32px,6cqw,76px)", letterSpacing: "-0.04em", lineHeight: 1, maxWidth: "14ch" }}>Your shop can be live today.</span>
					<span style={{ fontSize: 18, color: "#B8C7D6", maxWidth: "52ch" }}>Describe it, preview it, publish it. Starter is free forever.</span>
					<PromptBox band />
					<Link href={path(cc, "contact/demo")} className={styles.demo}>
						Or book a demo
					</Link>
				</div>
			</section>
		</>
	);
}
