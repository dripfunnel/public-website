import RoutePage from '@/components/RoutePage';
import { staticParamsAr, buildMetadata } from '@/lib/pages';

// Arabic pages exist for the UAE only: /ae/ar/...
export const dynamicParams = false;

export function generateStaticParams() {
  return staticParamsAr();
}

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;
  return buildMetadata({ region: 'ae', locale: 'ar', slug });
}

export default async function Page({ params }) {
  const { slug = [] } = await params;
  return <RoutePage region="ae" locale="ar" slug={slug} />;
}
