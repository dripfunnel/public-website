"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { CountryCode } from "@/data/countries";
import type { HelpArticle } from "@/data/help";
import { path } from "@/lib/routes";
import styles from "./help.module.css";

/**
 * Search box and results. Without a search the server-rendered `children` (the category cards)
 * are shown; `heading` and `footer` are server-rendered too, so only the search logic is client code.
 */
export default function HelpSearch({
	country,
	articles,
	heading,
	footer,
	children,
}: {
	country: CountryCode;
	articles: HelpArticle[];
	heading: ReactNode;
	footer: ReactNode;
	children: ReactNode;
}) {
	const [value, setValue] = useState("");
	const q = value.trim().toLowerCase();
	const results = q ? articles.filter((a) => `${a.t} ${a.cat}`.toLowerCase().includes(q)) : [];

	return (
		<>
			<section style={{ background: "var(--sunk,#F3EDE8)" }}>
				<div
					style={{
						maxWidth: 880,
						margin: "0 auto",
						padding: "clamp(40px,7cqw,88px) clamp(16px,4cqw,24px)",
						display: "flex",
						flexDirection: "column",
						gap: 18,
						alignItems: "center",
						textAlign: "center",
					}}
				>
					{heading}
					<label style={{ width: "100%", position: "relative", display: "block" }}>
						<span style={{ position: "absolute", left: -9999 }}>Search help articles</span>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinecap="round"
							aria-hidden="true"
							style={{ position: "absolute", left: 16, top: 16, color: "var(--muted,#5A6472)" }}
						>
							<circle cx="11" cy="11" r="7" />
							<path d="M20 20l-4-4" />
						</svg>
						<input
							type="search"
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder="Search, e.g. refund, size chart, GST"
							style={{
								width: "100%",
								height: 52,
								padding: "0 16px 0 46px",
								border: "1px solid var(--field,#D7D3CD)",
								borderRadius: 10,
								background: "var(--surface,#FFFFFF)",
								color: "var(--text,#14181F)",
								fontFamily: "Inter,sans-serif",
								fontSize: 16,
							}}
						/>
					</label>
				</div>
			</section>
			<section
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					padding: "clamp(32px,6cqw,72px) clamp(16px,4cqw,24px)",
					display: "flex",
					flexDirection: "column",
					gap: 28,
				}}
			>
				{q ? (
					<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
						<span role="status" style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>
							{results.length} {results.length === 1 ? "article" : "articles"} for “{value.trim()}”
						</span>
						{results.map((a) => (
							<Link key={a.id} href={path(country, `help/${a.id}`)} className={styles.result}>
								<span style={{ fontWeight: 600, fontSize: 16 }}>{a.t}</span>
								<span style={{ fontSize: 13, color: "var(--muted,#5A6472)" }}>{a.cat}</span>
							</Link>
						))}
						{results.length === 0 && (
							<div
								style={{
									border: "1px solid var(--border,#E8E2DC)",
									borderRadius: 12,
									padding: 20,
									fontSize: 15,
								}}
							>
								Nothing matches that yet. Try another word, or{" "}
								<Link href={path(country, "contact/support")}>ask our support team</Link>.
							</div>
						)}
					</div>
				) : (
					children
				)}
				{footer}
			</section>
		</>
	);
}
