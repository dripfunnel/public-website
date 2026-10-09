// Pricing page content, copied from the original design (script data PL, BW, G, faqDef).
// Money amounts are not stored here: plan prices are in data/prices.ts and are formatted at render time.

import type { PaidPlanKey, PlanPrices } from "./prices";

export type PlanKey = "free" | PaidPlanKey | "ent";

export interface Plan {
	k: PlanKey;
	name: string;
	for: string;
	cta: string;
	badge?: string;
	points: string[];
}

/** Plan order is also the column order of the comparison table. Index 2 (Growth Pro) is highlighted. */
export const PLANS: Plan[] = [
	{
		k: "free",
		name: "Starter (Free)",
		for: "Try it with real shoppers. Free for life.",
		cta: "Start free",
		points: [
			"10 products",
			"Your shop on a DripFunnel address",
			"AI designs your shop on your own AI key",
			"Owner only",
			"No fee on your orders, ever",
		],
	},
	{
		k: "starter",
		name: "Growth",
		for: "Your first real shop, on your own domain.",
		cta: "Start 10-day free trial",
		points: [
			"100 products",
			"Your own domain",
			"2 staff accounts",
			"Import from a spreadsheet",
			"AI designs your shop on your own AI key",
			"The 4 reports",
		],
	},
	{
		k: "growth",
		name: "Growth Pro",
		for: "A small team, more markets and a richer shop.",
		cta: "Start 10-day free trial",
		badge: "Most popular",
		points: [
			"5,000 products",
			"A+ content and video",
			"5 staff accounts",
			"2 markets, currencies and languages",
			"AI included, no key needed",
			"Remove “Powered by DripFunnel”",
		],
	},
	{
		k: "business",
		name: "Business",
		for: "High volume, many suppliers, selling abroad.",
		cta: "Start 10-day free trial",
		points: [
			"Unlimited products",
			"Suppliers with full access",
			"15 staff accounts",
			"10 markets, currencies and languages",
			"Duties and import taxes at checkout",
			"Custom reports and priority support",
		],
	},
	{
		k: "ent",
		name: "Partner",
		for: "White-label, many stores, your own terms.",
		cta: "Talk to us",
		points: [
			"Everything in Business",
			"Your brand on the portal, shops and emails",
			"Many stores under one account",
			"SSO and full API access",
			"Migration, onboarding and uptime guarantee",
			"Named account manager",
		],
	},
];

/** Last point on every plan card. */
export const BANDWIDTH: Record<PlanKey, string> = {
	free: "1 GB bandwidth a month (about 1,000–5,000 page views)",
	starter: "10 GB bandwidth a month",
	growth: "50 GB bandwidth a month",
	business: "200 GB bandwidth a month, buy more any time",
	ent: "Bandwidth to fit your traffic",
};

/** Shown in the billing-period toggle. */
export const PERIODS = [
	{ key: "month", label: "Monthly", tag: "" },
	{ key: "year", label: "Yearly", tag: "Save 50%" },
] as const;
export type Period = (typeof PERIODS)[number]["key"];

/** A table cell: text, or the one-time set-up price of a paid plan (formatted in the shown currency). */
export type Cell = string | { setup: PaidPlanKey };

export interface Row {
	name: string;
	note?: string;
	v: Cell[];
}

export interface Group {
	name: string;
	rows: Row[];
}

const r = (name: string, v: Cell[], note?: string): Row => ({ name, v, note });

