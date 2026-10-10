// Features page content, copied from design/DripFunnel Website v2.dc.html (pageVals: fsecs, PLAN_RANK, PF).
// Text that the design builds from the sample shop (R.*) is a function of the country's `region`.
// The one-time "we build it for you" price depends on the currency shown, which can change in the
// browser, so the description holds SETUP_TOKEN and the page swaps in the price.

import type { Region } from "./countries/types";

export const SETUP_TOKEN = "{setup}";

export type PlanLabel = "All plans" | "Growth" | "Growth Pro" | "Business";
export type Tone = "ok" | "pe" | "ne";

export interface FeatureItem {
	t: string;
	p: PlanLabel;
	d: string;
}

export interface MockRow {
	a: string;
	b: string;
	c: string;
	pill: string;
	tone: Tone;
}

export interface MockBar {
	/** Height as a percentage, e.g. "52%". */
	h: string;
	l: string;
	highlight: boolean;
}

export interface FeatureSection {
	id: string;
	/** "01", "02", ... */
	n: string;
	label: string;
	title: string;
	lead: string;
	plan: string;
	items: FeatureItem[];
	mockTitle: string;
	mockSub: string;
	rows: MockRow[];
	bars?: MockBar[];
	foot?: string;
}

/** Colour pairs of the pills: [background, text]. */
export const TONES: Record<Tone, [string, string]> = {
	ok: ["var(--okbg,#EEF7F2)", "var(--okfg,#1D6B47)"],
	pe: ["var(--tint,#FDF0E8)", "var(--tint-fg,#8F4017)"],
	ne: ["var(--sunk,#F3EDE8)", "var(--text,#14181F)"],
};

export const PLAN_RANK: Record<PlanLabel, number> = { "All plans": 0, Growth: 1, "Growth Pro": 2, Business: 3 };

/** Plan filter chips on the index. "All" shows everything. */
export const PLAN_FILTERS = ["All", "Starter (Free)", "Growth", "Growth Pro", "Business", "Partner"] as const;
export type PlanFilter = (typeof PLAN_FILTERS)[number];

/** Highest plan rank included in each filter. "All" has no limit. */
export const FILTER_RANK: Record<PlanFilter, number | undefined> = {
	All: undefined,
	"Starter (Free)": 0,
	Growth: 1,
	"Growth Pro": 2,
	Business: 3,
	Partner: 3,
};

export function planColor(p: PlanLabel): string {
	return p === "All plans" ? "var(--okfg,#1D6B47)" : "var(--tint-fg,#8F4017)";
}

/**
 * @param region Sample shop of the country.
 * @param money Formats a price of the sample shop in the country's own currency.
 */
