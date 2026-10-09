import LegalPage, { legalMeta } from './LegalPage';

// Terms of Service (/in/terms/). Content and layout are shared with the Privacy Policy: see LegalPage.jsx and components/legal/legalText.js.
export default function Page({ ctx }) {
  return <LegalPage ctx={ctx} which="terms" />;
}

export function meta({ ctx }) {
  return legalMeta(ctx, 'terms');
}
