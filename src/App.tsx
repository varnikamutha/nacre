import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { FictionalEraPage } from './pages/FictionalEraPage';
import { GiftingCornerPage } from './pages/GiftingCornerPage';
import { JournalCraftPage } from './pages/JournalCraftPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { PRODUCTS } from './data/products';
import { UNIVERSE_EDITIONS } from './data/universes';
import { Product, CartItem, CategoryType, UniverseId, ActivePage } from './types';
import { SlidersHorizontal, Sparkles, X, Gift, ArrowRight } from 'lucide-react';

export default function App() {
  // Active Page State
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'fictional-era' || hash === 'gifting' || hash === 'journal' || hash === 'reviews' || hash === 'shop') {
        return hash as ActivePage;
      }
    }
    return 'shop';
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'fictional-era' || hash === 'gifting' || hash === 'journal' || hash === 'reviews' || hash === 'shop') {
        setActivePage(hash as ActivePage);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigatePage = (page: ActivePage) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category & Filter States
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all' | 'under-999'>('all');
  const [activeUniverse, setActiveUniverse] = useState<UniverseId | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Selected Product for PDP Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPDPModalOpen, setIsPDPModalOpen] = useState(false);

  // Cart & Wishlist States with Local Storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nacre_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nacre_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nacre_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nacre_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Drawer / Modal Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, quantity: number = 1, selectedSize?: string) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedSize }];
    });
    showToast(`Added "${product.name}" to your bag ✨`);
  };

  const handleBuyNow = (product: Product, quantity: number = 1, selectedSize?: string) => {
    handleAddToCart(product, quantity, selectedSize);
    setIsPDPModalOpen(false);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from bag');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist 🤍`);
        return [...prev, product];
      }
    });
  };

  const handleMoveWishlistToBag = (product: Product) => {
    handleAddToCart(product, 1);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleMoveAllWishlistToBag = () => {
    wishlist.forEach((p) => handleAddToCart(p, 1));
    setWishlist([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Smooth Navigation Helper
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort Logic for Products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Universe filter
    if (activeUniverse) {
      list = list.filter((p) => p.universe === activeUniverse);
    }

    // Category filter
    if (activeCategory === 'under-999') {
      list = list.filter((p) => p.price <= 999);
    } else if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, activeUniverse, sortBy]);

  const activeUniverseData = useMemo(() => {
    return UNIVERSE_EDITIONS.find((u) => u.id === activeUniverse) || null;
  }, [activeUniverse]);

  const cartTotalCount = cart.reduce((c, i) => c + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#0E1420] font-sans antialiased selection:bg-[#0E1420] selection:text-[#F7F3EC]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#EDE7DD] text-[#0E1420] border border-[#0E1420]/25 px-5 py-2.5 rounded-full shadow-2xl text-xs font-sans font-medium flex items-center gap-2 animate-fade-in pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#0E1420]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleNavigatePage('shop');
        }}
        onSelectUniverse={(univ) => {
          setActiveUniverse(univ);
          handleNavigatePage('fictional-era');
        }}
        activeUniverse={activeUniverse}
      />

      {/* Page Routing */}
      {activePage === 'fictional-era' && (
        <FictionalEraPage
          initialUniverse={activeUniverse}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setIsPDPModalOpen(true);
          }}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          onNavigatePage={handleNavigatePage}
        />
      )}

      {activePage === 'gifting' && (
        <GiftingCornerPage
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setIsPDPModalOpen(true);
          }}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          onNavigatePage={handleNavigatePage}
        />
      )}

      {activePage === 'journal' && (
        <JournalCraftPage
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setIsPDPModalOpen(true);
          }}
          onNavigatePage={handleNavigatePage}
        />
      )}

      {activePage === 'reviews' && (
        <ReviewsPage
          onSelectProduct={(p) => {
            setSelectedProduct(p);
            setIsPDPModalOpen(true);
          }}
          onAddToCart={handleAddToCart}
          onNavigatePage={handleNavigatePage}
        />
      )}

      {activePage === 'shop' && (
        <>
          {/* Hero Campaign Section */}
          <Hero
            onShopClick={() => {
              const el = document.getElementById('shop-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onUniverseClick={() => handleNavigatePage('fictional-era')}
          />

          {/* Trust Strip */}
          <TrustStrip />

          {/* Category Navigation Bar (Circular Pinterest chips) */}
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              const el = document.getElementById('shop-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Main Product Catalog Section */}
          <main id="shop-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Filter Controls & Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DDD2] mb-8">
              <div>
                <span className="text-xs text-[#0E1420]/70 font-sans">
                  Showing <strong className="text-[#0E1420]">{filteredProducts.length}</strong> handcrafted pieces in 18K gold
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-[#0E1420]/80">
                  <SlidersHorizontal size={14} className="text-[#A63A32]" />
                  <span className="font-medium">Sort By:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF7F2] border border-[#E2DDD2] rounded-lg px-3 py-1.5 text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                >
                  <option value="featured">Featured Curation</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rated</option>
                </select>
              </div>
            </div>

            {/* Product Grid (All Reference Products) */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="font-serif text-xl text-[#0E1420]/70 italic">
                  No pieces match the selected combination.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveUniverse(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#A63A32] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickAdd={(p) => handleAddToCart(p, 1)}
                    onViewDetails={(p) => {
                      setSelectedProduct(p);
                      setIsPDPModalOpen(true);
                    }}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlist.some((w) => w.id === product.id)}
                  />
                ))}
              </div>
            )}
          </main>

          {/* Feature Hub Showcase Banners */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Banner 1: Fictional Era */}
              <div
                onClick={() => handleNavigatePage('fictional-era')}
                className="group relative bg-[#EDE7DD] p-8 sm:p-10 rounded-3xl border border-[#0E1420]/15 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] text-xs font-semibold uppercase tracking-wider text-[#0E1420] mb-3">
                    <Sparkles size={12} className="text-[#A63A32]" />
                    <span>Dedicated Experience</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1420] font-light">
                    Enter the <span className="italic text-[#A63A32] font-normal">Fictional Era</span>.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0E1420]/75 font-sans mt-2 max-w-sm">
                    Step into Emily in Paris, The Summer I Turned Pretty, Bridgerton & To All The Boys aesthetic capsules with our interactive era matcher.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E1420] group-hover:text-[#A63A32] transition-colors">
                  <span>Explore All Fictional Eras</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Banner 2: The Gifting Corner */}
              <div
                onClick={() => handleNavigatePage('gifting')}
                className="group relative bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#E2DDD2] overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE7DD] text-xs font-semibold uppercase tracking-wider text-[#0E1420] mb-3">
                    <Gift size={12} className="text-[#A63A32]" />
                    <span>The Gifting Atelier</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1420] font-light">
                    The <span className="italic text-[#A63A32] font-normal">Gifting Corner</span>.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0E1420]/75 font-sans mt-2 max-w-sm">
                    Take our 30-Second Gift Quiz or build a custom 3-piece gift box with plush velvet packaging, wax-sealed handwritten notes, and a 15% discount.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#0E1420] group-hover:text-[#A63A32] transition-colors">
                  <span>Open The Gifting Corner</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </section>

          {/* Verified Customer Reviews */}
          <CustomerReviews onViewAllReviews={() => handleNavigatePage('reviews')} />
        </>
      )}

      {/* Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleNavigatePage('shop');
        }}
        onSelectUniverse={(univ) => {
          setActiveUniverse(univ);
          handleNavigatePage('fictional-era');
        }}
      />

      {/* PDP Modal */}
      {isPDPModalOpen && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isPDPModalOpen}
          onClose={() => setIsPDPModalOpen(false)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlist.some((w) => w.id === selectedProduct.id)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onSelectUniverse={(univ) => {
            setActiveUniverse(univ);
            handleNavigateSection('shop-section');
          }}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(p) => handleToggleWishlist(p)}
        onMoveToBag={handleMoveWishlistToBag}
        onMoveAllToBag={handleMoveAllWishlistToBag}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsPDPModalOpen(true);
        }}
      />
    </div>
  );
}
