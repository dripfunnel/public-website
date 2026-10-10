import type { CSSProperties } from "react";
import Link from "next/link";
import type { CountryData } from "@/data/countries";
import { AI_DESIGNS, AI_STEPS, HIST_PLANS, getAiPrompts } from "@/data/ai";
import { path } from "@/lib/routes";
import { PORTAL_URL } from "@/lib/site";
import AiPreview from "./AiPreview";
import AiHistory from "./AiHistory";
import AiSetupLine from "./AiSetupLine";
import styles from "./ai.module.css";

const H2: CSSProperties = {
	fontFamily: "Manrope,sans-serif",
	fontWeight: 800,
	fontSize: "clamp(26px,4cqw,44px)",
	lineHeight: 1.08,
	letterSpacing: "-0.03em",
	margin: 0,
	color: "var(--head,#0A2A4A)",
};
const LEAD: CSSProperties = { margin: 0, fontSize: 17, color: "var(--muted,#5A6472)" };
const WRAP_PAD = "clamp(44px,8cqw,96px) clamp(16px,4cqw,24px)";
const MONO_LABEL: CSSProperties = {
	fontFamily: "'IBM Plex Mono',monospace",
	fontSize: 11,
	letterSpacing: "0.12em",
	textTransform: "uppercase",
};

