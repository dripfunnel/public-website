import type { ReactNode } from "react";
import { COUNTRIES, getCountry, type CountryCode } from "@/data/countries";
import SiteShell from "@/components/SiteShell";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

// Only the three launch countries exist. Any other address is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
	return COUNTRIES.map((c) => ({ country: c.code }));
}

export default async function CountryLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ country: string }>;
}) {
	const { country } = await params;
	// getCountry throws on an unknown code, which can't happen with dynamicParams = false.
	const code = getCountry(country).code as CountryCode;
	return (
		<SiteShell country={code}>
			<JsonLd data={[organizationSchema(), websiteSchema()]} />
			{children}
		</SiteShell>
	);
}
