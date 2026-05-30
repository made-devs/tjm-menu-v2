'use client';

import Image from 'next/image';
import { useTapAnimation } from '@/components/animations/useTapAnimation';

export default function VariantCard({ variant, onClick }) {
  const { ref, ...tapProps } = useTapAnimation(0.95, 0.15);

  return (
    <div 
      ref={ref}
      {...tapProps}
      onClick={() => onClick(variant)}
      className="reveal-item flex flex-col w-full bg-tjm-dark-800 rounded-2xl overflow-hidden border border-tjm-dark-700 shadow-[0_4px_15px_rgba(0,0,0,0.3)] cursor-pointer group hover:border-tjm-red-500/50 transition-colors"
    >
      <div className="relative w-full aspect-square bg-tjm-dark-900">
        <Image
          src={variant.image || '/logo/logotjm.webp'}
          alt={variant.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tjm-black/90 via-tjm-black/20 to-transparent"></div>
        
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <h3 className="font-bold text-sm md:text-base leading-tight drop-shadow-md text-white line-clamp-2">
            {variant.title}
          </h3>
        </div>
      </div>
      
      <div className="p-3 flex flex-col gap-1 flex-1 relative bg-tjm-dark-800">
        <p className="text-xs text-tjm-gray-300 line-clamp-3">
          {variant.description}
        </p>
        
        <div className="mt-3 text-[10px] uppercase font-bold tracking-wider text-tjm-red-500 flex items-center gap-1">
          <span>Lihat Detail</span>
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
