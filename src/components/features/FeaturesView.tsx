import type { CSSProperties } from "react";
import Link from "next/link";
import type { CountryData } from "@/data/countries";
import { SETUP_TOKEN, TONES, featureStats, getFeatureSections, planColor } from "@/data/features";
import { money } from "@/lib/format";
import { path } from "@/lib/routes";
import { PORTAL_URL } from "@/lib/site";
import FeaturesNav from "./FeaturesNav";
import FeaturesIndex from "./FeaturesIndex";
import SetupFrom from "./SetupFrom";
import styles from "./features.module.css";

const SIDE: CSSProperties = { paddingLeft: "clamp(16px,4cqw,24px)", paddingRight: "clamp(16px,4cqw,24px)" };
const MONO_HEAD: CSSProperties = {
	fontFamily: "'IBM Plex Mono',monospace",
	fontSize: 12,
	letterSpacing: "0.14em",
	textTransform: "uppercase",
	color: "var(--muted,#5A6472)",
};
const H2: CSSProperties = {
	fontFamily: "Manrope,sans-serif",
	fontWeight: 800,
	fontSize: "clamp(28px,4.4cqw,56px)",
	lineHeight: 1.02,
	letterSpacing: "-0.035em",
	margin: 0,
	color: "var(--head,#0A2A4A)",
};

