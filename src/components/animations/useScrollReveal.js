'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function useScrollReveal(options = {}) {
  const containerRef = useRef(null);
  
  const {
    stagger = 0.1,
    yOffset = 30,
    duration = 0.5,
    selector = '.reveal-item'
  } = options;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(selector);
      if (elements.length === 0) return;

      gsap.fromTo(elements, 
        { 
          y: yOffset, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          stagger: stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, yOffset, duration, selector]);

  return containerRef;
}
