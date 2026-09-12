import React from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onViewDetails,
  onToggleWishlist,
  isWishlisted
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-[#FAF7F2] rounded-xl overflow-hidden border border-[#E8E3DA] transition-all duration-300 hover:shadow-lg hover:border-[#C9A461]/60"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/5] bg-[#ECE7DE] overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges Pill Row */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badges.slice(0, 2).map((badge, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full shadow-sm ${
                badge.includes('Under') || badge.includes('HOT')
                  ? 'bg-[#A63A32] text-white'
                  : badge.includes('Bestseller')
                  ? 'bg-[#0E1420] text-[#C9A461] border border-[#C9A461]/40'
                  : 'bg-[#F7F3EC]/90 backdrop-blur-sm text-[#1A1F2B] border border-[#C9A461]/30'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-sm z-10 ${
            isWishlisted
              ? 'bg-[#A63A32] text-white'
              : 'bg-[#FAF7F2]/80 text-[#1A1F2B] hover:text-[#A63A32] hover:bg-white'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
        </button>

        {/* Quick View Button on Hover (Desktop) */}
        <div className="absolute inset-x-4 bottom-4 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            id={`quick-add-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-full bg-[#0E1420] hover:bg-[#A63A32] text-white text-xs uppercase tracking-widest font-medium transition-colors shadow-md flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={13} />
            <span>Quick Add</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1A1F2B] shadow-md transition-colors"
            title="View Details"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Reference Image Tag (Helpful for user context) */}
          {product.referenceImageName && (
            <span className="text-[10px] text-[#C9A461] uppercase tracking-wider font-semibold block mb-1">
              Ref: {product.referenceImageName.split(' ')[0]}
            </span>
          )}

          {/* Title */}
          <h3
            onClick={() => onViewDetails(product)}
            className="font-serif text-base sm:text-lg text-[#1A1F2B] font-medium leading-snug hover:text-[#A63A32] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short Evocative Subtitle */}
          <p className="text-xs text-[#1A1F2B]/60 line-clamp-1 mt-1 font-sans">
            {product.tagline}
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-[#1A1F2B]/70">
            <div className="flex items-center text-[#C9A461]">
              <Star size={12} className="fill-current" />
            </div>
            <span className="font-semibold text-xs text-[#1A1F2B]">{product.rating}</span>
            <span className="text-[#1A1F2B]/40">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price and Mobile Add Button */}
        <div className="mt-4 pt-3 border-t border-[#E8E3DA] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base sm:text-lg font-semibold text-[#1A1F2B]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#1A1F2B]/40 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#C9A461] font-medium uppercase tracking-wider block">
              18K PVD Gold
            </span>
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={() => onQuickAdd(product)}
            className="sm:hidden p-2.5 rounded-full bg-[#0E1420] text-white hover:bg-[#A63A32] transition-colors shadow"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
