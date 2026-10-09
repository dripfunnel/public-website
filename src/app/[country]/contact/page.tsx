import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { buildMetadata } from "@/lib/seo";
import ContactUs from "@/components/contact/ContactUs";
import ContactIn from "@/components/contact/ContactIn";
import ContactAe from "@/components/contact/ContactAe";

const VIEWS: Record<CountryCode, typeof ContactUs> = { us: ContactUs, in: ContactIn, ae: ContactAe };

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
	const { country } = await params;
	if (!isCountryCode(country)) return {};
	const seo = getPageSeo(country, "contact");
	return buildMetadata({ country, page: "contact", ...seo });
}

export default async function Page({ params }: { params: Promise<{ country: string }> }) {
	const { country } = await params;
	if (!isCountryCode(country)) notFound();
	const View = VIEWS[country];
	return <View topic="demo" />;
}
