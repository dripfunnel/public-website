import Link from "next/link";
import type { CountryData } from "@/data/countries";
import { LEGAL, type LegalKey } from "@/data/legal";
import { path } from "@/lib/routes";
import LegalJumpList from "./LegalJumpList";

export default function LegalView({ country, doc }: { country: CountryData; doc: LegalKey }) {
	const legal = LEGAL[doc];
	return (
		<section
			data-screen-label="Legal"
			style={{
				maxWidth: 1240,
				margin: "0 auto",
				padding: "clamp(40px,7cqw,80px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)",
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
				gap: 40,
				alignItems: "start",
			}}
		>
			<nav aria-label="On this page" style={{ display: "flex", flexDirection: "column", gap: 2, position: "sticky", top: 96 }}>
				<span
					style={{
						fontFamily: "'IBM Plex Mono',monospace",
						fontSize: 11,
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: "var(--muted,#5A6472)",
						paddingBottom: 8,
					}}
				>
					On this page
				</span>
				<LegalJumpList sections={legal.sections} />
				<Link
					href={path(country.code, legal.otherPage)}
					style={{ minHeight: 44, display: "flex", alignItems: "center", fontSize: 14, marginTop: 12 }}
				>
					{legal.other}
				</Link>
			</nav>
			<article style={{ gridColumn: "span 3", minWidth: "min(100%,300px)", maxWidth: 760, display: "flex", flexDirection: "column", gap: 18 }}>
				<h1
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(30px,5cqw,50px)",
						lineHeight: 1.05,
						letterSpacing: "-0.035em",
						margin: 0,
						color: "var(--head,#0A2A4A)",
					}}
				>
					{legal.title}
				</h1>
				<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>Last updated: [date] · Applies from: [date]</span>
				<div
					role="note"
					style={{
						background: "var(--tint,#FDF0E8)",
						color: "var(--tint-fg,#8F4017)",
						borderRadius: 12,
						padding: "14px 16px",
						fontSize: 15,
					}}
				>
					Template text. Replace every section with wording approved by your lawyer before publishing.
				</div>
				<p style={{ margin: 0, fontSize: 17, lineHeight: 1.7 }}>{legal.intro}</p>
				{legal.sections.map((s, i) => (
					<section key={s.heading} id={"sec-" + (i + 1)} style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 12 }}>
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
							{i + 1}. {s.heading}
						</h2>
						<p style={{ margin: 0, fontSize: 16, lineHeight: 1.75 }}>{s.text}</p>
					</section>
				))}
			</article>
		</section>
	);
}
