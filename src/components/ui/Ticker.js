'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/animations/useGSAP';
import { gsap } from '@/lib/gsap';

export default function Ticker({ text = "PROMO SPESIAL BULAN INI • SERVICE BERKALA HEMAT • ", speed = 20 }) {
  const containerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Calculate total width based on content
    const width = textRef1.current.offsetWidth;
    
    // Set initial positions
    gsap.set(textRef2.current, { x: width });
    
    // Create seamless loop
    gsap.to([textRef1.current, textRef2.current], {
      x: `-=${width}`,
      duration: speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % width)
      }
    });
  }, [text, speed]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-tjm-red-600 text-white font-bold py-2 flex items-center border-y border-tjm-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
      style={{ transform: 'skewY(-2deg)', zIndex: 10 }}
    >
      {/* Ticker Text container with huge width to prevent wrapping */}
      <div className="flex whitespace-nowrap text-sm tracking-widest relative h-5">
        <div ref={textRef1} className="absolute left-0 top-0">
          {text} {text} {text}
        </div>
        <div ref={textRef2} className="absolute left-0 top-0">
          {text} {text} {text}
        </div>
      </div>
    </div>
  );
}
