'use client';

import { useState } from 'react';
import SubBrandFilter from '@/components/ui/SubBrandFilter';
import PromoCard from '@/components/ui/PromoCard';
import Modal from '@/components/ui/Modal';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import Image from 'next/image';

export default function PromoClient({ initialBrand, promosData }) {
  const [activeBrand, setActiveBrand] = useState(initialBrand || null);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const containerRef = useScrollReveal({ stagger: 0.15 });

  const filteredPromos = activeBrand 
    ? promosData.filter(p => p.brand === activeBrand)
    : promosData;

  return (
    <div className="min-h-screen bg-tjm-black bg-checkered text-white px-6 pt-6 pb-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-wider mb-2">PROMO</h1>
        <p className="text-tjm-gray-300 text-sm">Penawaran terbaik bulan ini untuk kendaraan Anda.</p>
      </div>

      <div className="sticky top-0 z-20 bg-tjm-black/80 backdrop-blur-md pt-2 pb-4 -mx-6 px-6 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        <SubBrandFilter 
          activeBrand={activeBrand} 
          onChange={setActiveBrand} 
        />
      </div>

      <div ref={containerRef} className="mt-6 flex flex-col gap-6">
        {filteredPromos.length > 0 ? (
          filteredPromos.map((promo, idx) => (
            <div key={`${promo.brand}-${idx}`} onClick={() => setSelectedPromo(promo)}>
              <PromoCard src={promo.src} alt={`Promo ${promo.brand}`} />
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-tjm-gray-500">
            <p>Belum ada promo untuk kategori ini.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedPromo} onClose={() => setSelectedPromo(null)}>
        {selectedPromo && (
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-tjm-dark-700">
              <Image
                src={selectedPromo.src}
                alt="Promo Detail"
                fill
                className="object-contain bg-tjm-dark-900"
              />
            </div>
            <div className="pt-2">
              <h3 className="text-xl font-bold mb-2">S&K Berlaku</h3>
              <ul className="list-disc pl-5 text-sm text-tjm-gray-300 space-y-1">
                <li>Tunjukkan halaman ini kepada kasir.</li>
                <li>Promo tidak dapat digabungkan dengan promo lain.</li>
                <li>Berlaku selama persediaan masih ada.</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
