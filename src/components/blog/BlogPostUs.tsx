import { us } from "@/data/countries/us";
import BlogPostView from "./BlogPostView";

export default function BlogPostUs({ slug }: { slug: string }) {
	return <BlogPostView country={us} slug={slug} />;
}
