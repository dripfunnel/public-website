import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, isCountryCode, type CountryCode } from "@/data/countries";
import { POSTS, getPost, postIsoDate } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { path } from "@/lib/routes";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { SITE_NAME } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import BlogPostUs from "@/components/blog/BlogPostUs";
import BlogPostIn from "@/components/blog/BlogPostIn";
import BlogPostAe from "@/components/blog/BlogPostAe";

// Only the six known articles exist, in each of the three countries.
export const dynamicParams = false;

export function generateStaticParams() {
	return COUNTRIES.flatMap((c) => POSTS.map((p) => ({ country: c.code, slug: p.id })));
}

const VIEWS: Record<CountryCode, (props: { slug: string }) => React.JSX.Element> = {
	us: BlogPostUs,
	in: BlogPostIn,
	ae: BlogPostAe,
};

type Props = { params: Promise<{ country: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { country, slug } = await params;
	const post = getPost(slug);
	if (!isCountryCode(country) || !post) return {};
	return buildMetadata({
		country,
		page: `blog/${slug}`,
		title: `${post.title} | ${SITE_NAME}`,
		description: post.ex,
		type: "article",
	});
}

export default async function Page({ params }: Props) {
	const { country, slug } = await params;
	const post = getPost(slug);
	if (!isCountryCode(country) || !post) notFound();
	const View = VIEWS[country];
	const here = path(country, `blog/${slug}`);
	return (
		<>
			<JsonLd
				data={[
					breadcrumbSchema([
						{ name: "Blog", path: path(country, "blog") },
						{ name: post.title, path: here },
					]),
					articleSchema({ title: post.title, description: post.ex, path: here, published: postIsoDate(post.date) }),
				]}
			/>
			<View slug={slug} />
		</>
	);
}
