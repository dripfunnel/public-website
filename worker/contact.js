// POST /api/contact (called from worker/index.js)
//
// Receives the contact form (src/components/contact/ContactForm.tsx), checks it with the same rules
// as the form, and forwards it as JSON to the HTTPS webhook in the LEAD_WEBHOOK_URL environment
// variable. The owner has not chosen a service for that yet (email, CRM, Slack, ...): when it is
// not set this returns 503 and the form shows its "please email us" message. Upstream errors are
// never sent back to the visitor.

const TOPICS = ["demo", "sales", "partners", "support"];
const COUNTRIES = ["us", "in", "ae"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, email: 254, company: 160, location: 80, message: 5000 };
const MAX_BODY = 20000;

function json(body, status) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}

function text(value) {
	return typeof value === "string" ? value.trim() : "";
}

export async function contact(request, env) {
	let raw;
	try {
		raw = await request.text();
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	if (raw.length > MAX_BODY) return json({ error: "Request too large." }, 413);

	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	if (!data || typeof data !== "object" || Array.isArray(data)) return json({ error: "Invalid request." }, 400);

	// Honeypot: real visitors never fill it. Pretend it worked so bots do not retry.
	if (typeof data.website === "string" && data.website !== "") return json({ ok: true }, 200);

	const lead = {
		country: text(data.country),
		topic: text(data.topic),
		name: text(data.name),
		email: text(data.email),
		company: text(data.company),
		location: text(data.location),
		message: text(data.message),
	};

	if (!COUNTRIES.includes(lead.country)) return json({ error: "Invalid country." }, 400);
	if (!TOPICS.includes(lead.topic)) return json({ error: "Invalid topic." }, 400);
	if (!lead.name) return json({ error: "Enter your name." }, 400);
	if (!EMAIL.test(lead.email)) return json({ error: "Enter a full email address." }, 400);
	if (lead.topic !== "demo" && !lead.message) return json({ error: "Enter a message." }, 400);
	for (const key of Object.keys(MAX)) {
		if (lead[key].length > MAX[key]) return json({ error: "A field is too long." }, 400);
	}

	const url = env && typeof env.LEAD_WEBHOOK_URL === "string" ? env.LEAD_WEBHOOK_URL.trim() : "";
	if (!url.startsWith("https://")) return json({ error: "Contact form is not set up yet." }, 503);

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ source: "dripfunnel-website", receivedAt: new Date().toISOString(), ...lead }),
			signal: AbortSignal.timeout(8000),
		});
		if (!res.ok) return json({ error: "Could not send your message." }, 502);
	} catch {
		return json({ error: "Could not send your message." }, 502);
	}
	return json({ ok: true }, 200);
}
