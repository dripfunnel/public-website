"use client";

import { useState, type CSSProperties } from "react";
import type { Region } from "@/data/countries";
import { useSite } from "@/components/site-context";
import { BEFORE_MOCK, DESIGNED_BY_AI, DEVICES, DEVICE_MOCKS, HISTORY, LATEST_VERSION, STEPS, type Device } from "@/data/home";
import styles from "./home.module.css";

const mono = (size: number, spacing: string): CSSProperties => ({
	fontFamily: "'IBM Plex Mono',monospace",
	fontSize: size,
	letterSpacing: spacing,
	textTransform: "uppercase",
	color: "var(--muted,#5A6472)",
});
const boxTitle: CSSProperties = { fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 17 };
const chip: CSSProperties = { padding: "6px 12px", borderRadius: 16, background: "var(--sunk,#F3EDE8)", fontSize: 14 };
const infoCard: CSSProperties = { border: "1px solid var(--border,#E8E2DC)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 4 };

/** The four interactive steps (Describe, Preview, Publish, Undo) of the "How it works" section. */
export default function HowItWorks({ region }: { region: Region }) {
	const { fmtLocal } = useSite();
	const [step, setStep] = useState(0);
	const [dev, setDev] = useState<Device>("desktop");
	const [liveV, setLiveV] = useState(LATEST_VERSION);

	const dv = DEVICE_MOCKS[dev];
	const tiles = (bg: string, n: number) => region.items.slice(0, n).map(([name, p]) => ({ name, price: fmtLocal(p), bg }));
	const frames = [
		{ ...BEFORE_MOCK, headline: region.store, tiles: tiles(BEFORE_MOCK.tile, dv.n) },
		{ label: "After", ...region.after, hfont: "Manrope", tiles: tiles(region.after.tile, dv.n) },
	];
	const liveMsg =
		liveV === LATEST_VERSION
			? "Version 13 is live. Pick any earlier version to go back to it."
			: "Version " + liveV + " is live again. Nothing else changed, and version 13 is still in your history.";
	const nextLabel = step === 3 ? "Start again" : "Next: " + STEPS[(step + 1) % 4][0];

	return (
		<>
			<div
				role="group"
				aria-label="Steps"
				style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", borderTop: "1px solid var(--border,#E8E2DC)" }}
			>
				{STEPS.map(([t, d], i) => {
					const on = step === i;
					return (
						<button
							key={t}
							type="button"
							onClick={() => setStep(i)}
							aria-pressed={on}
							style={{
								textAlign: "left",
								padding: "20px 20px 22px 0",
								border: 0,
								borderTop: `3px solid ${on ? "#EC844F" : "transparent"}`,
								marginTop: -2,
								background: "transparent",
								color: "var(--text,#14181F)",
								cursor: "pointer",
								display: "flex",
								flexDirection: "column",
								gap: 6,
								fontFamily: "Inter,sans-serif",
							}}
						>
							<span
								style={{
									fontFamily: "Manrope,sans-serif",
									fontWeight: 800,
									fontSize: "clamp(36px,5cqw,64px)",
									lineHeight: 1,
									letterSpacing: "-0.04em",
									color: on ? "var(--link,#B8541F)" : "var(--field,#D7D3CD)",
								}}
							>
								{"0" + (i + 1)}
							</span>
							<span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, fontSize: 19 }}>{t}</span>
							<span style={{ fontSize: 14, color: "var(--muted,#5A6472)", lineHeight: 1.5, maxWidth: "30ch" }}>{d}</span>
						</button>
					);
				})}
			</div>

			<div
				style={{
					background: "var(--surface,#FFFFFF)",
					border: "1px solid var(--border,#E8E2DC)",
					borderRadius: 12,
					padding: "clamp(16px,3cqw,32px)",
					display: "flex",
					flexDirection: "column",
					gap: 18,
				}}
			>
				{step === 0 && (
					<>
						<span style={boxTitle}>Describe your shop</span>
						<div style={{ border: "1px solid var(--field,#D7D3CD)", borderRadius: 8, padding: "14px 16px", fontSize: 15, lineHeight: 1.6, background: "var(--paper,#FDFAF7)" }}>{region.prompt}</div>
						<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							<span style={mono(11, "0.12em")}>What the AI designs</span>
							<div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
								{DESIGNED_BY_AI.map((c) => (
									<span key={c} style={chip}>
										{c}
									</span>
								))}
							</div>
						</div>
						<span style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>The AI changes how your shop looks. It never changes your prices, stock or checkout.</span>
					</>
				)}

				{step === 1 && (
					<>
						<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
							<span style={boxTitle}>Draft · not on your live site</span>
							<span role="group" aria-label="Preview size" style={{ display: "flex", border: "1px solid var(--field,#D7D3CD)", borderRadius: 8, overflow: "hidden" }}>
								{DEVICES.map(({ key, label }) => (
									<button
										key={key}
										type="button"
										onClick={() => setDev(key)}
										aria-pressed={dev === key}
										style={{
											height: 44,
											padding: "0 14px",
											border: 0,
											background: dev === key ? "var(--head,#0A2A4A)" : "transparent",
											color: dev === key ? "var(--paper,#FDFAF7)" : "var(--text,#14181F)",
											fontFamily: "Inter,sans-serif",
											fontSize: 14,
											cursor: "pointer",
										}}
									>
										{label}
									</button>
								))}
							</span>
						</div>
						<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 14 }}>
							{frames.map((f) => (
								<div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", minWidth: 0 }}>
									<span style={mono(11, "0.12em")}>{f.label}</span>
									<div aria-hidden="true" style={{ width: "100%", maxWidth: dv.maxw, border: "6px solid #14181F", borderRadius: dv.r, overflow: "hidden", background: "#FFFFFF", color: "#14181F" }}>
										<div style={{ padding: "8px 10px", display: "flex", justifyContent: "space-between", gap: 8, fontSize: 10, borderBottom: "1px solid #EDEAE5", background: f.bar }}>
											<strong style={{ fontFamily: f.hfont + ",sans-serif" }}>{region.store}</strong>
											<span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.nav}</span>
										</div>
										<div style={{ padding: dv.pad, background: f.bg, display: "flex", flexDirection: "column", gap: 8 }}>
											<span style={{ fontFamily: f.hfont + ",sans-serif", fontWeight: 800, fontSize: dv.hfs, lineHeight: 1.12, letterSpacing: "-0.02em", color: f.fg }}>{f.headline}</span>
											<span style={{ fontSize: 12, color: f.fg }}>{f.sub}</span>
											<span style={{ alignSelf: "flex-start", padding: "6px 12px", borderRadius: 6, background: f.accent, color: "#FFFFFF", fontSize: 12, fontWeight: 700 }}>{f.cta}</span>
										</div>
										<div style={{ padding: 10, display: "grid", gridTemplateColumns: dv.cols, gap: 8 }}>
											{f.tiles.map((t) => (
												<div key={t.name} style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
													<span style={{ aspectRatio: "4/5", borderRadius: 4, background: t.bg }} />
													<span style={{ fontSize: 10, lineHeight: 1.3 }}>{t.name}</span>
													<span style={{ fontSize: 10, fontWeight: 700 }}>{t.price}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							))}
						</div>
						<div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 14 }}>
							<span style={{ color: "var(--okfg,#1D6B47)" }}>
								<strong>Changed:</strong> colours, type, homepage, menu, new page
							</span>
							<span style={{ color: "var(--muted,#5A6472)" }}>
								<strong>Not touched:</strong> products, prices, checkout
							</span>
						</div>
					</>
				)}

				{step === 2 && (
					<>
						<span style={boxTitle}>Approve and publish</span>
						<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
							<div style={{ height: 8, borderRadius: 4, background: "var(--sunk,#F3EDE8)", overflow: "hidden" }}>
								<div style={{ width: "100%", height: "100%", background: "#1D6B47" }} />
							</div>
							<span style={{ fontSize: 14, color: "var(--okfg,#1D6B47)", fontWeight: 600 }}>Version 13 is live. We checked your site and it changed.</span>
						</div>
						<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))", gap: 12 }}>
							{[
								["Before you publish", "Nothing reaches shoppers until you press approve."],
								["While it publishes", "Your shop stays open. Shoppers see the old version until the new one is ready."],
								["If something breaks", "The draft stays a draft. Your live site doesn’t change."],
							].map(([label, text]) => (
								<div key={label} style={infoCard}>
									<span style={mono(11, "0.12em")}>{label}</span>
									<span style={{ fontSize: 15 }}>{text}</span>
								</div>
							))}
						</div>
					</>
				)}

				{step === 3 && (
					<>
						<span style={boxTitle}>History</span>
						<div style={{ border: "1px solid var(--border,#E8E2DC)", borderRadius: 12, overflow: "hidden" }}>
							{HISTORY.map(([v, label, date]) => (
								<div key={v} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border,#E8E2DC)", fontSize: 14, flexWrap: "wrap" }}>
									<span style={{ flex: 1, minWidth: 180, display: "flex", flexDirection: "column" }}>
										<strong>
											v{v} · {label}
										</strong>
										<span style={{ color: "var(--muted,#5A6472)", fontSize: 13 }}>
											{date} · {region.owner}
										</span>
									</span>
									{v === liveV ? (
										<span style={{ fontSize: 13, fontWeight: 600, padding: "3px 10px", borderRadius: 12, background: "var(--okbg,#EEF7F2)", color: "var(--okfg,#1D6B47)" }}>Live</span>
									) : (
										<button type="button" className={styles.back} onClick={() => setLiveV(v)}>
											Go back to this
										</button>
									)}
								</div>
							))}
						</div>
						<span role="status" style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>
							{liveMsg}
						</span>
					</>
				)}

				<button
					type="button"
					onClick={() => setStep((step + 1) % 4)}
					style={{ alignSelf: "flex-start", height: 44, padding: 0, border: 0, background: "transparent", color: "var(--link,#B8541F)", fontFamily: "Inter,sans-serif", fontWeight: 500, fontSize: 15, cursor: "pointer" }}
				>
					{nextLabel} →
				</button>
			</div>
		</>
	);
}
