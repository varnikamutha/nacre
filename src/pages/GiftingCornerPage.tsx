import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Gift,
  Sparkles,
  Heart,
  Package,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Plus,
  Trash2,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';
import { handleImageError } from '../utils/imageResolver';

interface GiftingCornerPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onNavigatePage: (page: 'shop' | 'fictional-era' | 'journal') => void;
}

const VELVET_BOX_COLORS = [
  { id: 'burgundy', name: 'Burgundy Velvet', hex: '#631D27', ribbon: '#C9A461' },
  { id: 'navy', name: 'Midnight Navy Velvet', hex: '#0E1420', ribbon: '#EDE7DD' },
  { id: 'emerald', name: 'Forest Emerald Velvet', hex: '#1B382B', ribbon: '#C9A461' },
  { id: 'pearl', name: 'Champagne Pearl Silk', hex: '#E8DFD1', ribbon: '#631D27' }
];

const WAX_SEALS = [
  { id: 'heart', name: 'Wax-Sealed Heart 🤍', symbol: '💌' },
  { id: 'star', name: 'Celestial Starlight ✨', symbol: '⭐' },
  { id: 'swan', name: 'Regal Nacre Swan 🦢', symbol: '👑' }
];

export const GiftingCornerPage: React.FC<GiftingCornerPageProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onNavigatePage
}) => {
  // 1. Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [recipient, setRecipient] = useState<string>('girlfriend');
  const [aesthetic, setAesthetic] = useState<string>('minimal');
  const [budgetTier, setBudgetTier] = useState<string>('all');
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // 2. Build-a-Box State
  const [boxColor, setBoxColor] = useState(VELVET_BOX_COLORS[0]);
  const [boxItems, setBoxItems] = useState<Product[]>([]);
  const [customNote, setCustomNote] = useState('');
  const [waxSeal, setWaxSeal] = useState(WAX_SEALS[0]);
  const [boxAddedMessage, setBoxAddedMessage] = useState(false);

  // Quiz Recommendations
  const quizRecommendedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (recipient === 'girlfriend') {
      list = list.filter((p) => p.universe || p.tier === 'signature' || p.category === 'bracelets' || p.category === 'necklaces');
    } else if (recipient === 'sister') {
      list = list.filter((p) => p.category === 'rings' || p.category === 'earrings' || p.price < 1500);
    } else if (recipient === 'best-friend') {
      list = list.filter((p) => p.badges.includes('Trending') || p.category === 'bracelets');
    } else if (recipient === 'mom') {
      list = list.filter((p) => p.category === 'necklaces' || p.name.includes('Pearl') || p.tier === 'fine-edit');
    }

    if (aesthetic === 'minimal') {
      list = list.filter((p) => p.price <= 1299 || p.tagline.toLowerCase().includes('clean'));
    } else if (aesthetic === 'french') {
      list = list.filter((p) => p.universe === 'emily-in-paris' || p.tagline.toLowerCase().includes('french'));
    } else if (aesthetic === 'coastal') {
      list = list.filter((p) => p.universe === 'summer-i-turned-pretty' || p.category === 'bracelets');
    }

    if (budgetTier === 'under-999') {
      list = list.filter((p) => p.price <= 999);
    } else if (budgetTier === 'under-1499') {
      list = list.filter((p) => p.price <= 1499);
    }

    return list.slice(0, 4);
  }, [recipient, aesthetic, budgetTier]);

  // Build a Box Calculations
  const boxRawTotal = boxItems.reduce((acc, curr) => acc + curr.price, 0);
  const boxDiscount = boxItems.length === 3 ? Math.round(boxRawTotal * 0.15) : 0;
  const boxFinalTotal = boxRawTotal - boxDiscount;

  const handleAddToBox = (product: Product) => {
    if (boxItems.length >= 3) return;
    if (boxItems.some((item) => item.id === product.id)) return;
    setBoxItems([...boxItems, product]);
  };

  const handleRemoveFromBox = (productId: string) => {
    setBoxItems(boxItems.filter((item) => item.id !== productId));
  };

  const handleAddBoxToBag = () => {
    if (boxItems.length === 0) return;
    boxItems.forEach((item) => {
      onAddToCart(item, 1);
    });
    setBoxAddedMessage(true);
    setTimeout(() => setBoxAddedMessage(false), 2500);
  };

  return (
    <div className="w-full bg-[#F7F3EC] text-[#0E1420] min-h-screen">
      {/* 1. Header Hero Banner */}
      <section className="relative w-full bg-[#EDE7DD] border-b border-[#0E1420]/15 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F3EC] border border-[#0E1420]/20 text-xs font-semibold text-[#0E1420] uppercase tracking-[0.25em] mb-4 shadow-sm">
            <Gift size={13} className="text-[#A63A32]" />
            <span>The Gifting Atelier</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0E1420] font-light tracking-tight leading-tight">
            The Gifting Corner. <br />
            <span className="italic text-[#A63A32] font-normal">Made to make jaws drop.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#0E1420]/80 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            Whether choosing for a partner, sister, best friend or self-love treat — every piece arrives packaged in plush velvet boxes, wrapped in silk ribbon, with handwritten wax-sealed notes and zero price tags inside.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('build-a-box-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-[#0E1420] text-[#EDE7DD] hover:bg-[#1A233A] text-xs font-semibold uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
            >
              <Package size={14} className="text-[#C9A461]" />
              <span>Build A Custom Gift Box</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('gifting-quiz-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full bg-[#FAF7F2] hover:bg-[#EDE7DD] text-[#0E1420] text-xs font-semibold uppercase tracking-widest border border-[#0E1420]/20 transition-colors flex items-center gap-1.5"
            >
              <Sparkles size={13} className="text-[#A63A32]" />
              <span>Take The 30s Gift Quiz</span>
            </button>
          </div>
        </div>

        {/* Ambient sparkle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C98B7A]/15 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* 2. Interactive Gifting Quiz Section */}
      <section id="gifting-quiz-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="bg-[#FAF7F2] p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E2DDD2] shadow-sm">
          {!quizSubmitted ? (
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0E1420]/15">
                <div className="flex items-center gap-2">
                  <Sparkles size={20} className="text-[#A63A32]" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0E1420]">
                    The 30-Second Gifting Quiz
                  </h2>
                </div>
                <span className="text-xs font-semibold text-[#A63A32] uppercase tracking-wider">
                  Step {quizStep} of 3
                </span>
              </div>

              {/* Step 1: Who is this for? */}
              {quizStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#0E1420]">
                    1. Who are you celebrating today?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'girlfriend', label: 'My Girlfriend / Partner', icon: '❤️' },
                      { id: 'sister', label: 'My Sister', icon: '✨' },
                      { id: 'best-friend', label: 'My Best Friend', icon: '🌸' },
                      { id: 'mom', label: 'My Mom', icon: '🤍' },
                      { id: 'self', label: 'Me! (Self-Love Era)', icon: '👑' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setRecipient(item.id);
                          setQuizStep(2);
                        }}
                        className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                          recipient === item.id
                            ? 'bg-[#EDE7DD] border-[#0E1420] ring-1 ring-[#0E1420]'
                            : 'bg-white border-[#E2DDD2] hover:border-[#0E1420]/50 hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-xs font-semibold text-[#0E1420]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: What's their personal vibe? */}
              {quizStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#0E1420]">
                    2. What describes their personal aesthetic best?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'minimal', title: 'Clean Girl Minimalist', desc: 'Dainty gold bands, micro huggies, barely-there sparkle', icon: '☁️' },
                      { id: 'french', title: 'French Girl Chic', desc: 'Emily in Paris croissants, bold twisted bangles, statement gold', icon: '🥐' },
                      { id: 'coastal', title: 'Cousins Beach Romantic', desc: 'Luminous freshwater seed pearls, soft pastels, beachy layers', icon: '🌊' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setAesthetic(item.id);
                          setQuizStep(3);
                        }}
                        className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-36 ${
                          aesthetic === item.id
                            ? 'bg-[#EDE7DD] border-[#0E1420] ring-1 ring-[#0E1420]'
                            : 'bg-white border-[#E2DDD2] hover:border-[#0E1420]/50 hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <span className="text-xs font-semibold text-[#0E1420] block">{item.title}</span>
                          <span className="text-[11px] text-[#0E1420]/70 font-sans mt-0.5 block">{item.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: What's your target budget? */}
              {quizStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#0E1420]">
                    3. What's your comfortable gifting budget?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'under-999', title: 'Under ₹999', desc: 'Sweet, daily tokens & starter pieces' },
                      { id: 'under-1499', title: '₹1,000 – ₹1,500', desc: 'Most popular demi-fine bangles & pearl necklaces' },
                      { id: 'all', title: 'Any Budget / Luxury Stacks', desc: 'Full curated luxury sets and signature edits' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setBudgetTier(item.id);
                          setQuizSubmitted(true);
                        }}
                        className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                          budgetTier === item.id
                            ? 'bg-[#EDE7DD] border-[#0E1420] ring-1 ring-[#0E1420]'
                            : 'bg-white border-[#E2DDD2] hover:border-[#0E1420]/50 hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#A63A32]">{item.title}</span>
                        <span className="text-[11px] text-[#0E1420]/75 font-sans">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Result Screen */
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#0E1420]/15 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32]">
                    Curated Recommendation
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1420]">
                    Your Perfect Gift Edit
                  </h3>
                  <p className="text-xs text-[#0E1420]/70 font-sans mt-1">
                    Hand-matched for: <strong className="capitalize text-[#0E1420]">{recipient}</strong> · <strong className="capitalize text-[#0E1420]">{aesthetic}</strong> aesthetic
                  </p>
                </div>
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setQuizStep(1);
                  }}
                  className="px-4 py-2 rounded-full bg-[#EDE7DD] text-[#0E1420] text-xs font-semibold uppercase tracking-wider hover:bg-[#E2DDD2] border border-[#0E1420]/15 transition-colors self-start sm:self-auto flex items-center gap-1.5"
                >
                  <RotateCcw size={12} />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Recommended Product Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quizRecommendedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickAdd={(p) => onAddToCart(p, 1)}
                    onViewDetails={(p) => onSelectProduct(p)}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.some((w) => w.id === prod.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Build-a-Box Custom Atelier Section */}
      <section id="build-a-box-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE7DD] border border-[#0E1420]/20 text-xs font-semibold text-[#0E1420] uppercase tracking-[0.2em] mb-3">
            <Package size={13} className="text-[#A63A32]" />
            <span>Interactive Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0E1420] font-light">
            Build your signature <span className="italic font-normal text-[#A63A32]">3-Piece Gift Box</span>.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#0E1420]/75 mt-2">
            Select 3 pieces below. We'll gift-package them in our signature luxury velvet box with custom wax seal & handwritten note — plus enjoy an automatic 15% bundle discount!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: The Velvet Box Builder Stage (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E2DDD2] shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#0E1420]/15">
              <h3 className="font-serif text-xl font-medium text-[#0E1420]">
                Your Custom Box
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EDE7DD] text-[#0E1420] border border-[#0E1420]/20 font-semibold">
                {boxItems.length} of 3 Slots Filled
              </span>
            </div>

            {/* Box Color Selector */}
            <div className="mt-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32] block mb-2">
                1. Velvet Box Color: {boxColor.name}
              </span>
              <div className="flex gap-2">
                {VELVET_BOX_COLORS.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setBoxColor(col)}
                    className={`w-9 h-9 rounded-full border-2 transition-transform ${
                      boxColor.id === col.id ? 'scale-110 border-[#0E1420] ring-2 ring-[#0E1420]/30' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* The 3 Slots Graphic */}
            <div className="mt-6 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32] block">
                2. Selected Pieces in Box
              </span>

              {[0, 1, 2].map((slotIdx) => {
                const item = boxItems[slotIdx];

                return (
                  <div
                    key={slotIdx}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      item
                        ? 'bg-white border-[#E2DDD2] shadow-sm'
                        : 'bg-[#EDE7DD]/50 border-dashed border-[#0E1420]/25 text-[#0E1420]/40'
                    }`}
                  >
                    {item ? (
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, item.category)}
                          className="w-12 h-12 rounded-lg object-cover bg-[#EDE7DD] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-serif text-xs font-semibold text-[#0E1420] truncate">
                            {item.name}
                          </p>
                          <span className="text-xs text-[#A63A32] font-bold">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 py-2 px-1 text-xs">
                        <Plus size={16} className="text-[#0E1420]/40" />
                        <span className="font-sans italic">Slot #{slotIdx + 1} — Select a piece below</span>
                      </div>
                    )}

                    {item && (
                      <button
                        onClick={() => handleRemoveFromBox(item.id)}
                        className="p-1.5 text-[#0E1420]/50 hover:text-[#A63A32] rounded-full transition-colors shrink-0"
                        title="Remove piece"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Note & Wax Seal */}
            <div className="mt-6 pt-5 border-t border-[#0E1420]/15 space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32] block">
                3. Complimentary Handwritten Note & Wax Seal
              </span>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Write your personal gift message (e.g. Happy 21st birthday to my favorite human!)..."
                className="w-full text-xs p-3 rounded-xl bg-white border border-[#0E1420]/20 text-[#0E1420] placeholder-[#0E1420]/40 focus:outline-none focus:border-[#0E1420] resize-none h-20 font-sans"
              />

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#0E1420]/70 font-sans">Wax Seal:</span>
                <div className="flex gap-1.5">
                  {WAX_SEALS.map((seal) => (
                    <button
                      key={seal.id}
                      onClick={() => setWaxSeal(seal)}
                      className={`px-2.5 py-1 rounded-full text-xs transition-colors border ${
                        waxSeal.id === seal.id
                          ? 'bg-[#0E1420] text-[#EDE7DD] border-[#0E1420]'
                          : 'bg-white text-[#0E1420] border-[#0E1420]/20 hover:bg-[#EDE7DD]'
                      }`}
                    >
                      {seal.symbol} {seal.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary & Checkout Button */}
            <div className="mt-6 pt-5 border-t border-[#0E1420]/15 space-y-2">
              <div className="flex justify-between text-xs text-[#0E1420]/75">
                <span>Subtotal (3 Pieces):</span>
                <span>₹{boxRawTotal.toLocaleString('en-IN')}</span>
              </div>
              {boxItems.length === 3 && (
                <div className="flex justify-between text-xs text-emerald-700 font-semibold">
                  <span>15% Bundle Discount:</span>
                  <span>-₹{boxDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-[#0E1420]/75">
                <span>Velvet Box & Handwritten Note:</span>
                <span className="text-emerald-700 font-semibold">FREE (worth ₹499)</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-[#0E1420] pt-2 border-t border-[#0E1420]/10">
                <span>Total:</span>
                <span className="text-[#A63A32]">₹{boxFinalTotal.toLocaleString('en-IN')}</span>
              </div>

              {boxAddedMessage && (
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs text-center font-medium">
                  ✦ Custom Gift Box added to your bag!
                </div>
              )}

              <button
                disabled={boxItems.length === 0}
                onClick={handleAddBoxToBag}
                className={`w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 mt-4 shadow-md ${
                  boxItems.length === 3
                    ? 'bg-[#0E1420] hover:bg-[#1A233A] text-[#EDE7DD]'
                    : boxItems.length > 0
                    ? 'bg-[#A63A32] hover:bg-[#8e2e27] text-white'
                    : 'bg-[#0E1420]/20 text-[#0E1420]/40 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={14} />
                <span>
                  {boxItems.length === 3
                    ? 'Add Complete Box to Bag (15% OFF)'
                    : `Add ${boxItems.length} Piece${boxItems.length === 1 ? '' : 's'} to Bag`}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Available Pieces to Choose From (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-3xl border border-[#E2DDD2]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-medium text-[#0E1420]">
                  Choose Pieces for Your Box
                </h3>
                <span className="text-xs text-[#0E1420]/60">
                  Tap "+ Add to Box" on any piece
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRODUCTS.slice(0, 10).map((product) => {
                  const isInBox = boxItems.some((i) => i.id === product.id);
                  const isBoxFull = boxItems.length >= 3;

                  return (
                    <div
                      key={product.id}
                      className="bg-white p-3.5 rounded-2xl border border-[#E2DDD2] flex gap-3 shadow-sm hover:border-[#0E1420]/40 transition-all"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, product.category)}
                        className="w-20 h-20 rounded-xl object-cover bg-[#EDE7DD] shrink-0 cursor-pointer"
                        onClick={() => onSelectProduct(product)}
                      />
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <span className="text-[9px] uppercase font-bold tracking-wider text-[#A63A32]">
                            {product.category}
                          </span>
                          <h4
                            onClick={() => onSelectProduct(product)}
                            className="font-serif text-xs font-semibold text-[#0E1420] truncate cursor-pointer hover:text-[#A63A32]"
                          >
                            {product.name}
                          </h4>
                          <span className="text-xs font-serif font-bold text-[#0E1420] block mt-0.5">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="pt-2">
                          {isInBox ? (
                            <button
                              onClick={() => handleRemoveFromBox(product.id)}
                              className="w-full py-1.5 px-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-semibold flex items-center justify-center gap-1 hover:bg-emerald-100"
                            >
                              <CheckCircle2 size={12} />
                              <span>In Box (Remove)</span>
                            </button>
                          ) : (
                            <button
                              disabled={isBoxFull}
                              onClick={() => handleAddToBox(product)}
                              className={`w-full py-1.5 px-2 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
                                isBoxFull
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-[#0E1420] hover:bg-[#1A233A] text-[#EDE7DD]'
                              }`}
                            >
                              <Plus size={12} />
                              <span>Add to Box</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Luxury Gifting Guarantee */}
      <section className="w-full bg-[#EDE7DD] py-14 border-t border-[#0E1420]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E2DDD2]">
              <Package size={24} className="text-[#A63A32] mx-auto mb-2" />
              <h4 className="font-serif text-sm font-semibold text-[#0E1420]">
                Zero Invoices Inside
              </h4>
              <p className="text-[11px] text-[#0E1420]/70 font-sans mt-1">
                Your recipient will never see prices. Receipts are sent only to your email.
              </p>
            </div>

            <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E2DDD2]">
              <Sparkles size={24} className="text-[#C9A461] mx-auto mb-2" />
              <h4 className="font-serif text-sm font-semibold text-[#0E1420]">
                Plush Velvet Box
              </h4>
              <p className="text-[11px] text-[#0E1420]/70 font-sans mt-1">
                Heavyweight keepsake boxes lined in plush velvet and sealed in gold ribbon.
              </p>
            </div>

            <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E2DDD2]">
              <ShieldCheck size={24} className="text-[#A63A32] mx-auto mb-2" />
              <h4 className="font-serif text-sm font-semibold text-[#0E1420]">
                Lifetime Anti-Tarnish
              </h4>
              <p className="text-[11px] text-[#0E1420]/70 font-sans mt-1">
                100% waterproof 18K thick gold plating. Safe for daily showers, gym, and sleep.
              </p>
            </div>

            <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E2DDD2]">
              <Heart size={24} className="text-[#A63A32] mx-auto mb-2" />
              <h4 className="font-serif text-sm font-semibold text-[#0E1420]">
                Express Pan-India Ship
              </h4>
              <p className="text-[11px] text-[#0E1420]/70 font-sans mt-1">
                Dispatched within 24 hours. Express door delivery to over 28,000 PIN codes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