export const GROUPS: Group[] = [
	{
		name: "Catalogue",
		rows: [
			r("Products", ["10", "100", "5,000", "Unlimited", "Unlimited"]),
			r("Photos per product", ["3", "5", "25", "50", "Custom"]),
			r("Versions per product", ["10", "100", "100", "250", "Custom"], "e.g. every size × colour"),
			r("Collections", ["3", "25", "Unlimited", "Unlimited", "Unlimited"]),
			r("Filters and internal tags", ["✓", "✓", "✓", "✓", "✓"]),
			r("Size charts", ["1", "2", "25", "Unlimited", "Unlimited"]),
			r("Specifications and highlights", ["✓", "✓", "✓", "✓", "✓"]),
			r("Badges", ["—", "✓", "✓", "✓", "✓"]),
			r("FAQs and related products", ["—", "—", "✓", "✓", "✓"]),
			r("A+ content", ["—", "—", "50 products", "Unlimited", "Unlimited + shared blocks"]),
			r("Product video", ["—", "—", "✓", "✓", "✓"]),
			r("Import from a spreadsheet", ["—", "✓", "✓", "✓", "✓"]),
			r("Bring products from Shopify", ["—", "—", "✓", "✓", "✓"]),
			r(
				"AI for descriptions and translations",
				["Your own AI key", "Your own AI key", "Included · monthly allowance", "Included · larger allowance", "Custom"],
				"Same AI account as your storefront: one key, or one allowance",
			),
			r("Legal and safety details", ["✓", "✓", "✓", "✓", "✓"], "Never behind a paywall"),
		],
	},
	{
		name: "Getting started",
		rows: [
			r(
				"Storefront built by our team (optional)",
				["—", { setup: "starter" }, { setup: "growth" }, { setup: "business" }, "Custom"],
				"Only if you want it. Or build it yourself with the AI, free on every plan",
			),
		],
	},
	{
		name: "Getting paid",
		rows: [
			r("DripFunnel fee on your orders", ["None", "None", "None", "None", "None"], "We never take a cut of your sales"),
			r("Payment gateways", ["1", "2", "All", "All", "All"]),
			r("Cash on delivery, bank transfer", ["✓", "✓", "✓", "✓", "✓"]),
			r(
				"Discount codes and automatic offers",
				["3 live", "3 live", "Unlimited", "Unlimited", "Unlimited"],
				"Percent, fixed, free delivery and buy X get Y on every plan",
			),
			r("Customer-group offers, tiers, single-use codes", ["—", "—", "✓", "✓", "✓"]),
			r("Offer results", ["—", "—", "✓", "✓", "✓"]),
		],
	},
	{
		name: "Team and suppliers",
		rows: [
			r("Staff accounts", ["Owner only", "2", "5", "15", "Unlimited"]),
			r("Manager role", ["—", "—", "✓", "✓", "✓"]),
			r(
				"Suppliers",
				["—", "—", "—", "Unlimited · full access", "Unlimited · full access"],
				"Stock only, products and stock, or also packing their own orders",
			),
			r("Approve supplier products", ["—", "—", "—", "✓", "✓"]),
			r("Suppliers pack their own orders", ["—", "—", "—", "✓", "✓"]),
		],
	},
	{
		name: "Selling abroad",
		rows: [
			r("Markets", ["Home only", "Home only", "2", "10", "Unlimited"]),
			r("Currencies", ["1", "1", "2", "10", "Unlimited"], "Automatic conversion, or set prices yourself"),
			r("Languages", ["1", "1", "2", "10", "Unlimited"]),
			r("Price adjustment per market", ["—", "—", "✓", "✓", "✓"]),
			r("Fixed prices per market", ["—", "—", "—", "✓", "✓"]),
			r("Own domain per market", ["—", "—", "—", "✓", "✓"]),
			r("Duties and import taxes at checkout", ["—", "—", "—", "✓", "✓"]),
		],
	},
	{
		name: "Shipping and stock",
		rows: [
			r("Stock locations", ["1", "2", "5", "10", "Unlimited"]),
			r("Couriers you can connect", ["1", "2", "All", "All", "All"]),
			r("Live courier rates at checkout", ["—", "—", "✓", "✓", "✓"]),
			r("Delivery-area lists", ["✓", "✓", "✓", "✓", "✓"]),
		],
	},
	{
		name: "Storefront",
		rows: [
			r(
				"Monthly bandwidth",
				["1 GB", "10 GB", "50 GB", "200 GB", "Custom"],
				"Total data your shop sends to shoppers. 1 GB usually covers 1,000–5,000 page views a month.",
			),
			r("Buy extra bandwidth", ["—", "—", "—", "✓", "✓"], "Billed per extra GB, so your shop never slows down"),
			r("Your own domain", ["—", "✓", "✓", "✓", "✓"]),
			r("Remove “Powered by DripFunnel”", ["—", "—", "✓", "✓", "Full white-label"]),
			r(
				"AI that designs your whole store",
				["Your own AI key", "Your own AI key", "Included · monthly allowance", "Included · larger allowance", "Custom"],
				"Starter (Free) and Growth: connect your own AI account. Growth Pro and up: included",
			),
			r("Version history", ["7 days", "30 days", "90 days", "1 year", "Unlimited"]),
			r(
				"Abandoned-cart reminders",
				[
					"You send · 1 per cart",
					"You send · 1 per cart",
					"Automatic · up to 3",
					"Automatic · up to 3",
					"Automatic · up to 3",
				],
				"From Growth Pro, reminders can include a single-use discount",
			),
			r("Blog", ["Planned", "Planned", "Planned", "Planned", "Planned"]),
		],
	},
	{
		name: "Reports",
		rows: [
			r("Home numbers", ["✓", "✓", "✓", "✓", "✓"]),
			r("Takings, what sold, markets, tax", ["—", "✓", "✓", "✓", "✓"]),
			r("Export and supplier report", ["—", "—", "✓", "✓", "✓"]),
			r("Custom reports", ["—", "—", "—", "✓", "✓"]),
		],
	},
	{
		name: "Support and partner",
		rows: [
			r("Support", ["Help centre", "Email", "Chat", "Priority chat and phone", "Named manager"]),
			r("Uptime guarantee", ["—", "—", "—", "—", "✓"]),
			r("White-label", ["—", "—", "—", "—", "✓"]),
			r("Many stores, one account", ["—", "—", "—", "—", "✓"]),
			r("SSO and full API", ["—", "—", "—", "—", "✓"]),
			r("Migration and onboarding", ["—", "—", "—", "—", "✓"]),
		],
	},
];

