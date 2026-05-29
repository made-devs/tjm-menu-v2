'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function useGSAP(callback, dependencies = []) {
  const ctx = useRef(null);

  useLayoutEffect(() => {
    ctx.current = gsap.context(callback);
    return () => ctx.current.revert();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return ctx;
}
