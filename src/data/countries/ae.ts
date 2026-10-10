// United Arab Emirates: content specific to this country.
// The sample shop below is written by us (the design's example was Germany / EUR) and is a
// proposal for the owner to approve: see PLACEHOLDERS.md.

import type { CountryData } from "./types";

export const ae: CountryData = {
	code: "ae",
	name: "United Arab Emirates",
	hreflang: "en-AE",
	ogLocale: "en_AE",
	currency: "AED",
	region: {
		country: "United Arab Emirates",
		store: "Dune & Date",
		slug: "dune-date",
		city: "Dubai",
		owner: "Farhan",
		tax: "VAT",
		taxLine: "VAT at 5%, included in every price",
		price: "Prices shown with VAT",
		pay: "Stripe, Apple Pay, Tabby, cash on delivery",
		couriers: "Aramex, Emirates Post, DHL",
		compare: "Compare-at price never above your real earlier price",
		code: "HS code, optional",
		units: "kg and cm · sizes S–XL",
		items: [
			["Linen napkins, set of 4", 139],
			["Table runner", 199],
			["Waffle hand towel", 95],
			["Stonewashed throw", 439],
		],
		today: 4710,
		after: {
			headline: "Linen for slow evenings",
			sub: "Hand-dyed in Dubai. Free returns within 30 days.",
			cta: "Shop bestsellers",
			accent: "#8A6A2F",
			bg: "#F6EEDC",
			fg: "#2B2210",
			tile: "#E8DAB8",
			bar: "#FBF7EC",
			nav: "New in · Bestsellers · Our story · Cart",
		},
		prompt:
			"We sell hand-dyed linen for the home, made in Dubai. Calm and sandy, lots of white space. Put bestsellers first and add a page about how we dye our fabric.",
		taxRate: 0.05,
		taxIncluded: true,
	},
};
