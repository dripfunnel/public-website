"use client";

import { useSyncExternalStore } from "react";
import { PROMPT_KEY, PORTAL_URL } from "@/lib/site";
import { getPrompt, getServerPrompt, setPrompt, subscribePrompt } from "./promptStore";
import { heroExamples } from "@/data/home";
import styles from "./home.module.css";

function usePrompt() {
	return useSyncExternalStore(subscribePrompt, getPrompt, getServerPrompt);
}

/** "Describe your shop" input with the Start free link. `band` is the white box on the closing navy band. */
export default function PromptBox({ band = false }: { band?: boolean }) {
	const prompt = usePrompt();
	const save = () => {
		try {
			localStorage.setItem(PROMPT_KEY, prompt);
		} catch {
			// Storage can be blocked. The visitor just starts with an empty prompt in the portal.
		}
	};
	return (
		<div
			style={{
				width: "100%",
				maxWidth: 780,
				background: band ? "#FFFFFF" : "var(--surface,#FFFFFF)",
				border: band ? 0 : "1.5px solid var(--text,#14181F)",
				borderRadius: 12,
				padding: 8,
				display: "flex",
				alignItems: "center",
				gap: 8,
				flexWrap: "wrap",
				textAlign: "left",
			}}
		>
			<span aria-hidden="true" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 18, color: band ? "#B8541F" : "var(--link,#B8541F)", paddingLeft: 12 }}>
				›
			</span>
			<input
				type="text"
				aria-label="Describe your shop"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				placeholder="Describe your shop…"
				style={{
					flex: 1,
					minWidth: 200,
					height: 52,
					border: 0,
					borderRadius: 8,
					background: "transparent",
					padding: "0 8px",
					fontFamily: "Inter,sans-serif",
					fontSize: 17,
					color: band ? "#14181F" : "var(--text,#14181F)",
				}}
			/>
			<a href={PORTAL_URL} onClick={save} className={band ? styles.startBand : styles.start}>
				Start free
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
					<path d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			</a>
		</div>
	);
}

/** The three "Try" buttons under the hero box. */
export function PromptExamples({ city }: { city: string }) {
	return (
		<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, alignItems: "center" }}>
			<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>Try</span>
			{heroExamples(city).map(([short, full]) => (
				<button key={short} type="button" className={styles.try} onClick={() => setPrompt(full)}>
					{short}
				</button>
			))}
		</div>
	);
}
