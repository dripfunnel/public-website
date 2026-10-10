"use client";

import { useState } from "react";
import { useSite } from "@/components/site-context";
import { faqAnswer, FAQS, setupLine } from "@/data/pricing";

/** Questions accordion: one answer open at a time. Answers can quote the set-up prices in the shown currency. */
export default function PricingFaq() {
	const { prices, fmt } = useSite();
	const [open, setOpen] = useState(-1);
	const setup = setupLine(prices, fmt);

	return (
		<div style={{ borderTop: "1px solid var(--border,#E8E2DC)" }}>
			{FAQS.map((f, i) => {
				const isOpen = open === i;
				return (
					<div key={f.q} style={{ borderBottom: "1px solid var(--border,#E8E2DC)" }}>
						<button
							type="button"
							onClick={() => setOpen(isOpen ? -1 : i)}
							aria-expanded={isOpen}
							style={{
								width: "100%",
								minHeight: 60,
								padding: "14px 0",
								border: 0,
								background: "transparent",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								gap: 16,
								textAlign: "left",
								cursor: "pointer",
								color: "var(--text,#14181F)",
								fontFamily: "Manrope,sans-serif",
								fontWeight: 700,
								fontSize: 17,
							}}
						>
							{f.q}
							<span aria-hidden="true" style={{ fontSize: 22, color: "var(--link,#B8541F)", flex: "none" }}>
								{isOpen ? "−" : "+"}
							</span>
						</button>
						{isOpen && (
							<p
								style={{
									margin: 0,
									padding: "0 0 18px",
									fontSize: 15,
									color: "var(--muted,#5A6472)",
									lineHeight: 1.65,
									maxWidth: "68ch",
								}}
							>
								{faqAnswer(f, setup)}
							</p>
						)}
					</div>
				);
			})}
		</div>
	);
}
