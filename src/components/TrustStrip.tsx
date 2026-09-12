import React from 'react';
import { ShieldCheck, Droplets, Sparkles, Truck } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="bg-[#F7F3EC] text-[#1A1F2B] border-y border-[#E2DDD2] py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E2DDD2]">
          {/* Pillar 1 */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EDE7DD] border border-[#C9A461]/40 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="text-[#C9A461]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wide uppercase text-[#1A1F2B]">
                Anti-Tarnish Tech
              </h2>
              <p className="text-[11px] text-[#1A1F2B]/70">
                PVD 18k gold that lasts 2+ years
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EDE7DD] border border-[#C9A461]/40 flex items-center justify-center shrink-0">
              <Droplets size={18} className="text-[#C9A461]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wide uppercase text-[#1A1F2B]">
                100% Waterproof
              </h2>
              <p className="text-[11px] text-[#1A1F2B]/70">
                Sweat, ocean, gym & shower proof
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EDE7DD] border border-[#C9A461]/40 flex items-center justify-center shrink-0">
              <Sparkles size={18} className="text-[#C9A461]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wide uppercase text-[#1A1F2B]">
                Zero Green Skin
              </h2>
              <p className="text-[11px] text-[#1A1F2B]/70">
                Surgical steel & 925 silver base
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-center gap-3 pt-2 md:pt-0 md:px-4">
            <div className="w-9 h-9 rounded-full bg-[#EDE7DD] border border-[#C9A461]/40 flex items-center justify-center shrink-0">
              <Truck size={18} className="text-[#C9A461]" />
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wide uppercase text-[#1A1F2B]">
                COD & Free Pan-India
              </h2>
              <p className="text-[11px] text-[#1A1F2B]/70">
                Free shipping on orders above ₹999
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
