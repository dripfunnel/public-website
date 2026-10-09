import RootDocument from '@/components/RootDocument';

export { viewport } from '@/components/RootDocument';

// English pages: /in/..., /us/..., /ae/...
export default function EnglishLayout({ children }) {
  return (
    <RootDocument lang="en" dir="ltr">
      {children}
    </RootDocument>
  );
}
