// Terms of Service and Privacy Policy text, exactly as in the design (`LG`).
// Template text: the [bracketed placeholders] are intentional and must be replaced with wording
// approved by a lawyer before the site goes live.

export type LegalKey = "terms" | "privacy";

export interface LegalSection {
	heading: string;
	text: string;
}

export interface LegalDoc {
	title: string;
	/** Link text to the other legal page. */
	other: string;
	otherPage: LegalKey;
	intro: string;
	sections: LegalSection[];
}

export const LEGAL: Record<LegalKey, LegalDoc> = {
	terms: {
		title: "Terms of Service",
		other: "Read the Privacy Policy",
		otherPage: "privacy",
		intro:
			"These terms are the agreement between you and DripFunnel when you use DripFunnel to run an online shop. They cover your account, your plan and what each of us is responsible for.",
		sections: [
			{ heading: "Who we are", text: "DripFunnel is operated by [legal entity name], a Softobotics company, registered at [address]." },
			{
				heading: "Your account",
				text: "You must be old enough to form a contract where you live. You’re responsible for everyone you invite to your store, including staff and suppliers, and for keeping sign-in details safe.",
			},
			{
				heading: "Plans, trials and billing",
				text: "Starter is free. Paid plans start with a 10-day trial of Business. After the trial, plans are billed monthly or yearly in advance. Upgrades start straight away; downgrades take effect at the end of the billing period.",
			},
			{
				heading: "Fees on your orders",
				text: "DripFunnel does not charge a fee on your orders on any plan. Your payment provider charges its own fees under its own terms.",
			},
			{
				heading: "Your shop and your content",
				text: "You own your products, photos, words and customer relationships. You give us permission to host and display them so your shop works. You’re responsible for what you sell and for following the law in each market you sell in.",
			},
			{
				heading: "AI-designed storefronts",
				text: "The AI suggests designs and text. Nothing is published until you approve it, and you’re responsible for what you publish.",
			},
			{ heading: "Acceptable use", text: "[List of prohibited products and activities.]" },
			{
				heading: "Cancelling and closing",
				text: "You can cancel any time from Billing. [What happens to the shop, products, domain and data, and for how long they’re kept.]",
			},
			{ heading: "Liability", text: "[Limitation of liability, to be written by counsel.]" },
			{ heading: "Changes to these terms", text: "We’ll tell you by email at least [n] days before a change that affects you." },
			{ heading: "Contact", text: "Questions about these terms: legal@dripfunnel.com." },
		],
	},
	privacy: {
		title: "Privacy Policy",
		other: "Read the Terms of Service",
		otherPage: "terms",
		intro:
			"This policy explains what personal data DripFunnel collects, why, and the choices you have. It covers merchants and their teams who use DripFunnel, and visitors to this website.",
		sections: [
			{
				heading: "Who is responsible",
				text: "[Legal entity name], a Softobotics company, is responsible for data about merchants and website visitors. For shoppers’ data, the merchant is responsible and DripFunnel processes it on their behalf.",
			},
			{
				heading: "What we collect",
				text: "Account details (name, email, password), store details, billing details, and how you use the portal. [Full list.]",
			},
			{
				heading: "Why we use it",
				text: "To run your store, bill you, keep accounts secure, provide support and improve DripFunnel. [Legal bases per purpose.]",
			},
			{
				heading: "Shoppers’ data",
				text: "Orders, addresses and contact details belong to the merchant’s store. Suppliers see only what they need to ship their own items.",
			},
			{
				heading: "Who we share it with",
				text: "Payment providers, couriers, hosting and email providers that help run the service. [Named list of sub-processors.]",
			},
			{ heading: "Where it is stored", text: "[Regions and transfer safeguards.]" },
			{ heading: "How long we keep it", text: "[Retention periods.]" },
			{
				heading: "Your rights",
				text: "Depending on where you live, you can ask to see, correct, export or delete your data. [Region-specific rights, e.g. GDPR, India DPDP Act, US state laws.]",
			},
			{ heading: "Cookies", text: "[Cookies used on this website and in the portal, and how to manage them.]" },
			{ heading: "Contact", text: "privacy@dripfunnel.com." },
		],
	},
};
