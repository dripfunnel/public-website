'use client';

import { css } from '@/lib/css';
import { usePrompt, setPrompt, savePrompt } from './promptStore';

// The "Describe your shop" box with the "Start free" button. variant="hero" is the light box in the hero,
// variant="band" is the white box on the dark band at the bottom of the page.
// Markup and sizes are copied from the original design.
export default function PromptBox({ variant, label, placeholder, startLabel, href }) {
  const value = usePrompt();
  const band = variant === 'band';
  return (
    <div style={css(`width:100%;max-width:780px;background:${band ? '#FFFFFF' : 'var(--surface,#FFFFFF)'};border:${band ? '0' : '1.5px solid var(--text,#14181F)'};border-radius:12px;padding:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;text-align:left;`)}>
      <span aria-hidden="true" className="df-flip" style={css(`font-family:'IBM Plex Mono',monospace;font-size:18px;color:${band ? '#B8541F' : 'var(--link,#B8541F)'};padding-left:12px;`)}>
        ›
      </span>
      <input
        type="text"
        aria-label={label}
        value={value}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
       
        style={css(`flex:1;min-width:200px;height:52px;border:0;border-radius:8px;background:transparent;padding:0 8px;font-family:Inter,sans-serif;font-size:17px;color:${band ? '#14181F' : 'var(--text,#14181F)'};`)}
      />
      <a
        href={href}
        onClick={savePrompt}
        className={band ? 'df-home-band-btn' : 'df-h-primary'}
        style={css('height:52px;padding:0 24px;border-radius:8px;background:#EC844F;color:#FFFFFF;text-decoration:none;display:flex;align-items:center;gap:8px;font-family:Manrope,sans-serif;font-weight:700;font-size:16px;flex:none;')}
      >
        {startLabel}
        <svg className="df-flip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6"></path>
        </svg>
      </a>
    </div>
  );
}
