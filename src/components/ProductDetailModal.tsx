import React, { useState, useEffect } from 'react';
import { X, Heart, Star, ShieldCheck, Droplets, Sparkles, ChevronDown, ChevronUp, ShoppingBag, Ruler, Check, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Product, UniverseId } from '../types';
import { SizeGuideModal } from './SizeGuideModal';
import { PRODUCTS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedSize?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
  onSelectUniverse: (id: UniverseId | null) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
  onSelectUniverse
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('Standard');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<'desc' | 'materials' | 'shipping' | null>('desc');

  // Reset to first image and size whenever product changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setQuantity(1);
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[1] || product.sizes[0]);
    } else {
      setSelectedSize('Standard');
    }
  }, [product?.id]);

  if (!isOpen || !product) return null;

  const handleNextImage = () => {
    if (!product.images || product.images.length <= 1) return;
    setSelectedImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    if (!product.images || product.images.length <= 1) return;
    setSelectedImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity, selectedSize);
  };

  // Complete the look products (complementary items)
  const completeTheLook = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.universe === product.universe || p.category !== product.category)
  ).slice(0, 3);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-[#F7F3EC] text-[#1A1F2B] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row border border-[#E2DDD2]">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#1A1F2B] shadow-md transition-colors"
            aria-label="Close details"
          >
            <X size={19} />
          </button>

          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col bg-[#EDE7DD]/40 border-r border-[#E2DDD2]">
            {/* Main Stage Image */}
            <div className="group/stage relative aspect-square w-full rounded-xl overflow-hidden bg-[#ECE7DE] shadow-inner">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300 select-none"
              />

              {/* Prev / Next Arrows for Multi-Image Scrolling */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#1A1F2B] shadow-lg transition-all opacity-80 group-hover/stage:opacity-100 hover:scale-110 active:scale-95"
                    aria-label="Previous product image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#1A1F2B] shadow-lg transition-all opacity-80 group-hover/stage:opacity-100 hover:scale-110 active:scale-95"
                    aria-label="Next product image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* View Indicator Pill */}
              {product.images.length > 1 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0E1420]/80 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-white flex items-center gap-1.5">
                  <Layers size={12} className="text-[#C9A461]" />
                  <span>
                    {selectedImageIdx === 0
                      ? 'Photo 1/2 · Main Piece'
                      : 'Photo 2/2 · On-Screen Reference'}
                  </span>
                </div>
              )}

              {/* Reference Pill */}
              {product.referenceImageName && (
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#0E1420]/80 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-[#C9A461] max-w-[90%] truncate">
                  Ref: {product.referenceImageName}
                </div>
              )}
            </div>

            {/* Thumbnail Strip with Distinct Labels */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border-2 transition-all bg-white/60 ${
                      selectedImageIdx === idx
                        ? 'border-[#A63A32] ring-2 ring-[#A63A32]/30 bg-white shadow-sm'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="w-10 h-10 rounded overflow-hidden shrink-0">
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-semibold text-[#1A1F2B] whitespace-nowrap">
                        {idx === 0 ? '1. Main View' : '2. On-Screen'}
                      </p>
                      <p className="text-[9px] text-[#1A1F2B]/60 uppercase tracking-wider whitespace-nowrap">
                        {idx === 0 ? 'Studio Shot' : 'Emily in Paris'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Actions */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] flex flex-col justify-between">
            <div>
              {/* Universe Tag Pill */}
              {product.universe && (
                <button
                  onClick={() => {
                    onSelectUniverse(product.universe || null);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A233A] text-[#C9A461] text-[10px] uppercase tracking-widest font-semibold hover:bg-[#2A344A] transition-colors mb-3"
                >
                  <span>★ {product.universe.replace(/-/g, ' ')} edit</span>
                </button>
              )}

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1F2B] font-medium leading-snug">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-serif text-2xl font-bold text-[#1A1F2B]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-[#1A1F2B]/40 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#A63A32]/15 text-[#A63A32]">
                      SAVE ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              {/* Star Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2 text-xs text-[#1A1F2B]/70">
                <div className="flex text-[#C9A461]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#1A1F2B]">{product.rating}</span>
                <span>·</span>
                <span className="underline cursor-pointer">{product.reviewCount} customer reviews</span>
              </div>

              {/* Evocative Editorial Quote */}
              <p className="text-xs sm:text-sm text-[#1A1F2B]/80 font-sans italic mt-4 p-3 bg-[#EDE7DD]/60 rounded-xl border-l-2 border-[#C9A461]">
                "{product.description}"
              </p>

              {/* Trust Badges Row */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] text-[#1A1F2B]/75 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#C9A461]" />
                  <span>Lifetime Anti-Tarnish</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Droplets size={14} className="text-[#C9A461]" />
                  <span>100% Shower Safe</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#C9A461]" />
                  <span>18K Vacuum PVD Gold</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#C9A461] font-bold">✓</span>
                  <span>Hypoallergenic Base</span>
                </div>
              </div>

              {/* Size Selector if available */}
              {product.sizes && (
                <div className="mt-5 pt-4 border-t border-[#E2DDD2]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1F2B]">
                      Select Ring Size
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#A63A32] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Ruler size={13} />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                          selectedSize === sz
                            ? 'border-[#A63A32] bg-[#A63A32] text-white shadow-sm'
                            : 'border-[#E2DDD2] bg-white text-[#1A1F2B] hover:border-[#C9A461]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 mt-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1F2B]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#E2DDD2] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-[#1A1F2B] hover:bg-[#EDE7DD] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-[#1A1F2B]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-[#1A1F2B] hover:bg-[#EDE7DD] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="mt-6 flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAdd}
                    className={`flex-1 py-3.5 px-6 rounded-full text-xs font-medium uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 ${
                      addedAnimation
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#A63A32] hover:bg-[#8e2e27] text-white shadow-[#A63A32]/20'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={16} />
                        <span>Added To Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={15} />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 rounded-full border transition-all ${
                      isWishlisted
                        ? 'border-[#A63A32] bg-[#A63A32] text-white'
                        : 'border-[#E2DDD2] bg-white text-[#1A1F2B] hover:text-[#A63A32]'
                    }`}
                    title="Wishlist"
                  >
                    <Heart size={18} className={isWishlisted ? 'fill-current' : ''} />
                  </button>
                </div>

                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuy}
                  className="w-full py-3 px-6 rounded-full border border-[#0E1420] text-[#0E1420] hover:bg-[#0E1420] hover:text-white text-xs font-medium uppercase tracking-[0.2em] transition-all"
                >
                  Buy Now With Instant Checkout →
                </button>
              </div>

              {/* Micro-copy trust */}
              <p className="text-[11px] text-center text-[#1A1F2B]/60 font-sans mt-3">
                Free shipping Pan-India over ₹999 · Easy 7-day returns · Cash on Delivery available
              </p>

              {/* Expandable Accordions */}
              <div className="mt-6 border-t border-[#E2DDD2] divide-y divide-[#E2DDD2] text-xs">
                {/* Description */}
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'desc' ? null : 'desc')}
                    className="w-full py-3 flex items-center justify-between font-semibold text-[#1A1F2B] hover:text-[#A63A32]"
                  >
                    <span>Styling & Aesthetic Note</span>
                    {openAccordion === 'desc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="pb-3 text-[#1A1F2B]/80 font-sans leading-relaxed">
                      {product.stylingNote}
                    </div>
                  )}
                </div>

                {/* Materials & Anti-Tarnish Tech */}
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'materials' ? null : 'materials')}
                    className="w-full py-3 flex items-center justify-between font-semibold text-[#1A1F2B] hover:text-[#A63A32]"
                  >
                    <span>Materials & Anti-Tarnish Tech</span>
                    {openAccordion === 'materials' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'materials' && (
                    <div className="pb-3 text-[#1A1F2B]/80 font-sans space-y-1">
                      <p><strong>Metal Finish:</strong> {product.materials}</p>
                      {product.dimensions && <p><strong>Dimensions:</strong> {product.dimensions}</p>}
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                    className="w-full py-3 flex items-center justify-between font-semibold text-[#1A1F2B] hover:text-[#A63A32]"
                  >
                    <span>Shipping, COD & Returns</span>
                    {openAccordion === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="pb-3 text-[#1A1F2B]/80 font-sans space-y-1">
                      <p>• Dispatched within 24-48 hours from Mumbai.</p>
                      <p>• Metro delivery in 2-4 business days; Rest of India in 4-6 days.</p>
                      <p>• Hassle-free 7-day doorstep exchange or return guarantee.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Complete the Look Cross-Sell */}
              {completeTheLook.length > 0 && (
                <div className="mt-8 pt-5 border-t border-[#E2DDD2]">
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1A1F2B] mb-3">
                    Complete The Look
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {completeTheLook.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onSelectProduct(item)}
                        className="group cursor-pointer bg-white p-2 rounded-lg border border-[#E2DDD2] hover:border-[#C9A461] transition-all"
                      >
                        <div className="aspect-square rounded overflow-hidden mb-1.5 bg-[#EDE7DD]">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="font-serif text-[11px] font-medium text-[#1A1F2B] line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-[11px] font-semibold text-[#A63A32]">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </>
  );
};
