import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ShopTheUniverse } from './components/ShopTheUniverse';
import { GiftingHub } from './components/GiftingHub';
import { OurCraft } from './components/OurCraft';
import { JournalSection } from './components/JournalSection';
import { CustomerReviews } from './components/CustomerReviews';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { PRODUCTS } from './data/products';
import { UNIVERSE_EDITIONS } from './data/universes';
import { Product, CartItem, CategoryType, UniverseId } from './types';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';

export default function App() {
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
    <div className="min-h-screen bg-[#F7F3EC] text-[#1A1F2B] font-sans antialiased selection:bg-[#C9A461] selection:text-[#0E1420]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0E1420] text-[#EDE7DD] border border-[#C9A461]/40 px-5 py-2.5 rounded-full shadow-2xl text-xs font-sans font-medium flex items-center gap-2 animate-fade-in pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#C9A461]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleNavigateSection('shop-section');
        }}
        onSelectUniverse={(univ) => {
          setActiveUniverse(univ);
          handleNavigateSection('shop-section');
        }}
        activeUniverse={activeUniverse}
        onNavigateSection={handleNavigateSection}
      />

      {/* Hero Campaign Section */}
      <Hero
        onShopClick={() => handleNavigateSection('shop-section')}
        onUniverseClick={() => handleNavigateSection('universe-section')}
      />

      {/* Trust Strip */}
      <TrustStrip />

      {/* Category Navigation Bar (Circular Pinterest chips) */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleNavigateSection('shop-section');
        }}
      />

      {/* Main Product Catalog Section */}
      <main id="shop-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Active Universe Banner if active */}
        {activeUniverseData && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#0E1420] text-[#EDE7DD] border border-[#C9A461]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C9A461]">
                Active Pop-Culture Universe
              </span>
              <h2 className="font-serif text-2xl text-white mt-0.5">
                {activeUniverseData.title}
              </h2>
              <p className="text-xs text-[#EDE7DD]/70 font-sans italic mt-1 max-w-xl">
                "{activeUniverseData.quote}"
              </p>
            </div>
            <button
              onClick={() => setActiveUniverse(null)}
              className="px-4 py-2 rounded-full bg-[#1A233A] hover:bg-[#2A344A] text-xs text-[#EDE7DD] font-medium transition-colors border border-[#2A344A] flex items-center gap-1.5 self-start sm:self-auto"
            >
              <X size={14} />
              <span>Show All Universes</span>
            </button>
          </div>
        )}

        {/* Filter Controls & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E2D5] mb-8">
          <div>
            <span className="text-xs text-[#1A1F2B]/60 font-sans">
              Showing <strong className="text-[#1A1F2B]">{filteredProducts.length}</strong> handcrafted pieces in 18K gold
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#1A1F2B]/80">
              <SlidersHorizontal size={14} className="text-[#A63A32]" />
              <span className="font-medium">Sort By:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E8E2D5] rounded-lg px-3 py-1.5 text-xs text-[#1A1F2B] focus:outline-none focus:border-[#C9A461]"
            >
              <option value="featured">Featured Curation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid (All 16 Reference Products) */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-serif text-xl text-[#1A1F2B]/70 italic">
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

      {/* Signature "Shop the Universe" Hub */}
      <ShopTheUniverse
        activeUniverse={activeUniverse}
        onSelectUniverse={(univId) => setActiveUniverse(univId)}
        onViewAllProducts={() => {
          setActiveUniverse(null);
          setActiveCategory('all');
          handleNavigateSection('shop-section');
        }}
      />

      {/* Gifting Hub & Quiz & Build-a-Box */}
      <GiftingHub
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsPDPModalOpen(true);
        }}
        onAddToCart={handleAddToCart}
      />

      {/* Our Craft & Anti-Tarnish Metallurgy Section */}
      <OurCraft />

      {/* Editorial Journal Section */}
      <JournalSection
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsPDPModalOpen(true);
        }}
      />

      {/* Verified Customer Reviews */}
      <CustomerReviews />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          handleNavigateSection('shop-section');
        }}
        onSelectUniverse={(univ) => {
          setActiveUniverse(univ);
          handleNavigateSection('shop-section');
        }}
        onNavigateSection={handleNavigateSection}
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
