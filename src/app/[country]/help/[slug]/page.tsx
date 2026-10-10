import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, isCountryCode, type CountryCode } from "@/data/countries";
import { ALL_ARTICLES, firstSentence, getHelpArticle } from "@/data/help";
import { buildMetadata } from "@/lib/seo";
import { path } from "@/lib/routes";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import HelpArticleUs from "@/components/help/HelpArticleUs";
import HelpArticleIn from "@/components/help/HelpArticleIn";
import HelpArticleAe from "@/components/help/HelpArticleAe";

// Only the 24 known articles exist, in each of the three countries.
export const dynamicParams = false;

export function generateStaticParams() {
	return COUNTRIES.flatMap((c) => ALL_ARTICLES.map((a) => ({ country: c.code, slug: a.id })));
}

const VIEWS: Record<CountryCode, (props: { slug: string }) => React.JSX.Element> = {
	us: HelpArticleUs,
	in: HelpArticleIn,
	ae: HelpArticleAe,
};

type Props = { params: Promise<{ country: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { country, slug } = await params;
	const art = getHelpArticle(slug);
	if (!isCountryCode(country) || !art) return {};
	// Articles without a written body only have placeholder text, so their description falls back to the title.
	const description = art.stub ? `${art.t}. Help centre article for your DripFunnel shop.` : firstSentence(art.intro);
	return buildMetadata({ country, page: `help/${slug}`, title: `${art.t} | ${SITE_NAME}`, description });
}

export default async function Page({ params }: Props) {
	const { country, slug } = await params;
	const art = getHelpArticle(slug);
	if (!isCountryCode(country) || !art) notFound();
	const View = VIEWS[country];
	return (
		<>
			<JsonLd
				data={breadcrumbSchema([
					{ name: "Help centre", path: path(country, "help") },
					{ name: art.t, path: path(country, `help/${slug}`) },
				])}
			/>
			<View slug={slug} />
		</>
	);
}
