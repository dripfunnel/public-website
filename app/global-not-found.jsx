import './globals.css';
import { REGION_CODES, REGIONS, pagePath } from '@/lib/site';

// "Page not found" for the whole site. It is a real 404 and is kept out of search engines.
export const metadata = {
  title: 'Page not found | DripFunnel',
  description: 'This page does not exist.',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem('df-site-theme')}catch(e){}if(t!=='light'&&t!=='dark'){try{t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){t='light'}}d.setAttribute('data-theme',t)})();" }} />
      </head>
      <body>
        <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '32px 16px', textAlign: 'center', background: 'var(--paper,#FDFAF7)', color: 'var(--text,#14181F)', fontFamily: 'Inter,Helvetica,Arial,sans-serif' }}>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted,#5A6472)' }}>404</span>
          <h1 style={{ margin: 0, fontFamily: 'Manrope,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,6vw,44px)', letterSpacing: '-0.03em', lineHeight: 1.08, color: 'var(--head,#0A2A4A)' }}>Page not found</h1>
          <p style={{ margin: 0, maxWidth: '420px', color: 'var(--muted,#5A6472)' }}>The page you are looking for does not exist or has moved. Go to the home page of your region:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {REGION_CODES.map((r) => (
              <a key={r} href={pagePath(r, 'en')} style={{ minHeight: '44px', padding: '0 18px', display: 'flex', alignItems: 'center', border: '1px solid var(--outline,#B8541F)', borderRadius: '8px', textDecoration: 'none', fontFamily: 'Manrope,sans-serif', fontWeight: 700, color: 'var(--outline,#B8541F)' }}>
                {REGIONS[r].name}
              </a>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
