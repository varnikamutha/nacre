import React from 'react';
import { ArrowRight, Sparkles, Shield, Droplets, Heart } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onUniverseClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onUniverseClick }) => {
  return (
    <section id="hero-section" className="relative w-full min-h-[85vh] sm:min-h-[90vh] bg-[#0E1420] overflow-hidden flex items-center">
      {/* Background with Generated Editorial Image and Mood Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/nacre_hero_editorial_1789199546846.jpg"
          alt="Nacre 18k gold demi-fine jewellery campaign"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity filter brightness-110"
        />
        {/* Gradients to keep dark navy atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1420] via-[#0E1420]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1420] via-transparent to-[#0E1420]/60"></div>
        {/* Soft pearlescent radial glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C9A461]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-12 right-12 w-80 h-80 bg-[#C98B7A]/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A233A]/80 border border-[#C9A461]/30 backdrop-blur-sm text-xs font-sans font-medium text-[#C9A461] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A461] animate-ping"></span>
            <span>The layer that catches the light</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#EDE7DD] leading-[1.1] tracking-tight mb-6">
            Jewellery for your <br />
            <span className="italic font-normal text-[#EDE7DD] relative inline-block">
              main character
              <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A461] to-[#A63A32]"></span>
            </span>{' '}
            era.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-[#EDE7DD]/80 leading-relaxed max-w-xl mb-9 font-light">
            Everyday demi-fine luxe in thick 18k gold plating. Zero green skin, zero drama, and built to survive hot showers, oceans, and perfume.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-12">
            <button
              id="hero-shop-arrivals-btn"
              onClick={onShopClick}
              className="px-8 py-3.5 rounded-full bg-[#A63A32] hover:bg-[#8e2e27] text-white text-xs uppercase font-medium tracking-[0.2em] shadow-lg shadow-[#A63A32]/25 transition-all transform hover:-translate-y-0.5"
            >
              Shop New Arrivals
            </button>

            <button
              id="hero-shop-universe-btn"
              onClick={onUniverseClick}
              className="group px-7 py-3.5 rounded-full bg-transparent border border-[#C9A461] text-[#EDE7DD] hover:bg-[#C9A461]/10 text-xs uppercase font-medium tracking-[0.2em] transition-all flex items-center gap-2"
            >
              <span>Shop The Universe</span>
              <ArrowRight size={14} className="text-[#C9A461] transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Micro Trust Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#EDE7DD]/70 pt-4 border-t border-[#2A344A]/60">
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-[#C9A461]" />
              <span>Anti-Tarnish Plating</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets size={15} className="text-[#C9A461]" />
              <span>100% Shower Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={15} className="text-[#C98B7A]" />
              <span>Hypoallergenic Base</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
