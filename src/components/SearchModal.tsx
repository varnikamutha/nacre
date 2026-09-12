import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

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
      <div className="relative w-full max-w-2xl bg-[#0E1420] text-[#EDE7DD] rounded-2xl shadow-2xl border border-[#C9A461]/30 p-6 overflow-hidden max-h-[80vh] flex flex-col">
        {/* Search Input */}
        <div className="relative flex items-center border-b border-[#2A344A] pb-4">
          <Search size={20} className="text-[#C9A461] shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bracelets, rings, earrings, Emily in Paris..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#EDE7DD]/40 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#EDE7DD]/50 hover:text-white mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-[#EDE7DD]/60 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Popular Tags when query is empty */}
        {!query.trim() && (
          <div className="pt-5 pb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C9A461] block mb-2.5">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-full bg-[#1A233A] text-xs text-[#EDE7DD]/80 hover:text-[#C9A461] hover:bg-[#2A344A] border border-[#2A344A] transition-colors"
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
            <div className="py-12 text-center text-xs text-[#EDE7DD]/60">
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
              className="flex items-center justify-between p-3 rounded-xl bg-[#141C2B] hover:bg-[#1A233A] border border-[#2A344A] cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-lg object-cover bg-[#EDE7DD]"
                />
                <div>
                  <h4 className="font-serif text-sm font-medium text-white group-hover:text-[#C9A461] transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#C9A461] font-semibold">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[#EDE7DD]/40">·</span>
                    <span className="text-[#EDE7DD]/60 capitalize">{product.category}</span>
                  </div>
                </div>
              </div>
              <ArrowRight size={15} className="text-[#EDE7DD]/40 group-hover:text-[#C9A461] transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