export default function AiView({ country }: { country: CountryData }) {
	const { region } = country;
	const prompts = getAiPrompts(region);

	return (
		<>
			<section
				data-screen-label="AI Builder"
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "clamp(40px,7cqw,96px) clamp(16px,4cqw,24px) clamp(36px,5cqw,64px)",
					display: "flex",
					flexDirection: "column",
					gap: 22,
				}}
			>
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
						AI Store Builder
					</span>
				</div>
				<h1
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(32px,6cqw,68px)",
						lineHeight: 1.03,
						letterSpacing: "-0.035em",
						margin: 0,
						color: "var(--head,#0A2A4A)",
						maxWidth: "16ch",
					}}
				>
					Your whole store, designed from a description.
				</h1>
				<p style={{ margin: 0, fontSize: "clamp(16px,1.6cqw,19px)", color: "var(--muted,#5A6472)", maxWidth: "60ch" }}>
					There are no themes to pick and no templates to fight. You tell the AI about your business. It designs the homepage,
					pages, menus, product pages and the look of all of them. You check it, publish it, and can undo it.
				</p>
				<div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
					<a href={PORTAL_URL} className={styles.startBtn}>
						Start free
					</a>
					<Link
						href={path(country.code, "pricing")}
						style={{ minHeight: 44, display: "flex", alignItems: "center", fontWeight: 500 }}
					>
						Which plans include AI
					</Link>
				</div>
			</section>

			<section style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)" }}>
				<ol
					style={{
						listStyle: "none",
						margin: 0,
						padding: 0,
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))",
						gap: 14,
					}}
				>
					{AI_STEPS.map((x) => (
						<li
							key={x.n}
							style={{
								background: "var(--surface,#FFFFFF)",
								border: "1px solid var(--border,#E8E2DC)",
								borderRadius: 12,
								padding: 20,
								display: "flex",
								flexDirection: "column",
								gap: 8,
							}}
						>
							<span
								style={{
									fontFamily: "'IBM Plex Mono',monospace",
									fontSize: 12,
									letterSpacing: "0.12em",
									color: "var(--link,#B8541F)",
								}}
							>
								{x.n}
							</span>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 18 }}>{x.t}</span>
							<span style={{ fontSize: 15, color: "var(--muted,#5A6472)", lineHeight: 1.55 }}>{x.d}</span>
						</li>
					))}
				</ol>
			</section>

			<section style={{ background: "var(--sunk,#F3EDE8)" }}>
				<div
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						padding: WRAP_PAD,
						display: "flex",
						flexDirection: "column",
						gap: 28,
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
						<h2 style={H2}>What merchants type</h2>
						<p style={LEAD}>Plain sentences. Ask for one change at a time, or describe the whole shop at once.</p>
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
							gap: 14,
						}}
					>
						{prompts.map((x) => (
							<div
								key={x.p}
								style={{
									background: "var(--surface,#FFFFFF)",
									border: "1px solid var(--border,#E8E2DC)",
									borderRadius: 12,
									padding: 20,
									display: "flex",
									flexDirection: "column",
									gap: 12,
								}}
							>
								<span style={{ fontSize: 16, lineHeight: 1.55 }}>“{x.p}”</span>
								<span
									style={{
										display: "flex",
										gap: 8,
										alignItems: "baseline",
										fontSize: 14,
										borderTop: "1px solid var(--border,#E8E2DC)",
										paddingTop: 10,
									}}
								>
									<span style={{ ...MONO_LABEL, fontSize: 10, color: "var(--muted,#5A6472)", flex: "none" }}>Changes</span>
									<span style={{ color: "var(--okfg,#1D6B47)" }}>{x.c}</span>
								</span>
							</div>
						))}
					</div>
					<span style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>
						The AI changes how your shop looks and reads. It never touches your prices, stock, orders or checkout.
					</span>
				</div>
			</section>

			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: WRAP_PAD,
					display: "flex",
					flexDirection: "column",
					gap: 24,
				}}
			>
				<AiPreview region={region} />
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))",
						gap: 10,
					}}
				>
					{AI_DESIGNS.map((x) => (
						<div
							key={x.t}
							style={{
								borderTop: "2px solid #EC844F",
								paddingTop: 12,
								display: "flex",
								flexDirection: "column",
								gap: 4,
							}}
						>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 16 }}>{x.t}</span>
							<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>{x.d}</span>
						</div>
					))}
				</div>
			</section>

			<section style={{ background: "var(--sunk,#F3EDE8)" }}>
				<div
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						padding: WRAP_PAD,
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
						gap: "clamp(28px,5cqw,56px)",
						alignItems: "start",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
						<h2 style={H2}>Every version kept. Undo in one click.</h2>
						<p style={LEAD}>
							Each publish becomes a numbered version with what changed and who did it. Going back to an older one is instant
							and never uses your AI allowance.
						</p>
						<dl style={{ margin: 0, display: "flex", flexDirection: "column" }}>
							{HIST_PLANS.map((x) => (
								<div
									key={x.p}
									style={{
										display: "flex",
										justifyContent: "space-between",
										gap: 12,
										padding: "10px 0",
										borderTop: "1px solid var(--border,#E8E2DC)",
										fontSize: 15,
									}}
								>
									<dt>{x.p}</dt>
									<dd style={{ margin: 0, fontWeight: 600 }}>{x.v}</dd>
								</div>
							))}
						</dl>
					</div>
					<AiHistory region={region} />
				</div>
			</section>

			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: WRAP_PAD,
					display: "flex",
					flexDirection: "column",
					gap: 28,
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 720 }}>
					<h2 style={H2}>AI on every plan</h2>
					<p style={LEAD}>
						The same AI designs your store and writes your product descriptions and translations. How you pay for it depends on
						your plan.
					</p>
				</div>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
						gap: 14,
					}}
				>
					<div
						style={{
							background: "var(--surface,#FFFFFF)",
							border: "1px solid var(--border,#E8E2DC)",
							borderRadius: 12,
							padding: 24,
							display: "flex",
							flexDirection: "column",
							gap: 10,
						}}
					>
						<span style={{ ...MONO_LABEL, color: "var(--muted,#5A6472)" }}>Starter (Free) and Growth</span>
						<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 22 }}>On your own AI key</span>
						<span style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>
							Connect your own OpenAI or Anthropic account and pay them directly for what you use. Paste the key once in
							Settings.
						</span>
					</div>
					<div
						style={{
							background: "var(--surface,#FFFFFF)",
							border: "2px solid #EC844F",
							borderRadius: 12,
							padding: 24,
							display: "flex",
							flexDirection: "column",
							gap: 10,
						}}
					>
						<span style={{ ...MONO_LABEL, color: "var(--tint-fg,#8F4017)" }}>From Growth Pro</span>
						<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 22 }}>Included, no key needed</span>
						<span style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>
							A monthly allowance comes with the plan, larger on Business. If you run out, your shop keeps working and nothing
							you published changes.
						</span>
					</div>
				</div>
			</section>

			<section data-band="" style={{ background: "var(--band,#0A2A4A)", color: "#FFFFFF" }}>
				<div
					style={{
						maxWidth: 1240,
						margin: "0 auto",
						padding: "clamp(44px,7cqw,88px) clamp(16px,4cqw,24px)",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))",
						gap: 36,
						alignItems: "center",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
						<span
							style={{
								fontFamily: "'IBM Plex Mono',monospace",
								fontSize: 12,
								letterSpacing: "0.14em",
								textTransform: "uppercase",
								color: "#B8C7D6",
							}}
						>
							Optional setup help
						</span>
						<span
							style={{
								fontFamily: "Manrope,sans-serif",
								fontWeight: 800,
								fontSize: "clamp(24px,4cqw,40px)",
								letterSpacing: "-0.03em",
								lineHeight: 1.1,
							}}
						>
							Need help building your storefront? We’ll do it for you.
						</span>
						<span style={{ fontSize: 17, color: "#B8C7D6" }}>
							Our team builds your homepage, pages, menus and first products so you launch looking finished. It’s a one-time
							payment on paid plans: <AiSetupLine />.
						</span>
					</div>
					<div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
						<Link href={path(country.code, "contact/sales")} className={styles.askBtn}>
							Ask us to build it
						</Link>
						<a href={PORTAL_URL} className={styles.bandLink}>
							Or build it yourself, free
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
