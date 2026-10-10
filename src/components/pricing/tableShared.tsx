import type { CSSProperties } from "react";

export const ROW_GRID: CSSProperties = {
	display: "grid",
	gridTemplateColumns: "minmax(220px,1.6fr) repeat(5,minmax(110px,1fr))",
	borderBottom: "1px solid var(--border,#E8E2DC)",
};

/** Highlighted column: Growth Pro. */
export const HIGHLIGHT_COLUMN = 2;

export function cellLabel(v: string): string {
	return v === "—" ? "Not included" : v === "✓" ? "Included" : v;
}

export function cellStyle(v: string, i: number): CSSProperties {
	return {
		padding: 12,
		textAlign: "center",
		color: v === "—" ? "var(--muted,#5A6472)" : v === "Planned" ? "var(--tint-fg,#8F4017)" : "var(--text,#14181F)",
		background: i === HIGHLIGHT_COLUMN ? "var(--tint,#FDF0E8)" : "transparent",
		fontWeight: v === "✓" ? 700 : 400,
	};
}

export function RowName({ name, note }: { name: string; note?: string }) {
	return (
		<span role="rowheader" style={{ padding: "12px 18px", display: "flex", flexDirection: "column" }}>
			<span>{name}</span>
			{note && <span style={{ fontSize: 12, color: "var(--muted,#5A6472)" }}>{note}</span>}
		</span>
	);
}
