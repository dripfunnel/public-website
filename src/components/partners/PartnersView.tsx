import Link from "next/link";
import type { CountryData } from "@/data/countries";
import { PARTNER_BLOCKS, PARTNER_DOMAINS, PARTNER_STATEMENT, PARTNER_STATS, PARTNER_STEPS } from "@/data/partners";
import { path } from "@/lib/routes";
import { SALES_EMAIL } from "@/lib/site";
import styles from "./partners.module.css";

const MONO = "'IBM Plex Mono',monospace";
const H2_MID = {
	fontFamily: "Manrope,sans-serif",
	fontWeight: 800,
	fontSize: "clamp(24px,4cqw,42px)",
	lineHeight: 1.08,
	letterSpacing: "-0.03em",
	margin: 0,
	color: "var(--head,#0A2A4A)",
} as const;
const BTN = {
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
} as const;

/** Partners (white-label) page. Fully static. The example partner and payout figures are a fixed sample. */
export default function PartnersView({ country }: { country: CountryData }) {
	const contact = path(country.code, "contact/partners");
	return (
		<>
			<section data-screen-label="Partners" data-band="" style={{ background: "var(--band,#0A2A4A)", color: "#FFFFFF" }}>
				<div
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						padding: "clamp(44px,8cqw,112px) clamp(16px,4cqw,24px)",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
						gap: "clamp(32px,5cqw,64px)",
						alignItems: "center",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
						<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
							<span style={{ width: 32, height: 2, background: "#EC844F", display: "block" }} />
							<span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#B8C7D6" }}>
								Partners · white-label
							</span>
						</div>
						<h1
							style={{
								fontFamily: "Manrope,sans-serif",
								fontWeight: 800,
								fontSize: "clamp(32px,6cqw,64px)",
								lineHeight: 1.03,
								letterSpacing: "-0.035em",
								margin: 0,
							}}
						>
							Run DripFunnel under your own brand.
						</h1>
						<p style={{ margin: 0, fontSize: 18, color: "#B8C7D6", maxWidth: "52ch" }}>
							For agencies and groups that run shops for others. Your name on the portal, the shops and every email. Your plans and your
							prices. Many stores under one account.
						</p>
						<div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
							<Link href={contact} className={styles.btn} style={{ ...BTN, fontSize: 16 }}>
								Talk to us
							</Link>
							<a
								href={`mailto:${SALES_EMAIL}`}
								className={styles.link}
								style={{ minHeight: 44, display: "flex", alignItems: "center", color: "#F09A6D", fontWeight: 500 }}
							>
								{SALES_EMAIL}
							</a>
						</div>
					</div>
					<div
						aria-hidden="true"
						style={{ background: "#FFFFFF", color: "#14181F", borderRadius: 12, overflow: "hidden", border: "1px solid #1C3F60" }}
					>
						<div style={{ height: 48, padding: "0 16px", display: "flex", alignItems: "center", gap: 10, background: "#1F4B3A", color: "#FFFFFF" }}>
							<span style={{ width: 24, height: 24, borderRadius: 6, background: "#F4C95D" }} />
							<strong style={{ fontFamily: "Manrope,sans-serif", fontSize: 14 }}>Northstar Shops</strong>
							<span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, opacity: 0.85 }}>store.northstar.com</span>
						</div>
						<div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
							<span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#5A6472" }}>
								Example partner · your brand here
							</span>
							<div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 8 }}>
								{PARTNER_STATS.map((x) => (
									<div
										key={x.l}
										style={{ border: "1px solid #E8E2DC", borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column" }}
									>
										<span style={{ fontSize: 11, color: "#5A6472" }}>{x.l}</span>
										<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 18 }}>{x.v}</span>
									</div>
								))}
							</div>
							{PARTNER_DOMAINS.map((d) => (
								<div
									key={d.l}
									style={{
										display: "flex",
										justifyContent: "space-between",
										gap: 8,
										padding: "9px 0",
										borderTop: "1px solid #E8E2DC",
										fontSize: 13,
										flexWrap: "wrap",
									}}
								>
									<span style={{ color: "#5A6472" }}>{d.l}</span>
									<span style={{ fontFamily: MONO, fontSize: 12 }}>{d.v}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "clamp(44px,8cqw,104px) clamp(16px,4cqw,24px)",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
					gap: 14,
				}}
			>
				{PARTNER_BLOCKS.map((b, i) => (
					<div
						key={b.t}
						style={{
							background: "var(--surface,#FFFFFF)",
							border: "1px solid var(--border,#E8E2DC)",
							borderRadius: 12,
							padding: 24,
							display: "flex",
							flexDirection: "column",
							gap: 12,
						}}
					>
						<span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.12em", color: "var(--link,#B8541F)" }}>0{i + 1}</span>
						<h2
							style={{
								margin: 0,
								fontFamily: "Manrope,sans-serif",
								fontWeight: 800,
								fontSize: 22,
								letterSpacing: "-0.02em",
								color: "var(--head,#0A2A4A)",
							}}
						>
							{b.t}
						</h2>
						<span style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>{b.d}</span>
						<ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column" }}>
							{b.pts.map((p) => (
								<li key={p} style={{ padding: "9px 0", borderTop: "1px solid var(--border,#E8E2DC)", fontSize: 14 }}>
									{p}
								</li>
							))}
						</ul>
					</div>
				))}
			</section>
			<section style={{ background: "var(--sunk,#F3EDE8)" }}>
				<div
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						padding: "clamp(44px,8cqw,96px) clamp(16px,4cqw,24px)",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
						gap: "clamp(28px,5cqw,56px)",
						alignItems: "start",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
						<h2 style={H2_MID}>How the money works</h2>
						<p style={{ margin: 0, fontSize: 17, color: "var(--muted,#5A6472)" }}>
							Your merchants pay you, at the prices you set. DripFunnel keeps a wholesale fee for each store and pays you the rest every
							month, with a statement that shows every line.
						</p>
						<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>Wholesale rates depend on volume. Talk to us for yours.</span>
					</div>
					<div
						style={{
							background: "var(--surface,#FFFFFF)",
							border: "1px solid var(--border,#E8E2DC)",
							borderRadius: 12,
							overflow: "hidden",
						}}
					>
						<div
							style={{
								padding: "14px 18px",
								borderBottom: "1px solid var(--border,#E8E2DC)",
								display: "flex",
								justifyContent: "space-between",
								gap: 8,
								flexWrap: "wrap",
							}}
						>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700 }}>Monthly payout statement</span>
							<span
								style={{
									fontFamily: MONO,
									fontSize: 10,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									color: "var(--muted,#5A6472)",
								}}
							>
								Example figures
							</span>
						</div>
						{PARTNER_STATEMENT.map((x) => (
							<div
								key={x.l}
								style={{
									display: "flex",
									justifyContent: "space-between",
									gap: 12,
									padding: "12px 18px",
									borderBottom: "1px solid var(--border,#E8E2DC)",
									fontSize: 15,
									fontWeight: x.w,
								}}
							>
								<span>{x.l}</span>
								<span style={{ fontVariantNumeric: "tabular-nums" }}>{x.v}</span>
							</div>
						))}
					</div>
				</div>
			</section>
			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "clamp(44px,8cqw,104px) clamp(16px,4cqw,24px)",
					display: "flex",
					flexDirection: "column",
					gap: 28,
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
					<h2 style={H2_MID}>From first call to live</h2>
					<p style={{ margin: 0, fontSize: 17, color: "var(--muted,#5A6472)" }}>
						Every partner is checked before going live, so shops under your brand start on solid ground.
					</p>
				</div>
				<ol
					style={{
						margin: 0,
						padding: 0,
						listStyle: "none",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))",
						gap: 14,
					}}
				>
					{PARTNER_STEPS.map((x, i) => (
						<li key={x.t} style={{ borderTop: "2px solid #EC844F", paddingTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
							<span style={{ fontFamily: MONO, fontSize: 12, color: "var(--link,#B8541F)" }}>0{i + 1}</span>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 17 }}>{x.t}</span>
							<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>{x.d}</span>
						</li>
					))}
				</ol>
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
					<div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 620 }}>
						<span
							style={{
								fontFamily: "Manrope,sans-serif",
								fontWeight: 800,
								fontSize: "clamp(22px,3.6cqw,36px)",
								letterSpacing: "-0.025em",
							}}
						>
							Tell us about the shops you run.
						</span>
						<span style={{ fontSize: 16, color: "#B8C7D6" }}>
							How many stores, which countries, and what you’d like to charge. We’ll come back with a wholesale rate and a plan to go live.
						</span>
					</div>
					<Link href={contact} className={styles.btn} style={BTN}>
						Talk to us
					</Link>
				</div>
			</section>
		</>
	);
}
