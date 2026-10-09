import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import HelpUs from "@/components/help/HelpUs";
import HelpIn from "@/components/help/HelpIn";
import HelpAe from "@/components/help/HelpAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: HelpUs, in: HelpIn, ae: HelpAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "help");
	return buildMetadata({ country, page: "help", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
