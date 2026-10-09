// India (default country): content specific to this country.
// Sample shop taken from the original design (design/DripFunnel Website v2.dc.html).

import type { CountryData } from "./types";

export const india: CountryData = {
	code: "in",
	name: "India",
	hreflang: "en-IN",
	ogLocale: "en_IN",
	currency: "INR",
	region: {
		country: "India",
		store: "Kesari Threads",
		slug: "kesari-threads",
		city: "Jaipur",
		owner: "Farhan",
		tax: "GST",
		taxLine: "GST at 5%, included in every price",
		price: "Prices shown with GST",
		pay: "Cashfree, PhonePe, cash on delivery, bank transfer",
		couriers: "Shiprocket",
		compare: "MRP shown, and your price can never go above it",
		code: "HSN code, required",
		units: "kg and cm · sizes S–XL",
		items: [
			["Block-print kurta", 1890],
			["Indigo dupatta", 1250],
			["Cushion covers, set of 2", 990],
			["Double bedcover", 3400],
		],
		today: 48600,
		after: {
			headline: "Printed by hand in Jaipur",
			sub: "Cotton block prints in saffron and indigo. Free delivery over ₹1,500.",
			cta: "Shop new arrivals",
			accent: "#9A3B12",
			bg: "#FBEBD9",
			fg: "#3A1A0A",
			tile: "#F0D2B4",
			bar: "#FFF8F0",
			nav: "New in · Kurtas · Home · Our printers · Cart",
		},
		prompt:
			"We sell hand block-printed cotton from Jaipur. Warm and colourful, saffron and indigo. Show new arrivals first and add a page about the families who print for us.",
		taxRate: 0.05,
		taxIncluded: true,
	},
};
