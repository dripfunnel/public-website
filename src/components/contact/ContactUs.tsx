import type { ContactTopic } from "@/lib/routes";
import { us } from "@/data/countries/us";
import ContactView from "./ContactView";

export default function ContactUs({ topic = "demo" }: { topic?: ContactTopic }) {
	return <ContactView country={us} topic={topic} />;
}
