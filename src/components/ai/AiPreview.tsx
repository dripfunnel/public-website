"use client";

import { useState } from "react";
import { useSite } from "@/components/site-context";
import { DEVICES, DEVICE_STYLE, getFrames, type DeviceKey } from "@/data/ai";
import type { Region } from "@/data/countries/types";

const H2 = {
	fontFamily: "Manrope,sans-serif",
	fontWeight: 800,
	fontSize: "clamp(26px,4cqw,44px)",
	lineHeight: 1.08,
	letterSpacing: "-0.03em",
	margin: 0,
	color: "var(--head,#0A2A4A)",
} as const;

/**
 * "Before and after, on every screen": the heading row with the device switch, and the two mock
 * shops. Only the chosen device is state; everything renders on the server first with "Desktop".
 */
export default function AiPreview({ region }: { region: Region }) {
	const { fmtLocal } = useSite();
	const [dev, setDev] = useState<DeviceKey>("desktop");
	const dv = DEVICE_STYLE[dev];
	const frames = getFrames(region);

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
					<h2 style={H2}>Before and after, on every screen</h2>
					<p style={{ margin: 0, fontSize: 17, color: "var(--muted,#5A6472)" }}>
						Every change arrives as a draft. Check it on desktop, tablet and phone before anyone else sees it.
					</p>
				</div>
				<span
					role="group"
					aria-label="Preview size"
					style={{ display: "flex", border: "1px solid var(--field,#D7D3CD)", borderRadius: 8, overflow: "hidden" }}
				>
					{DEVICES.map((w) => {
						const on = dev === w.key;
						return (
							<button
								key={w.key}
								type="button"
								onClick={() => setDev(w.key)}
								aria-pressed={on}
								style={{
									height: 44,
									padding: "0 16px",
									border: 0,
									background: on ? "var(--head,#0A2A4A)" : "transparent",
									color: on ? "var(--paper,#FDFAF7)" : "var(--text,#14181F)",
									fontFamily: "Inter,sans-serif",
									fontSize: 14,
									cursor: "pointer",
								}}
							>
								{w.label}
							</button>
						);
					})}
				</span>
			</div>
			<div
				style={{
					background: "var(--surface,#FFFFFF)",
					border: "1px solid var(--border,#E8E2DC)",
					borderRadius: 12,
					padding: "clamp(16px,3cqw,28px)",
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
					gap: 20,
				}}
			>
				{frames.map((f) => (
					<div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", minWidth: 0 }}>
						<span
							style={{
								fontFamily: "'IBM Plex Mono',monospace",
								fontSize: 11,
								letterSpacing: "0.12em",
								textTransform: "uppercase",
								color: "var(--muted,#5A6472)",
							}}
						>
							{f.label}
						</span>
						<div
							aria-hidden="true"
							style={{
								width: "100%",
								maxWidth: dv.maxw,
								border: "6px solid #14181F",
								borderRadius: dv.r,
								overflow: "hidden",
								background: "#FFFFFF",
								color: "#14181F",
							}}
						>
							<div
								style={{
									padding: "8px 10px",
									display: "flex",
									justifyContent: "space-between",
									gap: 8,
									fontSize: 10,
									borderBottom: "1px solid #EDEAE5",
									background: f.bar,
								}}
							>
								<strong style={{ fontFamily: `${f.hfont},sans-serif` }}>{region.store}</strong>
								<span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.nav}</span>
							</div>
							<div style={{ padding: dv.pad, background: f.bg, display: "flex", flexDirection: "column", gap: 8 }}>
								<span
									style={{
										fontFamily: `${f.hfont},sans-serif`,
										fontWeight: 800,
										fontSize: dv.hfs,
										lineHeight: 1.12,
										letterSpacing: "-0.02em",
										color: f.fg,
									}}
								>
									{f.headline}
								</span>
								<span style={{ fontSize: 12, color: f.fg }}>{f.sub}</span>
								<span
									style={{
										alignSelf: "flex-start",
										padding: "6px 12px",
										borderRadius: 6,
										background: f.accent,
										color: "#FFFFFF",
										fontSize: 12,
										fontWeight: 700,
									}}
								>
									{f.cta}
								</span>
							</div>
							<div style={{ padding: 10, display: "grid", gridTemplateColumns: dv.cols, gap: 8 }}>
								{region.items.slice(0, dv.n).map(([name, price]) => (
									<div key={name} style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
										<span style={{ aspectRatio: "4/5", borderRadius: 4, background: f.tile }} />
										<span style={{ fontSize: 10, lineHeight: 1.3 }}>{name}</span>
										<span style={{ fontSize: 10, fontWeight: 700 }}>{fmtLocal(price)}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
