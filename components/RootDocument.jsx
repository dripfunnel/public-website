import { preload } from 'react-dom';
import '../app/globals.css';

// Before the page is painted: set the theme from the visitor's saved choice, or from their device setting.
// This is why the page never flashes the wrong theme. Browser storage access is guarded, so it still works when storage is blocked.
const THEME_SCRIPT = `(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem('df-site-theme')}catch(e){}if(t!=='light'&&t!=='dark'){try{t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){t='light'}}d.setAttribute('data-theme',t)})();`;

// <html> and <body> for every page. lang/dir: 'en'/'ltr' or 'ar'/'rtl'.
export default function RootDocument({ lang, dir, children }) {
  // The fonts needed to paint the first screen are fetched early.
  preload('/fonts/inter-latin-400-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/manrope-latin-800-normal.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    <html lang={lang} dir={dir} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      {/* Browser extensions (Grammarly, dark-mode and colour-picker add-ons...) add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFAF7' },
    { media: '(prefers-color-scheme: dark)', color: '#061726' },
  ],
};
