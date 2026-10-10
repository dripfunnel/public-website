"use client";

import { useState } from "react";
import { AI_HISTORY, LIVE_VERSION, liveMessage } from "@/data/ai";
import type { Region } from "@/data/countries/types";
import styles from "./ai.module.css";

/** The "History" card: pick an earlier version and it becomes the live one (a demo, nothing is saved). */
export default function AiHistory({ region }: { region: Region }) {
	const [liveV, setLiveV] = useState(LIVE_VERSION);

	return (
		<div
			style={{
				background: "var(--surface,#FFFFFF)",
				border: "1px solid var(--border,#E8E2DC)",
				borderRadius: 12,
				overflow: "hidden",
			}}
		>
			<div
				style={{
					padding: "14px 18px",
					borderBottom: "1px solid var(--border,#E8E2DC)",
					fontFamily: "Manrope,sans-serif",
					fontWeight: 700,
					fontSize: 16,
				}}
			>
				History · {region.store}
			</div>
			{AI_HISTORY.map((h) => (
				<div
					key={h.v}
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						padding: "12px 18px",
						borderBottom: "1px solid var(--border,#E8E2DC)",
						fontSize: 14,
						flexWrap: "wrap",
					}}
				>
					<span style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column" }}>
						<strong>
							v{h.v} · {h.label}
						</strong>
						<span style={{ color: "var(--muted,#5A6472)", fontSize: 13 }}>
							{h.date} · {region.owner}
						</span>
					</span>
					{h.v === liveV && (
						<span
							style={{
								fontSize: 13,
								fontWeight: 600,
								padding: "3px 10px",
								borderRadius: 12,
								background: "var(--okbg,#EEF7F2)",
								color: "var(--okfg,#1D6B47)",
							}}
						>
							Live
						</span>
					)}
					{h.v !== liveV && (
						<button type="button" className={styles.backBtn} onClick={() => setLiveV(h.v)}>
							Go back to this
						</button>
					)}
				</div>
			))}
			<div role="status" style={{ padding: "12px 18px", fontSize: 14, color: "var(--muted,#5A6472)" }}>
				{liveMessage(liveV)}
			</div>
		</div>
	);
}
