import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Mail } from 'lucide-react';
import { CategoryType, UniverseId, ActivePage } from '../types';

interface FooterProps {
  onNavigatePage: (page: ActivePage) => void;
  onSelectCategory: (cat: CategoryType | 'all' | 'under-999') => void;
  onSelectUniverse: (id: UniverseId | null) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePage,
  onSelectCategory,
  onSelectUniverse
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-[#EDE7DD] text-[#0E1420] border-t border-[#0E1420]/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter & Club Box */}
        <div className="bg-[#F7F3EC] rounded-2xl border border-[#0E1420]/15 p-8 sm:p-12 mb-16 text-center max-w-3xl mx-auto shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE7DD] text-[#0E1420] border border-[#0E1420]/15 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles size={12} className="text-[#A63A32]" />
            <span>The Nacre Club</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#0E1420] mb-2">
            Take 10% off your first treasure.
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#0E1420]/80 max-w-md mx-auto mb-6">
            Join 25,000+ members for private drop previews, aesthetic styling edits, and pop-culture capsule alerts.
          </p>

          {subscribed ? (
            <div className="p-4 bg-[#EDE7DD] rounded-xl border border-emerald-600/30 text-xs text-emerald-800 font-sans inline-block">
              ✦ Welcome to the Club! Use coupon code <strong className="text-[#0E1420] font-mono">MAINCHARACTER</strong> at checkout for 10% off.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-[#FAF7F2] border border-[#0E1420]/20 rounded-full px-4 py-3 text-xs text-[#0E1420] placeholder-[#0E1420]/50 focus:outline-none focus:border-[#0E1420]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#0E1420] hover:bg-[#1A233A] text-[#EDE7DD] text-xs font-semibold uppercase tracking-widest transition-colors shrink-0"
              >
                Join Now
              </button>
            </form>
          )}
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-[#0E1420]/15">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.25em] font-medium text-[#0E1420] block">
                NACRE
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C9A461] block -mt-1 font-sans font-semibold">
                DEMI-FINE JEWELLERY
              </span>
            </div>
            <p className="text-xs text-[#0E1420]/70 font-sans leading-relaxed">
              Affordable, waterproof, anti-tarnish demi-fine jewellery in thick 18k gold plating. Designed in Mumbai for your daily main character era.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#A63A32]">
              <ShieldCheck size={14} />
              <span>Lifetime Anti-Tarnish Commitment</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#A63A32] mb-4">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#0E1420]/75 font-sans">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('bracelets');
                    onNavigatePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  Bracelets & Cuffs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('rings');
                    onNavigatePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  Rings & Eternity Bands
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('earrings');
                    onNavigatePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  Earrings & Huggies
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('necklaces');
                    onNavigatePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  Neck Pieces & Pendants
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('under-999');
                    onNavigatePage('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#A63A32] font-semibold hover:underline"
                >
                  Under ₹999 Edit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Pop-Culture Universes */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#A63A32] mb-4">
              Fictional Era Capsules
            </h4>
            <ul className="space-y-2 text-xs text-[#0E1420]/75 font-sans">
              <li>
                <button
                  onClick={() => {
                    onSelectUniverse('emily-in-paris');
                    onNavigatePage('fictional-era');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  Emily in Paris
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectUniverse('summer-i-turned-pretty');
                    onNavigatePage('fictional-era');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  The Summer I Turned Pretty
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectUniverse('to-all-the-boys');
                    onNavigatePage('fictional-era');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  To All The Boys
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectUniverse('bridgerton');
                    onNavigatePage('fictional-era');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  The Bridgerton Edit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Experience & Care */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#A63A32] mb-4">
              Care & Gifting
            </h4>
            <ul className="space-y-2 text-xs text-[#0E1420]/75 font-sans">
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('reviews');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors font-semibold flex items-center gap-1.5"
                >
                  <span>Customer Reviews</span>
                  <span className="text-[#C9A461] text-[11px]">★ 4.9 (3,400+)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('gifting');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  Gifting Quiz & Build-a-Box
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('journal');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  PVD Metallurgy & Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigatePage('journal');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#A63A32] transition-colors"
                >
                  Ring Stacking Handbook
                </button>
              </li>
              <li>
                <span className="text-[#0E1420]/50 block pt-1">
                  Pan-India Express: Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata + 28,000 PIN codes.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#0E1420]/60 gap-4 font-sans">
          <p>© {new Date().getFullYear()} NACRE Jewellery Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart size={13} className="text-[#A63A32] fill-current" />
            <span>in India · 18k Real Gold PVD Plated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
