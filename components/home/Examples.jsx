'use client';

import { css } from '@/lib/css';
import { setPrompt } from './promptStore';

// "Try: Calm and earthy | Bestsellers first | Our story". A button fills the "Describe your shop" box.
// items: [{ short, full }] (already translated).
export default function Examples({ tryLabel, items }) {
  return (
    <div style={css('display:flex;flex-wrap:wrap;justify-content:center;gap:8px;align-items:center;')}>
      <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{tryLabel}</span>
      {items.map((x) => (
        <button key={x.short} type="button" onClick={() => setPrompt(x.full)} className="df-home-example" style={css('min-height:44px;padding:0 14px;border:1px dashed var(--field,#D7D3CD);border-radius:8px;background:transparent;color:var(--text,#14181F);font-family:Inter,sans-serif;font-size:14px;cursor:pointer;line-height:normal;')}>
          {x.short}
        </button>
      ))}
    </div>
  );
}
