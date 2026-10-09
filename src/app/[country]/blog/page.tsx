import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import BlogUs from "@/components/blog/BlogUs";
import BlogIn from "@/components/blog/BlogIn";
import BlogAe from "@/components/blog/BlogAe";

const VIEWS: Record<CountryCode, () => React.JSX.Element> = { us: BlogUs, in: BlogIn, ae: BlogAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "blog");
	return buildMetadata({ country, page: "blog", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View />;
}
