import { ae } from "@/data/countries/ae";
import HelpArticleView from "./HelpArticleView";

export default function HelpArticleAe({ slug }: { slug: string }) {
	return <HelpArticleView country={ae} slug={slug} />;
}
