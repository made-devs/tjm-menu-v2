'use client';

import { useRef, useState } from 'react';
import { useTapAnimation } from '@/components/animations/useTapAnimation';
import { SUB_BRANDS } from '@/data/subBrands';

export default function SubBrandFilter({ activeBrand, onChange, exclude = [] }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handlePillClick = (brandId) => {
    if (dragged) return; // Prevent click if dragged
    onChange(brandId);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center mb-1">
        <span className="text-[10px] text-tjm-gray-400 uppercase tracking-widest px-3 py-1 animate-pulse flex items-center gap-2">
          <span className="text-tjm-red-500">&laquo;</span> 
          Geser untuk opsi lainnya 
          <span className="text-tjm-red-500">&raquo;</span>
        </span>
      </div>
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-4 select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-4 w-max px-6 py-2">
          {SUB_BRANDS.filter(brand => !exclude.includes(brand.id)).map(brand => (
            <FilterPill
              key={brand.id}
              label={`TJM ${brand.shortName}`}
              isActive={activeBrand === brand.id}
              onClick={() => handlePillClick(brand.id)}
              color={brand.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, isActive, onClick, color }) {
  const { ref, ...tapProps } = useTapAnimation(0.95, 0.1);

  return (
    <button
      ref={ref}
      {...tapProps}
      onClick={onClick}
      className={`relative group overflow-hidden flex items-center justify-center h-12 px-6 font-black italic tracking-widest text-sm uppercase transition-all duration-300 transform -skew-x-12 border-b-4 border-r-4 ${
        isActive 
          ? `${color} text-white border-tjm-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]` 
          : 'bg-tjm-dark-900 text-tjm-gray-400 border-tjm-dark-700 hover:border-tjm-red-900/50 hover:bg-tjm-dark-800'
      }`}
    >
      {isActive && (
        <div className={`absolute inset-0 blur-xl opacity-60 ${color} animate-pulse`}></div>
      )}
      
      {/* Sweeping light effect for racing vibe */}
      <div className="absolute top-0 left-0 w-4 h-full bg-white/20 skew-x-12 translate-x-[-200%] group-hover:translate-x-[800%] transition-transform duration-700 ease-in-out z-0"></div>
      
      <span className="relative z-10 skew-x-12 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
        {label}
      </span>
      
      {/* Decorative racing accent marks */}
      <div className={`absolute top-0 right-0 w-2 h-full ${isActive ? 'bg-tjm-red-400/50' : 'bg-transparent'} skew-x-12 translate-x-1`}></div>
    </button>
  );
}
