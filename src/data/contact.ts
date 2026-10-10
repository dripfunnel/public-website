// Text and rules for the contact form (design: `T`, `needMsg`, `fld`, `submit`, countries, sent text).
// The same validation rules are repeated in worker/contact.js, which checks them again on the server.

import { COUNTRY_NAMES } from "@/data/countries";
import type { ContactTopic } from "@/lib/routes";

export const SUPPORT_EMAIL = "support@dripfunnel.com";

export interface TopicText {
	/** Chip text. */
	label: string;
	/** Submit button text. */
	submit: string;
	/** Label of the message box. */
	msgLabel: string;
	msgPlaceholder: string;
}

export const TOPIC_TEXT: Record<ContactTopic, TopicText> = {
	demo: {
		label: "Book a demo",
		submit: "Book my demo",
		msgLabel: "Anything you’d like us to cover? (optional)",
		msgPlaceholder: "e.g. We sell in India and want to start shipping to the UAE",
	},
	sales: {
		label: "Sales question",
		submit: "Send to sales",
		msgLabel: "Your question",
		msgPlaceholder: "e.g. Can you build our storefront for us?",
	},
	partners: {
		label: "Partners",
		submit: "Talk to us",
		msgLabel: "Tell us about the shops you run",
		msgPlaceholder: "e.g. We run 40 shops for clients in Germany and want them under our brand",
	},
	support: {
		label: "Support",
		submit: "Send to support",
		msgLabel: "What’s happening?",
		msgPlaceholder: "e.g. My courier tracking numbers aren’t showing on orders",
	},
};

/** The country dropdown: the three launch countries, then "Other". */
export const CONTACT_COUNTRIES: string[] = [...COUNTRY_NAMES, "Other"];

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The demo topic does not need a message; the other topics do. */
export function needsMessage(topic: ContactTopic): boolean {
	return topic !== "demo";
}

export const MAX_LENGTH = { name: 120, email: 254, company: 160, location: 80, message: 5000 } as const;

export const ERRORS = {
	name: "Enter your name.",
	email: "Enter a full email address, like you@shop.com.",
	msg: "Tell us a little about what you need.",
} as const;

export const SEND_ERROR_TEXT = "We could not send your message. Please email";

/** Text of the "sent" state. */
export function sentText(topic: ContactTopic, name: string, email: string, salesEmail: string) {
	const first = name.trim().split(" ")[0] || "we’ve got it";
	const body =
		topic === "demo"
			? "We’ll email " + email + " with times for your demo."
			: topic === "support"
				? "Our support team will reply to " + email + ". If it’s about a live order, include the order number when we write back."
				: "We’ll reply to " + email + " from " + salesEmail + ".";
	return { title: "Thanks, " + first + ".", body };
}
