'use client';

import { useRef } from 'react';
import { useGSAP } from '@/components/animations/useGSAP';
import { gsap } from '@/lib/gsap';
import { usePathname } from 'next/navigation';

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const wrapperRef = useRef(null);

  useGSAP(() => {
    if (!wrapperRef.current) return;
    
    // Page Entrance Transition
    gsap.fromTo(wrapperRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
    );
  }, [pathname]);

  return (
    <div 
      ref={wrapperRef}
      className="flex-1 overflow-x-hidden overflow-y-auto pb-[88px] no-scrollbar"
    >
      {children}
    </div>
  );
}
