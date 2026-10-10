import { india } from "@/data/countries/in";
import BlogPostView from "./BlogPostView";

export default function BlogPostIn({ slug }: { slug: string }) {
	return <BlogPostView country={india} slug={slug} />;
}
