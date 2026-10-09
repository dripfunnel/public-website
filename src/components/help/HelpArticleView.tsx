import Link from "next/link";
import { notFound } from "next/navigation";
import type { CountryData } from "@/data/countries";
import { getHelpArticle } from "@/data/help";
import { path } from "@/lib/routes";
import HelpFeedback from "./HelpFeedback";
import styles from "./help.module.css";

export default function HelpArticleView({ country, slug }: { country: CountryData; slug: string }) {
	const art = getHelpArticle(slug);
	if (!art) notFound();
	const code = country.code;

	return (
		<article
			data-screen-label="Help article"
			style={{
				maxWidth: 1240,
				margin: "0 auto",
				padding: "clamp(32px,6cqw,64px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)",
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
				gap: 40,
				alignItems: "start",
			}}
		>
			<div
				style={{
					gridColumn: "span 2",
					minWidth: "min(100%,300px)",
					maxWidth: 720,
					display: "flex",
					flexDirection: "column",
					gap: 18,
				}}
			>
				<nav
					aria-label="Breadcrumb"
					style={{ fontSize: 14, display: "flex", gap: 8, flexWrap: "wrap", color: "var(--muted,#5A6472)" }}
				>
					<Link href={path(code, "help")}>Help centre</Link>
					<span aria-hidden="true">/</span>
					<span>{art.cat}</span>
				</nav>
				<h1
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(26px,4.4cqw,42px)",
						lineHeight: 1.1,
						letterSpacing: "-0.03em",
						margin: 0,
						color: "var(--head,#0A2A4A)",
					}}
				>
					{art.t}
				</h1>
				<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>Updated 1 October 2026 · {art.who}</span>
				<p style={{ margin: 0, fontSize: 17, lineHeight: 1.7 }}>{art.intro}</p>
				<ol
					style={{
						margin: 0,
						padding: "0 0 0 22px",
						display: "flex",
						flexDirection: "column",
						gap: 12,
						fontSize: 16,
						lineHeight: 1.65,
					}}
				>
					{art.steps.map((x) => (
						<li key={x}>{x}</li>
					))}
				</ol>
				{art.note && (
					<div
						style={{
							background: "var(--sunk,#F3EDE8)",
							borderRadius: 12,
							padding: "16px 18px",
							fontSize: 15,
						}}
					>
						<strong>Good to know: </strong>
						{art.note}
					</div>
				)}
				{art.stub && (
					<div
						style={{
							border: "1px dashed var(--field,#D7D3CD)",
							borderRadius: 12,
							padding: 18,
							fontSize: 15,
							color: "var(--muted,#5A6472)",
						}}
					>
						Placeholder: step-by-step instructions go here.
					</div>
				)}
				<HelpFeedback />
			</div>
			<aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
				<div
					style={{
						background: "var(--surface,#FFFFFF)",
						border: "1px solid var(--border,#E8E2DC)",
						borderRadius: 12,
						padding: 20,
						display: "flex",
						flexDirection: "column",
						gap: 4,
					}}
				>
					<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 16, paddingBottom: 4 }}>
						More in {art.cat}
					</span>
					{art.more.map((a) => (
						<Link
							key={a.id}
							href={path(code, `help/${a.id}`)}
							style={{ minHeight: 40, display: "flex", alignItems: "center", fontSize: 15 }}
						>
							{a.t}
						</Link>
					))}
				</div>
				<div
					style={{
						background: "var(--surface,#FFFFFF)",
						border: "1px solid var(--border,#E8E2DC)",
						borderRadius: 12,
						padding: 20,
						display: "flex",
						flexDirection: "column",
						gap: 10,
					}}
				>
					<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 16 }}>Need a person?</span>
					<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>
						Tell us your store name and what you were trying to do.
					</span>
					<Link href={path(code, "contact/support")} className={styles.outlineLink}>
						Contact support
					</Link>
				</div>
			</aside>
		</article>
	);
}
