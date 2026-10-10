// Home page content, copied from design/DripFunnel Website v2.dc.html (script lines 700-736).
// Country-specific sample content (store name, prices, tax) comes from the country files.

import { ae } from "@/data/countries/ae";
import { india } from "@/data/countries/in";
import { us } from "@/data/countries/us";
import type { CountryData } from "@/data/countries";

/** Dashed "Merchant logo" and testimonial slots stay until the owner supplies pictures. */
export const SHOW_PLACEHOLDERS = true;
export const LOGO_SLOTS = 6;

export const HERO_STRIP = ["700+ merchants", "No templates", "0% fee on orders"];

/** [short label on the button, text put in the input] */
export function heroExamples(city: string): [string, string][] {
	return [
		["Calm and earthy", "Make it calm and earthy, with lots of white space and big photos."],
		["Bestsellers first", "Put our bestsellers at the top of the homepage and add a gift guide page."],
		["Our story", "Add a page telling the story of how we started in " + city + ", and link it from the menu."],
	];
}

/** [title, description] of the four "How it works" steps. */
export const STEPS: [string, string][] = [
	["Describe", "Say what you sell and how it should feel."],
	["Preview", "See before and after on desktop, tablet and phone."],
	["Publish", "Approve it. Your live shop changes in about a minute."],
	["Undo", "Every version is kept. Go back in one click."],
];

export const DESIGNED_BY_AI = ["Homepage", "Pages", "Menus", "Product pages", "Colours and type"];

export type Device = "desktop" | "tablet" | "phone";

export const DEVICES: { key: Device; label: string }[] = [
	{ key: "desktop", label: "Desktop" },
	{ key: "tablet", label: "Tablet" },
	{ key: "phone", label: "Phone" },
];

export const DEVICE_MOCKS: Record<Device, { maxw: string; cols: string; hfs: string; pad: string; r: string; n: number }> = {
	desktop: { maxw: "100%", cols: "repeat(4,minmax(0,1fr))", hfs: "24px", pad: "26px 22px", r: "10px", n: 4 },
	tablet: { maxw: "420px", cols: "repeat(3,minmax(0,1fr))", hfs: "21px", pad: "22px 18px", r: "16px", n: 3 },
	phone: { maxw: "240px", cols: "repeat(2,minmax(0,1fr))", hfs: "18px", pad: "18px 14px", r: "24px", n: 2 },
};

export const BEFORE_MOCK = {
	label: "Before",
	bg: "#FFFFFF",
	fg: "#14181F",
	accent: "#5A6472",
	sub: "Our shop. Say hello.",
	cta: "Browse",
	hfont: "Inter",
	bar: "#FFFFFF",
	nav: "Shop · About · Cart",
	tile: "#EDEAE5",
};

/** [version, label, date] */
export const HISTORY: [number, string, string][] = [
	[13, "Calm, earthy homepage · bestsellers first", "Today, 10:42"],
	[12, "New page: how we make it", "Yesterday, 16:05"],
	[11, "Free-returns note in the footer", "28 Sep, 09:30"],
	[10, "First version", "24 Sep, 14:12"],
];
export const LATEST_VERSION = 13;

/** Icon paths of the design's `IC` object (the design's feature list does not draw them). */
export const FEATURE_ICONS: Record<string, string> = {
	ai: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
	fee: "M19 5L5 19M6.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM17.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
	free: "M5 12l5 5L20 7",
	box: "M4 7l8-4 8 4v10l-8 4-8-4zM4 7l8 4 8-4M12 11v10",
	globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
	tag: "M3 12V4h8l10 10-8 8zM7.5 8.5h.01",
	truck: "M3 6h11v10H3zM14 10h4l3 3v3h-7M7 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
	team: "M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 3.5a4 4 0 010 7.5M22 21c0-3-1.5-5-4-5.7",
	bag: "M6 2l-3 4v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
	chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
};

export interface HomeFeature {
	n: string;
	icon: string;
	title: string;
	text: string;
	/** Page below the country (for path()). */
	page: string;
}

export function homeFeatures(tax: string): HomeFeature[] {
	const rows: [string, string, string, string][] = [
		["ai", "AI designs your whole store", "Homepage, pages, menus, product pages and the look of every one. Preview, publish, undo.", "ai"],
		["fee", "Zero fees on your orders", "On every plan, including Starter. You pay only your payment provider’s own fee.", "pricing"],
		["free", "Start free", "Starter is free forever. Paid plans start with 10 days of everything in Business, no credit card.", "pricing"],
		["box", "A catalogue that does the detail", "Sizes and colours, A+ content, product video, size charts, collections and filters. Import from a spreadsheet or Shopify.", "features"],
		["globe", "Sell in many countries", "Markets, currencies and languages, with " + tax + " and other local tax, duties at checkout, and local payments and couriers.", "features"],
		["tag", "Offers that bring people back", "Discount codes, automatic offers, buy X get Y, single-use codes and abandoned-cart reminders.", "features"],
		["truck", "Suppliers who manage their own shelf", "Invite suppliers to add products, keep stock up to date and even pack their own orders. Approve first if you like.", "features"],
		["team", "Your team, with the right keys", "Staff accounts with Owner, Manager and Staff roles. Each sees only what their job needs.", "features"],
	];
	return rows.map(([ic, title, text, page], i) => ({ n: String(i + 1).padStart(2, "0"), icon: FEATURE_ICONS[ic], title, text, page }));
}

/** [label, badge, active] of the portal sidebar in the mock. */
export const PORTAL_NAV: [string, string, boolean][] = [
	["Home", "", true],
	["Orders", "4", false],
	["Customers", "", false],
	["Offers", "", false],
	["Abandoned carts", "2", false],
	["Reports", "", false],
	["Products", "1", false],
	["Collections", "", false],
	["Storefront", "", false],
	["Settings", "", false],
	["Billing", "", false],
];

/** Countries of the comparison table, in the design's order (INR, then the other two). */
export const HOME_REGIONS: CountryData[] = [india, us, ae];

export const REGION_ROWS = ["Currency", "Tax", "Payments", "Couriers", "Compare price", "Product code"] as const;

export function regionCell(row: (typeof REGION_ROWS)[number], c: CountryData): string {
	switch (row) {
		case "Currency":
			return c.currency;
		case "Tax":
			return c.region.taxLine;
		case "Payments":
			return c.region.pay;
		case "Couriers":
			return c.region.couriers;
		case "Compare price":
			return c.region.compare;
		case "Product code":
			return c.region.code;
	}
}
