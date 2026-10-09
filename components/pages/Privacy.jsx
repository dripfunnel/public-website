import LegalPage, { legalMeta } from './LegalPage';

// Privacy Policy (/in/privacy/). Content and layout are shared with the Terms of Service: see LegalPage.jsx and components/legal/legalText.js.
export default function Page({ ctx }) {
  return <LegalPage ctx={ctx} which="privacy" />;
}

export function meta({ ctx }) {
  return legalMeta(ctx, 'privacy');
}
