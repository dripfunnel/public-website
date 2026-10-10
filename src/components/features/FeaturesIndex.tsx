"use client";

import { useState } from "react";
import Link from "next/link";
import {
	FILTER_RANK,
	PLAN_FILTERS,
	PLAN_RANK,
	indexLine,
	planColor,
	type PlanFilter,
	type PlanLabel,
} from "@/data/features";
import styles from "./features.module.css";

interface IndexGroup {
	n: string;
	label: string;
	items: { t: string; p: PlanLabel }[];
}

/** The "Every feature, by plan" index: plan filter chips and the list of every feature. */
export default function FeaturesIndex({ groups, pricingHref }: { groups: IndexGroup[]; pricingHref: string }) {
	const [filter, setFilter] = useState<PlanFilter>("All");
	const rank = FILTER_RANK[filter];
	const included = (p: PlanLabel) => rank === undefined || PLAN_RANK[p] <= rank;

	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
					gap: "14px 40px",
					borderTop: "1px solid var(--text,#14181F)",
					paddingTop: 20,
				}}
			>
				<span
					style={{
						fontFamily: "'IBM Plex Mono',monospace",
						fontSize: 12,
						letterSpacing: "0.14em",
						textTransform: "uppercase",
						color: "var(--muted,#5A6472)",
					}}
				>
					Index
				</span>
				<div style={{ gridColumn: "span 3", minWidth: "min(100%,300px)", display: "flex", flexDirection: "column", gap: 12 }}>
					<h2
						style={{
							fontFamily: "Manrope,sans-serif",
							fontWeight: 800,
							fontSize: "clamp(28px,4.4cqw,56px)",
							lineHeight: 1.02,
							letterSpacing: "-0.035em",
							margin: 0,
							color: "var(--head,#0A2A4A)",
						}}
					>
						Every feature, by plan.
					</h2>
					<p style={{ margin: 0, fontSize: 17, color: "var(--muted,#5A6472)", maxWidth: "60ch" }}>
						The whole list on one page. Pick a plan to see what it includes; prices are on the{" "}
						<Link href={pricingHref}>pricing page</Link>.
					</p>
				</div>
			</div>
			<div role="group" aria-label="Show features from" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
				{PLAN_FILTERS.map((p) => {
					const on = filter === p;
					return (
						<button
							key={p}
							type="button"
							onClick={() => setFilter(p)}
							aria-pressed={on}
							style={{
								minHeight: 44,
								padding: "0 16px",
								border: "1px solid " + (on ? "var(--head,#0A2A4A)" : "var(--field,#D7D3CD)"),
								borderRadius: 8,
								background: on ? "var(--head,#0A2A4A)" : "transparent",
								color: on ? "var(--paper,#FDFAF7)" : "var(--text,#14181F)",
								fontFamily: "Inter,sans-serif",
								fontSize: 14,
								fontWeight: 500,
								cursor: "pointer",
							}}
						>
							{p}
						</button>
					);
				})}
			</div>
			<div className={styles.idx}>
				{groups.map((g) => (
					<div key={g.n} style={{ breakInside: "avoid", paddingBottom: 22, display: "flex", flexDirection: "column" }}>
						<span
							style={{
								fontFamily: "'IBM Plex Mono',monospace",
								fontSize: 12,
								letterSpacing: "0.14em",
								textTransform: "uppercase",
								color: "var(--muted,#5A6472)",
								paddingBottom: 8,
								borderBottom: "1px solid var(--text,#14181F)",
							}}
						>
							{g.n} — {g.label}
						</span>
						{g.items.map((x) => {
							const inPlan = included(x.p);
							return (
								<span
									key={x.t}
									style={{
										display: "flex",
										justifyContent: "space-between",
										gap: 12,
										padding: "9px 0",
										borderBottom: "1px solid var(--border,#E8E2DC)",
										fontSize: 15,
										color: inPlan ? "var(--text,#14181F)" : "var(--muted,#5A6472)",
									}}
								>
									<span>{x.t}</span>
									<span
										style={{
											fontFamily: "'IBM Plex Mono',monospace",
											fontSize: 10,
											letterSpacing: "0.08em",
											textTransform: "uppercase",
											color: inPlan ? planColor(x.p) : "var(--field,#D7D3CD)",
											whiteSpace: "nowrap",
										}}
									>
										{x.p}
									</span>
								</span>
							);
						})}
					</div>
				))}
			</div>
			<span role="status" style={{ fontSize: 14, color: "var(--muted,#5A6472)" }}>
				{indexLine(groups, filter)}
			</span>
		</>
	);
}
