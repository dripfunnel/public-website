import { Fragment } from "react";
import { GROUPS, PLANS } from "@/data/pricing";
import PricingSetupRow from "./PricingSetupRow";
import PriceFoot from "./PriceFoot";
import { cellLabel, cellStyle, HIGHLIGHT_COLUMN, ROW_GRID, RowName } from "./tableShared";

/** Feature comparison. Static text, except the set-up price row and the footnote (they follow the currency). */
export default function PricingTable() {
	return (
		<section
			style={{
				maxWidth: 1240,
				margin: "0 auto",
				padding: "0 clamp(16px,4cqw,24px) 64px",
				display: "flex",
				flexDirection: "column",
				gap: 14,
			}}
		>
			<div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
				<span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.14em", color: "var(--link,#B8541F)" }}>
					01
				</span>
				<h2
					style={{
						fontFamily: "Manrope,sans-serif",
						fontWeight: 800,
						fontSize: "clamp(22px,3.4cqw,34px)",
						letterSpacing: "-0.025em",
						margin: 0,
						color: "var(--head,#0A2A4A)",
					}}
				>
					Compare every feature
				</h2>
			</div>
			<div
				role="region"
				aria-label="Feature comparison"
				tabIndex={0}
				style={{
					border: "1px solid var(--border,#E8E2DC)",
					borderRadius: 12,
					overflow: "auto",
					background: "var(--surface,#FFFFFF)",
				}}
			>
				<div role="table" style={{ minWidth: 880 }}>
					<div role="row" style={ROW_GRID}>
						<span role="columnheader" style={{ padding: "14px 18px", fontSize: 13, color: "var(--muted,#5A6472)" }}>
							Feature
						</span>
						{PLANS.map((p, i) => (
							<span
								key={p.k}
								role="columnheader"
								style={{
									padding: "14px 12px",
									fontFamily: "Manrope,sans-serif",
									fontWeight: 800,
									fontSize: 15,
									textAlign: "center",
									background: i === HIGHLIGHT_COLUMN ? "var(--tint,#FDF0E8)" : "transparent",
								}}
							>
								{p.name}
							</span>
						))}
					</div>
					{GROUPS.map((g) => (
						<Fragment key={g.name}>
							<div
								role="row"
								style={{
									padding: "12px 18px",
									background: "var(--paper,#FDFAF7)",
									borderBottom: "1px solid var(--border,#E8E2DC)",
									fontFamily: "'IBM Plex Mono',monospace",
									fontSize: 11,
									letterSpacing: "0.12em",
									textTransform: "uppercase",
									color: "var(--tint-fg,#8F4017)",
								}}
							>
								<span role="rowheader">{g.name}</span>
							</div>
							{g.rows.map((r) =>
								r.v.some((c) => typeof c !== "string") ? (
									<PricingSetupRow key={r.name} row={r} />
								) : (
									<div key={r.name} role="row" style={{ ...ROW_GRID, fontSize: 14 }}>
										<RowName name={r.name} note={r.note} />
										{r.v.map((c, i) => {
											const v = c as string;
											return (
												<span key={i} role="cell" aria-label={cellLabel(v)} style={cellStyle(v, i)}>
													{v}
												</span>
											);
										})}
									</div>
								),
							)}
						</Fragment>
					))}
				</div>
			</div>
			<PriceFoot />
		</section>
	);
}
