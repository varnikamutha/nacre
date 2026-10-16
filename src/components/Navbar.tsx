import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, ChevronRight, ShieldCheck, Star } from 'lucide-react';
import { CategoryType, UniverseId, ActivePage } from '../types';
import { UNIVERSE_EDITIONS } from '../data/universes';

interface NavbarProps {
  activePage: ActivePage;
  onNavigatePage: (page: ActivePage) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  activeCategory: string;
  onSelectCategory: (cat: CategoryType | 'all' | 'under-999') => void;
  onSelectUniverse: (id: UniverseId | null) => void;
  activeUniverse: UniverseId | null;
}

const ANNOUNCEMENTS = [
  '✨ Free Shipping Pan-India on orders above ₹999',
  '🌊 Anti-Tarnish & 100% Waterproof: Pool, gym & shower safe',
  '🎬 New Drop: The Summer I Turned Pretty Edit is here',
  '🤍 Use code MAINCHARACTER for 10% off your first order'
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigatePage,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  activeCategory,
  onSelectCategory,
  onSelectUniverse,
  activeUniverse
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

  const handlePageSelect = (page: ActivePage) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setUniverseDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Announcement Bar with Top Banner Reviews Link */}
      <div className="bg-[#EDE7DD] border-b border-[#0E1420]/15 py-2 px-3 sm:px-6 text-xs font-sans text-[#0E1420]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          {/* Announcement Ticker */}
          <div className="flex items-center justify-center gap-2 text-center text-xs tracking-wider">
            <span className="text-[#C9A461] text-xs">✦</span>
            <span className="animate-fade-in transition-all duration-500 font-medium">
              {ANNOUNCEMENTS[announcementIdx]}
            </span>
            <span className="hidden md:inline text-[#C9A461] text-xs">✦</span>
          </div>

          {/* Top Banner Reviews Direct Link */}
          <button
            id="top-banner-reviews-btn"
            onClick={() => handlePageSelect('reviews')}
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-2xs active:scale-95 ${
              activePage === 'reviews'
                ? 'bg-[#0E1420] text-[#FAF7F2]'
                : 'bg-[#FAF7F2] hover:bg-white text-[#0E1420] border border-[#0E1420]/20 hover:border-[#0E1420]'
            }`}
            title="Read 3,400+ Verified Customer Reviews"
          >
            <div className="flex text-[#C9A461] text-[10px]">
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
              <Star size={11} className="fill-current" />
            </div>
            <span className="tracking-wide font-medium">4.9/5 Reviews (3,400+)</span>
            <span className="text-[#A63A32] font-bold text-[10px] uppercase">Read →</span>
          </button>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EC]/95 backdrop-blur-md shadow-md border-b border-[#0E1420]/15 py-3'
            : 'bg-[#F7F3EC] border-b border-[#0E1420]/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0E1420] hover:text-[#A63A32] transition-colors"
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
                onClick={() => handlePageSelect('shop')}
                className={`flex items-center gap-1 transition-colors hover:text-[#A63A32] pb-1 border-b-2 ${
                  activePage === 'shop'
                    ? 'border-[#0E1420] text-[#0E1420] font-bold'
                    : 'border-transparent text-[#0E1420]/80'
                }`}
              >
                <span>Shop</span>
                <span className="text-[10px] text-[#0E1420] opacity-70">▾</span>
              </button>

              {/* Shop Mega-flyout */}
              {shopDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-64 bg-[#FAF7F2] border border-[#0E1420]/20 shadow-2xl p-4 rounded-2xl z-50 text-left normal-case">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32] mb-2">
                    Browse Categories
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onSelectCategory('all');
                        handlePageSelect('shop');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#0E1420] hover:bg-[#EDE7DD] hover:text-[#A63A32] rounded-lg transition-colors font-medium"
                    >
                      All Pieces
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('bracelets');
                        handlePageSelect('shop');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#0E1420] hover:bg-[#EDE7DD] hover:text-[#A63A32] rounded-lg transition-colors"
                    >
                      Bracelets & Cuffs
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('rings');
                        handlePageSelect('shop');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#0E1420] hover:bg-[#EDE7DD] hover:text-[#A63A32] rounded-lg transition-colors"
                    >
                      Rings & Bands
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('earrings');
                        handlePageSelect('shop');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#0E1420] hover:bg-[#EDE7DD] hover:text-[#A63A32] rounded-lg transition-colors"
                    >
                      Earrings & Huggies
                    </button>
                    <button
                      onClick={() => {
                        onSelectCategory('necklaces');
                        handlePageSelect('shop');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-[#0E1420] hover:bg-[#EDE7DD] hover:text-[#A63A32] rounded-lg transition-colors"
                    >
                      Necklaces & Pendants
                    </button>
                    <div className="border-t border-[#0E1420]/10 my-2 pt-2">
                      <button
                        onClick={() => {
                          onSelectCategory('under-999');
                          handlePageSelect('shop');
                        }}
                        className="w-full text-left px-2 py-1.5 text-xs font-semibold text-[#A63A32] hover:bg-[#EDE7DD] rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>Under ₹999 Edit</span>
                        <span className="text-[10px] bg-[#A63A32] px-1.5 py-0.5 rounded text-white font-bold">
                          HOT
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fictional Era Page (Dedicated Page!) */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setUniverseDropdownOpen(true)}
              onMouseLeave={() => setUniverseDropdownOpen(false)}
            >
              <button
                id="nav-universe-btn"
                onClick={() => handlePageSelect('fictional-era')}
                className={`flex items-center gap-1.5 transition-colors hover:text-[#A63A32] pb-1 border-b-2 ${
                  activePage === 'fictional-era'
                    ? 'border-[#0E1420] text-[#0E1420] font-bold'
                    : 'border-transparent text-[#0E1420]/80'
                }`}
              >
                <span className="text-[#A63A32]">★</span>
                <span>Fictional Era</span>
                <span className="text-[10px] text-[#0E1420] opacity-70">▾</span>
              </button>

              {universeDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 bg-[#FAF7F2] border border-[#0E1420]/20 shadow-2xl p-4 rounded-2xl z-50 text-left normal-case">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32] mb-2 flex items-center justify-between">
                    <span>Cinematic Universes</span>
                    <span className="text-[#0E1420]/60 lowercase font-normal">vibe-first</span>
                  </div>
                  <div className="space-y-1">
                    {UNIVERSE_EDITIONS.map((ed) => (
                      <button
                        key={ed.id}
                        onClick={() => {
                          onSelectUniverse(ed.id);
                          handlePageSelect('fictional-era');
                        }}
                        className="w-full text-left px-2 py-2 text-xs text-[#0E1420] hover:bg-[#EDE7DD] hover:text-[#A63A32] rounded-lg transition-colors flex flex-col"
                      >
                        <span className="font-serif font-medium text-sm text-[#0E1420]">
                          {ed.title}
                        </span>
                        <span className="text-[11px] text-[#0E1420]/60 truncate font-sans">
                          {ed.tagline}
                        </span>
                      </button>
                    ))}
                    <div className="border-t border-[#0E1420]/10 pt-2 mt-1">
                      <button
                        onClick={() => handlePageSelect('fictional-era')}
                        className="w-full text-left px-2 py-1 text-xs text-[#A63A32] font-semibold flex items-center justify-between"
                      >
                        <span>Explore All Fictional Eras</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gifting Corner Page (Dedicated Page!) */}
            <button
              id="nav-gifting-btn"
              onClick={() => handlePageSelect('gifting')}
              className={`hover:text-[#A63A32] transition-colors pb-1 border-b-2 flex items-center gap-1.5 ${
                activePage === 'gifting'
                  ? 'border-[#0E1420] text-[#0E1420] font-bold'
                  : 'border-transparent text-[#0E1420]/80'
              }`}
            >
              <span>Gifting Corner</span>
              <span className="text-[10px] bg-[#A63A32]/10 text-[#A63A32] px-1.5 py-0.2 rounded font-bold">
                QUIZ
              </span>
            </button>

            {/* Journal & Craft Page (Dedicated Page!) */}
            <button
              id="nav-journal-btn"
              onClick={() => handlePageSelect('journal')}
              className={`hover:text-[#A63A32] transition-colors pb-1 border-b-2 ${
                activePage === 'journal'
                  ? 'border-[#0E1420] text-[#0E1420] font-bold'
                  : 'border-transparent text-[#0E1420]/80'
              }`}
            >
              Journal & Craft
            </button>

            {/* Reviews Page (Dedicated Page!) */}
            <button
              id="nav-reviews-btn"
              onClick={() => handlePageSelect('reviews')}
              className={`hover:text-[#A63A32] transition-colors pb-1 border-b-2 flex items-center gap-1 ${
                activePage === 'reviews'
                  ? 'border-[#0E1420] text-[#0E1420] font-bold'
                  : 'border-transparent text-[#0E1420]/80'
              }`}
            >
              <span>Reviews</span>
              <span className="text-[10px] text-[#C9A461] font-bold">★ 4.9</span>
            </button>
          </div>

          {/* Center Brand Wordmark */}
          <div className="text-center cursor-pointer" onClick={() => handlePageSelect('shop')}>
            <span className="block font-serif text-2xl sm:text-3xl tracking-[0.25em] font-medium text-[#0E1420] hover:text-[#A63A32] transition-colors uppercase">
              NACRE
            </span>
            <span className="block text-[9px] uppercase tracking-[0.35em] text-[#C9A461] -mt-1 font-sans font-semibold">
              DEMI-FINE JEWELLERY
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Trigger */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="p-2 text-[#0E1420] hover:text-[#A63A32] transition-colors rounded-full"
              title="Search jewellery"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Trigger */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#0E1420] hover:text-[#A63A32] transition-colors rounded-full"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A63A32] text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-[#0E1420] hover:text-[#A63A32] transition-colors rounded-full group"
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
          <div className="lg:hidden bg-[#FAF7F2] border-t border-[#0E1420]/15 px-6 py-6 space-y-5 shadow-2xl">
            {/* Primary Page Navigation Links */}
            <div className="space-y-2">
              <button
                onClick={() => handlePageSelect('shop')}
                className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activePage === 'shop'
                    ? 'bg-[#EDE7DD] text-[#0E1420]'
                    : 'text-[#0E1420] hover:bg-[#EDE7DD]'
                }`}
              >
                <span>🛍️ Shop All Pieces</span>
                {activePage === 'shop' && <span className="text-xs text-[#A63A32]">●</span>}
              </button>

              <button
                onClick={() => handlePageSelect('fictional-era')}
                className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activePage === 'fictional-era'
                    ? 'bg-[#EDE7DD] text-[#0E1420]'
                    : 'text-[#0E1420] hover:bg-[#EDE7DD]'
                }`}
              >
                <span>🎬 Fictional Era Page</span>
                <span className="text-[10px] bg-[#A63A32] text-white px-2 py-0.5 rounded-full font-bold">
                  HOT
                </span>
              </button>

              <button
                onClick={() => handlePageSelect('gifting')}
                className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activePage === 'gifting'
                    ? 'bg-[#EDE7DD] text-[#0E1420]'
                    : 'text-[#0E1420] hover:bg-[#EDE7DD]'
                }`}
              >
                <span>🎁 The Gifting Corner</span>
                <span className="text-[10px] text-[#A63A32] font-semibold">Quiz & Box</span>
              </button>

              <button
                onClick={() => handlePageSelect('journal')}
                className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activePage === 'journal'
                    ? 'bg-[#EDE7DD] text-[#0E1420]'
                    : 'text-[#0E1420] hover:bg-[#EDE7DD]'
                }`}
              >
                <span>📖 Journal & Craft Studio</span>
              </button>

              <button
                onClick={() => handlePageSelect('reviews')}
                className={`w-full text-left py-2 px-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                  activePage === 'reviews'
                    ? 'bg-[#EDE7DD] text-[#0E1420]'
                    : 'text-[#0E1420] hover:bg-[#EDE7DD]'
                }`}
              >
                <span>⭐ Customer Reviews</span>
                <span className="text-[10px] bg-[#C9A461]/25 text-[#0E1420] px-2 py-0.5 rounded-full font-bold">
                  4.9 ★ (3,400+)
                </span>
              </button>
            </div>

            <div className="border-t border-[#0E1420]/10 pt-4">
              <div className="text-[11px] uppercase tracking-widest text-[#A63A32] font-bold mb-2">
                Quick Categories
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    handlePageSelect('shop');
                  }}
                  className="text-left py-1.5 text-[#0E1420] hover:text-[#A63A32]"
                >
                  All Pieces
                </button>
                <button
                  onClick={() => {
                    onSelectCategory('bracelets');
                    handlePageSelect('shop');
                  }}
                  className="text-left py-1.5 text-[#0E1420] hover:text-[#A63A32]"
                >
                  Bracelets
                </button>
                <button
                  onClick={() => {
                    onSelectCategory('rings');
                    handlePageSelect('shop');
                  }}
                  className="text-left py-1.5 text-[#0E1420] hover:text-[#A63A32]"
                >
                  Rings
                </button>
                <button
                  onClick={() => {
                    onSelectCategory('earrings');
                    handlePageSelect('shop');
                  }}
                  className="text-left py-1.5 text-[#0E1420] hover:text-[#A63A32]"
                >
                  Earrings
                </button>
                <button
                  onClick={() => {
                    onSelectCategory('necklaces');
                    handlePageSelect('shop');
                  }}
                  className="text-left py-1.5 text-[#0E1420] hover:text-[#A63A32]"
                >
                  Necklaces
                </button>
                <button
                  onClick={() => {
                    onSelectCategory('under-999');
                    handlePageSelect('shop');
                  }}
                  className="text-left py-1.5 text-[#A63A32] font-semibold"
                >
                  Under ₹999 Edit
                </button>
              </div>
            </div>

            <div className="border-t border-[#0E1420]/10 pt-4 space-y-2">
              <div className="text-[11px] uppercase tracking-widest text-[#A63A32] font-bold flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>Jump to Era Capsule</span>
              </div>
              <div className="space-y-1.5">
                {UNIVERSE_EDITIONS.map((ed) => (
                  <button
                    key={ed.id}
                    onClick={() => {
                      onSelectUniverse(ed.id);
                      handlePageSelect('fictional-era');
                    }}
                    className="w-full text-left py-1.5 px-2 text-xs text-[#0E1420] hover:bg-[#EDE7DD] rounded-lg flex items-center justify-between"
                  >
                    <span className="font-medium">{ed.title}</span>
                    <span className="text-[10px] text-[#0E1420]/60">{ed.tagline.split(',')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
