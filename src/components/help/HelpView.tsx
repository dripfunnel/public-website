import Link from "next/link";
import type { CountryData } from "@/data/countries";
import { ALL_ARTICLES, HELP_CATEGORIES } from "@/data/help";
import { path } from "@/lib/routes";
import HelpSearch from "./HelpSearch";
import styles from "./help.module.css";

export default function HelpView({ country }: { country: CountryData }) {
	const code = country.code;

	return (
		<div data-screen-label="Help centre">
			<HelpSearch
				country={code}
				articles={ALL_ARTICLES}
				heading={
					<h1
						style={{
							fontFamily: "Manrope,sans-serif",
							fontWeight: 800,
							fontSize: "clamp(30px,5cqw,52px)",
							lineHeight: 1.05,
							letterSpacing: "-0.035em",
							margin: 0,
							color: "var(--head,#0A2A4A)",
						}}
					>
						How can we help?
					</h1>
				}
				footer={
					<div
						style={{
							background: "var(--surface,#FFFFFF)",
							border: "1px solid var(--border,#E8E2DC)",
							borderRadius: 12,
							padding: 24,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 16,
							flexWrap: "wrap",
						}}
					>
						<span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20 }}>Still stuck?</span>
							<span style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>
								Write to our support team. Paid plans also get chat from inside the portal.
							</span>
						</span>
						<Link href={path(code, "contact/support")} className={styles.cta}>
							Contact support
						</Link>
					</div>
				}
			>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,270px),1fr))",
						gap: 14,
					}}
				>
					{HELP_CATEGORIES.map((c) => (
						<div
							key={c.cid}
							style={{
								background: "var(--surface,#FFFFFF)",
								border: "1px solid var(--border,#E8E2DC)",
								borderRadius: 12,
								padding: 20,
								display: "flex",
								flexDirection: "column",
								gap: 6,
							}}
						>
							<h2 style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 18 }}>{c.title}</h2>
							<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>{c.desc}</span>
							<ul
								style={{
									margin: "6px 0 0",
									padding: 0,
									listStyle: "none",
									display: "flex",
									flexDirection: "column",
								}}
							>
								{c.articles.map((a) => (
									<li key={a.id}>
										<Link
											href={path(code, `help/${a.id}`)}
											style={{ minHeight: 40, display: "flex", alignItems: "center", fontSize: 15 }}
										>
											{a.t}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</HelpSearch>
		</div>
	);
}
