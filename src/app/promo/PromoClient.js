'use client';

import { useState, useRef } from 'react';
import SubBrandFilter from '@/components/ui/SubBrandFilter';
import PromoCard from '@/components/ui/PromoCard';
import Modal from '@/components/ui/Modal';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import Image from 'next/image';
import { SUB_BRANDS } from '@/data/subBrands';

export default function PromoClient({ initialBrand, promosData }) {
  const [activeBrand, setActiveBrand] = useState(initialBrand || SUB_BRANDS[0].id);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const containerRef = useScrollReveal({ stagger: 0.15 });
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const itemWidth = carouselRef.current.children[0]?.offsetWidth || carouselRef.current.clientWidth;
      const gap = 16; // 1rem (gap-4)
      const newActive = Math.round(scrollLeft / (itemWidth + gap));
      if (newActive !== activeSlide) {
        setActiveSlide(newActive);
      }
    }
  };

  const handleBrandChange = (brandId) => {
    setActiveBrand(brandId);
    setActiveSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const filteredPromos = activeBrand 
    ? promosData.filter(p => p.brand === activeBrand)
    : promosData;

  return (
    <div className="min-h-screen bg-tjm-black bg-checkered text-white px-6 pt-6 pb-12">
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
            src="/gallery/special2.webp"
            alt="TJM Promo Hero"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-tjm-black via-tjm-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-tjm-black/80 via-tjm-black/20 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              GEBYAR <span className="text-tjm-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">PROMO</span>
            </h1>
            <p className="text-tjm-gray-300 text-sm md:text-base max-w-[80%] drop-shadow-md">
              Penawaran terbaik bulan ini dengan harga spesial untuk kendaraan Anda.
            </p>
          </div>
        </div>
        
        {/* Accent visual elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-tjm-red-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tjm-red-600 via-tjm-red-400 to-tjm-red-900"></div>
      </div>

      <div className="sticky top-0 z-20 bg-tjm-black/80 backdrop-blur-md pt-2 pb-4 -mx-6 shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        <SubBrandFilter 
          activeBrand={activeBrand} 
          onChange={handleBrandChange} 
        />
      </div>

      <div ref={containerRef} className="mt-6 relative group">
        {filteredPromos.length > 0 ? (
          <>
            <div 
              ref={carouselRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2 gap-4 -mx-6 px-6"
            >
              {filteredPromos.map((promo, idx) => (
                <div 
                  key={`${promo.brand}-${idx}`} 
                  onClick={() => setSelectedPromo(promo)}
                  className="w-[85vw] sm:w-[400px] flex-shrink-0 snap-center transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
                >
                  <PromoCard src={promo.src} alt={`Promo ${promo.brand}`} />
                </div>
              ))}
            </div>

            {/* Glowing Dot Indicators */}
            {filteredPromos.length > 1 && (
              <div className="flex justify-center gap-3 mt-2 mb-6">
                {filteredPromos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (carouselRef.current) {
                        const itemWidth = carouselRef.current.children[0]?.offsetWidth || carouselRef.current.clientWidth;
                        const gap = 16;
                        carouselRef.current.scrollTo({ left: idx * (itemWidth + gap), behavior: 'smooth' });
                      }
                    }}
                    className={`relative transition-all duration-500 ease-out flex items-center justify-center ${
                      idx === activeSlide 
                        ? 'w-12 h-2.5' 
                        : 'w-3 h-2.5 hover:w-6'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    <div className={`absolute inset-0 skew-x-[-20deg] ${
                      idx === activeSlide 
                        ? 'bg-tjm-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]' 
                        : 'bg-tjm-dark-600 hover:bg-tjm-red-900/50'
                    }`}></div>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="py-16 px-6 text-center text-tjm-gray-400 bg-tjm-dark-900/50 rounded-2xl border border-tjm-dark-700 shadow-inner italic">
            <p>Belum ada promo aktif untuk kategori ini.</p>
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
