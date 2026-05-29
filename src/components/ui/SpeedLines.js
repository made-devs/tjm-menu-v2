'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@/components/animations/useGSAP';
import { gsap } from '@/lib/gsap';

export default function SpeedLines() {
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (!containerRef.current || !isMounted) return;
    
    const lines = gsap.utils.toArray('.speed-line', containerRef.current);
    
    lines.forEach((line) => {
      // Randomize initial position, width, and speed
      const duration = gsap.utils.random(1.5, 3);
      const delay = gsap.utils.random(0, 2);
      
      gsap.fromTo(line, 
        { x: '100vw', opacity: 0 },
        { 
          x: '-100vw', 
          opacity: gsap.utils.random(0.3, 0.7),
          duration: duration,
          delay: delay,
          repeat: -1,
          ease: 'none',
        }
      );
    });
  }, [isMounted]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Create multiple speed lines only after hydration */}
      {isMounted && [...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="speed-line absolute h-[1px] bg-gradient-to-r from-transparent via-tjm-red-500 to-transparent"
          style={{
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 150 + 50}px`,
            transform: 'rotate(-5deg)',
          }}
        />
      ))}
    </div>
  );
}

