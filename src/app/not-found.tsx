import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { DEFAULT_COUNTRY } from "@/data/countries";
import { path } from "@/lib/routes";

// A proper "Page not found" page (a real 404, not a redirect to Home). Never indexed.
export const metadata: Metadata = {
	title: { absolute: "Page not found | DripFunnel" },
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<SiteShell country={DEFAULT_COUNTRY}>
			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "clamp(64px, 12cqw, 160px) clamp(16px, 4cqw, 24px)",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					gap: 20,
				}}
			>
				<span
					style={{
						fontFamily: "'IBM Plex Mono', monospace",
						fontSize: 12,
						letterSpacing: "0.14em",
						textTransform: "uppercase",
						color: "var(--muted)",
					}}
				>
					404
				</span>
				<h1
					style={{
						fontFamily: "Manrope, sans-serif",
						fontWeight: 800,
						fontSize: "clamp(34px, 6cqw, 64px)",
						lineHeight: 1.02,
						letterSpacing: "-0.04em",
						margin: 0,
						color: "var(--head)",
					}}
				>
					Page not found
				</h1>
				<p style={{ margin: 0, fontSize: 18, color: "var(--muted)", maxWidth: "56ch" }}>
					The page you were looking for does not exist or has moved.
				</p>
				<Link
					href={path(DEFAULT_COUNTRY)}
					style={{
						height: 48,
						padding: "0 24px",
						borderRadius: 8,
						background: "#EC844F",
						color: "#FFFFFF",
						display: "flex",
						alignItems: "center",
						textDecoration: "none",
						fontFamily: "Manrope, sans-serif",
						fontWeight: 700,
					}}
				>
					Go to the home page
				</Link>
			</section>
		</SiteShell>
	);
}
