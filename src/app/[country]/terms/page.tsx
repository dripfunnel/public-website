import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import TermsUs from "@/components/legal/TermsUs";
import TermsIn from "@/components/legal/TermsIn";
import TermsAe from "@/components/legal/TermsAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: TermsUs, in: TermsIn, ae: TermsAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "terms");
	return buildMetadata({ country, page: "terms", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
