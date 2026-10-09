// AI Builder page content, copied from design/DripFunnel Website v2.dc.html (aiSteps, aiPrompts,
// aiDesigns, histPlans and the AI store mocks). Text that depends on the country comes from `region`.

import type { Region } from "./countries/types";

export const AI_STEPS: { n: string; t: string; d: string }[] = [
	["Describe", "What you sell, who buys it and how it should feel. Or one change: “add an About page”."],
	["Preview", "A draft arrives with what changed and what wasn’t touched. Check desktop, tablet and phone."],
	["Approve", "Nothing reaches shoppers until you say so. Don’t like it? Discard and ask again."],
	["Publish", "Your live shop changes in about a minute. We check that it did."],
	["Undo", "Every version is kept. Go back to any of them in one click."],
].map(([t, d], i) => ({ n: "0" + (i + 1), t, d }));

/** "What merchants type": the first prompt is the country's own sample shop. */
export function getAiPrompts(region: Region): { p: string; c: string }[] {
	return [
		[region.prompt, "Colours, type, homepage, menu, new page"],
		["Add a page about how we make our products, and put it in the menu.", "New page · menu"],
		["Put our bestsellers at the top of the homepage.", "Homepage sections"],
		["Show the size chart above the add-to-cart button on product pages.", "Product page layout"],
		["Use our brand colours, deep green and cream, everywhere.", "Look and feel on every page"],
		["Make the menu simpler: Shop, Our story, Help.", "Menus"],
	].map(([p, c]) => ({ p, c }));
}

export const AI_DESIGNS: { t: string; d: string }[] = [
	["Homepage", "Sections, order and words"],
	["Pages", "About, story, help, gift guides"],
	["Menus", "Header and footer"],
	["Product pages", "Layout and what shows first"],
	["Look and feel", "Colours, type and spacing"],
].map(([t, d]) => ({ t, d }));

/** How long each plan keeps old versions. */
export const HIST_PLANS: { p: string; v: string }[] = [
	["Starter (Free)", "7 days"],
	["Growth", "30 days"],
	["Growth Pro", "90 days"],
	["Business", "1 year"],
	["Partner", "Unlimited"],
].map(([p, v]) => ({ p, v }));

// ---- Before / after preview ----

export type DeviceKey = "desktop" | "tablet" | "phone";

export const DEVICES: { key: DeviceKey; label: string }[] = [
	{ key: "desktop", label: "Desktop" },
	{ key: "tablet", label: "Tablet" },
	{ key: "phone", label: "Phone" },
];

export const DEVICE_STYLE: Record<
	DeviceKey,
	{ maxw: string; cols: string; hfs: string; pad: string; r: string; n: number }
> = {
	desktop: { maxw: "100%", cols: "repeat(4,minmax(0,1fr))", hfs: "24px", pad: "26px 22px", r: "10px", n: 4 },
	tablet: { maxw: "420px", cols: "repeat(3,minmax(0,1fr))", hfs: "21px", pad: "22px 18px", r: "16px", n: 3 },
	phone: { maxw: "240px", cols: "repeat(2,minmax(0,1fr))", hfs: "18px", pad: "18px 14px", r: "24px", n: 2 },
};

export interface MockFrame {
	label: string;
	bg: string;
	fg: string;
	accent: string;
	headline: string;
	sub: string;
	cta: string;
	hfont: string;
	bar: string;
	nav: string;
	/** Background of the product tiles. */
	tile: string;
}

export function getFrames(region: Region): MockFrame[] {
	const before: MockFrame = {
		label: "Before",
		bg: "#FFFFFF",
		fg: "#14181F",
		accent: "#5A6472",
		headline: region.store,
		sub: "Our shop. Say hello.",
		cta: "Browse",
		hfont: "Inter",
		bar: "#FFFFFF",
		nav: "Shop · About · Cart",
		tile: "#EDEAE5",
	};
	const { headline, sub, cta, accent, bg, fg, tile, bar, nav } = region.after;
	const after: MockFrame = { label: "After", headline, sub, cta, accent, bg, fg, tile, bar, nav, hfont: "Manrope" };
	return [before, after];
}

// ---- Version history ----

export const LIVE_VERSION = 13;

export const AI_HISTORY: { v: number; label: string; date: string }[] = [
	[13, "Calm, earthy homepage · bestsellers first", "Today, 10:42"],
	[12, "New page: how we make it", "Yesterday, 16:05"],
	[11, "Free-returns note in the footer", "28 Sep, 09:30"],
	[10, "First version", "24 Sep, 14:12"],
].map(([v, label, date]) => ({ v: v as number, label: label as string, date: date as string }));

export function liveMessage(liveV: number): string {
	return liveV === LIVE_VERSION
		? "Version 13 is live. Pick any earlier version to go back to it."
		: "Version " + liveV + " is live again. Nothing else changed, and version 13 is still in your history.";
}
