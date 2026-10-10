import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import FeaturesUs from "@/components/features/FeaturesUs";
import FeaturesIn from "@/components/features/FeaturesIn";
import FeaturesAe from "@/components/features/FeaturesAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: FeaturesUs, in: FeaturesIn, ae: FeaturesAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "features");
	return buildMetadata({ country, page: "features", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
