import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, isCountryCode, type CountryCode } from "@/data/countries";
import { getPageSeo } from "@/data/seo";
import { CONTACT_TOPICS, type ContactTopic } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import ContactUs from "@/components/contact/ContactUs";
import ContactIn from "@/components/contact/ContactIn";
import ContactAe from "@/components/contact/ContactAe";

// Only the four topics exist. Any other address is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
	return COUNTRIES.flatMap((c) => CONTACT_TOPICS.map((topic) => ({ country: c.code, topic })));
}

const VIEWS: Record<CountryCode, typeof ContactUs> = { us: ContactUs, in: ContactIn, ae: ContactAe };

function isTopic(value: string): value is ContactTopic {
	return (CONTACT_TOPICS as readonly string[]).includes(value);
}

type Params = Promise<{ country: string; topic: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { country, topic } = await params;
	if (!isCountryCode(country) || !isTopic(topic)) return {};
	const seo = getPageSeo(country, "contact");
	// The demo topic is the same page as /contact/, so it points to that address.
	return buildMetadata({ country, page: topic === "demo" ? "contact" : `contact/${topic}`, ...seo });
}

export default async function Page({ params }: { params: Params }) {
	const { country, topic } = await params;
	if (!isCountryCode(country) || !isTopic(topic)) notFound();
	const View = VIEWS[country];
	return <View topic={topic} />;
}
