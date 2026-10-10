import { us } from "@/data/countries/us";
import HelpArticleView from "./HelpArticleView";

export default function HelpArticleUs({ slug }: { slug: string }) {
	return <HelpArticleView country={us} slug={slug} />;
}
