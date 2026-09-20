import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { CategoryType, UniverseId } from '../types';
import { UNIVERSE_EDITIONS } from '../data/universes';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  activeCategory: string;
  onSelectCategory: (cat: CategoryType | 'all' | 'under-999') => void;
  onSelectUniverse: (id: UniverseId | null) => void;
  activeUniverse: UniverseId | null;
  onNavigateSection: (sectionId: string) => void;
}

const ANNOUNCEMENTS = [
  '✨ Free Shipping Pan-India on orders above ₹999',
  '🌊 Anti-Tarnish & 100% Waterproof: Pool, gym & shower safe',
  '🎬 New Drop: The Summer I Turned Pretty Edit is here',
  '🤍 Use code MAINCHARACTER for 10% off your first order'
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  activeCategory,
  onSelectCategory,
  onSelectUniverse,
  activeUniverse,
  onNavigateSection
}) => {
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [universeDropdownOpen, setUniverseDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setUniverseDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Announcement Bar */}
      <div className="bg-[#0A0E17] border-b border-[#C9A461]/20 py-2 px-4 text-xs font-sans tracking-wider text-center text-[#EDE7DD] flex items-center justify-center gap-3">
        <span className="hidden sm:inline text-[#C9A461] text-xs">✦</span>
        <span className="animate-fade-in transition-all duration-500 font-medium">
          {ANNOUNCEMENTS[announcementIdx]}
        </span>
        <span className="hidden sm:inline text-[#C9A461] text-xs">✦</span>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0E1420]/95 backdrop-blur-md shadow-xl border-b border-[#C9A461]/20 py-3'
            : 'bg-[#0E1420] border-b border-[#2A344A]/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#EDE7DD] hover:text-[#C9A461] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Left Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-7 text-xs font-medium uppercase tracking-[0.18em]">
            {/* Shop with dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button
                id="nav-shop-btn"
                onClick={() => handleNavClick('shop-section')}
                className={`flex items-center gap-1 transition-colors hover:text-[#C9A461] ${
                  activeCategory !== 'all' ? 'text-[#C9A461]' : 'text-[#EDE7DD]'
                }`}
              >
                Shop
                <span className="text-[10px] text-[#C9A461] opacity-70">▾</span>
              </button>

              {/* Shop Mega-flyout */}
              {shopDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-[#0E1420] border border-[#C9A461]/30 shadow-2xl p-4 rounded-b-md z-50 text-left normal-case">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#C9A461] mb-2">
                    Browse Categories
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onSelectCategory('all');
                        handleNavClick('shop-section');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#EDE7DD] hover:bg-[#1A233A] hover:text-[#C9A461] rounded transition-colors"
                    >
                      All Pieces
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('bracelets');
                        handleNavClick('shop-section');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#EDE7DD] hover:bg-[#1A233A] hover:text-[#C9A461] rounded transition-colors"
                    >
                      Bracelets & Cuffs
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('rings');
                        handleNavClick('shop-section');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#EDE7DD] hover:bg-[#1A233A] hover:text-[#C9A461] rounded transition-colors"
                    >
                      Rings & Bands
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('earrings');
                        handleNavClick('shop-section');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#EDE7DD] hover:bg-[#1A233A] hover:text-[#C9A461] rounded transition-colors"
                    >
                      Earrings & Huggies
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('necklaces');
                        handleNavClick('shop-section');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#EDE7DD] hover:bg-[#1A233A] hover:text-[#C9A461] rounded transition-colors"
                    >
                      Necklaces & Pendants
                    </button>
                    <div className="border-t border-[#2A344A] my-2 pt-2">
                      <button
                        onClick={() => {
                          onSelectCategory('under-999');
                          handleNavClick('shop-section');
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs font-semibold text-[#A63A32] hover:bg-[#1A233A] rounded transition-colors flex items-center justify-between"
                      >
                        <span>Under ₹999 Edit</span>
                        <span className="text-[10px] bg-[#A63A32]/20 px-1.5 py-0.5 rounded text-[#EDE7DD]">
                          HOT
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shop the Universe (Signature Pop-Culture feature) */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setUniverseDropdownOpen(true)}
              onMouseLeave={() => setUniverseDropdownOpen(false)}
            >
              <button
                id="nav-universe-btn"
                onClick={() => handleNavClick('universe-section')}
                className={`flex items-center gap-1.5 transition-colors hover:text-[#C9A461] ${
                  activeUniverse ? 'text-[#C9A461]' : 'text-[#EDE7DD]'
                }`}
              >
                <span className="text-[#C9A461]">★</span>
                Shop The Universe
                <span className="text-[10px] text-[#C9A461] opacity-70">▾</span>
              </button>

              {universeDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 bg-[#0E1420] border border-[#C9A461]/30 shadow-2xl p-4 rounded-b-md z-50 text-left normal-case">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#C9A461] mb-2 flex items-center justify-between">
                    <span>Pop-Culture Editions</span>
                    <span className="text-[#EDE7DD]/60 lowercase font-normal">vibe-first</span>
                  </div>
                  <div className="space-y-1">
                    {UNIVERSE_EDITIONS.map((ed) => (
                      <button
                        key={ed.id}
                        onClick={() => {
                          onSelectUniverse(ed.id);
                          handleNavClick('shop-section');
                        }}
                        className="w-full text-left px-2 py-2 text-xs text-[#EDE7DD] hover:bg-[#1A233A] hover:text-[#C9A461] rounded transition-colors flex flex-col"
                      >
                        <span className="font-serif font-medium text-sm text-[#EDE7DD]">
                          {ed.title}
                        </span>
                        <span className="text-[11px] text-[#EDE7DD]/60 truncate font-sans">
                          {ed.tagline}
                        </span>
                      </button>
                    ))}
                    <div className="border-t border-[#2A344A] pt-2 mt-1">
                      <button
                        onClick={() => handleNavClick('universe-section')}
                        className="w-full text-left px-2 py-1 text-xs text-[#C9A461] font-semibold flex items-center justify-between"
                      >
                        <span>Explore All Universes</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-gifting-btn"
              onClick={() => handleNavClick('gifting-section')}
              className="hover:text-[#C9A461] transition-colors text-[#EDE7DD]"
            >
              Gifting
            </button>

            <button
              id="nav-craft-btn"
              onClick={() => handleNavClick('craft-section')}
              className="hover:text-[#C9A461] transition-colors text-[#EDE7DD]"
            >
              Our Craft
            </button>

            <button
              id="nav-journal-btn"
              onClick={() => handleNavClick('journal-section')}
              className="hover:text-[#C9A461] transition-colors text-[#EDE7DD]"
            >
              Journal
            </button>
          </div>

          {/* Center Brand Wordmark */}
          <div className="text-center cursor-pointer" onClick={() => handleNavClick('hero-section')}>
            <span className="block font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-[#EDE7DD] hover:text-[#C9A461] transition-colors uppercase">
              NACRE
            </span>
            <span className="block text-[9px] uppercase tracking-[0.35em] text-[#C9A461] -mt-1 font-sans">
              DEMI-FINE JEWELLERY
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#EDE7DD] hover:text-[#C9A461] transition-colors rounded-full"
              title="Search jewellery"
              aria-label="Search"
            >
              <Search size={19} />
            </button>


            {/* Wishlist Trigger */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#EDE7DD] hover:text-[#C9A461] transition-colors rounded-full"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C98B7A] text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-[#EDE7DD] hover:text-[#C9A461] transition-colors rounded-full group"
              title="Cart"
              aria-label="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#A63A32] text-[11px] font-bold text-white shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0E1420] border-t border-[#2A344A] px-6 py-6 space-y-4 shadow-2xl">
            <div className="text-[11px] uppercase tracking-widest text-[#C9A461] font-bold">
              Shop by Category
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm font-sans">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  handleNavClick('shop-section');
                }}
                className="text-left py-1.5 text-[#EDE7DD] hover:text-[#C9A461]"
              >
                All Pieces
              </button>
              <button
                onClick={() => {
                  onSelectCategory('bracelets');
                  handleNavClick('shop-section');
                }}
                className="text-left py-1.5 text-[#EDE7DD] hover:text-[#C9A461]"
              >
                Bracelets
              </button>
              <button
                onClick={() => {
                  onSelectCategory('rings');
                  handleNavClick('shop-section');
                }}
                className="text-left py-1.5 text-[#EDE7DD] hover:text-[#C9A461]"
              >
                Rings
              </button>
              <button
                onClick={() => {
                  onSelectCategory('earrings');
                  handleNavClick('shop-section');
                }}
                className="text-left py-1.5 text-[#EDE7DD] hover:text-[#C9A461]"
              >
                Earrings
              </button>
              <button
                onClick={() => {
                  onSelectCategory('necklaces');
                  handleNavClick('shop-section');
                }}
                className="text-left py-1.5 text-[#EDE7DD] hover:text-[#C9A461]"
              >
                Neck Pieces
              </button>
              <button
                onClick={() => {
                  onSelectCategory('under-999');
                  handleNavClick('shop-section');
                }}
                className="text-left py-1.5 text-[#A63A32] font-semibold"
              >
                Under ₹999 Edit
              </button>
            </div>

            <div className="border-t border-[#2A344A] pt-4 space-y-3">
              <div className="text-[11px] uppercase tracking-widest text-[#C9A461] font-bold flex items-center gap-1.5">
                <Sparkles size={13} />
                Shop the Universe
              </div>
              <div className="space-y-2">
                {UNIVERSE_EDITIONS.map((ed) => (
                  <button
                    key={ed.id}
                    onClick={() => {
                      onSelectUniverse(ed.id);
                      handleNavClick('shop-section');
                    }}
                    className="w-full text-left py-1 text-sm text-[#EDE7DD] hover:text-[#C9A461] flex items-center justify-between"
                  >
                    <span>{ed.title}</span>
                    <span className="text-xs text-[#EDE7DD]/50">{ed.tagline}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#2A344A] pt-4 flex flex-col space-y-3 text-sm">
              <button
                onClick={() => handleNavClick('gifting-section')}
                className="text-left text-[#EDE7DD] hover:text-[#C9A461]"
              >
                Gifting Quiz & Build-a-Box
              </button>
              <button
                onClick={() => handleNavClick('craft-section')}
                className="text-left text-[#EDE7DD] hover:text-[#C9A461]"
              >
                Our Anti-Tarnish Craft
              </button>
              <button
                onClick={() => handleNavClick('journal-section')}
                className="text-left text-[#EDE7DD] hover:text-[#C9A461]"
              >
                The Nacre Journal
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
