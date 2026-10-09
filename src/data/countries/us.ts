// United States: content specific to this country.
// Sample shop taken from the original design (design/DripFunnel Website v2.dc.html).

import type { CountryData } from "./types";

export const us: CountryData = {
	code: "us",
	name: "United States",
	hreflang: "en-US",
	ogLocale: "en_US",
	currency: "USD",
	region: {
		country: "United States",
		store: "Juniper & Co.",
		slug: "juniper-co",
		city: "Portland",
		owner: "Farhan",
		tax: "Sales tax",
		taxLine: "Sales tax worked out by state and added at checkout",
		price: "Prices shown before tax",
		pay: "Stripe, PayPal",
		couriers: "USPS, UPS, FedEx",
		compare: "MSRP only. No made-up “was” prices",
		code: "HTS code, optional",
		units: "lb and in · sizes S–XL",
		items: [
			["Linen napkins, set of 4", 38],
			["Table runner", 54],
			["Waffle hand towel", 26],
			["Stonewashed throw", 120],
		],
		today: 1284,
		after: {
			headline: "Linen for slow mornings",
			sub: "Hand-dyed in Portland. Free returns within 30 days.",
			cta: "Shop bestsellers",
			accent: "#3F5E4A",
			bg: "#EEF0E8",
			fg: "#1E2A22",
			tile: "#D9DECF",
			bar: "#F7F7F2",
			nav: "New in · Bestsellers · Our story · Cart",
		},
		prompt:
			"We sell hand-dyed linen for the home, made in Portland. Calm and earthy, lots of white space. Put bestsellers first and add a page about how we dye our fabric.",
		taxRate: 0.08,
		taxIncluded: false,
	},
};
