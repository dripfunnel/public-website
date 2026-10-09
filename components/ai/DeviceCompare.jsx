'use client';

import { useState } from 'react';
import { css } from '@/lib/css';

// "Before and after, on every screen": the Desktop / Tablet / Phone buttons change the size of the two shop previews.
// The first state (Desktop) is already in the page HTML. The sizes for each device are in styles/ai.css.
// Props are plain data, already translated and with prices formatted on the server.
export default function DeviceCompare({ title, intro, groupLabel, devices, store, frames, designs }) {
  const [dev, setDev] = useState('desktop');
  return (
    <section style={css('max-width:1240px;margin:0 auto;padding:clamp(44px,8cqw,96px) clamp(16px,4cqw,24px);display:flex;flex-direction:column;gap:24px;')}>
      <div style={css('display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;')}>
        <div style={css('display:flex;flex-direction:column;gap:12px;max-width:640px;')}>
          <h2 style={css('font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(26px,4cqw,44px);line-height:1.08;letter-spacing:-0.03em;margin:0;color:var(--head,#0A2A4A);')}>{title}</h2>
          <p style={css('margin:0;font-size:17px;color:var(--muted,#5A6472);')}>{intro}</p>
        </div>
        <span role="group" aria-label={groupLabel} style={css('display:flex;border:1px solid var(--field,#D7D3CD);border-radius:8px;overflow:hidden;')}>
          {devices.map((d) => (
            <button key={d.id} type="button" className="df-ai-devbtn" aria-pressed={dev === d.id ? 'true' : 'false'} onClick={() => setDev(d.id)}>
              {d.label}
            </button>
          ))}
        </span>
      </div>
      <div className={`df-ai-stage df-ai-dev-${dev}`}>
        {frames.map((f) => (
          <div key={f.label} style={css('display:flex;flex-direction:column;gap:8px;align-items:center;min-width:0;')}>
            <span style={css("font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);")}>{f.label}</span>
            <div aria-hidden="true" className="df-ai-frame">
              <div style={{ ...css('padding:8px 10px;display:flex;justify-content:space-between;gap:8px;font-size:10px;border-bottom:1px solid #EDEAE5;'), background: f.bar }}>
                <strong style={{ fontFamily: `${f.hfont},sans-serif` }}>{store}</strong>
                <span style={css('white-space:nowrap;overflow:hidden;text-overflow:ellipsis;')}>{f.nav}</span>
              </div>
              <div className="df-ai-hero" style={{ background: f.bg }}>
                <span className="df-ai-headline" style={{ fontFamily: `${f.hfont},sans-serif`, color: f.fg }}>{f.headline}</span>
                <span style={{ fontSize: '12px', color: f.fg }}>{f.sub}</span>
                <span style={{ ...css('align-self:flex-start;padding:6px 12px;border-radius:6px;color:#FFFFFF;font-size:12px;font-weight:700;'), background: f.accent }}>{f.cta}</span>
              </div>
              <div className="df-ai-tiles">
                {f.tiles.map((t) => (
                  <div key={t.name} className="df-ai-tile">
                    <span style={{ ...css('aspect-ratio:4/5;border-radius:4px;display:block;'), background: t.bg }}></span>
                    <span style={css('font-size:10px;line-height:1.3;')}>{t.name}</span>
                    <span style={css('font-size:10px;font-weight:700;')}>{t.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:10px;')}>
        {designs.map((x) => (
          <div key={x.t} style={css('border-top:2px solid #EC844F;padding-top:12px;display:flex;flex-direction:column;gap:4px;')}>
            <span style={css('font-family:Manrope,sans-serif;font-weight:700;font-size:16px;')}>{x.t}</span>
            <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{x.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
