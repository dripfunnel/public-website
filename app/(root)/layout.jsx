import RootDocument from '@/components/RootDocument';

export { viewport } from '@/components/RootDocument';

// The bare address (https://www.dripfunnel.com/).
export default function BareLayout({ children }) {
  return (
    <RootDocument lang="en" dir="ltr">
      {children}
    </RootDocument>
  );
}
