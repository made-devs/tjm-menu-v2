import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services';
import VariantClient from './VariantClient';

export default async function ServiceVariantPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <VariantClient service={service} />;
}
