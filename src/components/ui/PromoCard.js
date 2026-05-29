'use client';

import Image from 'next/image';
import { useTapAnimation } from '@/components/animations/useTapAnimation';

export default function PromoCard({ src, alt }) {
  const { ref, ...tapProps } = useTapAnimation(0.97, 0.2);

  return (
    <div 
      ref={ref}
      {...tapProps}
      className="reveal-item relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-tjm-dark-700 bg-tjm-dark-800 shadow-xl"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        priority={false}
      />
      {/* Gloss overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
    </div>
  );
}
