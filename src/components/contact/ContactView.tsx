import Link from "next/link";
import type { CountryData } from "@/data/countries";
import { SUPPORT_EMAIL } from "@/data/contact";
import type { ContactTopic } from "@/lib/routes";
import { path } from "@/lib/routes";
import { SALES_EMAIL } from "@/lib/site";
import ContactForm from "./ContactForm";

const rowStyle = {
	padding: "14px 0",
	borderBottom: "1px solid var(--border,#E8E2DC)",
	display: "flex",
	flexDirection: "column",
	gap: 2,
} as const;

export default function ContactView({ country, topic }: { country: CountryData; topic: ContactTopic }) {
	return (
		<section
			data-screen-label="Contact"
			style={{
				maxWidth: 1240,
				margin: "0 auto",
				padding: "clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)",
				display: "grid",
				gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
				gap: "clamp(32px,5cqw,64px)",
				alignItems: "start",
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					<span style={{ width: 32, height: 2, background: "#EC844F", display: "block" }}></span>
					<span
						style={{
							fontFamily: "'IBM Plex Mono',monospace",
							fontSize: 12,
							letterSpacing: "0.14em",
							textTransform: "uppercase",
							color: "var(--muted,#5A6472)",
						}}
					>
						Contact
					</span>
				</div>
				<h1
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(30px,5cqw,54px)",
						lineHeight: 1.05,
						letterSpacing: "-0.035em",
						margin: 0,
						color: "var(--head,#0A2A4A)",
					}}
				>
					Book a demo or ask us anything.
				</h1>
				<p style={{ margin: 0, fontSize: 17, color: "var(--muted,#5A6472)" }}>
					A demo is a 30-minute video call. We build a shop from your description while you watch, then answer your questions about plans,
					selling abroad or moving from another platform.
				</p>
				<dl style={{ margin: 0, display: "flex", flexDirection: "column", borderTop: "1px solid var(--border,#E8E2DC)" }}>
					<div style={rowStyle}>
						<dt style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>Sales and partners</dt>
						<dd style={{ margin: 0 }}>
							<a href={`mailto:${SALES_EMAIL}`} style={{ fontSize: 17, fontWeight: 500 }}>
								{SALES_EMAIL}
							</a>
						</dd>
					</div>
					<div style={rowStyle}>
						<dt style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>Help with your shop</dt>
						<dd style={{ margin: 0 }}>
							<a href={`mailto:${SUPPORT_EMAIL}`} style={{ fontSize: 17, fontWeight: 500 }}>
								{SUPPORT_EMAIL}
							</a>{" "}
							· or the <Link href={path(country.code, "help")}>help centre</Link>
						</dd>
					</div>
				</dl>
			</div>
			<div
				style={{
					background: "var(--surface,#FFFFFF)",
					border: "1px solid var(--border,#E8E2DC)",
					borderRadius: 16,
					padding: "clamp(20px,3cqw,32px)",
				}}
			>
				<ContactForm key={topic} country={country} topic={topic} />
			</div>
		</section>
	);
}
