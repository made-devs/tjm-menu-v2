'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { TextPlugin } from 'gsap/TextPlugin';
import { Draggable } from 'gsap/Draggable';
import { Observer } from 'gsap/Observer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip, TextPlugin, Draggable, Observer);
}

export { gsap, ScrollTrigger, Flip, TextPlugin, Draggable, Observer };
