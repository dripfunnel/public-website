"use client";

import type { MouseEvent } from "react";
import styles from "./features.module.css";

/** Sticky contents bar. Links to the section ids; with JavaScript they scroll smoothly below the sticky bars. */
export default function FeaturesNav({ items }: { items: { id: string; n: string; label: string }[] }) {
	function scrollTo(e: MouseEvent<HTMLAnchorElement>, id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		e.preventDefault();
		const offset = window.innerWidth >= 980 ? 140 : 120;
		window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
	}

	return (
		<nav aria-label="Contents" className={styles.stickyNav}>
			<div
				style={{
					maxWidth: 1240,
					margin: "0 auto",
					paddingLeft: "clamp(16px,4cqw,24px)",
					paddingRight: "clamp(16px,4cqw,24px)",
					display: "flex",
					gap: 4,
					overflowX: "auto",
					scrollbarWidth: "none",
				}}
			>
				{items.map((n) => (
					<a key={n.id} href={"#" + n.id} className={styles.navItem} onClick={(e) => scrollTo(e, n.id)}>
						<span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--muted,#5A6472)" }}>{n.n}</span>
						{n.label}
					</a>
				))}
			</div>
		</nav>
	);
}
