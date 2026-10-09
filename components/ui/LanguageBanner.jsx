'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// A small suggestion for first-time visitors: "View this page in Arabic?".
// It never redirects. It only shows when the browser's language is Arabic and the visitor is on the English page
// of a region that has Arabic (the UAE). Dismissing it is remembered in the browser (if the browser allows storage).
export default function LanguageBanner({ message, yes, no, href }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('df-lang-banner') === '1') return;
    } catch (e) {}
    const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    if (langs.some((l) => /^ar/i.test(l))) setShow(true);
  }, []);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem('df-lang-banner', '1');
    } catch (e) {}
  }

  if (!show) return null;
  return (
    <div role="region" aria-label={message} style={{ position: 'fixed', insetInline: '12px', bottom: '12px', zIndex: 60, maxWidth: '520px', marginInline: 'auto', background: 'var(--surface,#FFFFFF)', color: 'var(--text,#14181F)', border: '1px solid var(--border,#E8E2DC)', borderRadius: '12px', boxShadow: '0 16px 40px rgba(10,42,74,0.2)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px 14px', flexWrap: 'wrap' }}>
      <span style={{ flex: '1 1 200px', fontSize: '15px' }}>{message}</span>
      <Link href={href} hrefLang="ar" lang="ar" onClick={dismiss} style={{ height: '44px', padding: '0 16px', display: 'flex', alignItems: 'center', borderRadius: '8px', background: '#EC844F', color: '#FFFFFF', textDecoration: 'none', fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: '15px' }}>
        {yes}
      </Link>
      <button type="button" onClick={dismiss} style={{ height: '44px', padding: '0 12px', border: 0, background: 'transparent', color: 'var(--muted,#5A6472)', cursor: 'pointer', fontSize: '15px' }}>
        {no}
      </button>
    </div>
  );
}
