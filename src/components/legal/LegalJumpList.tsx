"use client";

import type { LegalSection } from "@/data/legal";
import styles from "./Legal.module.css";

/** Smooth-scrolls to a section, leaving room for the sticky header (as in the design). */
function jump(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 140, behavior: "smooth" });
}

export default function LegalJumpList({ sections }: { sections: LegalSection[] }) {
	return (
		<>
			{sections.map((s, i) => (
				<button key={s.heading} type="button" className={styles.jump} onClick={() => jump("sec-" + (i + 1))}>
					{i + 1}. {s.heading}
				</button>
			))}
		</>
	);
}
