import ServiceClient from './ServiceClient';
import { getAllServices } from '@/lib/services';

export default async function ServicePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialBrand = resolvedSearchParams?.brand || null;
  const allServices = getAllServices();

  return <ServiceClient initialBrand={initialBrand} allServices={allServices} />;
}
