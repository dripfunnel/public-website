import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_COUNTRY, getCountry } from "@/data/countries";
import { path } from "@/lib/routes";

// The bare address "/" is not a content page and there is no country chooser: visitors pick a
// country from the header. On the live site, the Cloudflare Pages Function in
// functions/_middleware.js sends real visitors to their own country. This page is what search
// engines, link previews and local development get: it forwards to the default country with a
// plain HTML redirect (works without JavaScript) and is not indexed.
const target = path(DEFAULT_COUNTRY);

export const metadata: Metadata = {
	robots: { index: false, follow: true },
	alternates: { canonical: target },
};

export default function Home() {
	return (
		<>
			<meta httpEquiv="refresh" content={`0;url=${target}`} />
			<main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
				<p>
					<Link href={target}>Continue to the {getCountry(DEFAULT_COUNTRY).name} site</Link>
				</p>
			</main>
		</>
	);
}