export default function FeaturesView({ country }: { country: CountryData }) {
	const sections = getFeatureSections(country.region, (v) => money(country.currency, v));
	const { count, free } = featureStats(sections);

	return (
		<>
			<section
				data-screen-label="Features"
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					...SIDE,
					paddingTop: "clamp(32px,6cqw,80px)",
					paddingBottom: "clamp(32px,5cqw,56px)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					textAlign: "center",
					gap: 20,
				}}
			>
				<span style={MONO_HEAD}>Features</span>
				<h1
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(34px,6.6cqw,84px)",
						lineHeight: 1.02,
						letterSpacing: "-0.04em",
						margin: 0,
						color: "var(--head,#0A2A4A)",
						maxWidth: "15ch",
					}}
				>
					Everything a shop needs. Nothing to bolt on.
				</h1>
				<p style={{ margin: 0, fontSize: "clamp(16px,1.7cqw,20px)", color: "var(--muted,#5A6472)", maxWidth: "58ch" }}>
					{count} features across ten parts of running a shop, all in one portal. Each one says which plan it starts on, and
					every plan has zero fees on your orders.
				</p>
				<div style={{ display: "flex", gap: "6px 18px", flexWrap: "wrap", justifyContent: "center", ...MONO_HEAD }}>
					<span>{count} features</span>
					<span aria-hidden="true" style={{ color: "#EC844F" }}>
						●
					</span>
					<span>{free} on Starter (Free)</span>
					<span aria-hidden="true" style={{ color: "#EC844F" }}>
						●
					</span>
					<span>5 plans</span>
				</div>
			</section>

			<FeaturesNav items={sections.map((s) => ({ id: s.id, n: s.n, label: s.label }))} />

			{sections.map((f) => (
				<section
					key={f.id}
					id={f.id}
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						...SIDE,
						paddingTop: "clamp(44px,8cqw,104px)",
						paddingBottom: "clamp(32px,6cqw,72px)",
						display: "flex",
						flexDirection: "column",
						gap: 36,
						scrollMarginTop: 140,
					}}
				>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
							gap: "14px 40px",
							borderTop: "1px solid var(--text,#14181F)",
							paddingTop: 20,
						}}
					>
						<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
							<span style={MONO_HEAD}>
								{f.n} — {f.label}
							</span>
							<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>{f.plan}</span>
						</div>
						<div style={{ gridColumn: "span 3", minWidth: "min(100%,300px)", display: "flex", flexDirection: "column", gap: 12 }}>
							<h2 style={{ ...H2, maxWidth: "20ch" }}>{f.title}</h2>
							<p style={{ margin: 0, fontSize: 17, color: "var(--muted,#5A6472)", maxWidth: "60ch" }}>{f.lead}</p>
						</div>
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
							gap: "clamp(28px,4cqw,56px)",
							alignItems: "start",
						}}
					>
						<dl
							style={{
								gridColumn: "span 2",
								minWidth: "min(100%,340px)",
								margin: 0,
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,260px),1fr))",
								gap: "0 32px",
							}}
						>
							{f.items.map((x) => (
								<div
									key={x.t}
									style={{
										padding: "16px 0",
										borderBottom: "1px solid var(--border,#E8E2DC)",
										display: "flex",
										flexDirection: "column",
										gap: 4,
									}}
								>
									<dt style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
										<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>{x.t}</span>
										<span
											style={{
												fontFamily: "'IBM Plex Mono',monospace",
												fontSize: 10,
												letterSpacing: "0.08em",
												textTransform: "uppercase",
												color: planColor(x.p),
												whiteSpace: "nowrap",
												flex: "none",
											}}
										>
											{x.p}
										</span>
									</dt>
									<dd style={{ margin: 0, fontSize: 14, color: "var(--muted,#5A6472)", lineHeight: 1.5 }}>
										{x.d.includes(SETUP_TOKEN) ? (
											<>
												{x.d.split(SETUP_TOKEN)[0]}
												<SetupFrom />
												{x.d.split(SETUP_TOKEN)[1]}
											</>
										) : (
											x.d
										)}
									</dd>
								</div>
							))}
						</dl>
						<div aria-hidden="true" className={styles.mock}>
							<div
								style={{
									padding: "14px 18px",
									borderBottom: "1px solid var(--border,#E8E2DC)",
									display: "flex",
									justifyContent: "space-between",
									gap: 10,
									flexWrap: "wrap",
								}}
							>
								<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 15 }}>{f.mockTitle}</span>
								<span style={{ fontSize: 13, color: "var(--muted,#5A6472)" }}>{f.mockSub}</span>
							</div>
							{f.bars && (
								<div style={{ padding: "20px 18px 12px", display: "flex", alignItems: "flex-end", gap: 10, height: 200 }}>
									{f.bars.map((b, i) => (
										<div
											key={i}
											style={{
												flex: 1,
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												gap: 6,
												height: "100%",
												justifyContent: "flex-end",
											}}
										>
											<span
												style={{
													width: "100%",
													height: b.h,
													background: b.highlight ? "#EC844F" : "var(--head,#0A2A4A)",
													borderRadius: "4px 4px 0 0",
												}}
											/>
											<span style={{ fontSize: 11, color: "var(--muted,#5A6472)" }}>{b.l}</span>
										</div>
									))}
								</div>
							)}
							{f.rows.map((r) => (
								<div
									key={r.a}
									style={{
										display: "flex",
										alignItems: "center",
										gap: 12,
										padding: "12px 18px",
										borderBottom: "1px solid var(--border,#E8E2DC)",
										flexWrap: "wrap",
									}}
								>
									<span style={{ flex: 1, minWidth: 150, display: "flex", flexDirection: "column" }}>
										<span style={{ fontWeight: 600 }}>{r.a}</span>
										<span style={{ fontSize: 13, color: "var(--muted,#5A6472)" }}>{r.b}</span>
									</span>
									<span style={{ fontSize: 13, color: "var(--text,#14181F)" }}>{r.c}</span>
									{r.pill && (
										<span
											style={{
												fontSize: 12,
												fontWeight: 600,
												padding: "3px 10px",
												borderRadius: 12,
												background: TONES[r.tone][0],
												color: TONES[r.tone][1],
											}}
										>
											{r.pill}
										</span>
									)}
								</div>
							))}
							{f.foot && (
								<div style={{ padding: "12px 18px", fontSize: 13, color: "var(--muted,#5A6472)", background: "var(--paper,#FDFAF7)" }}>
									{f.foot}
								</div>
							)}
						</div>
					</div>
				</section>
			))}

			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					...SIDE,
					paddingTop: "clamp(32px,6cqw,72px)",
					paddingBottom: "clamp(48px,9cqw,120px)",
					display: "flex",
					flexDirection: "column",
					gap: 28,
				}}
			>
				<FeaturesIndex
					groups={sections.map((s) => ({ n: s.n, label: s.label, items: s.items.map((x) => ({ t: x.t, p: x.p })) }))}
					pricingHref={path(country.code, "pricing")}
				/>
			</section>

			<section data-band="" style={{ background: "var(--band,#0A2A4A)", color: "#FFFFFF" }}>
				<div
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						...SIDE,
						paddingTop: "clamp(48px,9cqw,120px)",
						paddingBottom: "clamp(48px,9cqw,120px)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						textAlign: "center",
						gap: 24,
					}}
				>
					<span
						style={{
							fontFamily: "Manrope,sans-serif",
							fontWeight: 800,
							fontSize: "clamp(32px,6cqw,76px)",
							letterSpacing: "-0.04em",
							lineHeight: 1,
							maxWidth: "14ch",
						}}
					>
						Try every feature for 10 days.
					</span>
					<span style={{ fontSize: 18, color: "#B8C7D6", maxWidth: "52ch" }}>
						New shops get everything in Business, no credit card. Then pick a plan or stay on Starter for free.
					</span>
					<div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
						<a href={PORTAL_URL} className={styles.startBtn}>
							Start free
						</a>
						<Link href={path(country.code, "pricing")} className={styles.bandLink}>
							Compare plans
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
