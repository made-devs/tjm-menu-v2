'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/components/animations/useScrollReveal';
import { useTapAnimation } from '@/components/animations/useTapAnimation';
import { gsap } from '@/lib/gsap';

export default function GalleryClient({ photos }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const containerRef = useScrollReveal({ stagger: 0.1 });

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

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
            src={photos && photos.length > 0 ? photos[0].src : "/services/autocare.webp"}
            alt="TJM Gallery Hero"
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
              TJM <span className="text-tjm-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">GALLERY</span>
            </h1>
            <p className="text-tjm-gray-300 text-sm md:text-base max-w-[80%] drop-shadow-md">
              Dokumentasi hasil pengerjaan terbaik dari tim kami.
            </p>
          </div>
        </div>
        
        {/* Accent visual elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-tjm-red-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-tjm-red-600 via-tjm-red-400 to-tjm-red-900"></div>
      </div>

      {/* Grid Masonry-like Layout */}
      <div ref={containerRef} className="grid grid-cols-2 gap-3 mt-4">
        {photos.length > 0 ? (
          photos.map((photo, idx) => (
            <GalleryItem 
              key={idx} 
              photo={photo} 
              onClick={() => setSelectedPhotoIndex(idx)} 
            />
          ))
        ) : (
          <div className="col-span-2 py-20 text-center text-tjm-gray-500">
            <p>Belum ada foto di gallery.</p>
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {selectedPhotoIndex !== null && (
        <Lightbox 
          photo={photos[selectedPhotoIndex]} 
          onClose={() => setSelectedPhotoIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}

function GalleryItem({ photo, onClick }) {
  const { ref, ...tapProps } = useTapAnimation(0.95);
  // Give some random aspect ratios to simulate masonry visually, or just squares
  // Since we want uniform, we'll use aspect-square for simplicity on mobile
  return (
    <div 
      ref={ref}
      {...tapProps}
      onClick={onClick}
      className="reveal-item relative w-full aspect-square rounded-xl overflow-hidden border border-tjm-dark-700 cursor-pointer shadow-lg"
    >
      <Image
        src={photo.src}
        alt={photo.filename}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 hover:scale-110"
      />
      <div className="absolute inset-0 bg-tjm-black/20 opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}

function Lightbox({ photo, onClose, onNext, onPrev }) {
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const dragHandleRef = useRef(null);

  useEffect(() => {
    // Entrance
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    gsap.fromTo(imageRef.current, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
    );

    // Setup drag for swipe left/right (next/prev) and up/down (close)
    const dragger = gsap.Draggable.create(dragHandleRef.current, {
      type: 'x,y',
      onDragEnd: function() {
        if (this.x > 100) {
          onPrev();
        } else if (this.x < -100) {
          onNext();
        } else if (Math.abs(this.y) > 100) {
          handleClose();
        } else {
          gsap.to(this.target, { x: 0, y: 0, duration: 0.3, ease: 'back.out(1.5)' });
        }
      }
    });

    return () => {
      if (dragger[0]) dragger[0].kill();
    };
  }, [photo, onNext, onPrev]);

  const handleClose = () => {
    gsap.to(imageRef.current, { scale: 0.8, opacity: 0, duration: 0.2 });
    gsap.to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      ease: 'power2.in',
      onComplete: onClose
    });
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-tjm-black/95 backdrop-blur-xl flex flex-col items-center justify-center opacity-0"
    >
      <button 
        onClick={handleClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-tjm-dark-800 rounded-full text-white border border-tjm-dark-700 z-50"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Swipe hints */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-tjm-gray-500 text-xs tracking-widest uppercase">
        Swipe untuk navigasi
      </div>

      <div 
        ref={dragHandleRef}
        className="w-full h-[70vh] flex items-center justify-center px-4 relative cursor-grab active:cursor-grabbing"
      >
        <div ref={imageRef} className="relative w-full h-full max-w-lg">
          <Image
            src={photo.src}
            alt={photo.filename}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
      
      {/* Navigation Buttons for tapping */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-10 z-50">
        <button onClick={onPrev} className="w-12 h-12 flex items-center justify-center rounded-full bg-tjm-dark-800 border border-tjm-dark-700 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button onClick={onNext} className="w-12 h-12 flex items-center justify-center rounded-full bg-tjm-dark-800 border border-tjm-dark-700 text-white">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
