'use client';

import { useState } from 'react';
import { css } from '@/lib/css';

// "01 How it works": four steps (Describe, Preview, Publish, Undo) and the panel for the chosen step.
// The first step is shown in the static HTML; the buttons only change what is shown afterwards.
// Everything arrives as plain, already translated text (see components/pages/Home.jsx).

const DV = {
  desktop: { maxw: '100%', cols: 'repeat(4,minmax(0,1fr))', hfs: '24px', pad: '26px 22px', r: '10px', n: 4 },
  tablet: { maxw: '420px', cols: 'repeat(3,minmax(0,1fr))', hfs: '21px', pad: '22px 18px', r: '16px', n: 3 },
  phone: { maxw: '240px', cols: 'repeat(2,minmax(0,1fr))', hfs: '18px', pad: '18px 14px', r: '24px', n: 2 },
};
const MONO = "font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted,#5A6472);";
const TITLE = 'font-family:Manrope,sans-serif;font-weight:700;font-size:17px;';

export default function HowItWorks({ steps, nextLabels, startAgain, groupLabel, describeTitle, prompt, designsLabel, designs, aiNote, devs, previewSizeLabel, draftTitle, frames, changed, notTouched, publishTitle, publishDone, publishBoxes, historyTitle, history, liveBadge, backLabel, liveMsgs }) {
  const [step, setStep] = useState(0);
  const [dev, setDev] = useState('desktop');
  const [liveV, setLiveV] = useState(13);
  const dv = DV[dev];

  return (
    <>
      <div role="group" aria-label={groupLabel} style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));border-top:1px solid var(--border,#E8E2DC);')}>
        {steps.map((st, i) => {
          const on = step === i;
          return (
            <button key={st.n} type="button" onClick={() => setStep(i)} aria-pressed={on} style={css(`text-align:left;padding-top:20px;padding-right:20px;padding-bottom:22px;padding-left:0;border:0;border-top:3px solid ${on ? '#EC844F' : 'transparent'};margin-top:-2px;background:transparent;color:var(--text,#14181F);cursor:pointer;line-height:normal;display:flex;flex-direction:column;gap:6px;font-family:Inter,sans-serif;`)}>
              <span style={css(`font-family:Manrope,sans-serif;font-weight:800;font-size:clamp(36px,5cqw,64px);line-height:1;letter-spacing:-0.04em;color:${on ? 'var(--link,#B8541F)' : 'var(--field,#D7D3CD)'};`)}>{st.n}</span>
              <span style={css('font-family:Manrope,sans-serif;font-weight:700;font-size:19px;')}>{st.t}</span>
              <span style={css('font-size:14px;color:var(--muted,#5A6472);line-height:1.5;max-width:30ch;')}>{st.d}</span>
            </button>
          );
        })}
      </div>

      <div style={css('background:var(--surface,#FFFFFF);border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:clamp(16px,3cqw,32px);display:flex;flex-direction:column;gap:18px;')}>
        {step === 0 && (
          <>
            <span style={css(TITLE)}>{describeTitle}</span>
            <div style={css('border:1px solid var(--field,#D7D3CD);border-radius:8px;padding:14px 16px;font-size:15px;line-height:1.6;background:var(--paper,#FDFAF7);')}>{prompt}</div>
            <div style={css('display:flex;flex-direction:column;gap:8px;')}>
              <span style={css(MONO)}>{designsLabel}</span>
              <div style={css('display:flex;flex-wrap:wrap;gap:8px;')}>
                {designs.map((d) => (
                  <span key={d} style={css('padding:6px 12px;border-radius:16px;background:var(--sunk,#F3EDE8);font-size:14px;')}>{d}</span>
                ))}
              </div>
            </div>
            <span style={css('font-size:14px;color:var(--muted,#5A6472);')}>{aiNote}</span>
          </>
        )}

        {step === 1 && (
          <>
            <div style={css('display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;')}>
              <span style={css(TITLE)}>{draftTitle}</span>
              <span role="group" aria-label={previewSizeLabel} style={css('display:flex;border:1px solid var(--field,#D7D3CD);border-radius:8px;overflow:hidden;')}>
                {devs.map((w) => (
                  <button key={w.k} type="button" onClick={() => setDev(w.k)} aria-pressed={dev === w.k} style={css(`height:44px;padding:0 14px;border:0;background:${dev === w.k ? 'var(--head,#0A2A4A)' : 'transparent'};color:${dev === w.k ? 'var(--paper,#FDFAF7)' : 'var(--text,#14181F)'};font-family:Inter,sans-serif;font-size:14px;cursor:pointer;line-height:normal;`)}>
                    {w.label}
                  </button>
                ))}
              </span>
            </div>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:14px;')}>
              {frames.map((f) => (
                <div key={f.k} style={css('display:flex;flex-direction:column;gap:8px;align-items:center;min-width:0;')}>
                  <span style={css(MONO)}>{f.label}</span>
                  <div aria-hidden="true" style={css(`width:100%;max-width:${dv.maxw};border:6px solid #14181F;border-radius:${dv.r};overflow:hidden;background:#FFFFFF;color:#14181F;`)}>
                    <div style={css(`padding:8px 10px;display:flex;justify-content:space-between;gap:8px;font-size:10px;border-bottom:1px solid #EDEAE5;background:${f.bar};`)}>
                      <strong style={css(`font-family:${f.hfont},sans-serif;`)}>{f.store}</strong>
                      <span style={css('white-space:nowrap;overflow:hidden;text-overflow:ellipsis;')}>{f.nav}</span>
                    </div>
                    <div style={css(`padding:${dv.pad};background:${f.bg};display:flex;flex-direction:column;gap:8px;`)}>
                      <span style={css(`font-family:${f.hfont},sans-serif;font-weight:800;font-size:${dv.hfs};line-height:1.12;letter-spacing:-0.02em;color:${f.fg};`)}>{f.headline}</span>
                      <span style={css(`font-size:12px;color:${f.fg};`)}>{f.sub}</span>
                      <span style={css(`align-self:flex-start;padding:6px 12px;border-radius:6px;background:${f.accent};color:#FFFFFF;font-size:12px;font-weight:700;`)}>{f.cta}</span>
                    </div>
                    <div style={css(`padding:10px;display:grid;grid-template-columns:${dv.cols};gap:8px;`)}>
                      {f.tiles.slice(0, dv.n).map((t) => (
                        <div key={t.name} style={css('display:flex;flex-direction:column;gap:3px;min-width:0;')}>
                          <span style={css(`aspect-ratio:4/5;border-radius:4px;background:${f.tile};`)}></span>
                          <span style={css('font-size:10px;line-height:1.3;')}>{t.name}</span>
                          <span style={css('font-size:10px;font-weight:700;')}>{t.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={css('display:flex;gap:16px;flex-wrap:wrap;font-size:14px;')}>
              <span style={css('color:var(--okfg,#1D6B47);')}>
                <strong>{changed[0]}</strong> {changed[1]}
              </span>
              <span style={css('color:var(--muted,#5A6472);')}>
                <strong>{notTouched[0]}</strong> {notTouched[1]}
              </span>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <span style={css(TITLE)}>{publishTitle}</span>
            <div style={css('display:flex;flex-direction:column;gap:8px;')}>
              <div style={css('height:8px;border-radius:4px;background:var(--sunk,#F3EDE8);overflow:hidden;')}>
                <div style={css('width:100%;height:100%;background:#1D6B47;')}></div>
              </div>
              <span style={css('font-size:14px;color:var(--okfg,#1D6B47);font-weight:600;')}>{publishDone}</span>
            </div>
            <div style={css('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:12px;')}>
              {publishBoxes.map((b) => (
                <div key={b[0]} style={css('border:1px solid var(--border,#E8E2DC);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:4px;')}>
                  <span style={css(MONO)}>{b[0]}</span>
                  <span style={css('font-size:15px;')}>{b[1]}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <span style={css(TITLE)}>{historyTitle}</span>
            <div style={css('border:1px solid var(--border,#E8E2DC);border-radius:12px;overflow:hidden;')}>
              {history.map((h) => (
                <div key={h.v} style={css('display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border,#E8E2DC);font-size:14px;flex-wrap:wrap;')}>
                  <span style={css('flex:1;min-width:180px;display:flex;flex-direction:column;')}>
                    <strong>
                      v{h.v} · {h.label}
                    </strong>
                    <span style={css('color:var(--muted,#5A6472);font-size:13px;')}>
                      {h.date} · {h.owner}
                    </span>
                  </span>
                  {h.v === liveV ? <span style={css('font-size:13px;font-weight:600;padding:3px 10px;border-radius:12px;background:var(--okbg,#EEF7F2);color:var(--okfg,#1D6B47);')}>{liveBadge}</span> : null}
                  {h.v !== liveV ? (
                    <button type="button" onClick={() => setLiveV(h.v)} className="df-h-outline" style={css('height:44px;padding:0 14px;border:1px solid var(--outline,#B8541F);border-radius:8px;background:transparent;color:var(--outline,#B8541F);font-family:Inter,sans-serif;font-size:14px;font-weight:500;cursor:pointer;line-height:normal;')}>
                      {backLabel}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            <span role="status" style={css('font-size:14px;color:var(--muted,#5A6472);')}>{liveMsgs[liveV]}</span>
          </>
        )}

        <button type="button" onClick={() => setStep((step + 1) % 4)} style={css('align-self:flex-start;height:44px;padding:0;border:0;background:transparent;color:var(--link,#B8541F);font-family:Inter,sans-serif;font-weight:500;font-size:15px;cursor:pointer;line-height:normal;')}>
          {step === 3 ? startAgain : nextLabels[(step + 1) % 4]} <span aria-hidden="true" className="df-flip" style={{ display: 'inline-block' }}>→</span>
        </button>
      </div>
    </>
  );
}
