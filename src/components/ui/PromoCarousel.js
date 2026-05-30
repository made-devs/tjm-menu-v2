'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTapAnimation } from '@/components/animations/useTapAnimation';
import { SUB_BRANDS } from '@/data/subBrands';

export default function PromoCarousel() {
  return (
    <div className="w-full mt-10 mb-2">
      <div className="px-6 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-widest flex items-center gap-2 text-white drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">
          <span className="w-1.5 h-5 bg-tjm-red-500 rounded-sm skew-x-[-15deg] shadow-[0_0_10px_rgba(239,68,68,1)]"></span>
          PROMO BULAN INI
        </h2>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-tjm-red-500 animate-pulse-glow"></div>
          <div className="w-2 h-2 rounded-full bg-tjm-red-900"></div>
          <div className="w-2 h-2 rounded-full bg-tjm-red-900"></div>
        </div>
      </div>

      {/* Horizontal Scroll Snap Container */}
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 pb-6 gap-4">
        {SUB_BRANDS.map((brand, idx) => (
          <CarouselCard key={brand.id} brand={brand} index={idx} />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ brand, index }) {
  const { ref, ...tapProps } = useTapAnimation(0.95, 0.2);

  const getPromoImage = (brandId) => {
    switch (brandId) {
      case 'ac': return '/promo/ac/acgrid1.webp';
      case 'autocare': return '/promo/autocare/autogrid1.webp';
      case 'detailing': return '/promo/detailing/detailinggrid1.webp';
      case 'express': return '/promo/express/expressgrid1.webp';
      case 'undercarriage': return '/promo/undercarriage/undercarriagegrid1.webp';
      default: return `/promo/${brandId}/grid1.webp`;
    }
  };

  return (
    <Link
      href={brand.path || `/promo?brand=${brand.id}`}
      ref={ref}
      {...tapProps}
      className="relative flex-shrink-0 w-[240px] aspect-[4/5] snap-center rounded-2xl overflow-hidden bg-tjm-dark-900 border border-tjm-red-900/50 shadow-[0_10px_20px_rgba(0,0,0,0.5),_0_0_15px_rgba(220,38,38,0.2)] group"
    >
      {/* Background Image */}
      <Image
        src={getPromoImage(brand.id)}
        alt={`Promo ${brand.name}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Red Glow & Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-tjm-black via-tjm-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-tjm-red-900/80 via-transparent to-transparent opacity-80"></div>

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 opacity-50 pointer-events-none"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="bg-tjm-red-600 text-white text-[10px] font-bold px-2 py-1 rounded w-max uppercase tracking-widest shadow-[0_0_10px_rgba(220,38,38,0.8)] mb-2">
          Special Promo
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide leading-tight drop-shadow-md">
          {brand.name}
        </h3>
        <p className="text-xs text-tjm-gray-300 mt-1 line-clamp-2">
          Diskon khusus bulan ini untuk perawatan {brand.name.toLowerCase()} terbaik.
        </p>
      </div>

      {/* Frame Border Accent */}
      <div className="absolute inset-0 border-2 border-transparent border-t-white/10 border-l-white/10 rounded-2xl pointer-events-none"></div>
    </Link>
  );
}
