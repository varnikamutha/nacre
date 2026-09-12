import React, { useState } from 'react';
import { ShieldCheck, Droplets, Sparkles, Check, X as XIcon, HelpCircle } from 'lucide-react';

const CRAFT_LAYERS = [
  {
    id: 1,
    name: 'Layer 1: Structural Core Base',
    metal: '316L Surgical Stainless Steel or 925 Sterling Silver',
    description: 'Medical-grade steel and precious silver provide rigid structural integrity, zero bending under pressure, and are 100% hypoallergenic with zero lead or nickel.',
    thickness: 'Base Core'
  },
  {
    id: 2,
    name: 'Layer 2: Titanium Adhesion Barrier',
    metal: 'Ultra-Pure Molecular Barrier',
    description: 'A vacuum-sealed microscopic transition layer that eliminates corrosion and guarantees the gold layer never flakes, peels, or oxidizes against moisture.',
    thickness: '0.5 Microns'
  },
  {
    id: 3,
    name: 'Layer 3: 18K Real Gold PVD Plating',
    metal: 'Physical Vapor Deposition 18K Real Gold',
    description: 'Applied inside a high-vacuum chamber where gold vaporizes and condenses at atomic level. 10x thicker and 50x more durable than traditional fast-fashion chemical flash plating.',
    thickness: '2.5 Microns'
  },
  {
    id: 4,
    name: 'Layer 4: Invisible Nano-Ceramic Seal',
    metal: 'Hydrophobic & Oleophobic Shield',
    description: 'Our proprietary invisible glass-ceramic glaze that repels tap water, ocean saltwater, pool chlorine, body lotions, and alcohol perfume mists.',
    thickness: 'Atomic Shield'
  }
];

export const OurCraft: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(3);

  return (
    <section id="craft-section" className="w-full bg-[#0E1420] text-[#EDE7DD] py-16 sm:py-24 border-t border-[#C9A461]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A233A] border border-[#C9A461]/40 text-xs font-semibold text-[#C9A461] uppercase tracking-[0.2em] mb-3">
            <ShieldCheck size={13} />
            <span>Anti-Tarnish Engineering</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light">
            Why our gold <span className="italic text-[#C9A461] font-normal">never turns green</span>.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#EDE7DD]/70 mt-3 font-light leading-relaxed">
            Most fast-fashion jewellery is brass dipped in a hairline coat of gold that degrades in 3 weeks. Nacre uses vacuum PVD (Physical Vapor Deposition) technology — the exact process used in luxury Swiss timepieces.
          </p>
        </div>

        {/* 2-Column: Left Interactive 4-Layer Diagram, Right Craft Image & Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive 4-Layer Stack (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-[#C9A461] font-semibold">
                Interactive Cross-Section
              </span>
              <span className="text-[11px] text-[#EDE7DD]/50">
                Click any layer to inspect metallurgy
              </span>
            </div>

            <div className="space-y-3">
              {CRAFT_LAYERS.map((layer) => {
                const isActive = activeLayer === layer.id;
                return (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'border-[#C9A461] bg-[#1A233A] shadow-xl ring-1 ring-[#C9A461]'
                        : 'border-[#2A344A] bg-[#141C2B] hover:border-[#C9A461]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive
                              ? 'bg-[#C9A461] text-[#0E1420]'
                              : 'bg-[#2A344A] text-[#EDE7DD]'
                          }`}
                        >
                          {layer.id}
                        </span>
                        <div>
                          <h4 className="font-serif text-base sm:text-lg font-medium text-white">
                            {layer.name}
                          </h4>
                          <span className="text-xs text-[#C9A461] font-sans">
                            {layer.metal}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#0E1420] text-[#EDE7DD]/80 border border-[#2A344A]">
                        {layer.thickness}
                      </span>
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-[#2A344A] text-xs sm:text-sm text-[#EDE7DD]/80 font-sans leading-relaxed animate-fade-in">
                        {layer.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Waterproof Test Showcase (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#C9A461]/30 shadow-2xl aspect-[4/3] bg-[#1A233A]">
              <img
                src="/src/assets/images/craft_waterproof_1789199587425.jpg"
                alt="Nacre waterproof anti tarnish jewellery tested under water"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1420] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#0E1420]/80 backdrop-blur-md border border-[#C9A461]/30 text-xs">
                <span className="text-[#C9A461] font-semibold block mb-0.5">
                  ✦ Rigorous Lab & Daily Life Testing
                </span>
                <span className="text-[#EDE7DD]/80">
                  Submerged in chlorinated pool & salt water for 72+ consecutive hours with 0.0% surface tarnishing.
                </span>
              </div>
            </div>

            {/* Dos and Don'ts Matrix */}
            <div className="bg-[#141C2B] p-5 rounded-xl border border-[#2A344A] text-xs">
              <h5 className="font-serif text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-[#C9A461]" />
                The Nacre Care Freedom Matrix
              </h5>
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="space-y-1.5 text-emerald-400">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Check size={13} className="text-emerald-400" />
                    <span>Always Safe:</span>
                  </div>
                  <p className="text-[#EDE7DD]/70 pl-5">• Hot showers & shampoo</p>
                  <p className="text-[#EDE7DD]/70 pl-5">• Sweaty gym workouts</p>
                  <p className="text-[#EDE7DD]/70 pl-5">• Swimming pools & beaches</p>
                </div>
                <div className="space-y-1.5 text-[#C98B7A]">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <XIcon size={13} className="text-[#C98B7A]" />
                    <span>Best Avoided:</span>
                  </div>
                  <p className="text-[#EDE7DD]/70 pl-5">• Direct industrial chemicals</p>
                  <p className="text-[#EDE7DD]/70 pl-5">• Bleach / acetone spills</p>
                  <p className="text-[#EDE7DD]/70 pl-5">• Abrasive wire scourers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
