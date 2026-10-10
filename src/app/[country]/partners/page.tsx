import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import PartnersUs from "@/components/partners/PartnersUs";
import PartnersIn from "@/components/partners/PartnersIn";
import PartnersAe from "@/components/partners/PartnersAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: PartnersUs, in: PartnersIn, ae: PartnersAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "partners");
	return buildMetadata({ country, page: "partners", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
