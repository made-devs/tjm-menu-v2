import fs from 'fs';
import path from 'path';
import PromoClient from './PromoClient';
import { SUB_BRANDS } from '@/data/subBrands';

// Server component to read the promo images from public directory
export default async function PromoPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialBrand = resolvedSearchParams?.brand || null;

  const publicDir = path.join(process.cwd(), 'public', 'promo');
  let promosData = [];

  try {
    if (fs.existsSync(publicDir)) {
      const brands = fs.readdirSync(publicDir);
      
      for (const brand of brands) {
        const brandPath = path.join(publicDir, brand);
        if (fs.statSync(brandPath).isDirectory()) {
          const files = fs.readdirSync(brandPath);
          for (const file of files) {
            // Only include image files
            if (/\.(jpg|jpeg|png|webp|svg)$/i.test(file)) {
              promosData.push({
                brand: brand,
                src: `/promo/${brand}/${file}`,
                filename: file
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error reading promo directory:", error);
  }

  // Sort promos based on SUB_BRANDS priority
  promosData.sort((a, b) => {
    const indexA = SUB_BRANDS.findIndex(sb => sb.id === a.brand);
    const indexB = SUB_BRANDS.findIndex(sb => sb.id === b.brand);
    // If a brand is not in SUB_BRANDS, put it at the end
    const rankA = indexA !== -1 ? indexA : 999;
    const rankB = indexB !== -1 ? indexB : 999;
    return rankA - rankB;
  });

  return <PromoClient initialBrand={initialBrand} promosData={promosData} />;
}

