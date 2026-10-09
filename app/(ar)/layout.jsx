import RootDocument from '@/components/RootDocument';
import './arabic.css';

export { viewport } from '@/components/RootDocument';

// Arabic pages (UAE only): /ae/ar/...  Right-to-left, with the Arabic font.
export default function ArabicLayout({ children }) {
  return (
    <RootDocument lang="ar" dir="rtl">
      {children}
    </RootDocument>
  );
}
