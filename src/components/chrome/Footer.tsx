import Link from "next/link";
import type { CountryCode } from "@/data/countries";
import { path } from "@/lib/routes";
import CountrySwitcher from "./CountrySwitcher";
import CurrencySelect from "./CurrencySelect";
import ThemeToggle from "./ThemeToggle";

const COLUMNS: { title: string; links: [label: string, page: string][] }[] = [
	{
		title: "Product",
		links: [
			["Features", "features"],
			["AI Builder", "ai"],
			["Pricing", "pricing"],
			["Partners", "partners"],
		],
	},
	{
		title: "Resources",
		links: [
			["Blog", "blog"],
			["Help centre", "help"],
			["Contact support", "contact/support"],
		],
	},
	{
		title: "Company",
		links: [
			["Book a demo", "contact/demo"],
			["Talk to sales", "contact/sales"],
			["Become a partner", "contact/partners"],
		],
	},
	{
		title: "Legal",
		links: [
			["Terms of Service", "terms"],
			["Privacy Policy", "privacy"],
		],
	},
];

export default function Footer({ country }: { country: CountryCode }) {
	return (
		<footer className="ft" data-band="">
			<div className="ft-top">
				<div className="ft-brand">
					<img src="/assets/dripfunnel-logo-inverse.svg" alt="DripFunnel" width={165} height={28} />
					<span className="ft-about">
						Describe your business and AI builds your whole store. Then run catalogue, orders, offers, suppliers and selling abroad from one
						portal.
					</span>
					<div className="ft-selects">
						<CountrySwitcher variant="footer" current={country} />
						<CurrencySelect />
					</div>
				</div>
				{COLUMNS.map((col) => (
					<div key={col.title} className="ft-col">
						<span className="ft-col-title">{col.title}</span>
						{col.links.map(([label, page]) => (
							<Link key={page} href={path(country, page)}>
								{label}
							</Link>
						))}
					</div>
				))}
			</div>
			<div className="ft-bottom">
				<span>© 2026 DripFunnel. A Softobotics company.</span>
				<ThemeToggle variant="footer" />
			</div>
		</footer>
	);
}
