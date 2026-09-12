import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface GiftingHubProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string) => void;
}

export const GiftingHub: React.FC<GiftingHubProps> = ({ onSelectProduct, onAddToCart }) => {
  // Quiz states
  const [quizStep, setQuizStep] = useState<number>(1);
  const [recipient, setRecipient] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Build a Box states
  const [boxItems, setBoxItems] = useState<Product[]>([]);
  const [boxColor, setBoxColor] = useState<'navy' | 'ivory'>('navy');
  const [customNote, setCustomNote] = useState<string>('To my favorite person in the world, shine bright always.');
  const [boxAddedMessage, setBoxAddedMessage] = useState(false);

  // Filtered Quiz Results
  const getQuizRecommendations = (): Product[] => {
    let filtered = [...PRODUCTS];

    if (budget === 'under-1000') {
      filtered = filtered.filter((p) => p.price <= 1000);
    } else if (budget === '1000-1800') {
      filtered = filtered.filter((p) => p.price > 1000 && p.price <= 1800);
    } else if (budget === 'above-1800') {
      filtered = filtered.filter((p) => p.price > 1800);
    }

    if (vibe === 'paris') {
      filtered = filtered.filter((p) => p.universe === 'emily-in-paris' || p.category === 'bracelets');
    } else if (vibe === 'summer') {
      filtered = filtered.filter((p) => p.universe === 'summer-i-turned-pretty' || p.category === 'necklaces');
    } else if (vibe === 'romance') {
      filtered = filtered.filter((p) => p.universe === 'to-all-the-boys' || p.category === 'rings');
    } else if (vibe === 'regal') {
      filtered = filtered.filter((p) => p.universe === 'bridgerton' || p.tier === 'fine-edit');
    }

    return filtered.slice(0, 4);
  };

  const handleResetQuiz = () => {
    setQuizStep(1);
    setRecipient('');
    setBudget('');
    setVibe('');
    setQuizSubmitted(false);
  };

  const handleToggleBoxItem = (prod: Product) => {
    if (boxItems.some((i) => i.id === prod.id)) {
      setBoxItems(boxItems.filter((i) => i.id !== prod.id));
    } else {
      if (boxItems.length < 3) {
        setBoxItems([...boxItems, prod]);
      }
    }
  };

  const handleAddBoxToBag = () => {
    boxItems.forEach((item) => {
      onAddToCart(item, 1);
    });
    setBoxAddedMessage(true);
    setTimeout(() => setBoxAddedMessage(false), 2500);
  };

  return (
    <section id="gifting-section" className="w-full bg-[#EDE7DD] py-16 sm:py-24 border-t border-[#DCD5C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hub Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1420] text-[#C9A461] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Gift size={13} />
            <span>The Gifting Atelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1F2B] font-light">
            Not sure where to start? <br />
            <span className="italic font-normal">We'll help you find the one.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#1A1F2B]/70 mt-3 font-light">
            Whether you’re choosing for a girlfriend, sister, best friend or yourself — our anti-tarnish pieces arrive packaged to make jaws drop.
          </p>
        </div>

        {/* 2-Column Grid: Left is Quiz, Right is Build-a-Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3-Step Interactive Quiz (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-[#DCD5C9] shadow-sm">
            {!quizSubmitted ? (
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E3DA]">
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-[#A63A32]" />
                    <span className="font-serif text-lg font-medium text-[#1A1F2B]">
                      The 30-Second Gifting Quiz
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#A63A32] uppercase tracking-wider">
                    Step {quizStep} of 3
                  </span>
                </div>

                {/* Step 1: Who is this for? */}
                {quizStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif text-xl text-[#1A1F2B]">
                      1. Who are you celebrating today?
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                          className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-24 ${
                            recipient === item.id
                              ? 'border-[#A63A32] bg-[#A63A32]/5 text-[#A63A32] font-semibold'
                              : 'border-[#E8E3DA] bg-white hover:border-[#C9A461]'
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-xs font-sans text-[#1A1F2B] font-medium leading-tight">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: What is your budget? */}
                {quizStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif text-xl text-[#1A1F2B]">
                      2. What is your comfortable budget?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'under-1000', label: 'Under ₹1,000', desc: 'Everyday Huggies & Rope Bands' },
                        { id: '1000-1800', label: '₹1,000 – ₹1,800', desc: 'Pearl Strands & Tulip Medallions' },
                        { id: 'above-1800', label: '₹1,800+', desc: 'Fine Edit Bangles & 3-Piece Sets' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setBudget(item.id);
                            setQuizStep(3);
                          }}
                          className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                            budget === item.id
                              ? 'border-[#A63A32] bg-[#A63A32]/5 text-[#A63A32] font-semibold'
                              : 'border-[#E8E3DA] bg-white hover:border-[#C9A461]'
                          }`}
                        >
                          <span className="font-serif text-base font-bold text-[#1A1F2B]">
                            {item.label}
                          </span>
                          <span className="text-xs font-sans text-[#1A1F2B]/60 leading-tight">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: What is her aesthetic / vibe? */}
                {quizStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif text-xl text-[#1A1F2B]">
                      3. What aesthetic matches her personal style?
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'paris', title: 'Parisian Chic', desc: 'Tailored blazers, oval chains, botanical enamel' },
                        { id: 'summer', title: 'Coastal Summer', desc: 'Freshwater pearls, delicate anklets, sun-kissed' },
                        { id: 'romance', title: 'Romantic Pastel', desc: 'Dainty heart drops, soft lilac gems, ribbon knots' },
                        { id: 'regal', title: 'Royal Regency', desc: 'Swan motifs, sapphire foliage, starlight bangles' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setVibe(item.id);
                            setQuizSubmitted(true);
                          }}
                          className={`p-4 rounded-xl text-left border transition-all ${
                            vibe === item.id
                              ? 'border-[#A63A32] bg-[#A63A32]/5 text-[#A63A32] font-semibold'
                              : 'border-[#E8E3DA] bg-white hover:border-[#C9A461]'
                          }`}
                        >
                          <span className="font-serif text-base font-bold text-[#1A1F2B] block">
                            {item.title}
                          </span>
                          <span className="text-xs font-sans text-[#1A1F2B]/60 mt-1 block">
                            {item.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back button for steps > 1 */}
                {quizStep > 1 && (
                  <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex justify-between">
                    <button
                      onClick={() => setQuizStep(quizStep - 1)}
                      className="text-xs text-[#1A1F2B]/70 hover:text-[#A63A32]"
                    >
                      ← Back to Step {quizStep - 1}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Results State */
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DA]">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32]">
                      Personalized Recommendations
                    </span>
                    <h3 className="font-serif text-xl text-[#1A1F2B] font-medium">
                      Curated For Your Special Gift
                    </h3>
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="text-xs text-[#A63A32] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getQuizRecommendations().map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white p-3 rounded-xl border border-[#E8E3DA] hover:border-[#C9A461] transition-all flex gap-3"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-lg object-cover bg-[#EDE7DD] shrink-0"
                      />
                      <div className="flex flex-col justify-between flex-1 min-w-0">
                        <div>
                          <h4 className="font-serif text-sm font-medium text-[#1A1F2B] line-clamp-1">
                            {prod.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#A63A32]">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onSelectProduct(prod)}
                            className="text-[11px] text-[#1A1F2B]/70 hover:underline"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onAddToCart(prod, 1)}
                            className="px-2.5 py-1 rounded-full bg-[#0E1420] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#A63A32] transition-colors"
                          >
                            + Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Build-A-Gift-Box (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0E1420] text-[#EDE7DD] p-6 sm:p-8 rounded-2xl border border-[#C9A461]/30 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#C9A461] mb-2">
                <Gift size={18} />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                  Custom Presentation
                </span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white">
                Build a Keepsake Gift Box
              </h3>
              <p className="text-xs text-[#EDE7DD]/70 mt-1 font-sans">
                Select 1 to 3 pieces. We assemble them in a luxury velvet box with an embossed ribbon and handwritten wax-sealed note.
              </p>

              {/* Box Color Selection */}
              <div className="mt-5">
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A461] mb-2 font-semibold">
                  1. Box Color Choice
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setBoxColor('navy')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                      boxColor === 'navy'
                        ? 'border-[#C9A461] bg-[#1A233A] text-white font-semibold'
                        : 'border-[#2A344A] text-[#EDE7DD]/60 hover:text-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#0E1420] border border-[#C9A461]"></span>
                    <span>Midnight Navy</span>
                  </button>
                  <button
                    onClick={() => setBoxColor('ivory')}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-2 transition-all ${
                      boxColor === 'ivory'
                        ? 'border-[#C9A461] bg-[#1A233A] text-white font-semibold'
                        : 'border-[#2A344A] text-[#EDE7DD]/60 hover:text-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#EDE7DD] border border-[#C9A461]"></span>
                    <span>Pearl Ivory</span>
                  </button>
                </div>
              </div>

              {/* Select Pieces for Box */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#C9A461] font-semibold">
                    2. Pick Pieces ({boxItems.length}/3 selected)
                  </label>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {PRODUCTS.slice(0, 5).map((prod) => {
                    const isSelected = boxItems.some((i) => i.id === prod.id);
                    return (
                      <div
                        key={prod.id}
                        onClick={() => handleToggleBoxItem(prod)}
                        className={`p-2 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'border-[#C9A461] bg-[#1A233A] text-white'
                            : 'border-[#2A344A] bg-[#141C2B] text-[#EDE7DD]/70 hover:border-[#C9A461]/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded object-cover"
                          />
                          <span className="truncate">{prod.name}</span>
                        </div>
                        <span className="font-semibold shrink-0 text-[#C9A461]">
                          {isSelected ? '✓ Added' : `+ ₹${prod.price}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Handwritten Card Note */}
              <div className="mt-5">
                <label className="block text-[11px] uppercase tracking-wider text-[#C9A461] mb-1.5 font-semibold">
                  3. Personalized Handwritten Card Note
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="w-full bg-[#141C2B] border border-[#2A344A] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#C9A461] font-serif italic"
                  placeholder="Enter your custom message here..."
                />
              </div>
            </div>

            {/* Box Action */}
            <div className="mt-6 pt-4 border-t border-[#2A344A]">
              <button
                disabled={boxItems.length === 0}
                onClick={handleAddBoxToBag}
                className={`w-full py-3.5 rounded-full text-xs font-medium uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2 ${
                  boxAddedMessage
                    ? 'bg-emerald-700 text-white'
                    : boxItems.length === 0
                    ? 'bg-[#2A344A] text-[#EDE7DD]/40 cursor-not-allowed'
                    : 'bg-[#A63A32] hover:bg-[#8e2e27] text-white'
                }`}
              >
                {boxAddedMessage ? (
                  <>
                    <Check size={16} />
                    <span>Gift Box Added To Bag!</span>
                  </>
                ) : (
                  <>
                    <Gift size={15} />
                    <span>
                      Add Curated Box ({boxItems.length} items)
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
