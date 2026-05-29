'use client';

import { useState } from 'react';
import SubBrandFilter from '@/components/ui/SubBrandFilter';
import ServiceCard from '@/components/ui/ServiceCard';
import Modal from '@/components/ui/Modal';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import Image from 'next/image';

export default function ServiceClient({ initialBrand, allServices }) {
  const [activeBrand, setActiveBrand] = useState(initialBrand || null);
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-wider mb-2">SERVICE</h1>
        <p className="text-tjm-gray-300 text-sm">Pilihan paket perawatan untuk performa maksimal.</p>
      </div>

      <div className="sticky top-0 z-20 bg-tjm-black/80 backdrop-blur-md pt-2 pb-4 -mx-6 px-6 border-b border-tjm-dark-700/50 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        <SubBrandFilter 
          activeBrand={activeBrand} 
          onChange={setActiveBrand} 
        />
      </div>

      <div ref={containerRef} className="mt-6 grid grid-cols-2 gap-3 pb-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, idx) => (
            <ServiceCard 
              key={`${service.subBrandId}-${idx}`} 
              service={service} 
              onClick={setSelectedService} 
            />
          ))
        ) : (
          <div className="col-span-2 py-20 text-center text-tjm-gray-500">
            <p>Belum ada paket service untuk kategori ini.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
        {selectedService && (
          <div className="flex flex-col gap-5 pt-2">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-tjm-dark-700 bg-tjm-dark-900">
              <Image
                src={selectedService.image || '/logo/logotjm.webp'}
                alt={selectedService.title || selectedService.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-tjm-red-900/50 text-tjm-red-500 text-xs font-bold px-2 py-1 rounded">
                  TJM {selectedService.brandName || "SERVICE"}
                </span>
              </div>
              <h3 className="text-2xl font-bold leading-tight">
                {selectedService.title || selectedService.name}
              </h3>
              
              <div className="mt-4 p-4 bg-tjm-dark-800 rounded-xl border border-tjm-dark-700">
                <h4 className="text-sm font-semibold text-tjm-gray-300 mb-2 uppercase tracking-wider">Deskripsi</h4>
                <p className="text-sm leading-relaxed">
                  {selectedService.description || selectedService.details || "Deskripsi paket service."}
                </p>
              </div>

              {selectedService.variants && selectedService.variants.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-tjm-gray-300 mb-3 uppercase tracking-wider">Termasuk dalam paket:</h4>
                  <ul className="space-y-3">
                    {selectedService.variants.map((v, i) => (
                      <li key={i} className="flex gap-3 bg-tjm-dark-800/50 p-3 rounded-lg border border-tjm-dark-700/50">
                        <div className="text-tjm-red-500 shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{v.title}</p>
                          {v.description && <p className="text-xs text-tjm-gray-400 mt-1">{v.description}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
