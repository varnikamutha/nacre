import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { handleImageError } from '../utils/imageResolver';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const POPULAR_SEARCHES = ['Emily in Paris', 'Twisted Bangle', 'Pearls', 'Under ₹999', 'Earrings', 'Swan Pendant'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.universe && p.universe.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] text-[#0E1420] rounded-2xl shadow-2xl border border-[#0E1420]/20 p-6 overflow-hidden max-h-[80vh] flex flex-col">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#0E1420]/15 pb-4">
          <Search size={20} className="text-[#A63A32] shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bracelets, rings, earrings, Emily in Paris..."
            className="w-full bg-transparent text-sm sm:text-base text-[#0E1420] placeholder-[#0E1420]/40 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#0E1420]/50 hover:text-[#0E1420] mr-2 text-xs font-semibold"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#0E1420]/60 hover:text-[#0E1420] rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Popular Tags when query is empty */}
        {!query.trim() && (
          <div className="pt-5 pb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32] block mb-2.5">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-[#EDE7DD] text-xs text-[#0E1420] hover:bg-[#E2DDD2] hover:text-[#A63A32] border border-[#0E1420]/15 transition-colors font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-3">
          {query.trim() && filteredResults.length === 0 && (
            <div className="py-12 text-center text-xs text-[#0E1420]/60">
              No pieces matching "{query}". Try searching "bangle", "pearl", or "emily".
            </div>
          )}

          {filteredResults.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                onSelectProduct(product);
                onClose();
              }}
              className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#F2ECE3] border border-[#E2DDD2] cursor-pointer transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, product.category)}
                  className="w-12 h-12 rounded-lg object-cover bg-[#EDE7DD]"
                />
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#0E1420] group-hover:text-[#A63A32] transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#A63A32] font-semibold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[#0E1420]/30">·</span>
                    <span className="text-[#0E1420]/70 capitalize">{product.category}</span>
                  </div>
                </div>
              </div>
              <ArrowRight size={15} className="text-[#0E1420]/40 group-hover:text-[#A63A32] transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
