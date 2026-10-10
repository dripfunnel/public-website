import type { ReactNode } from "react";
import type { CountryCode } from "@/data/countries";
import { SiteProvider } from "./site-context";
import CountryBanner from "./chrome/CountryBanner";
import Footer from "./chrome/Footer";
import Header from "./chrome/Header";
import "./chrome/chrome.css";

/** Page frame shared by every page: skip link, header, main content, footer and country banner. */
export default function SiteShell({ country, children }: { country: CountryCode; children: ReactNode }) {
	return (
		<SiteProvider country={country}>
			<div className="site">
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<Header />
				<main id="main" className="site-main">
					{children}
				</main>
				<Footer country={country} />
				<CountryBanner current={country} />
			</div>
		</SiteProvider>
	);
}
