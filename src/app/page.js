'use client';

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@/components/animations/useGSAP";
import { gsap } from "@/lib/gsap";
import SpeedLines from "@/components/ui/SpeedLines";
import Ticker from "@/components/ui/Ticker";
import PromoCarousel from "@/components/ui/PromoCarousel";
import { useTapAnimation } from "@/components/animations/useTapAnimation";
import { SUB_BRANDS } from "@/data/subBrands";

export default function Home() {
  const heroRef = useRef(null);
  const typeRef = useRef(null);
  const cursorRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    // 1. Logo pulse animation
    gsap.to('.logo-img', {
      scale: 1.05,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // 2. Typewriter effect
    gsap.to(typeRef.current, {
      text: "SOLUSI TEPAT KENDARAAN ANDA",
      duration: 2,
      delay: 0.5,
      ease: "none",
      onComplete: () => {
        // Fade out and shrink cursor to re-center text smoothly
        gsap.to(cursorRef.current, {
          opacity: 0,
          width: 0,
          marginLeft: 0,
          marginRight: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (cursorRef.current) cursorRef.current.style.display = 'none';
          }
        });
      }
    });

    // 3. Grid stagger entrance
    gsap.fromTo('.brand-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.5
      }
    );

    // 4. Featured header slide
    gsap.fromTo('.featured-header',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: 1, ease: 'power2.out' }
    );
  });

  return (
    <main className="relative min-h-[100dvh] flex flex-col bg-tjm-black bg-carbon text-white">
      <SpeedLines />

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-12 pb-2 flex flex-col items-center justify-center">
        <div className="relative w-48 h-24 mb-4">
          <Image
            src="/logo/logotjm.webp"
            alt="TJM Auto Care Logo"
            fill
            sizes="200px"
            className="object-contain logo-img drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]"
            priority
          />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-wider text-center h-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          <span ref={typeRef} className="text-transparent bg-clip-text bg-gradient-to-r from-white to-tjm-gray-300"></span>
          <span ref={cursorRef} className="inline-block animate-pulse text-tjm-red-500 shadow-tjm-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] overflow-hidden align-bottom">_</span>
        </h1>
      </section>

      {/* Hero Promo Section */}
      <div className="relative z-10 px-6 mt-4 mb-2">
        <Link href="/promo" className="block relative w-full aspect-video rounded-2xl overflow-hidden border border-tjm-dark-700 shadow-lg group">
          <Image
            src="/gallery/combokaki1.webp"
            alt="Gebyar Promo Kaki Kaki"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tjm-black via-tjm-black/40 to-transparent flex flex-col justify-end p-5">
            <h2 className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-lg leading-tight">
              Gebyar Promo Kaki Kaki <br />
              <span className="text-tjm-red-500">Mulai 600 Ribuan!</span>
            </h2>
          </div>
        </Link>
      </div>

      {/* Promo Carousel */}
      <div className="relative z-10">
        <PromoCarousel />
      </div>

      {/* Ticker */}
      <div className="mt-4">
        <Ticker text="PROMO SPESIAL • TJM AUTO CARE • SERVICE BERKALA • AUTO DETAILING • " speed={15} />
      </div>

      {/* Content Area */}
      <section className="relative z-10 flex-1 px-6 py-8 flex flex-col gap-8 bg-tjm-dark-900/60 backdrop-blur-md rounded-t-[32px] mt-6 border-t border-tjm-red-900/40 shadow-[0_-15px_40px_rgba(220,38,38,0.15)]">

        {/* Quick Access Grid */}
        <div ref={gridRef}>
          <h2 className="featured-header text-xl font-bold tracking-widest mb-4 flex items-center gap-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">
            <span className="w-2 h-6 bg-tjm-red-500 rounded-sm skew-x-[-15deg] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            PILIH LAYANAN
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {SUB_BRANDS.filter(b => b.id !== 'express').map((brand, i) => {
              let gridClass = "col-span-1";
              if (i === 0) gridClass = "col-span-1 row-span-2 min-h-[140px]"; // Auto Care
              else if (i === 3) gridClass = "col-span-2"; // Undercarriage

              return (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  className={gridClass}
                  isFeatured={i === 0}
                />
              );
            })}
          </div>
        </div>

        {/* Featured Action */}
        <div className="mt-4 pt-4">
          <Link href="/service" className="block relative group">
            <div className="absolute inset-0 bg-tjm-red-500 rounded-xl blur-md opacity-40 group-active:opacity-70 transition-opacity"></div>
            <div className="relative animate-pulse-glow w-full bg-gradient-to-r from-tjm-red-600 to-tjm-red-900 rounded-xl p-4 flex items-center justify-between border border-tjm-red-400/50">
              <div>
                <h3 className="text-lg font-bold tracking-wider text-white drop-shadow-md">LIHAT SEMUA PAKET</h3>
                <p className="text-xs text-white/80 mt-0.5">Temukan harga terbaik untuk service kendaraan Anda</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </section>
    </main>
  );
}

function BrandCard({ brand, isFeatured, className = '' }) {
  const { ref, ...tapProps } = useTapAnimation(0.95);

  return (
    <Link
      href={`/service?brand=${brand.id}`}
      ref={ref}
      {...tapProps}
      className={`brand-card relative overflow-hidden rounded-xl border border-tjm-dark-700 p-4 shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:border-tjm-red-500/50 transition-colors group ${className}`}
    >
      {/* Background Image */}
      <Image
        src={`/services/${brand.id}.webp`}
        alt={`${brand.name} background`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={isFeatured}
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
      />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-tjm-black via-tjm-black/60 to-transparent"></div>
      <div className={`absolute top-0 right-0 w-24 h-24 opacity-30 rotate-12 translate-x-4 -translate-y-4 rounded-full blur-xl ${brand.color}`}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        <div className={`w-4 h-1.5 rounded-full ${brand.color} shadow-[0_0_5px_currentColor]`}></div>
        <h3 className={`font-bold tracking-wide leading-tight uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${isFeatured ? 'text-[15px]' : 'text-[13px]'}`}>
          TJM<br />{brand.shortName || brand.name}
        </h3>
      </div>
    </Link>
  );
}
