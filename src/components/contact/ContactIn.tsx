import type { ContactTopic } from "@/lib/routes";
import { india } from "@/data/countries/in";
import ContactView from "./ContactView";

export default function ContactIn({ topic = "demo" }: { topic?: ContactTopic }) {
	return <ContactView country={india} topic={topic} />;
}
