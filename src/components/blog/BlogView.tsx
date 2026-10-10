import type { CountryData } from "@/data/countries";
import { BLOG_CATEGORIES, POSTS } from "@/data/blog";
import BlogList from "./BlogList";

export default function BlogView({ country }: { country: CountryData }) {
	return (
		<section
			data-screen-label="Blog"
			style={{
				maxWidth: 1240,
				margin: "0 auto",
				padding: "clamp(40px,7cqw,88px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)",
				display: "flex",
				flexDirection: "column",
				gap: 28,
			}}
		>
			<div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
						Blog
					</span>
				</div>
				<h1
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(32px,5.5cqw,56px)",
						lineHeight: 1.05,
						letterSpacing: "-0.035em",
						margin: 0,
						color: "var(--head,#0A2A4A)",
					}}
				>
					Running a shop, one guide at a time.
				</h1>
			</div>
			<BlogList country={country.code} posts={POSTS} categories={BLOG_CATEGORIES} />
		</section>
	);
}
