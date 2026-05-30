'use client';

import { useEffect, useRef } from 'react';
import { gsap, Draggable } from '@/lib/gsap';
import { useTapAnimation } from '@/components/animations/useTapAnimation';

export default function Modal({ isOpen, onClose, children }) {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const dragHandleRef = useRef(null);

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      // Entrance animation
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block', ease: 'power2.out' });
      gsap.fromTo(contentRef.current, 
        { y: '100%' },
        { y: '0%', duration: 0.4, ease: 'power3.out' }
      );
      
      // Setup Draggable for swipe-to-close
      const dragger = Draggable.create(contentRef.current, {
        type: 'y',
        trigger: dragHandleRef.current,
        bounds: { minY: 0, maxY: window.innerHeight },
        onDragEnd: function() {
          if (this.y > 100) {
            onClose();
          } else {
            gsap.to(contentRef.current, { y: 0, duration: 0.3, ease: 'back.out(1.5)' });
          }
        }
      });
      
      return () => {
        if (dragger[0]) dragger[0].kill();
      };
    } else {
      // Exit animation
      gsap.to(contentRef.current, { y: '100%', duration: 0.3, ease: 'power2.in' });
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        duration: 0.3, 
        display: 'none', 
        ease: 'power2.in',
        delay: 0.1
      });
    }
  }, [isOpen, onClose]);

  const { ref: closeBtnRef, ...closeProps } = useTapAnimation(0.9);

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm hidden"
        onClick={onClose}
        style={{ opacity: 0 }}
      />
      
      {/* Bottom Sheet */}
      <div 
        ref={contentRef}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full lg:max-w-[1024px] z-[70] bg-tjm-dark-900 border-t border-tjm-dark-700 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] translate-y-full flex flex-col max-h-[90dvh]"
      >
        {/* Drag Handle */}
        <div ref={dragHandleRef} className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-tjm-dark-700 rounded-full"></div>
        </div>

        {/* Close Button */}
        <button 
          ref={closeBtnRef}
          {...closeProps}
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-tjm-dark-800 rounded-full text-tjm-gray-300 border border-tjm-dark-700"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-8">
          {children}
        </div>
      </div>
    </>
  );
}
