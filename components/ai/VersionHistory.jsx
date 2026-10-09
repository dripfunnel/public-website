'use client';

import { useState } from 'react';
import { css } from '@/lib/css';

// The "History" card: "Go back to this" makes an older version live again and the status line says so.
// Version 13 is live to start with (that is what the page HTML shows). Props are plain data, already translated.
// msgs: { "13": text, "12": text, ... } is the status line for each version that can be live.
export default function VersionHistory({ title, owner, items, liveLabel, backLabel, msgs }) {
  const [live, setLive] = useState(items[0].v);
  return (
    <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;overflow:hidden;')}>
      <div style={css('padding:14px 18px;border-bottom:1px solid var(--border,#E8E2DC);font-family:Manrope,sans-serif;font-weight:700;font-size:16px;')}>{title}</div>
      {items.map((h) => (
        <div key={h.v} style={css('display:flex;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--border,#E8E2DC);font-size:14px;flex-wrap:wrap;')}>
          <span style={css('flex:1;min-width:180px;display:flex;flex-direction:column;')}>
            <strong>v{h.v} · {h.label}</strong>
            <span style={css('color:var(--muted,#5A6472);font-size:13px;')}>{h.date} · {owner}</span>
          </span>
          {h.v === live ? (
            <span style={css('font-size:13px;font-weight:600;padding:3px 10px;border-radius:12px;background:var(--okbg,#EEF7F2);color:var(--okfg,#1D6B47);')}>{liveLabel}</span>
          ) : (
            <button type="button" className="df-ai-back" onClick={() => setLive(h.v)}>{backLabel}</button>
          )}
        </div>
      ))}
      <div role="status" style={css('padding:12px 18px;font-size:14px;color:var(--muted,#5A6472);')}>{msgs[live]}</div>
    </div>
  );
}
