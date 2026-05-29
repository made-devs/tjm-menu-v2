'use client';

import { useTapAnimation } from '@/components/animations/useTapAnimation';
import { SUB_BRANDS } from '@/data/subBrands';

export default function SubBrandFilter({ activeBrand, onChange }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
      <div className="flex gap-3 w-max">
        <FilterPill 
          label="Semua" 
          isActive={!activeBrand} 
          onClick={() => onChange(null)} 
          color="bg-tjm-red-600"
        />
        {SUB_BRANDS.map(brand => (
          <FilterPill
            key={brand.id}
            label={brand.shortName}
            icon={brand.icon}
            isActive={activeBrand === brand.id}
            onClick={() => onChange(brand.id)}
            color={brand.color}
          />
        ))}
      </div>
    </div>
  );
}

function FilterPill({ label, icon, isActive, onClick, color }) {
  const { ref, ...tapProps } = useTapAnimation(0.9, 0.15);

  return (
    <button
      ref={ref}
      {...tapProps}
      onClick={onClick}
      className={`relative flex items-center justify-center h-10 px-4 rounded-full font-semibold text-sm transition-all duration-300 ${
        isActive 
          ? `${color} text-white shadow-lg` 
          : 'bg-tjm-dark-800 text-tjm-gray-300 border border-tjm-dark-700'
      }`}
    >
      {isActive && (
        <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${color}`}></div>
      )}
      <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
        {icon && <span>{icon}</span>}
        {label}
      </span>
    </button>
  );
}
