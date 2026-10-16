import React from 'react';
import { ArrowRight, Sparkles, Shield, Droplets, Heart } from 'lucide-react';
import { resolveImageUrl, handleImageError } from '../utils/imageResolver';

interface HeroProps {
  onShopClick: () => void;
  onUniverseClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onUniverseClick }) => {
  return (
    <section id="hero-section" className="relative w-full min-h-[85vh] sm:min-h-[90vh] bg-[#F7F3EC] overflow-hidden flex items-center">
      {/* Background with Generated Editorial Image and Mood Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src={resolveImageUrl('/assets/images/nacre_hero_editorial_1789199546846.jpg')}
          alt="Nacre 18k gold demi-fine jewellery campaign"
          referrerPolicy="no-referrer"
          onError={(e) => handleImageError(e, 'necklace')}
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply filter contrast-105"
        />
        {/* Gradients for warm beige atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F3EC] via-[#F7F3EC]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EC] via-transparent to-[#F7F3EC]/70"></div>
        {/* Soft pearlescent radial glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#C9A461]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-12 right-12 w-80 h-80 bg-[#C98B7A]/15 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl">


          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#0E1420] leading-[1.1] tracking-tight mb-6">
            Jewellery for your <br />
            <span className="italic font-normal text-[#0E1420] relative inline-block">
              main character
              <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A461] to-[#A63A32]"></span>
            </span>{' '}
            era.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-[#0E1420]/80 leading-relaxed max-w-xl mb-9 font-light">
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
              className="group px-7 py-3.5 rounded-full bg-transparent border border-[#0E1420] text-[#0E1420] hover:bg-[#0E1420]/10 text-xs uppercase font-medium tracking-[0.2em] transition-all flex items-center gap-2"
            >
              <span>Shop The Universe</span>
              <ArrowRight size={14} className="text-[#0E1420] transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Micro Trust Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#0E1420]/80 pt-4 border-t border-[#0E1420]/20">
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-[#A63A32]" />
              <span>Anti-Tarnish Plating</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets size={15} className="text-[#A63A32]" />
              <span>100% Shower Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={15} className="text-[#A63A32]" />
              <span>Hypoallergenic Base</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
