// GET /api/geo: tells the browser which country the visitor is in (two-letter code), so the
// country banner can suggest the matching site. Never redirects and stores nothing.
export function geo(request) {
	const country = (request.cf?.country || request.headers.get("cf-ipcountry") || "").toUpperCase();
	return new Response(JSON.stringify({ country }), {
		headers: {
			"Content-Type": "application/json",
			// The answer depends on who is asking, so it must never be cached and shared.
			"Cache-Control": "no-store",
		},
	});
}