export function getFeatureSections(region: Region, money: (v: number) => string): FeatureSection[] {
	const row = (a: string, b: string, c?: string, pill?: string, tone: Tone = "ne"): MockRow => ({
		a,
		b,
		c: c || "",
		pill: pill || "",
		tone,
	});
	const it = region.items;
	const F = (t: string, p: PlanLabel, d: string): FeatureItem => ({ t, p, d });

	const sections: Omit<FeatureSection, "n">[] = [
		{
			id: "storefront",
			label: "Storefront and AI",
			title: "A store designed from a description",
			lead: "No themes, no templates. The AI designs the homepage, pages, menus, product pages and the look of all of them. You check, publish and can undo.",
			plan: "Every plan. On Starter and Growth the AI runs on your own key; from Growth Pro it is included.",
			items: [
				F("Describe a change", "All plans", "Plain words in, a draft out. One change at a time."),
				F("Before and after preview", "All plans", "Desktop, tablet and phone, side by side."),
				F("Approve and publish", "All plans", "Nothing reaches shoppers until you press approve. Publishes in about a minute."),
				F("Version history and undo", "All plans", "7 days on Starter, 30 on Growth, 90 on Growth Pro, 1 year on Business."),
				F("AI included", "Growth Pro", "A monthly allowance with no key to connect. Larger on Business."),
				F("Your own AI key", "All plans", "OpenAI or Anthropic. Paste it once in Settings."),
				F("Your own domain", "Growth", "Connect a domain you already own: add one DNS record, we handle the certificate."),
				F("Remove “Powered by DripFunnel”", "Growth Pro", "Your shop, your name only."),
				F("Bandwidth that grows", "All plans", "1 GB on Starter to 200 GB on Business. Buy more on Business."),
				F("We build it for you", "Growth", "Optional one-time service: " + SETUP_TOKEN + "."),
			],
			mockTitle: "Storefront · draft",
			mockSub: "v14 · not live",
			rows: [
				row("Homepage", "Bestsellers first, new hero", "Changed", "Draft", "pe"),
				row("Menu", "Shop · Our story · Help", "Changed", "Draft", "pe"),
				row("Products and prices", "Not touched"),
				row("Checkout", "Not touched"),
			],
			foot: "Approve & publish · Discard · History",
		},
		{
			id: "catalogue",
			label: "Catalogue",
			title: "A catalogue that handles the detail",
			lead: "Add a product once and sell every size and colour of it, with the content shoppers need to decide.",
			plan: "Starter: 10 products. Growth: 100. Growth Pro: 5,000. Business: unlimited.",
			items: [
				F("Versions", "All plans", "Every size × colour with its own price, stock, photos and code. Up to 250 per product on Business."),
				F("Photos", "All plans", "3 per product on Starter, up to 50 on Business."),
				F("Product video", "Growth Pro", "One video per product, shown with the photos."),
				F("A+ content", "Growth Pro", "Rich modules below the fold: comparison tables, feature rows, story sections."),
				F("Size charts", "All plans", "Build once, attach to many products. 1 on Starter, 25 on Growth Pro."),
				F("Collections", "All plans", "Manual or by rule. 3 on Starter, unlimited from Growth Pro."),
				F("Filters and internal tags", "All plans", "Shoppers filter by what matters; tags stay private."),
				F("Menus", "All plans", "Header and footer menus, or let the AI arrange them."),
				F("Specifications and highlights", "All plans", "Structured facts shoppers compare on."),
				F("Badges", "Growth", "New, bestseller, low stock, your own."),
				F("FAQs and related products", "Growth Pro", "Answer the question on the page; suggest the next thing."),
				F("AI descriptions", "All plans", "Written in your tone from a few facts."),
				F("AI translations", "All plans", "Every language your markets need, from one source text."),
				F("Import from a spreadsheet", "Growth", "Match columns once, pause and resume, see what failed and why."),
				F("Bring products from Shopify", "Growth Pro", "Products, versions, photos and collections come across."),
				F("Export", "Growth Pro", "CSV of products, stock or orders, ready for your accountant."),
				F("Stock history", "All plans", "Every change to every version, who and when."),
				F("Bulk edit", "All plans", "Select many, change price, stock, collections or status at once."),
				F("Legal and safety details", "All plans", "Country of origin, warnings, " + region.code + ", MRP or MSRP. Never behind a paywall."),
				F("Compare-at price", "All plans", region.compare + "."),
			],
			mockTitle: it[0][0],
			mockSub: "8 versions · 3 languages",
			rows: [
				row("S · Natural", "In stock at " + region.city, money(it[0][1]), "24 left", "ok"),
				row("M · Natural", "In stock at " + region.city, money(it[0][1]), "18 left", "ok"),
				row("L · Indigo", "Supplier stock", money(it[0][1]), "3 left", "pe"),
				row("XL · Indigo", "Supplier stock", money(it[0][1]), "Sold out"),
			],
			foot: "A+ content · Product video · Size chart · " + region.code,
		},
		{
			id: "orders",
			label: "Orders and shipping",
			title: "Orders, shipping and returns in one place",
			lead: "See what to ship first, send it with your courier, and handle returns without a spreadsheet.",
			plan: "Every plan has unlimited orders. Live courier rates from Growth Pro. 10 stock locations on Business.",
			items: [
				F("Order list and filters", "All plans", "To ship, unpaid, returns, by market, by supplier."),
				F("Ship with your courier", "All plans", region.couriers + ". Tracking goes to the shopper automatically."),
				F("Live courier rates at checkout", "Growth Pro", "Shoppers see the real price before they pay."),
				F("Partial shipping", "All plans", "Send what you have now and the rest later."),
				F("Refunds", "All plans", "All or part of an order, back to the original payment."),
				F("Returns", "All plans", "Request, approve, receive, refund. Each supplier handles their own items; you can override."),
				F("Cancellations", "All plans", "Before shipping, with stock put back."),
				F("Invoices, packing slips and labels", "All plans", "Print one or many, with the right tax wording for the market."),
				F("Delivery charges", "All plans", "Free, flat, by weight, or free above a threshold."),
				F("Delivery-area lists", "All plans", "Postcodes or regions you do and don’t deliver to."),
				F("Stock locations", "All plans", "1 on Starter, 5 on Growth Pro, 10 on Business."),
				F("Customers and groups", "All plans", "Profiles, order history, notes and groups for offers."),
				F("Email the customer", "All plans", "From the order, with the order details filled in."),
				F("Order exports", "Growth Pro", "CSV by date range, market or status."),
			],
			mockTitle: "Order #1042",
			mockSub: "Paid · 2 items",
			rows: [
				row(it[1][0], "Qty 1", money(it[1][1]), "Packed", "ok"),
				row(it[2][0], "Qty 2", money(it[2][1] * 2), "To ship", "pe"),
				row("Courier", region.couriers.split(",")[0] + " · tracking added", "", "Shipped", "ok"),
			],
			foot: "Print invoice · Packing slip · Label · Refund",
		},
		{
			id: "payments",
			label: "Payments and tax",
			title: "Get paid the way your shoppers pay",
			lead: "Local payment methods, local tax rules and zero DripFunnel fees on every order.",
			plan: "Zero fees on every plan. 1 gateway on Starter, 2 on Growth, all from Growth Pro.",
			items: [
				F("Zero fees on your orders", "All plans", "We never take a cut of your sales. You pay only your provider."),
				F("Payment gateways", "All plans", region.pay + ". Connect in minutes."),
				F("Cash on delivery and bank transfer", "All plans", "For markets where cards are not the norm."),
				F("Local tax worked out", "All plans", region.taxLine + "."),
				F("Tax-inclusive or exclusive prices", "All plans", "Follows the rule of each market automatically."),
				F("Tax report", "Growth", "What you owe, by market and rate."),
				F("Shopper invoices", "All plans", "Numbered, with the tax detail each country needs."),
			],
			mockTitle: "Payments",
			mockSub: region.country,
			rows: region.pay
				.split(",")
				.map((p, i) => row(p.trim(), i === 0 ? "Connected" : "Available", "", i === 0 ? "Live" : "", i === 0 ? "ok" : "ne")),
			foot: "DripFunnel fee: " + money(0) + " on every order",
		},
		{
			id: "offers",
			label: "Offers and carts",
			title: "Offers that bring people back",
			lead: "Run the offer you have in mind and see whether it worked. Remind shoppers who left something behind.",
			plan: "3 live offers on Starter and Growth. Unlimited offers and automatic reminders from Growth Pro.",
			items: [
				F("Discount codes", "All plans", "Percent off, fixed amount or free delivery."),
				F("Automatic offers", "All plans", "No code needed; applied when the rule is met."),
				F("Buy X get Y", "All plans", "Buy 2 get 1, mix and match, cheapest free."),
				F("Minimum spend and quantity", "All plans", "Set the bar the cart must clear."),
				F("Single-use codes", "Growth Pro", "One per shopper, generated in bulk or sent in a reminder."),
				F("Customer-group offers", "Growth Pro", "Trade, VIP, first order, your own groups."),
				F("Tiered offers", "Growth Pro", "Spend more, save more."),
				F("Schedules and stacking rules", "All plans", "Start and end dates, and which offers may combine."),
				F("Offer results", "Growth Pro", "Orders, revenue and discount given, per offer."),
				F("Abandoned-cart reminders", "All plans", "One you send yourself on Starter; up to 3 sent automatically from Growth Pro."),
				F("Discount in the last reminder", "Growth Pro", "A single-use code, only if the first two didn’t work."),
				F("Regional wording", "All plans", "Coupon or voucher, shipping or delivery, by market."),
			],
			mockTitle: "Buy 2, get 1 free",
			mockSub: "Automatic offer · live",
			rows: [
				row("Who", "Everyone", "", "Live", "ok"),
				row("Reminder 1", "1 hour after they leave", "Sent"),
				row("Reminder 2", "1 day after", "Sent"),
				row("Reminder 3", "3 days after, with a single-use code", "Scheduled", "Code", "pe"),
			],
		},
		{
			id: "abroad",
			label: "Selling abroad",
			title: "Sell in many countries from one shop",
			lead: "Add a market and your shop shows the right currency, language, tax and payment methods there.",
			plan: "Home market on Starter and Growth. 2 markets on Growth Pro, 10 on Business.",
			items: [
				F("Markets", "Growth Pro", "Each with its own currency, languages, tax and couriers."),
				F("Currencies", "Growth Pro", "Automatic conversion, or set prices yourself."),
				F("Languages", "Growth Pro", "Shop, emails and invoices in the shopper’s language."),
				F("Price adjustment per market", "Growth Pro", "+10% for one country, rounded nicely."),
				F("Fixed prices per market", "Business", "Exact local prices, not conversions."),
				F("Duties and import taxes at checkout", "Business", "Shoppers pay once, nothing at the door."),
				F("Own domain per market", "Business", "shop.de, shop.in, shop.com."),
				F("Local payment methods", "All plans", "Klarna in Germany, PhonePe in India, PayPal in the US."),
				F("Local couriers", "All plans", "DHL, Shiprocket, USPS and more."),
				F("Local rules built in", "All plans", "VAT-inclusive prices, 30-day lowest price in the EU, MRP in India, HSN codes."),
			],
			mockTitle: "Markets",
			mockSub: "5 live",
			rows: [
				row("India", "INR · Hindi, English", "GST incl.", "Live", "ok"),
				row("Germany", "EUR · German", "VAT 19% incl.", "Live", "ok"),
				row("United States", "USD · English", "Sales tax excl.", "Live", "ok"),
				row("United Arab Emirates", "AED · Arabic, English", "VAT 5% incl.", "Live", "ok"),
				row("United Kingdom", "GBP · English", "VAT 20% incl.", "Duties at checkout", "pe"),
			],
		},
		{
			id: "suppliers",
			label: "Suppliers",
			title: "Suppliers who manage their own shelf",
			lead: "Let suppliers keep their own products and stock up to date, and even pack their own orders, under your rules.",
			plan: "Business and Partner. Unlimited suppliers; their users don’t count towards your staff.",
			items: [
				F("Invite suppliers", "Business", "By email. The invitation creates their business and first user."),
				F("Three access levels", "Business", "Stock only; products and stock; or also packing their own orders."),
				F("Approval before going live", "Business", "Optional. Review, approve or send back with a reason."),
				F("Approval for edits", "Business", "Decide whether an edit to a live product needs a second look."),
				F("Suppliers see only their own", "Business", "Their products, their order lines, the delivery address. Never the order total or other suppliers."),
				F("Shared record", "Business", "You can edit a supplier’s product and they see the change. Only price is yours alone."),
				F("Suppliers pack their own orders", "Business", "Ship to your warehouse or straight to the shopper, your choice per supplier."),
				F("Supplier returns", "Business", "Each supplier handles their own items; you can override."),
				F("Supplier report", "Business", "What each supplier sold, by period."),
				F("Suspend or remove", "Business", "Their products stay in the catalogue, paused, until you decide."),
			],
			mockTitle: "Suppliers",
			mockSub: "2 active · 1 to approve",
			rows: [
				row("Loom House", "Products and stock", "12 products", "Active", "ok"),
				row("Indigo Mills", "Also packs own orders", "31 products", "Active", "ok"),
				row("New product", "From Loom House, this morning", "", "To approve", "pe"),
			],
			foot: "Approve · Send back with a reason",
		},
		{
			id: "team",
			label: "Team and security",
			title: "Your team, with the right keys",
			lead: "Each person sees only what their job needs, and every account is protected.",
			plan: "Owner only on Starter. 2 staff on Growth, 5 on Growth Pro, 15 on Business.",
			items: [
				F("Owner, Manager and Staff roles", "Growth", "Owner runs everything; Manager runs catalogue and orders; Staff handle orders and customers."),
				F("Manager role", "Growth Pro", "Day-to-day running without billing or settings."),
				F("Invitations", "Growth", "Email invites that expire after 7 days. Resend or revoke any time."),
				F("View-only where it matters", "Growth", "Staff can see offers and collections but not change them."),
				F("Two-step sign-in", "All plans", "Authenticator app or email code, with backup codes."),
				F("Activity in the stock history", "All plans", "Who changed what, and when."),
				F("My profile", "All plans", "Name, email, password, appearance and time zone."),
				F("Support access switch", "All plans", "Decide whether support may look at your store, and for how long."),
			],
			mockTitle: "People",
			mockSub: "3 staff · 2 suppliers",
			rows: [
				row(region.owner, "Owner", "Everything", "Owner", "ok"),
				row("Mei", "Manager", "Catalogue, orders, offers", "Staff"),
				row("Ravi", "Staff", "Orders and customers", "Staff"),
				row("Loom House", "Supplier · products and stock", "12 products", "Supplier", "pe"),
			],
		},
		{
			id: "reports",
			label: "Reports",
			title: "Reports that answer the obvious questions",
			lead: "What came in, what sold, where it went and how much tax you owe.",
			plan: "Home numbers on every plan. The 4 reports from Growth. Export from Growth Pro. Custom on Business.",
			items: [
				F("Home numbers", "All plans", "Takings, orders and visitors today, on the first screen."),
				F("Takings", "Growth", "By day, week or month, with refunds taken off."),
				F("What sold", "Growth", "Products and versions, so you know what to restock."),
				F("Markets", "Growth", "Where orders come from, in each currency."),
				F("Tax", "Growth", "Collected by market and rate, ready to file."),
				F("Supplier report", "Growth Pro", "Sales per supplier for settling up."),
				F("Export any report", "Growth Pro", "CSV for your spreadsheet or accountant."),
				F("Custom reports", "Business", "Pick the columns, filters and period, and save it."),
			],
			mockTitle: "Takings · last 7 days",
			mockSub: "Sample data",
			bars: [52, 64, 48, 80, 72, 96, 60].map((h, i) => ({
				h: h + "%",
				l: ["M", "T", "W", "T", "F", "S", "S"][i],
				highlight: i === 5,
			})),
			rows: [],
		},
		{
			id: "billing",
			label: "Plans and billing",
			title: "Plans that don’t punish you for growing",
			lead: "Start free, try everything, and change plans without losing work.",
			plan: "Every plan. Nothing you made is ever deleted when you move down.",
			items: [
				F("Starter, free forever", "All plans", "A real shop with 10 products, for as long as you like."),
				F("10-day trial of Business", "All plans", "Every feature, no credit card. We remind you before it ends."),
				F("Upgrade now, downgrade later", "All plans", "Upgrades start straight away; downgrades at the end of the period."),
				F("Choose what to keep", "All plans", "Over a limit after a downgrade? Pick what stays live. The rest is paused, not deleted."),
				F("Monthly or yearly", "All plans", "Yearly costs half the monthly price."),
				F("Invoices", "All plans", "Downloadable, with your business details and tax ID."),
				F("Past due, not locked out", "All plans", "If a payment fails you can still see everything; changes wait until it’s fixed."),
				F("Cancel any time", "All plans", "From Billing, with a clear note on what happens to the shop and domain."),
			],
			mockTitle: "Billing",
			mockSub: "Growth Pro · yearly",
			rows: [
				row("Plan", "Growth Pro", "", "Active", "ok"),
				row("Next invoice", "1 October 2027"),
				row("Card", "Visa ending 4417"),
				row("Trial", "Ended · you chose Growth Pro"),
			],
			foot: "Change plan · Download invoices · Cancel",
		},
	];

	return sections.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, "0") }));
}

export function featureStats(sections: FeatureSection[]) {
	const all = sections.flatMap((g) => g.items);
	return { count: all.length, free: all.filter((x) => x.p === "All plans").length, areas: sections.length };
}

/** The line under the index, which depends on the plan filter. */
export function indexLine(sections: { items: { p: PlanLabel }[] }[], filter: PlanFilter): string {
	const rank = FILTER_RANK[filter];
	const all = sections.flatMap((g) => g.items);
	if (rank === undefined) return all.length + " features across " + sections.length + " areas.";
	const inCount = all.filter((x) => PLAN_RANK[x.p] <= rank).length;
	return inCount + " of " + all.length + " features are included on " + filter + ". Greyed items start on a higher plan.";
}
