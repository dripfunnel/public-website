import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import AiUs from "@/components/ai/AiUs";
import AiIn from "@/components/ai/AiIn";
import AiAe from "@/components/ai/AiAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: AiUs, in: AiIn, ae: AiAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "ai");
	return buildMetadata({ country, page: "ai", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
