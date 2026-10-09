"use client";

import { useState } from "react";
import styles from "./help.module.css";

/** "Did this answer your question?" with Yes / No. Nothing is sent anywhere (as in the design). */
export default function HelpFeedback() {
	const [helpful, setHelpful] = useState<boolean | null>(null);
	const msg =
		helpful === true
			? "Thanks for telling us."
			: helpful === false
				? "Sorry about that. Contact support and we’ll help directly."
				: "";

	return (
		<div
			style={{
				borderTop: "1px solid var(--border,#E8E2DC)",
				paddingTop: 18,
				display: "flex",
				alignItems: "center",
				gap: 12,
				flexWrap: "wrap",
			}}
		>
			{helpful === null && (
				<>
					<span style={{ fontSize: 15 }}>Did this answer your question?</span>
					<button type="button" onClick={() => setHelpful(true)} className={styles.outlineBtn}>
						Yes
					</button>
					<button type="button" onClick={() => setHelpful(false)} className={styles.outlineBtn}>
						No
					</button>
				</>
			)}
			{msg && (
				<span role="status" style={{ fontSize: 15 }}>
					{msg}
				</span>
			)}
		</div>
	);
}
