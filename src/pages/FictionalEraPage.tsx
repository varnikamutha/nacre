import React, { useState, useMemo } from 'react';
import { UNIVERSE_EDITIONS } from '../data/universes';
import { PRODUCTS } from '../data/products';
import { UniverseId, Product, CategoryType } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, Film, Heart, ShoppingBag, CheckCircle, Compass, RotateCcw } from 'lucide-react';
import { handleImageError } from '../utils/imageResolver';

interface FictionalEraPageProps {
  initialUniverse?: UniverseId | null;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onNavigatePage: (page: 'shop' | 'gifting' | 'journal') => void;
}

export const FictionalEraPage: React.FC<FictionalEraPageProps> = ({
  initialUniverse = null,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onNavigatePage
}) => {
  const [selectedUniverseId, setSelectedUniverseId] = useState<UniverseId>(
    initialUniverse || 'emily-in-paris'
  );
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');

  // Quiz state
  const [quizStep, setQuizStep] = useState(0); // 0 = not started, 1, 2, 3, 4 = result
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [quizResultUniverse, setQuizResultUniverse] = useState<UniverseId | null>(null);

  const selectedUniverse = useMemo(() => {
    return UNIVERSE_EDITIONS.find((u) => u.id === selectedUniverseId) || UNIVERSE_EDITIONS[0];
  }, [selectedUniverseId]);

  // Filter products by selected universe and category
  const universeProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesUniverse = p.universe === selectedUniverseId;
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesUniverse && matchesCategory;
    });
  }, [selectedUniverseId, selectedCategory]);

  const allUniverseProductCount = useMemo(() => {
    return PRODUCTS.filter((p) => p.universe === selectedUniverseId).length;
  }, [selectedUniverseId]);

  // Quiz evaluation
  const handleAnswerQuiz = (qKey: string, value: string) => {
    const updated = { ...quizAnswers, [qKey]: value };
    setQuizAnswers(updated);

    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      // Evaluate result
      let target: UniverseId = 'emily-in-paris';
      if (updated.vibe === 'coastal') target = 'summer-i-turned-pretty';
      else if (updated.vibe === 'regency') target = 'bridgerton';
      else if (updated.vibe === 'soft') target = 'to-all-the-boys';
      else target = 'emily-in-paris';

      setQuizResultUniverse(target);
      setQuizStep(4);
    }
  };

  const handleApplyQuizResult = (univId: UniverseId) => {
    setSelectedUniverseId(univId);
    setSelectedCategory('all');
    setQuizStep(0);
    // Smooth scroll to catalog
    const el = document.getElementById('era-catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#F7F3EC] text-[#0E1420] min-h-screen">
      {/* 1. Cinematic Header Banner */}
      <section className="relative w-full bg-[#EDE7DD] border-b border-[#0E1420]/15 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F3EC] border border-[#0E1420]/20 text-xs font-semibold text-[#0E1420] uppercase tracking-[0.25em] mb-4 shadow-sm">
              <Film size={13} className="text-[#A63A32]" />
              <span>Cinematic Pop-Culture Editions</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0E1420] font-light tracking-tight leading-tight">
              Step inside your <br />
              <span className="italic text-[#A63A32] font-normal">fictional era</span>.
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#0E1420]/80 mt-4 max-w-2xl font-light leading-relaxed">
              Don’t just shop occasion jewellery — step into the stories you love. Each capsule is an evocative tribute to iconic heroines, screen palettes, and main-character energy in thick 18k waterproof gold.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('era-quiz-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-[#0E1420] text-[#EDE7DD] hover:bg-[#1A233A] text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles size={14} className="text-[#C9A461]" />
                <span>Find Your Era Quiz</span>
              </button>
              <button
                onClick={() => onNavigatePage('shop')}
                className="px-6 py-3 rounded-full bg-[#FAF7F2] hover:bg-[#EDE7DD] text-[#0E1420] text-xs font-semibold uppercase tracking-widest border border-[#0E1420]/20 transition-colors"
              >
                Back to All Collections
              </button>
            </div>
          </div>
        </div>

        {/* Ambient background sparkle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A461]/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* 2. Universe Switcher Nav (Tabs / Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {UNIVERSE_EDITIONS.map((edition) => {
            const isSelected = selectedUniverseId === edition.id;
            return (
              <button
                key={edition.id}
                onClick={() => {
                  setSelectedUniverseId(edition.id);
                  setSelectedCategory('all');
                }}
                className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 shadow-sm flex flex-col justify-between overflow-hidden group ${
                  isSelected
                    ? 'bg-[#FAF7F2] border-[#0E1420] ring-2 ring-[#0E1420] shadow-md scale-[1.02]'
                    : 'bg-white border-[#E2DDD2] hover:border-[#0E1420]/50 hover:bg-[#FAF7F2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: isSelected ? '#EDE7DD' : '#F7F3EC',
                        color: edition.accentColor
                      }}
                    >
                      {edition.id.replace(/-/g, ' ')}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#A63A32]"></span>
                    )}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#0E1420] leading-snug">
                    {edition.title.replace(' Edit', '')}
                  </h3>
                  <p className="text-[11px] text-[#0E1420]/65 mt-1 line-clamp-1 font-sans">
                    {edition.aesthetic}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#0E1420]/10 flex items-center justify-between text-[11px]">
                  <span className="text-[#0E1420]/60">
                    {PRODUCTS.filter((p) => p.universe === edition.id).length} Pieces
                  </span>
                  <span className="font-semibold text-[#A63A32] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    <span>View</span>
                    <ArrowRight size={11} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Universe Hero Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E2DDD2] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left: Atmospheric Image Poster */}
          <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[460px] overflow-hidden bg-[#EDE7DD]">
            <img
              src={selectedUniverse.heroImage}
              alt={selectedUniverse.title}
              referrerPolicy="no-referrer"
              onError={(e) => handleImageError(e, 'default')}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent lg:hidden"></div>
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#0E1420]/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-widest">
              ★ Active Era Capsule
            </div>
          </div>

          {/* Right: Editorial Narrative & Details */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs uppercase tracking-[0.25em] font-semibold"
                  style={{ color: selectedUniverse.accentColor }}
                >
                  {selectedUniverse.aesthetic}
                </span>
                <span className="text-[#0E1420]/40">·</span>
                <span className="text-xs text-[#0E1420]/60 font-sans">
                  {allUniverseProductCount} Signature Pieces
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#0E1420] font-light leading-tight">
                {selectedUniverse.title}
              </h2>

              <blockquote className="mt-4 p-4 rounded-xl bg-[#EDE7DD]/60 border-l-2 border-[#A63A32] text-xs sm:text-sm italic font-serif text-[#0E1420]/85 leading-relaxed">
                {selectedUniverse.quote}
              </blockquote>

              <p className="mt-4 font-sans text-xs sm:text-sm text-[#0E1420]/75 leading-relaxed font-light">
                {selectedUniverse.editorialNote}
              </p>

              {/* Signature Pieces Chips */}
              <div className="mt-6">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#A63A32] block mb-2">
                  Key Capsule Staples
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedUniverse.signaturePieces.map((piece, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-[#EDE7DD] border border-[#0E1420]/15 text-xs text-[#0E1420] font-medium"
                    >
                      ✦ {piece}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#0E1420]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#0E1420]/70 font-sans">
                <CheckCircle size={14} className="text-emerald-700" />
                <span>100% Anti-Tarnish · 18k Real Gold PVD · Sweat & Shower Proof</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filter & Product Catalog Section for This Era */}
      <section id="era-catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {/* Category Filter Chips for this Era */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#0E1420]/15 gap-4">
          <div>
            <h3 className="font-serif text-2xl text-[#0E1420] font-light">
              Pieces in the {selectedUniverse.title.replace(' Edit', '')}
            </h3>
            <p className="text-xs text-[#0E1420]/60 mt-0.5">
              Showing {universeProducts.length} pieces curated for this aesthetic
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {(['all', 'bracelets', 'necklaces', 'rings', 'earrings'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0E1420] text-[#EDE7DD] font-semibold shadow-sm'
                    : 'bg-[#EDE7DD] text-[#0E1420] hover:bg-[#E2DDD2]'
                }`}
              >
                {cat === 'all' ? 'All Pieces' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {universeProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-[#E2DDD2] p-8">
            <p className="font-serif text-lg text-[#0E1420]/70 italic">
              No pieces found in this category for {selectedUniverse.title}.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-5 py-2 rounded-full bg-[#0E1420] text-[#EDE7DD] text-xs font-semibold uppercase tracking-wider"
            >
              Show All {selectedUniverse.title}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {universeProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={(p) => onAddToCart(p, 1)}
                onViewDetails={(p) => onSelectProduct(p)}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlist.some((w) => w.id === product.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Interactive "Find Your Fictional Era" Quiz */}
      <section id="era-quiz-section" className="w-full bg-[#EDE7DD] py-16 sm:py-20 border-t border-[#0E1420]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F2] p-6 sm:p-10 rounded-3xl border border-[#E2DDD2] shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A63A32]">
                Interactive Style Matcher
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#0E1420] mt-1 font-light">
                Which Fictional Era are you?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#0E1420]/75 mt-2">
                Answer 3 quick aesthetic questions to reveal the jewelry capsule made for your soul.
              </p>
            </div>

            {/* Quiz Step 0: Start */}
            {quizStep === 0 && (
              <div className="text-center py-6">
                <button
                  onClick={() => setQuizStep(1)}
                  className="px-8 py-3.5 rounded-full bg-[#0E1420] hover:bg-[#1A233A] text-[#EDE7DD] text-xs font-semibold uppercase tracking-[0.2em] shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Compass size={15} />
                  <span>Start 30-Second Quiz</span>
                </button>
              </div>
            )}

            {/* Quiz Step 1 */}
            {quizStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#A63A32] font-semibold uppercase tracking-wider mb-2">
                  <span>Question 1 of 3</span>
                  <span>Atmosphere</span>
                </div>
                <h3 className="font-serif text-xl text-[#0E1420]">
                  Where would your dream Saturday unfold?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { key: 'french', vibe: 'french', label: '☕ Cafe de Flore terrace sipping a noisette & people watching' },
                    { key: 'coastal', vibe: 'coastal', label: '🌊 Cousins Beach morning jog wrapped in a borrowed oversized hoodie' },
                    { key: 'regency', vibe: 'regency', label: '🪞 Opulent library reading classics before a high-society ballroom soiree' },
                    { key: 'soft', vibe: 'soft', label: '💌 Vintage diner booth baking cookies & writing letters in pastel notebooks' }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleAnswerQuiz('vibe', opt.vibe)}
                      className="p-4 rounded-xl text-left bg-white border border-[#E2DDD2] hover:border-[#0E1420] hover:bg-[#F7F3EC] text-xs text-[#0E1420] font-sans transition-all leading-relaxed"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 2 */}
            {quizStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#A63A32] font-semibold uppercase tracking-wider mb-2">
                  <span>Question 2 of 3</span>
                  <span>Signature Aesthetic</span>
                </div>
                <h3 className="font-serif text-xl text-[#0E1420]">
                  Which wardrobe staple feels most like "you"?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { key: '1', label: 'Red beret, tailored houndstooth blazer & bold gold croissant rings' },
                    { key: '2', label: 'Salt-washed linen shorts, sun kissed skin & dainty pearl chokers' },
                    { key: '3', label: 'Empire-waist floral dress, silk ribbons & sparkling emerald drops' },
                    { key: '4', label: 'Powder blue knit cardigans, scrunchies & layered sweet heart lockets' }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleAnswerQuiz('wardrobe', opt.key)}
                      className="p-4 rounded-xl text-left bg-white border border-[#E2DDD2] hover:border-[#0E1420] hover:bg-[#F7F3EC] text-xs text-[#0E1420] font-sans transition-all leading-relaxed"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 3 */}
            {quizStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#A63A32] font-semibold uppercase tracking-wider mb-2">
                  <span>Question 3 of 3</span>
                  <span>Jewelry Energy</span>
                </div>
                <h3 className="font-serif text-xl text-[#0E1420]">
                  How do you like your everyday gold?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { key: '1', label: 'Architectural, confident, statement paperclips & chunky cuffs' },
                    { key: '2', label: 'Waterproof, delicate, beachy freshwater pearls that never come off' },
                    { key: '3', label: 'Romantic, royal pavé, regal swans & jewel-toned sparkle' },
                    { key: '4', label: 'Dainty heart charms, soft academia, cozy and nostalgic' }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleAnswerQuiz('jewelry', opt.key)}
                      className="p-4 rounded-xl text-left bg-white border border-[#E2DDD2] hover:border-[#0E1420] hover:bg-[#F7F3EC] text-xs text-[#0E1420] font-sans transition-all leading-relaxed"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Result */}
            {quizStep === 4 && quizResultUniverse && (
              <div className="text-center py-6 space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-[#EDE7DD] border border-[#0E1420]/20 flex items-center justify-center mx-auto text-[#A63A32]">
                  <Sparkles size={26} />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32]">
                  Your Soul Universe
                </span>
                <h3 className="font-serif text-3xl text-[#0E1420]">
                  You are the {UNIVERSE_EDITIONS.find((u) => u.id === quizResultUniverse)?.title}!
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#0E1420]/80 max-w-md mx-auto italic font-serif">
                  "{UNIVERSE_EDITIONS.find((u) => u.id === quizResultUniverse)?.quote}"
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleApplyQuizResult(quizResultUniverse)}
                    className="px-6 py-3 rounded-full bg-[#0E1420] text-[#EDE7DD] text-xs font-semibold uppercase tracking-widest hover:bg-[#1A233A] shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Explore My Universe Pieces</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => setQuizStep(1)}
                    className="px-4 py-3 rounded-full bg-[#EDE7DD] text-[#0E1420] text-xs font-medium uppercase tracking-wider border border-[#0E1420]/15 hover:bg-[#E2DDD2] transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw size={13} />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Footer Navigation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#E2DDD2] max-w-3xl mx-auto shadow-sm">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1420] font-light">
            Shopping for someone special?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#0E1420]/75 mt-2 max-w-md mx-auto">
            Visit our Gifting Corner for our 30-Second Quiz, custom Velvet Build-a-Box, and wax-sealed handwritten love letters.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigatePage('gifting')}
              className="px-6 py-3 rounded-full bg-[#A63A32] hover:bg-[#8e2e27] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
            >
              <Heart size={13} className="fill-current" />
              <span>Go to The Gifting Corner</span>
            </button>
            <button
              onClick={() => onNavigatePage('shop')}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#EDE7DD] text-[#0E1420] text-xs font-semibold uppercase tracking-widest border border-[#0E1420]/20 transition-colors"
            >
              View Full Jewelry Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
