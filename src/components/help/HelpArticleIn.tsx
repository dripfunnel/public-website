import { india } from "@/data/countries/in";
import HelpArticleView from "./HelpArticleView";

export default function HelpArticleIn({ slug }: { slug: string }) {
	return <HelpArticleView country={india} slug={slug} />;
}
