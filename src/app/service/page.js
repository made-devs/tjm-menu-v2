import ServiceClient from './ServiceClient';
import { servicesData as autocareData } from '@/data/autocareData.js';
import { acMobilData as acData } from '@/data/acMobilData.js';
import { detailingData as detailData } from '@/data/detailingData.js';
import { undercarriageData as underData } from '@/data/undercarriageData.js';

export default async function ServicePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialBrand = resolvedSearchParams?.brand || null;

  // Flatten and attach subBrandId to the data
  // The structure of the data might have `servicesData` array exported
  // We'll map through them and append the correct subBrandId

  const allServices = [
    ...(autocareData || []).map(s => ({ ...s, subBrandId: 'autocare', brandName: 'AUTO CARE' })),
    ...(acData || []).map(s => ({ ...s, subBrandId: 'ac', brandName: 'AC MOBIL' })),
    ...(detailData || []).map(s => ({ ...s, subBrandId: 'detailing', brandName: 'AUTO DETAILING' })),
    ...(underData || []).map(s => ({ ...s, subBrandId: 'undercarriage', brandName: 'UNDERCARRIAGE' })),
  ];

  return <ServiceClient initialBrand={initialBrand} allServices={allServices} />;
}
