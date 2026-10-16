import React from 'react';
import { UNIVERSE_EDITIONS } from '../data/universes';
import { UniverseId } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';
import { handleImageError } from '../utils/imageResolver';

interface ShopTheUniverseProps {
  activeUniverse: UniverseId | null;
  onSelectUniverse: (id: UniverseId | null) => void;
  onViewAllProducts: () => void;
}

export const ShopTheUniverse: React.FC<ShopTheUniverseProps> = ({
  activeUniverse,
  onSelectUniverse,
  onViewAllProducts
}) => {
  return (
    <section id="universe-section" className="w-full bg-[#FAF7F2] py-16 sm:py-24 border-t border-[#0E1420]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE7DD] border border-[#0E1420]/20 text-xs font-semibold text-[#0E1420] uppercase tracking-[0.2em] mb-3">
              <Sparkles size={12} className="text-[#A63A32]" />
              <span>Signature Differentiator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0E1420] font-light">
              Find your <span className="italic text-[#A63A32] font-normal">fictional era</span>.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#0E1420]/80 mt-3 font-light leading-relaxed">
              Don’t just shop occasion jewellery — shop the aesthetic universe you want to inhabit. Curated drops inspired by our favorite pop-culture heroines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeUniverse && (
              <button
                onClick={() => onSelectUniverse(null)}
                className="px-4 py-2 rounded-full text-xs font-sans uppercase tracking-widest bg-[#EDE7DD] text-[#0E1420] hover:bg-[#E2DDD2] border border-[#0E1420]/20 transition-colors"
              >
                Clear Universe Filter
              </button>
            )}
            <button
              onClick={onViewAllProducts}
              className="text-xs uppercase font-medium tracking-[0.2em] text-[#A63A32] hover:text-[#0E1420] transition-colors flex items-center gap-1.5"
            >
              <span>View All Pieces</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Universe Poster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNIVERSE_EDITIONS.map((edition) => {
            const isSelected = activeUniverse === edition.id;

            return (
              <div
                key={edition.id}
                id={`universe-card-${edition.id}`}
                onClick={() => {
                  onSelectUniverse(edition.id);
                  // Scroll gently to shop section
                  const el = document.getElementById('shop-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 shadow-md ${
                  isSelected
                    ? 'border-[#0E1420] ring-2 ring-[#0E1420] scale-[1.02]'
                    : 'border-[#E2DDD2] hover:border-[#0E1420]/60 hover:-translate-y-1'
                }`}
              >
                {/* Background Image */}
                <img
                  src={edition.heroImage}
                  alt={edition.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, 'default')}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Warm Beige Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#EDE7DD] via-[#EDE7DD]/80 to-transparent"></div>

                {/* Subtle Accent Glow */}
                <div
                  className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none transition-opacity duration-300 group-hover:opacity-30"
                  style={{ backgroundColor: edition.accentColor }}
                ></div>

                {/* Selected Pill Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#0E1420] text-[#EDE7DD] text-[10px] font-bold tracking-widest uppercase shadow">
                    Active Edit
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                  <span
                    className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-1"
                    style={{ color: edition.accentColor }}
                  >
                    {edition.aesthetic}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1420] font-medium leading-tight">
                    {edition.title}
                  </h3>

                  <p className="font-sans text-xs text-[#0E1420]/80 mt-2 line-clamp-2 italic font-light">
                    {edition.quote}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#0E1420]/15 flex items-center justify-between">
                    <span className="text-[11px] text-[#0E1420]/70 font-sans">
                      {edition.signaturePieces[0]} + more
                    </span>
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#A63A32] group-hover:text-[#0E1420] flex items-center gap-1 transition-colors">
                      <span>Explore</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
