'use client';

import { useEffect, useState } from 'react';

// Switches between the light and dark theme. The theme lives on <html data-theme="...">, which a small script
// in <head> sets before the page is painted (see components/ThemeScript.jsx). The choice is remembered in the browser.
// variant="icon": round icon button in the header and mobile bar. variant="text": text button in the footer.

function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export default function ThemeToggle({ variant, toDark, toLight }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(currentTheme());
    const sync = () => setTheme(currentTheme());
    window.addEventListener('df-theme', sync);
    return () => window.removeEventListener('df-theme', sync);
  }, []);

  function toggle() {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('df-site-theme', next);
    } catch (e) {}
    window.dispatchEvent(new Event('df-theme'));
  }

  const label = theme === 'dark' ? toLight : toDark;

  if (variant === 'text') {
    return (
      <button
        type="button"
        onClick={toggle}
        className="df-h-foot-btn"
        style={{ height: '44px', padding: '0 14px', border: '1px solid #2A4C6E', borderRadius: '8px', background: 'transparent', color: '#FFFFFF', fontFamily: 'Inter,sans-serif', fontSize: '14px', cursor: 'pointer' }}
      >
        <span className="df-when-light">{toDark}</span>
        <span className="df-when-dark">{toLight}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="df-h-sunk"
      style={{ width: '44px', height: '44px', border: 0, borderRadius: '8px', background: 'transparent', color: 'var(--text,#14181F)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg className="df-ic-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>
      </svg>
      <svg className="df-ic-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"></path>
      </svg>
    </button>
  );
}
