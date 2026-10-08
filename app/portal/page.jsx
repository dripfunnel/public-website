export const metadata = { title: 'DripFunnel portal' };

export default function PortalPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 480 }}>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', color: '#0A2A4A' }}>The DripFunnel portal goes here</h1>
        <p style={{ color: '#5A6472' }}>
          This is a placeholder. Set <code>NEXT_PUBLIC_STORE_URL</code> to point “Sign in” and “Start free” at the real portal.
        </p>
        <a href="/">← Back to the website</a>
      </div>
    </main>
  );
}
