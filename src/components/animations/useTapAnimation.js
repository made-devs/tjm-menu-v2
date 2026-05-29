'use client';

import { useRef, useCallback } from 'react';
import { gsap } from '@/lib/gsap';

export function useTapAnimation(scale = 0.95, duration = 0.2) {
  const elementRef = useRef(null);

  const handleTouchStart = useCallback(() => {
    if (!elementRef.current) return;
    gsap.to(elementRef.current, {
      scale: scale,
      duration: duration,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [scale, duration]);

  const handleTouchEnd = useCallback(() => {
    if (!elementRef.current) return;
    gsap.to(elementRef.current, {
      scale: 1,
      duration: duration,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, [duration]);

  return {
    ref: elementRef,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
    onMouseDown: handleTouchStart, // for testing on desktop
    onMouseUp: handleTouchEnd,
    onMouseLeave: handleTouchEnd
  };
}
