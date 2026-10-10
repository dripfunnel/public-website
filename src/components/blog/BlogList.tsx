"use client";

import { useState } from "react";
import Link from "next/link";
import type { CountryCode } from "@/data/countries";
import type { BlogPost } from "@/data/blog";
import { path } from "@/lib/routes";
import styles from "./blog.module.css";

/** Category chips and the article cards. The unfiltered list ("All") is what the server renders. */
export default function BlogList({
	country,
	posts,
	categories,
}: {
	country: CountryCode;
	posts: BlogPost[];
	categories: string[];
}) {
	const [cat, setCat] = useState("All");
	const shown = posts.filter((p) => cat === "All" || p.cat === cat);

	return (
		<>
			<div role="group" aria-label="Topics" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
				{categories.map((c) => {
					const on = cat === c;
					return (
						<button
							key={c}
							type="button"
							onClick={() => setCat(c)}
							aria-pressed={on}
							style={{
								minHeight: 44,
								padding: "0 16px",
								border: `1px solid ${on ? "var(--head,#0A2A4A)" : "var(--border,#E8E2DC)"}`,
								borderRadius: 22,
								background: on ? "var(--head,#0A2A4A)" : "transparent",
								color: on ? "var(--paper,#FDFAF7)" : "var(--text,#14181F)",
								fontFamily: "Inter,sans-serif",
								fontSize: 14,
								cursor: "pointer",
							}}
						>
							{c}
						</button>
					);
				})}
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))",
					gap: 18,
				}}
			>
				{shown.map((p) => (
					<Link key={p.id} href={path(country, `blog/${p.id}`)} className={styles.card}>
						<span
							style={{
								aspectRatio: "16/9",
								background: "var(--sunk,#F3EDE8)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontFamily: "'IBM Plex Mono',monospace",
								fontSize: 10,
								letterSpacing: "0.12em",
								textTransform: "uppercase",
								color: "var(--muted,#5A6472)",
							}}
						>
							Cover image
						</span>
						<span style={{ padding: 20, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
							<span
								style={{
									fontFamily: "'IBM Plex Mono',monospace",
									fontSize: 11,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									color: "var(--tint-fg,#8F4017)",
								}}
							>
								{p.cat}
							</span>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1.3 }}>
								{p.title}
							</span>
							<span style={{ fontSize: 15, color: "var(--muted,#5A6472)", flex: 1 }}>{p.ex}</span>
							<span style={{ fontSize: 13, color: "var(--muted,#5A6472)" }}>
								{p.date} · {p.mins} min read
							</span>
						</span>
					</Link>
				))}
			</div>
		</>
	);
}
