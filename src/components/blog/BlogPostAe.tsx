import { ae } from "@/data/countries/ae";
import BlogPostView from "./BlogPostView";

export default function BlogPostAe({ slug }: { slug: string }) {
	return <BlogPostView country={ae} slug={slug} />;
}
