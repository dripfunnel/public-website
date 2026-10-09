import RoutePage from '@/components/RoutePage';
import { staticParamsEn, buildMetadata } from '@/lib/pages';

// Every English page of every region is built ahead of time. Any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return staticParamsEn();
}

export async function generateMetadata({ params }) {
  const { region, slug = [] } = await params;
  return buildMetadata({ region, locale: 'en', slug });
}

export default async function Page({ params }) {
  const { region, slug = [] } = await params;
  return <RoutePage region={region} locale="en" slug={slug} />;
}
