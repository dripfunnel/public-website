import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import PricingUs from "@/components/pricing/PricingUs";
import PricingIn from "@/components/pricing/PricingIn";
import PricingAe from "@/components/pricing/PricingAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: PricingUs, in: PricingIn, ae: PricingAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "pricing");
	return buildMetadata({ country, page: "pricing", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
