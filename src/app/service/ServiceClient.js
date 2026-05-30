'use client';

import { useState } from 'react';
import SubBrandFilter from '@/components/ui/SubBrandFilter';
import ServiceCard from '@/components/ui/ServiceCard';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import Image from 'next/image';
import { SUB_BRANDS } from '@/data/subBrands';

export default function ServiceClient({ initialBrand, allServices }) {
  const availableBrands = SUB_BRANDS.filter(b => b.id !== 'express');
  const [activeBrand, setActiveBrand] = useState(initialBrand || availableBrands[0]?.id || null);
  const [selectedService, setSelectedService] = useState(null);
  const containerRef = useScrollReveal({ stagger: 0.05, yOffset: 20 });

  // Filter based on active subbrand
  // Note: the original data structure might be complex, so we assume allServices is a flat array 
  // with a `subBrandId` or `brand` field attached to each item.
  const filteredServices = activeBrand 
    ? allServices.filter(s => s.subBrandId === activeBrand)
    : allServices;

  return (
    <div className="min-h-screen bg-tjm-black bg-carbon text-white px-6 pt-6 pb-12">
      {/* TJM Logo Top Center */}
      <div className="flex justify-center w-full mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
        <Image 
          src="/logo/logotjm.webp" 
          alt="TJM Logo" 
          width={180} 
          height={60} 
          className="object-contain"
          priority
        />
      </div>

      {/* Hero Header Section */}
      <div className="relative mb-8 mt-2 rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(220,38,38,0.2)] border border-tjm-red-900/40 group">
        <div className="absolute inset-0 bg-tjm-red-500 blur-xl opacity-20 animate-pulse-glow"></div>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
          <Image 
            src="/services/autocare.webp"
            alt="TJM Service Hero"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
            priority
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-tjm-black via-tjm-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-tjm-black/80 via-tjm-black/20 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              TJM <span className="text-tjm-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">SERVICE</span>
            </h1>
            <p className="text-tjm-gray-300 text-sm md:text-base max-w-[80%] drop-shadow-md">
              Pilihan paket perawatan untuk performa maksimal kendaraan Anda.
            </p>
          </div>
        </div>
        
        {/* Accent visual elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-tjm-red-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tjm-red-600 via-tjm-red-400 to-tjm-red-900"></div>
      </div>

      <div className="sticky top-0 z-20 bg-tjm-black/80 backdrop-blur-md pt-2 pb-4 -mx-6 border-b border-tjm-dark-700/50 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        <SubBrandFilter 
          activeBrand={activeBrand} 
          onChange={setActiveBrand} 
          exclude={['express']}
        />
      </div>

      <div ref={containerRef} className="mt-6 grid grid-cols-2 gap-3 pb-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, idx) => (
            <ServiceCard 
              key={`${service.subBrandId}-${idx}`} 
              service={service} 
              href={`/service/${service.slug}`}
            />
          ))
        ) : (
          <div className="col-span-2 py-20 text-center text-tjm-gray-500">
            <p>Belum ada paket service untuk kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
