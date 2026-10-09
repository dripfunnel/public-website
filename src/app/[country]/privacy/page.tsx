import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import PrivacyUs from "@/components/legal/PrivacyUs";
import PrivacyIn from "@/components/legal/PrivacyIn";
import PrivacyAe from "@/components/legal/PrivacyAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: PrivacyUs, in: PrivacyIn, ae: PrivacyAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "privacy");
	return buildMetadata({ country, page: "privacy", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
