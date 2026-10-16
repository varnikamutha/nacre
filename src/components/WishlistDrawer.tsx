import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { handleImageError } from '../utils/imageResolver';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToBag: (product: Product) => void;
  onMoveAllToBag: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToBag,
  onMoveAllToBag
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF7F2] text-[#0E1420] h-full shadow-2xl flex flex-col justify-between border-l border-[#0E1420]/20">
        {/* Header */}
        <div className="p-5 border-b border-[#0E1420]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-[#A63A32] fill-current" />
            <h3 className="font-serif text-xl tracking-wide font-medium text-[#0E1420]">Your Wishlist</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#EDE7DD] text-[#0E1420] border border-[#0E1420]/20 font-semibold">
              {wishlist.length} saved
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#0E1420]/60 hover:text-[#0E1420] rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="font-serif text-lg text-[#0E1420]/70 italic">
                Nothing saved yet.
              </p>
              <p className="text-xs text-[#0E1420]/50">
                Tap the heart on any piece you want to keep close.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 bg-white p-3 rounded-xl border border-[#E2DDD2] items-center shadow-sm"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, product.category)}
                  className="w-16 h-16 rounded-lg object-cover bg-[#EDE7DD] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-medium text-[#0E1420] truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-serif text-sm font-bold text-[#A63A32]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#0E1420]/40 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#0E1420]/60 block font-medium">
                    18K Anti-Tarnish Gold
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => onMoveToBag(product)}
                    className="p-2 rounded-lg bg-[#A63A32] hover:bg-[#8e2e27] text-white text-xs transition-colors flex items-center justify-center shadow"
                    title="Move to bag"
                  >
                    <ShoppingBag size={14} />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-2 rounded-lg bg-[#EDE7DD] text-[#0E1420]/60 hover:text-[#A63A32] transition-colors flex items-center justify-center"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-5 bg-[#FAF7F2] border-t border-[#0E1420]/15 space-y-3">
            <button
              onClick={onMoveAllToBag}
              className="w-full py-3.5 rounded-full bg-[#0E1420] hover:bg-[#1A233A] text-[#EDE7DD] text-xs uppercase font-medium tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Move All to Bag</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
