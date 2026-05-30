import { servicesData as autocareData } from '@/data/autocareData.js';
import { acMobilData as acData } from '@/data/acMobilData.js';
import { detailingData as detailData } from '@/data/detailingData.js';
import { undercarriageData as underData } from '@/data/undercarriageData.js';

/**
 * Returns a flat array of all services with their subBrandId appended.
 */
export function getAllServices() {
  return [
    ...(autocareData || []).map(s => ({ ...s, subBrandId: 'autocare', brandName: 'AUTO CARE' })),
    ...(acData || []).map(s => ({ ...s, subBrandId: 'ac', brandName: 'AC MOBIL' })),
    ...(detailData || []).map(s => ({ ...s, subBrandId: 'detailing', brandName: 'AUTO DETAILING' })),
    ...(underData || []).map(s => ({ ...s, subBrandId: 'undercarriage', brandName: 'UNDERCARRIAGE' })),
  ];
}

/**
 * Finds a service by its slug.
 * @param {string} slug The service slug.
 * @returns {object|null} The service object or null if not found.
 */
export function getServiceBySlug(slug) {
  const allServices = getAllServices();
  return allServices.find(s => s.slug === slug) || null;
}
