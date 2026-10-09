import { notFound } from 'next/navigation';
import Shell from '@/components/Shell';
import { findRoute } from '@/lib/pages';
import { makeCtx } from '@/lib/ctx';

// Builds one page: finds which page the address belongs to and wraps it in the header and footer.
export default function RoutePage({ region, locale, slug = [] }) {
  const route = findRoute(slug);
  if (!route) notFound();
  const ctx = makeCtx(region, locale);
  const Page = route.page.mod.default;
  return (
    <Shell ctx={ctx} pageKey={route.page.key} slug={slug}>
      <Page ctx={ctx} rest={route.rest} />
    </Shell>
  );
}
