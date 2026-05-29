'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@/components/animations/useGSAP';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useTapAnimation } from '@/components/animations/useTapAnimation';

const tabs = [
  { id: 'home', label: 'Home', path: '/', icon: HomeIcon },
  { id: 'promo', label: 'Promo', path: '/promo', icon: PromoIcon },
  { id: 'service', label: 'Service', path: '/service', icon: ServiceIcon },
  { id: 'gallery', label: 'Gallery', path: '/gallery', icon: GalleryIcon }
];

export default function BottomNav() {
  const pathname = usePathname();
  const indicatorRef = useRef(null);
  const navRef = useRef(null);

  const activeIndex = tabs.findIndex(t => 
    t.path === '/' ? pathname === '/' : pathname.startsWith(t.path)
  );

  useGSAP(() => {
    if (!indicatorRef.current || activeIndex === -1) return;
    
    // Animate the active indicator bar
    gsap.to(indicatorRef.current, {
      x: `${activeIndex * 100}%`,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  }, [activeIndex]);

  return (
    <nav 
      ref={navRef}
      className="fixed bottom-0 left-0 right-0 h-[72px] bg-tjm-dark-900/80 backdrop-blur-xl border-t border-tjm-dark-700 z-50 pb-[env(safe-area-inset-bottom)]"
      style={{ maxWidth: '430px', margin: '0 auto' }}
    >
      <div className="relative flex h-full items-center">
        {/* Active Indicator Top Line */}
        <div className="absolute top-0 left-0 w-full h-[2px]">
          <div 
            ref={indicatorRef} 
            className="w-1/4 h-full bg-tjm-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
          />
        </div>
        
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIndex;
          return (
            <NavItem 
              key={tab.id} 
              tab={tab} 
              isActive={isActive} 
            />
          );
        })}
      </div>
    </nav>
  );
}

function NavItem({ tab, isActive }) {
  const { ref, ...tapProps } = useTapAnimation(0.9, 0.2);
  const Icon = tab.icon;
  
  return (
    <Link 
      href={tab.path}
      ref={ref}
      {...tapProps}
      className="flex-1 flex flex-col items-center justify-center gap-1 h-full w-full"
    >
      <Icon 
        className={`w-6 h-6 transition-colors duration-300 ${
          isActive ? 'text-tjm-red-500' : 'text-tjm-gray-500'
        }`} 
      />
      <span 
        className={`text-[11px] font-semibold tracking-wider transition-colors duration-300 ${
          isActive ? 'text-tjm-red-500' : 'text-tjm-gray-500'
        }`}
      >
        {tab.label}
      </span>
    </Link>
  );
}

// Inline SVGs for now
function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
}

function PromoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>
  );
}

function ServiceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  );
}

function GalleryIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  );
}