/** "₹7,000 on Growth, ₹9,000 on Growth Pro, ₹12,000 on Business" in whatever currency `fmt` formats. */
export function setupLine(prices: PlanPrices, fmt: (v: number) => string): string {
	return `${fmt(prices.starter[1])} on Growth, ${fmt(prices.growth[1])} on Growth Pro, ${fmt(prices.business[1])} on Business`;
}

export interface Faq {
	q: string;
	/** Plain answer, or one that needs the one-time set-up prices (see setupLine). */
	a: string | ((setup: string) => string);
}

export const FAQS: Faq[] = [
	{
		q: "How does the 10-day free trial work?",
		a: "Every new store gets full Business access for 10 days, no credit card required. Use every feature, then pick the plan that fits. We remind you before the trial ends, and nothing you made is ever deleted.",
	},
	{
		q: "Is Starter (Free) really free forever?",
		a: "Yes. You keep a real shop with 10 products for as long as you like. We never take a fee on your orders, on any plan.",
	},
	{
		q: "What happens if I go over a limit?",
		a: "Nothing breaks and nothing is deleted. Everything you have keeps selling; you just can’t add more until you move up a plan.",
	},
	{
		q: "Can I change plans any time?",
		a: "Upgrades start straight away and you pay the difference for the month. Downgrades take effect at the end of your billing period.",
	},
	{
		q: "If I downgrade, do I lose my A+ content?",
		a: "You keep it. It’s hidden from your shop until you upgrade again, then it comes straight back.",
	},
	{
		q: "What does “your own AI key” mean?",
		a: "On Starter (Free) and Growth you connect your own AI account (for example OpenAI or Anthropic) and pay them directly for what you use. It designs your store and writes product descriptions and translations. From Growth Pro, all of that AI is included with one monthly allowance: no key, no extra bill.",
	},
	{
		q: "What happens when I run out of AI allowance?",
		a: "Your shop keeps working and nothing you published changes. You can wait for next month’s allowance, move up a plan, or connect your own key to keep going.",
	},
	{
		q: "What is bandwidth, and what if I go over?",
		a: "It’s the total data your shop sends to shoppers each month: pages, photos and videos. 1 GB usually covers 1,000–5,000 page views. If you go over, your shop stays online: we tell you at 80% and 100%, and you can move up a plan. On Business you can also buy extra bandwidth, billed per GB. We never switch your shop off without warning.",
	},
	{
		q: "Do I have to pay for storefront setup?",
		a: (setup) =>
			"No. The AI builds your storefront for free on every plan. Need help building your storefront? We’ll do it for you: our team builds your homepage, pages, menus and first products so you launch looking finished. It’s optional and paid once: " +
			setup +
			".",
	},
	{
		q: "Do you charge per staff member?",
		a: "No. Each plan includes a number of staff accounts. Your suppliers’ users don’t count towards it.",
	},
	{
		q: "What does white-label mean?",
		a: "On Partner, the portal, the shops and every email carry your brand, not ours. It’s for agencies and groups running shops for others.",
	},
];

/** Plain-text answer for a currency (used for the page text and for the FAQ structured data). */
export function faqAnswer(faq: Faq, setup: string): string {
	return typeof faq.a === "function" ? faq.a(setup) : faq.a;
}

/** Rest of the footnote under the table. It starts with PRICE_NOTE for the shown currency. */
export const PRICE_FOOT_REST =
	" Yearly plans cost half the monthly price. We never charge a fee on your orders. Items marked “planned” aren’t in the product yet.";
