'use client';

import Image from 'next/image';
import { useTapAnimation } from '@/components/animations/useTapAnimation';

export default function ServiceCard({ service, onClick }) {
  const { ref, ...tapProps } = useTapAnimation(0.95, 0.15);

  return (
    <div 
      ref={ref}
      {...tapProps}
      onClick={() => onClick(service)}
      className="reveal-item flex flex-col w-full bg-tjm-dark-800 rounded-2xl overflow-hidden border border-tjm-dark-700 shadow-lg cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-tjm-dark-900">
        <Image
          src={service.image || '/logo/logotjm.webp'}
          alt={service.title || service.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tjm-black/80 to-transparent"></div>
        {service.category && (
          <div className="absolute top-2 right-2 bg-tjm-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
            {service.category}
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
        <h3 className="font-bold text-sm leading-tight line-clamp-2">
          {service.title || service.name}
        </h3>
        
        {service.priceRange && (
          <div className="text-tjm-red-500 font-semibold text-xs mt-1">
            {service.priceRange}
          </div>
        )}
      </div>
    </div>
  );
}
