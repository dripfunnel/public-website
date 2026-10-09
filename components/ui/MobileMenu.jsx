'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// The menu button (and the list it opens) on narrow screens. The list opens right under the header.
export default function MobileMenu({ menuLabel, mainLabel, items, signIn, startFree, storeUrl }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={menuLabel}
        aria-expanded={open ? 'true' : 'false'}
        style={{ width: '44px', height: '44px', border: '1px solid var(--border,#E8E2DC)', borderRadius: '8px', background: 'var(--surface,#FFFFFF)', color: 'var(--text,#14181F)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </svg>
      </button>
      {open ? (
        <nav aria-label={mainLabel} style={{ position: 'absolute', top: '100%', insetInline: 0, borderTop: '1px solid var(--border,#E8E2DC)', background: 'var(--paper,#FDFAF7)', padding: '8px clamp(16px,4cqw,24px) 20px', display: 'flex', flexDirection: 'column', boxShadow: '0 16px 32px rgba(10,42,74,0.12)' }}>
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={n.current ? 'page' : undefined}
              onClick={() => setOpen(false)}
              style={{ minHeight: '48px', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border,#E8E2DC)', textDecoration: 'none', color: 'var(--text,#14181F)', fontFamily: 'Manrope,sans-serif', fontWeight: 700, fontSize: '17px' }}
            >
              {n.label}
            </Link>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingTop: '16px' }}>
            <a href={storeUrl} style={{ height: '48px', border: '1px solid var(--outline,#B8541F)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontFamily: 'Manrope,sans-serif', fontWeight: 700, color: 'var(--outline,#B8541F)' }}>
              {signIn}
            </a>
            <a href={storeUrl} style={{ height: '48px', borderRadius: '8px', background: '#EC844F', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontFamily: 'Manrope,sans-serif', fontWeight: 700, color: '#FFFFFF' }}>
              {startFree}
            </a>
          </div>
        </nav>
      ) : null}
    </>
  );
}
