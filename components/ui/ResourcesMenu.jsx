'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// The "Resources" dropdown in the desktop header. Esc or a click outside closes it.
export default function ResourcesMenu({ label, items, active }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <div ref={box} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        style={{ height: '44px', padding: '0 12px', display: 'flex', alignItems: 'center', gap: '6px', border: 0, background: 'transparent', fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: '15px', color: 'var(--text,#14181F)', cursor: 'pointer', boxShadow: `inset 0 -2px 0 ${active ? '#EC844F' : 'transparent'}` }}
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </button>
      {open ? (
        <div role="menu" style={{ position: 'absolute', top: '52px', insetInlineStart: 0, minWidth: '260px', background: 'var(--surface,#FFFFFF)', border: '1px solid var(--border,#E8E2DC)', borderRadius: '12px', boxShadow: '0 16px 40px rgba(10,42,74,0.16)', padding: '6px', display: 'flex', flexDirection: 'column' }}>
          {items.map((r) => (
            <Link
              key={r.href}
              role="menuitem"
              href={r.href}
              onClick={() => setOpen(false)}
              className="df-h-sunk"
              style={{ minHeight: '44px', padding: '8px 12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textDecoration: 'none', color: 'var(--text,#14181F)' }}
            >
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{r.label}</span>
              <span style={{ fontSize: '13px', color: 'var(--muted,#5A6472)', lineHeight: 1.4 }}>{r.sub}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
