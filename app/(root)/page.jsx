import { absoluteUrl, pagePath, DEFAULT_REGION } from '@/lib/site';

// The bare address https://www.dripfunnel.com/
// There is no page to see here. On Cloudflare, functions/index.js sends visitors to a region by their country
// (India, US or UAE; any other country and all search-engine crawlers go to India).
// This static page is the fallback when that is not available (for example when the built site is opened locally):
// it goes straight to the default region. The region can then be changed with the drop-down in the header.

const TARGET = pagePath(DEFAULT_REGION, 'en');

export const metadata = {
  title: 'DripFunnel',
  description: 'DripFunnel: describe your shop and AI builds your store.',
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl(TARGET) },
};

export default function Bare() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${TARGET}`} />
      <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(TARGET)})` }} />
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px', textAlign: 'center', background: 'var(--paper,#FDFAF7)', color: 'var(--text,#14181F)', fontFamily: 'Inter,Helvetica,Arial,sans-serif' }}>
        <p style={{ margin: 0 }}>
          <a href={TARGET}>Continue to DripFunnel</a>
        </p>
      </main>
    </>
  );
}
