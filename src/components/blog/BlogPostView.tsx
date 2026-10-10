import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CountryData } from "@/data/countries";
import { POSTS, getPost } from "@/data/blog";
import { path } from "@/lib/routes";
import { PORTAL_URL } from "@/lib/site";
import styles from "./blog.module.css";

export default function BlogPostView({ country, slug }: { country: CountryData; slug: string }) {
	const post = getPost(slug);
	if (!post) notFound();
	const body = post.body ?? [];
	const related = POSTS.filter((p) => p.id !== post.id).slice(0, 3);

	return (
		<article
			data-screen-label="Blog article"
			style={{
				maxWidth: 760,
				margin: "0 auto",
				padding: "clamp(32px,6cqw,72px) clamp(16px,4cqw,24px) clamp(44px,8cqw,96px)",
				display: "flex",
				flexDirection: "column",
				gap: 22,
			}}
		>
			<nav
				aria-label="Breadcrumb"
				style={{ fontSize: 14, display: "flex", gap: 8, flexWrap: "wrap", color: "var(--muted,#5A6472)" }}
			>
				<Link href={path(country.code, "blog")}>Blog</Link>
				<span aria-hidden="true">/</span>
				<span>{post.cat}</span>
			</nav>
			<h1
				style={{
					fontFamily: "Manrope,sans-serif",
					fontWeight: 800,
					fontSize: "clamp(30px,5cqw,50px)",
					lineHeight: 1.08,
					letterSpacing: "-0.03em",
					margin: 0,
					color: "var(--head,#0A2A4A)",
				}}
			>
				{post.title}
			</h1>
			<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>
				{post.date} · {post.mins} min read · Author name placeholder
			</span>
			<span
				style={{
					aspectRatio: "16/8",
					borderRadius: 12,
					background: "var(--sunk,#F3EDE8)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontFamily: "'IBM Plex Mono',monospace",
					fontSize: 11,
					letterSpacing: "0.12em",
					textTransform: "uppercase",
					color: "var(--muted,#5A6472)",
				}}
			>
				Cover image
			</span>
			<p style={{ margin: 0, fontSize: 19, lineHeight: 1.65 }}>{post.ex}</p>
			{body.map((b) => (
				<Fragment key={b.h}>
					<h2
						style={{
							margin: "12px 0 0",
							fontFamily: "Manrope,sans-serif",
							fontWeight: 800,
							fontSize: 24,
							letterSpacing: "-0.02em",
							color: "var(--head,#0A2A4A)",
						}}
					>
						{b.h}
					</h2>
					<p style={{ margin: 0, fontSize: 17, lineHeight: 1.75 }}>{b.p}</p>
				</Fragment>
			))}
			{!post.body && (
				<div
					style={{
						border: "1px dashed var(--field,#D7D3CD)",
						borderRadius: 12,
						padding: 20,
						fontSize: 15,
						color: "var(--muted,#5A6472)",
					}}
				>
					Placeholder: the full article goes here.
				</div>
			)}
			<div
				style={{
					marginTop: 20,
					background: "var(--sunk,#F3EDE8)",
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
					<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20 }}>
						Try it on your own shop
					</span>
					<span style={{ fontSize: 15, color: "var(--muted,#5A6472)" }}>Starter is free forever. No card needed.</span>
				</span>
				<a href={PORTAL_URL} className={styles.cta}>
					Start free
				</a>
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 16 }}>
				<span
					style={{
						fontFamily: "'IBM Plex Mono',monospace",
						fontSize: 11,
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: "var(--muted,#5A6472)",
					}}
				>
					Keep reading
				</span>
				{related.map((r) => (
					<Link
						key={r.id}
						href={path(country.code, `blog/${r.id}`)}
						style={{ minHeight: 44, display: "flex", alignItems: "center", fontSize: 16, fontWeight: 500 }}
					>
						{r.title}
					</Link>
				))}
			</div>
		</article>
	);
}
