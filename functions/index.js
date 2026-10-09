// Cloudflare Pages Function for the bare address only: https://www.dripfunnel.com/
// It sends the visitor to a region by their country (Cloudflare adds the country to every request):
//   India -> /in/    United States -> /us/    United Arab Emirates -> /ae/    any other country -> /in/
// Search-engine and link-preview crawlers are always sent to /in/, never by location.
// Pages inside a region (for example /us/pricing/) are never redirected.

const CRAWLER = /bot|crawl|spider|slurp|bing|duckduck|baidu|yandex|facebookexternalhit|embedly|quora|whatsapp|telegram|linkedin|slack|twitter|preview|lighthouse|pagespeed/i;
const BY_COUNTRY = { IN: 'in', US: 'us', AE: 'ae' };

export function onRequestGet({ request }) {
  const ua = request.headers.get('user-agent') || '';
  const country = (request.cf && request.cf.country) || '';
  const region = CRAWLER.test(ua) ? 'in' : BY_COUNTRY[country] || 'in';
  return new Response(null, {
    status: 302,
    headers: {
      Location: new URL(`/${region}/`, request.url).toString(),
      // The answer depends on the visitor, so it must not be cached and shared.
      'Cache-Control': 'private, no-store',
    },
  });
}
