'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import VariantCard from '@/components/ui/VariantCard';
import Modal from '@/components/ui/Modal';

export default function VariantClient({ service }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const containerRef = useScrollReveal({ stagger: 0.05, yOffset: 20 });

  return (
    <div className="min-h-screen bg-tjm-black bg-carbon text-white px-6 pt-6 pb-12">
      {/* Back Button & Logo */}
      <div className="flex items-center justify-between w-full mb-6 relative z-10">
        <Link 
          href="/service"
          className="flex items-center justify-center w-10 h-10 bg-tjm-dark-800 rounded-full border border-tjm-dark-700 hover:bg-tjm-dark-700 hover:border-tjm-red-500 transition-colors shadow-md"
        >
          <svg className="w-5 h-5 text-tjm-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        <div className="drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          <Image 
            src="/logo/logotjm.webp" 
            alt="TJM Logo" 
            width={120} 
            height={40} 
            className="object-contain"
            priority
          />
        </div>
        
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      {/* Hero Header Section */}
      <div className="relative mb-8 mt-2 rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(220,38,38,0.2)] border border-tjm-red-900/40">
        <div className="absolute inset-0 bg-tjm-red-500 blur-xl opacity-20"></div>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
          <Image 
            src={service.image || '/logo/logotjm.webp'}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tjm-black via-tjm-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-tjm-black/80 via-tjm-black/20 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="inline-block bg-tjm-red-600/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider mb-2 w-max">
              {service.brandName || service.category || 'SERVICE'}
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-wider mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {service.title}
            </h1>
            <p className="text-tjm-gray-300 text-sm md:text-base drop-shadow-md line-clamp-3 md:line-clamp-none">
              {service.description || service.details}
            </p>
          </div>
        </div>
      </div>

      {/* Variants Grid */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-wider">Pilih Varian Paket</h2>
        <span className="text-xs bg-tjm-dark-800 px-2 py-1 rounded border border-tjm-dark-700 text-tjm-gray-400">
          {service.variants?.length || 0} Opsi
        </span>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
        {service.variants && service.variants.length > 0 ? (
          service.variants.map((variant, idx) => (
            <VariantCard 
              key={idx} 
              variant={variant} 
              onClick={setSelectedVariant} 
            />
          ))
        ) : (
          <div className="col-span-full py-16 text-center border border-dashed border-tjm-dark-700 rounded-2xl bg-tjm-dark-800/30">
            <p className="text-tjm-gray-500">Belum ada varian untuk paket ini.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedVariant} onClose={() => setSelectedVariant(null)}>
        {selectedVariant && (
          <div className="flex flex-col gap-5 pt-2">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-tjm-dark-700 bg-tjm-dark-900">
              <Image
                src={selectedVariant.image || service.image || '/logo/logotjm.webp'}
                alt={selectedVariant.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-tjm-red-900/50 text-tjm-red-500 text-xs font-bold px-2 py-1 rounded border border-tjm-red-900/50">
                  {service.title}
                </span>
              </div>
              <h3 className="text-2xl font-bold leading-tight">
                {selectedVariant.title}
              </h3>
              
              {selectedVariant.description && (
                <div className="mt-4 p-4 bg-tjm-dark-800 rounded-xl border border-tjm-dark-700">
                  <h4 className="text-sm font-semibold text-tjm-gray-300 mb-2 uppercase tracking-wider">Deskripsi</h4>
                  <p className="text-sm leading-relaxed text-tjm-gray-300">
                    {selectedVariant.description}
                  </p>
                </div>
              )}

              {selectedVariant.details && selectedVariant.details.length > 0 && (
                <div className="mt-5">
                  <h4 className="text-sm font-semibold text-tjm-gray-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4 text-tjm-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Termasuk dalam paket:
                  </h4>
                  <ul className="space-y-3 bg-tjm-dark-900/50 p-4 rounded-xl border border-tjm-dark-700">
                    {selectedVariant.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3">
                        <div className="text-tjm-red-500 shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-tjm-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-tjm-gray-100">{detail.title}</p>
                          {detail.description && (
                            <p className="text-xs text-tjm-gray-400 mt-1 leading-relaxed">
                              {detail.description}
                            </p>
                          )}
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
