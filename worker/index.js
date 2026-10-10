// Cloudflare Worker entry point. The website itself is plain static files in ./out (see wrangler.jsonc).
// Cloudflare serves those directly; this code only runs for the addresses listed in "run_worker_first":
//   /             -> country-redirect.js (sends visitors to /us/, /in/ or /ae/)
//   /api/geo      -> geo.js (visitor country for the banner)
//   /api/contact  -> contact.js (contact form)
// Anything else that reaches it is handed back to the static files (which answer with the 404 page).

import { contact } from "./contact.js";
import { countryRedirect } from "./country-redirect.js";
import { geo } from "./geo.js";

function methodNotAllowed(allow) {
	return new Response(null, { status: 405, headers: { Allow: allow } });
}

export default {
	async fetch(request, env) {
		const { pathname } = new URL(request.url);

		if (pathname === "/") {
			if (request.method === "GET") {
				const redirect = countryRedirect(request);
				if (redirect) return redirect;
			}
			return env.ASSETS.fetch(request);
		}
		if (pathname === "/api/geo" || pathname === "/api/geo/") {
			return request.method === "GET" ? geo(request) : methodNotAllowed("GET");
		}
		if (pathname === "/api/contact" || pathname === "/api/contact/") {
			return request.method === "POST" ? contact(request, env) : methodNotAllowed("POST");
		}
		return env.ASSETS.fetch(request);
	},
};
