// Blog articles. Copied from the design script (POSTS). Only the first article has a full body;
// the others show a placeholder (docs/pages-and-navigation.md, open question 1).

export interface BlogSection {
	h: string;
	p: string;
}

export interface BlogPost {
	id: string;
	cat: string;
	title: string;
	/** Opening text: the card summary, the article's first paragraph and its search description. */
	ex: string;
	/** Display date, e.g. "24 Sep 2026". */
	date: string;
	mins: number;
	body?: BlogSection[];
}

export const POSTS: BlogPost[] = [
	{
		id: "describe-your-shop",
		cat: "Storefront and AI",
		title: "How to describe your shop so the AI gets it right",
		ex: "Three sentences do most of the work: what you sell, who buys it, and how it should feel.",
		date: "24 Sep 2026",
		mins: 5,
		body: [
			{
				h: "Start with what you sell",
				p: "Name the products and what makes them yours: where they’re made, what they’re made of, who makes them. “Hand block-printed cotton from Jaipur” gives the AI far more to work with than “clothes”.",
			},
			{
				h: "Say who buys it",
				p: "One line about your shoppers shapes the words and the layout. Gift buyers want a gift guide near the top; repeat customers want new arrivals first.",
			},
			{
				h: "Describe the feeling, not the layout",
				p: "Words like calm, bold, warm or playful set colours, type and spacing. You don’t need to say where the button goes. If you have brand colours, name them.",
			},
			{
				h: "Then change one thing at a time",
				p: "Once the first version is live, ask for small changes: a new page, a simpler menu, bestsellers first. Each one arrives as a draft you can check, and every version stays in your history.",
			},
		],
	},
	{
		id: "selling-to-europe",
		cat: "Selling abroad",
		title: "Selling into Europe: VAT, duties and what shoppers see at checkout",
		ex: "What changes when you add a European market, and which settings to check first.",
		date: "17 Sep 2026",
		mins: 7,
	},
	{
		id: "cart-reminders",
		cat: "Offers",
		title: "Abandoned-cart reminders: when to send them and what to say",
		ex: "Three reminders, three jobs. When to add a discount, and when not to.",
		date: "9 Sep 2026",
		mins: 4,
	},
	{
		id: "moving-from-shopify",
		cat: "Guides",
		title: "Moving from Shopify: what comes across and what to check",
		ex: "Products, versions, photos and collections come with you. Here is what to look at before you switch your domain.",
		date: "2 Sep 2026",
		mins: 6,
	},
	{
		id: "size-charts",
		cat: "Catalogue",
		title: "Size charts that answer the question before it’s asked",
		ex: "Fewer returns start on the product page. How to set up charts once and reuse them.",
		date: "26 Aug 2026",
		mins: 4,
	},
	{
		id: "suppliers",
		cat: "Suppliers",
		title: "Letting suppliers add products without losing control",
		ex: "Pick the right access level, decide whether to approve, and keep your catalogue consistent.",
		date: "19 Aug 2026",
		mins: 5,
	},
];

/** "All" followed by each category in order of first appearance. */
export const BLOG_CATEGORIES: string[] = ["All", ...Array.from(new Set(POSTS.map((p) => p.cat)))];

export function getPost(id: string): BlogPost | undefined {
	return POSTS.find((p) => p.id === id);
}

/** "24 Sep 2026" -> "2026-09-24" (for structured data). */
export function postIsoDate(date: string): string {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const [d, m, y] = date.split(" ");
	const mm = String(months.indexOf(m) + 1).padStart(2, "0");
	return `${y}-${mm}-${d.padStart(2, "0")}`;
}
