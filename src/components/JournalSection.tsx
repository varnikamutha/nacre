import React, { useState } from 'react';
import { BookOpen, ArrowRight, X } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  featuredProductId: string;
}

const ARTICLES: Article[] = [
  {
    id: 'ring-stacking',
    title: "The Golden Rule of Ring Stacking: An Art Curator's Guide",
    category: 'Style Guide',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80',
    excerpt: 'How to balance weights, negative space, and stone textures without your fingers feeling weighed down.',
    content: [
      'The secret to an effortless ring stack isn’t symmetry — it’s tension. In art curation, whitespace is what allows an oil painting to breathe. The exact same law applies to your hands.',
      'Begin with an anchor piece on your index or middle finger — like the Starlight Bangle or our Lilac Blossom Vine Ring. Then, bridge the look with an open silhouette like the Dual Horizon Open Cuff Band.',
      'Never match band thicknesses uniformly. Contrast a 1.5mm twisted rope band against a 4mm textured band to create dimension.'
    ],
    featuredProductId: 'ring-violet-flower'
  },
  {
    id: 'emily-in-paris',
    title: '5 Pieces Emily Cooper Would Wear to a Rooftop in Saint-Germain',
    category: 'Pop-Culture Edit',
    readTime: '3 min read',
    image: '/assets/images/universe_emily_paris_1789199570293.jpg',
    excerpt: 'Maximalist French charm meets everyday anti-tarnish ease. How to master bold gold collars and whimsical motifs.',
    content: [
      'Emily Cooper’s wardrobe has never adhered to quiet minimalism. Her style philosophy is unabashed optimism, saturated hues, and jewellery that sparks conversation across a café table.',
      'For cocktails along the Seine, she would reach for our Parisian Tulip Enamel Medallion — striking enough to anchor a houndstooth blazer, yet lightweight enough to dance in till midnight.',
      'Pair it with the Saint-Germain Oval Link Bracelet for that quintessential French girl nonchalance.'
    ],
    featuredProductId: 'necklace-tulip-enamel'
  },
  {
    id: 'anti-tarnish-revolution',
    title: 'Why Anti-Tarnish Demi-Fine is Replacing Real 22K Gold for Daily Wear',
    category: 'Craft & Science',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80',
    excerpt: 'Why modern Indian women are storing solid gold in bank lockers and wearing waterproof 18K PVD pieces everywhere.',
    content: [
      'Historically in India, fine jewellery was either 22-karat solid gold — too precious and dangerous for everyday commutes — or brass costume jewellery that turned wrists black within a fortnight.',
      'Demi-fine jewellery bridges this historic chasm. Utilizing medical-grade 316L stainless steel bonded under vacuum with 18k real gold, it delivers the rich warm luster of heritage jewellery with invincible durability.',
      'You can shower, swim in Goa, sprint through monsoon rain, and spritz your signature perfume without a second of hesitation.'
    ],
    featuredProductId: 'bracelet-pearl-strand'
  }
];

interface JournalSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({ onSelectProduct }) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const getFeaturedProduct = (productId: string) => {
    return PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  };

  return (
    <section id="journal-section" className="w-full bg-[#FAF7F2] py-16 sm:py-24 border-t border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#A63A32] font-semibold">
              The Nacre Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1F2B] mt-1 font-light">
              Stories, styling rules & <span className="italic font-normal">visual inspiration</span>.
            </h2>
          </div>
          <span className="text-xs text-[#1A1F2B]/60 font-sans hidden sm:inline">
            Curated by our Mumbai design studio
          </span>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => {
            const featuredProd = getFeaturedProduct(article.featuredProductId);

            return (
              <article
                key={article.id}
                className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-[#E8E3DA] hover:border-[#C9A461] transition-all hover:shadow-lg"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-[#EDE7DD]">
                    <img
                      src={article.image}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between text-xs text-[#1A1F2B]/50 mb-2">
                      <span className="text-[#A63A32] uppercase tracking-wider font-semibold text-[10px]">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#1A1F2B] leading-snug group-hover:text-[#A63A32] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#1A1F2B]/70 font-sans mt-2.5 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#F2ECE3]">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="text-xs font-semibold uppercase tracking-wider text-[#1A1F2B] group-hover:text-[#A63A32] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => onSelectProduct(featuredProd)}
                    className="text-[11px] text-[#A63A32] hover:underline font-medium truncate max-w-[150px]"
                    title={`Shop ${featuredProd.name}`}
                  >
                    ✦ Shop Featured Piece
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#FAF7F2] text-[#1A1F2B] rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-[#E2DDD2]">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 text-[#1A1F2B]/60 hover:text-black rounded-full"
            >
              <X size={20} />
            </button>

            <span className="text-xs uppercase font-bold tracking-widest text-[#A63A32]">
              {activeArticle.category} · {activeArticle.readTime}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1F2B] mt-2 mb-4 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-[#1A1F2B]/85 font-sans leading-relaxed">
              {activeArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Embedded Buy Button in Article */}
            <div className="mt-8 p-4 bg-white rounded-xl border border-[#E8E3DA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={getFeaturedProduct(activeArticle.featuredProductId).images[0]}
                  alt="Featured piece"
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A63A32] font-semibold block">
                    Featured in this article
                  </span>
                  <span className="font-serif text-sm font-medium text-[#1A1F2B]">
                    {getFeaturedProduct(activeArticle.featuredProductId).name}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  const prod = getFeaturedProduct(activeArticle.featuredProductId);
                  setActiveArticle(null);
                  onSelectProduct(prod);
                }}
                className="px-4 py-2 rounded-full bg-[#A63A32] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8e2e27]"
              >
                View Piece
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
