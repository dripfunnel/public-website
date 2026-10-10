// Sends visitors who open the bare address "/" to their own country. Every other address passes
// through untouched, so /us/..., /in/... and /ae/... are reachable from anywhere and stay crawlable.
// public/_routes.json limits this function to "/" and "/api/*", so all other pages are served as
// plain static files without running any code.
//
// Update AVAILABLE when a country is added (src/data/countries/).
const AVAILABLE = ["us", "in", "ae"];
const DEFAULT_COUNTRY = "in";
const GULF = new Set(["AE", "SA", "KW", "QA", "OM", "BH"]);
// Search engines and link-preview bots are never redirected: they get the static "/" page, which forwards to the default country.
const BOT = /bot|crawl|spider|slurp|bing|google|yandex|duckduck|baidu|facebookexternalhit|twitter|linkedin|whatsapp|slack|telegram|preview/i;

function pickCountry(request) {
	const cookie = request.headers.get("Cookie") || "";
	const saved = cookie.match(/(?:^|;\s*)df_country=([a-z]{2})/);
	if (saved && AVAILABLE.includes(saved[1])) return saved[1];

	// request.cf is Cloudflare's own parsed request object, more reliable than a header the
	// client could set. The header is kept as a fallback where request.cf is not filled in.
	const iso = (request.cf?.country || request.headers.get("cf-ipcountry") || "").toUpperCase();
	if (GULF.has(iso)) return "ae";
	if (iso === "IN") return "in";
	if (iso === "US") return "us";
	return DEFAULT_COUNTRY;
}

export async function onRequest({ request, next }) {
	const url = new URL(request.url);
	if (url.pathname !== "/") return next();
	if (BOT.test(request.headers.get("User-Agent") || "")) return next();

	return new Response(null, {
		status: 302,
		headers: {
			Location: `/${pickCountry(request)}/`,
			// Without this a cache could keep one visitor's redirect and serve it to everyone.
			"Cache-Control": "no-store, no-cache, must-revalidate",
			Vary: "Cookie, CF-IPCountry",
		},
	});
}
