// Partners page content, copied from the original design (script data pStats ... pSteps).
// The example partner and the payout statement are a fixed sample. They are not tied to the shown currency.

export interface Pair {
	l: string;
	v: string;
}

export const PARTNER_STATS: Pair[] = [
	{ l: "Stores", v: "86" },
	{ l: "Live", v: "78" },
	{ l: "Plans", v: "4" },
];

export const PARTNER_DOMAINS: Pair[] = [
	{ l: "Portal", v: "store.northstar.com" },
	{ l: "Shops", v: "*.shops.northstar.com" },
	{ l: "Emails from", v: "mail.northstar.com" },
];

export interface PartnerBlock {
	t: string;
	d: string;
	pts: string[];
}

export const PARTNER_BLOCKS: PartnerBlock[] = [
	{
		t: "Your brand everywhere",
		d: "Merchants and their shoppers see your name, not ours.",
		pts: ["Your logo, colours and font on the portal", "Shops on your own domain", "Every email sent from your own address"],
	},
	{
		t: "Your plans, your prices",
		d: "Build plans from DripFunnel’s features and set your own prices in each currency.",
		pts: [
			"Choose what each plan includes and its limits",
			"Set prices per currency, monthly and yearly",
			"Compare your plans side by side before publishing",
		],
	},
	{
		t: "Many stores, one account",
		d: "Create and run every client’s store from one partner console.",
		pts: [
			"See every store’s plan, status and payments",
			"Help a merchant by signing in as them, with a full activity log",
			"Your team with Owner, Admin, Support, Finance and Read-only roles",
		],
	},
	{
		t: "Checked before you go live",
		d: "We review every partner before their first shop opens.",
		pts: [
			"Branding, domains, plans and legal pages checked",
			"We can set up with you in a guided session",
			"Sent back with clear notes if something is missing",
		],
	},
];

export interface StatementLine extends Pair {
	/** Font weight of the line. */
	w: number;
}

export const PARTNER_STATEMENT: StatementLine[] = [
	{ l: "Collected from your 78 stores", v: "$4,261.40", w: 400 },
	{ l: "DripFunnel wholesale fee", v: "−$1,549.00", w: 400 },
	{ l: "Adjustments", v: "$0.00", w: 400 },
	{ l: "Paid to you on 1 September", v: "$2,712.40", w: 700 },
];

export const PARTNER_STEPS: { t: string; d: string }[] = [
	{ t: "Talk to us", d: "Tell us how many stores and where." },
	{ t: "Agree terms", d: "Your wholesale rate and contract." },
	{ t: "Set up", d: "Brand, domains, plans and legal pages, on your own or with us." },
	{ t: "Submit", d: "Send your setup for review." },
	{ t: "Approval", d: "We check it and approve, or send it back with notes." },
	{ t: "Go live", d: "Open your first stores under your brand." },
];
