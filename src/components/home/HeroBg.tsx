// The animated "drip" lines behind the hero (design script line 816). 17 lines, same maths as the design.
// The animation (dfDrip) and its reduced-motion switch-off live in globals.css ([data-hero-bg]).

const MASK =
	"linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(transparent 0%, #000 12%, #000 80%, transparent 100%)";

const LINES = Array.from({ length: 17 }, (_, i) => {
	const x1 = -4 + i * 6.75;
	const x2 = 50 + (x1 - 50) * 0.14;
	return { x1, x2, d: 9 + ((i * 37) % 6), del: -((i * 53) % 11) };
});

export default function HeroBg() {
	return (
		<div
			aria-hidden="true"
			data-hero-bg=""
			style={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left: "calc(50% - 50cqw)",
				width: "100cqw",
				zIndex: -1,
				pointerEvents: "none",
				overflow: "hidden",
				WebkitMaskImage: MASK,
				WebkitMaskComposite: "source-in",
				maskImage: MASK,
				maskComposite: "intersect",
			}}
		>
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
				{LINES.map(({ x1, x2, d, del }, i) => (
					<g key={i}>
						<line x1={x1} y1={-2} x2={x2} y2={104} vectorEffect="non-scaling-stroke" style={{ stroke: "var(--border,#E8E2DC)", strokeWidth: 1, opacity: "var(--fl-a,0.7)" }} />
						<line
							x1={x1}
							y1={-2}
							x2={x2}
							y2={104}
							pathLength={100}
							vectorEffect="non-scaling-stroke"
							strokeLinecap="round"
							style={{
								stroke: "#EC844F",
								strokeOpacity: "var(--dr-a,0.56)",
								strokeWidth: 2.2,
								strokeDasharray: "12.5 200",
								animation: `dfDrip ${d}s cubic-bezier(.45,0,.75,1) ${del}s infinite`,
							}}
						/>
					</g>
				))}
			</svg>
		</div>
	);
}
