import type { ContactTopic } from "@/lib/routes";
import { ae } from "@/data/countries/ae";
import ContactView from "./ContactView";

export default function ContactAe({ topic = "demo" }: { topic?: ContactTopic }) {
	return <ContactView country={ae} topic={topic} />;
}
