import React from 'react';
import { CategoryType } from '../types';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (category: CategoryType | 'all' | 'under-999') => void;
}

const CATEGORIES: { id: CategoryType | 'all' | 'under-999'; label: string; image: string; count: string }[] = [
  {
    id: 'all',
    label: 'All Pieces',
    image: '/src/assets/images/crossover_knot_bangle_1789217703206.jpg',
    count: '26 Styles'
  },
  {
    id: 'bracelets',
    label: 'Bracelets',
    image: '/src/assets/images/twisted_gold_bangle_1789217246681.jpg',
    count: 'Pearls & Bangles'
  },
  {
    id: 'rings',
    label: 'Rings',
    image: '/src/assets/images/twist_silk_ring_1789217753853.jpg',
    count: 'Twists & Vines'
  },
  {
    id: 'earrings',
    label: 'Earrings',
    image: '/src/assets/images/pave_huggie_velvet_1789217215432.jpg',
    count: 'Huggies & Drops'
  },
  {
    id: 'necklaces',
    label: 'Neck Pieces',
    image: '/src/assets/images/swan_crystal_pendant_1789217305759.jpg',
    count: 'Pendants & Collars'
  },
  {
    id: 'under-999',
    label: 'Under ₹999',
    image: '/src/assets/images/heart_drop_earrings_1789217233020.jpg',
    count: 'Best Value'
  }
];

export const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="w-full bg-[#F7F3EC] py-8 sm:py-10 border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#A63A32] font-semibold">
              Curated Capsules
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1F2B] mt-0.5">
              Shop By Category
            </h2>
          </div>
          <span className="text-xs text-[#1A1F2B]/60 font-sans hidden sm:inline">
            Scroll to discover Pinterest-curated silhouettes
          </span>
        </div>

        {/* Pinterest-style circular chips */}
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-chip-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className="group flex flex-col items-center shrink-0 text-center transition-all focus:outline-none snap-start"
              >
                <div
                  className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-[#A63A32] ring-offset-2 ring-offset-[#F7F3EC] scale-105 shadow-md'
                      : 'ring-1 ring-[#C9A461]/40 hover:ring-[#C9A461] hover:scale-102'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                  />
                </div>
                <span
                  className={`mt-2.5 text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isSelected ? 'text-[#A63A32] font-semibold' : 'text-[#1A1F2B] group-hover:text-[#A63A32]'
                  }`}
                >
                  {cat.label}
                </span>
                <span className="text-[10px] text-[#1A1F2B]/50 -mt-0.5">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
