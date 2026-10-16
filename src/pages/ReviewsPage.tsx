import React, { useState, useMemo } from 'react';
import { Product, ActivePage, UniverseId } from '../types';
import { PRODUCTS } from '../data/products';
import { UNIVERSE_EDITIONS } from '../data/universes';
import { handleImageError } from '../utils/imageResolver';
import {
  Star,
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  Search,
  Filter,
  Plus,
  X,
  Sparkles,
  ShieldCheck,
  Droplets,
  Heart,
  ArrowRight,
  Camera,
  Award
} from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  productId?: string;
  productName: string;
  universe?: UniverseId;
  images?: string[];
  helpfulCount: number;
  wearDuration: string;
  skinType?: string;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Ananya S.',
    location: 'Bandra, Mumbai',
    rating: 5,
    date: '3 days ago',
    verified: true,
    title: 'Survives daily showers & gym sweat without fading!',
    comment:
      'I was genuinely skeptical because every gold piece I bought online turned dark within a month. I have worn the Starlight Twisted Bangle every single day for 4 months — through hot showers, intense CrossFit workouts, and humid Mumbai monsoons. It literally looks as lustrous as the day it arrived in the mail.',
    productId: 'bangle-starlight-twisted',
    productName: 'The Starlight Twisted Bangle',
    images: [
      'https://images.unsplash.com/photo-1611591475870-7607a90b8535?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 42,
    wearDuration: '4 months daily wear',
    skinType: 'Sensitive skin'
  },
  {
    id: 'rev-2',
    name: 'Rhea Kapoor',
    location: 'Indiranagar, Bangalore',
    rating: 5,
    date: '1 week ago',
    verified: true,
    title: 'The Emily in Paris aesthetic is immaculate',
    comment:
      'The Parisian Tulip Enamel medallion is pure artistry. The packaging arrived in a midnight navy box with satin ribbons and embossed gold foil that felt like a ₹15,000 heirloom unboxing. Strangers on flights constantly stop and ask if it is vintage solid European gold.',
    productId: 'necklace-parisian-tulip',
    productName: 'Parisian Tulip Enamel Medallion',
    universe: 'emily-in-paris',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 38,
    wearDuration: '2 months',
    skinType: 'Normal'
  },
  {
    id: 'rev-3',
    name: 'Meera Patel',
    location: 'Vasant Vihar, Delhi',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    title: 'Zero allergic reaction — 100% hypoallergenic as claimed',
    comment:
      'I suffer from severe nickel dermatitis. Most demi-fine brands cause itchy red flare-ups around my neck within 20 minutes. Nacre’s surgical steel core with heavy 18K PVD gold coat gives me zero irritation even in peak Delhi heat. I am completely converted.',
    productId: 'necklace-capri-pearl',
    productName: 'Capri Seed Pearl Strand',
    helpfulCount: 29,
    wearDuration: '3 months daily',
    skinType: 'Extreme nickel allergy'
  },
  {
    id: 'rev-4',
    name: 'Tara Mukherjee',
    location: 'Kolkata, West Bengal',
    rating: 5,
    date: '3 weeks ago',
    verified: true,
    title: 'Wore it into the ocean in Goa — zero tarnish!',
    comment:
      'Took my Cousins Beach Infinity Charm Bangle on a 10-day trip to Goa. Swam in the Arabian Sea every morning, tanned on the beach, showered with sunscreen on. It did not fade, rust, or tarnish even 1%. Truly waterproof jewelry!',
    productId: 'bangle-cousins-infinity',
    productName: 'Cousins Beach Infinity Charm Bangle',
    universe: 'summer-i-turned-pretty',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
    ],
    helpfulCount: 51,
    wearDuration: '6 months',
    skinType: 'Normal'
  },
  {
    id: 'rev-5',
    name: 'Dr. Shruti Iyer',
    location: 'Anna Nagar, Chennai',
    rating: 5,
    date: '1 month ago',
    verified: true,
    title: 'As a surgeon who scrubs in 6 times a day, this is a miracle',
    comment:
      'Between harsh hospital antibacterial soaps, constant sanitizer, and latex gloves, all my other gold rings pitted and lost color. The Diamond Constellation Eternity Band has survived 70+ days in OT without a single scratch or tone change.',
    productId: 'ring-constellation-eternity',
    productName: 'Diamond Constellation Eternity Band',
    helpfulCount: 64,
    wearDuration: '70 days constant scrubs',
    skinType: 'Dry / sensitized'
  },
  {
    id: 'rev-6',
    name: 'Zoya Merchant',
    location: 'Juhu, Mumbai',
    rating: 5,
    date: '1 month ago',
    verified: true,
    title: 'Bridgerton era regal realness!',
    comment:
      'The Empress Filigree Teardrop Drops are so lightweight yet look heavy and dramatic. Wore them to a sangeet and danced all night — zero earlobe pain and so many compliments. Beautiful navy box presentation too.',
    productId: 'earrings-empress-teardrop',
    productName: 'Empress Filigree Teardrop Drops',
    universe: 'bridgerton',
    helpfulCount: 22,
    wearDuration: 'Special occasions',
    skinType: 'Sensitive lobes'
  },
  {
    id: 'rev-7',
    name: 'Pooja Reddy',
    location: 'Jubilee Hills, Hyderabad',
    rating: 4,
    date: '1 month ago',
    verified: true,
    title: 'Stunning craftsmanship, clasp takes a second to get used to',
    comment:
      'The gold tone is identical to 22K/18K solid jewelry, not that cheap brassy yellow. The magnetic box and travel pouch are so thoughtful. Only giving 4 stars because the mini safety clasp took me a day to figure out with long nails, but once on, it is ultra secure.',
    productId: 'bangle-starlight-twisted',
    productName: 'The Starlight Twisted Bangle',
    helpfulCount: 17,
    wearDuration: '3 weeks',
    skinType: 'Normal'
  },
  {
    id: 'rev-8',
    name: 'Kavya Singhania',
    location: 'Civil Lines, Jaipur',
    rating: 5,
    date: '2 months ago',
    verified: true,
    title: 'The perfect anniversary gift from my partner',
    comment:
      'My fiancé built a custom gift box from the Gifting Corner with three pieces. The handwritten wax-sealed letter was such a heart-melting touch. Every piece shines under candlelight.',
    productId: 'necklace-capri-pearl',
    productName: 'Capri Seed Pearl Strand',
    helpfulCount: 31,
    wearDuration: '2 months',
    skinType: 'Sensitive'
  }
];

interface ReviewsPageProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, qty: number) => void;
  onNavigatePage: (page: ActivePage) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  onSelectProduct,
  onAddToCart,
  onNavigatePage
}) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniverse, setSelectedUniverse] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'highest'>('recent');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Review Submission Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formProductId, setFormProductId] = useState(PRODUCTS[0]?.id || '');
  const [formSkinType, setFormSkinType] = useState('Sensitive');
  const [formSuccess, setFormSuccess] = useState(false);

  // Upvote Helpful
  const handleVoteHelpful = (id: string) => {
    if (helpfulVoted[id]) return;
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  // Submit Review Form
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formTitle.trim() || !formComment.trim()) return;

    const matchedProd = PRODUCTS.find((p) => p.id === formProductId);

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      location: formLocation.trim() || 'Verified Customer',
      rating: formRating,
      date: 'Just now',
      verified: true,
      title: formTitle.trim(),
      comment: formComment.trim(),
      productId: matchedProd?.id,
      productName: matchedProd?.name || 'Handcrafted Nacre Piece',
      universe: matchedProd?.universe,
      helpfulCount: 1,
      wearDuration: 'New wear test',
      skinType: formSkinType
    };

    setReviews([newRev, ...reviews]);
    setFormSuccess(true);
    setTimeout(() => {
      setIsSubmitModalOpen(false);
      setFormSuccess(false);
      setFormName('');
      setFormLocation('');
      setFormTitle('');
      setFormComment('');
    }, 1800);
  };

  // Filter & Sort
  const filteredReviews = useMemo(() => {
    return reviews
      .filter((rev) => {
        if (selectedRating !== 'all' && rev.rating !== Number(selectedRating)) {
          return false;
        }
        if (selectedUniverse !== 'all' && rev.universe !== selectedUniverse) {
          return false;
        }
        if (onlyPhotos && (!rev.images || rev.images.length === 0)) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = rev.title.toLowerCase().includes(q);
          const matchesComment = rev.comment.toLowerCase().includes(q);
          const matchesProd = rev.productName.toLowerCase().includes(q);
          const matchesName = rev.name.toLowerCase().includes(q);
          if (!matchesTitle && !matchesComment && !matchesProd && !matchesName) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
        if (sortBy === 'highest') return b.rating - a.rating;
        return 0; // recent preserves default/latest order
      });
  }, [reviews, selectedRating, selectedUniverse, onlyPhotos, searchQuery, sortBy]);

  // Overall Statistics
  const averageRating = 4.9;
  const totalVerifiedCount = 3428;

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#0E1420] pb-24">
      {/* 1. Editorial Header */}
      <section className="relative bg-[#EDE7DD] border-b border-[#0E1420]/15 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A461]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#0E1420]/10 text-xs font-semibold uppercase tracking-widest text-[#0E1420] mb-4">
            <Award size={14} className="text-[#A63A32]" />
            <span>Verified Collector Chronicles</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0E1420] font-light tracking-tight">
            Real Stories, Real Showers,{' '}
            <span className="italic font-normal text-[#A63A32]">Zero Tarnish.</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#0E1420]/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Over 12,000 collectors wear Nacre daily through gym sweat, monsoon showers, and saltwater dips. Here is what they have to say after months of continuous wear.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#0E1420]/10">
              <div className="flex items-center gap-1 text-[#C9A461]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-xl font-serif font-bold text-[#0E1420] mt-1">4.9 / 5.0</p>
              <p className="text-[11px] text-[#0E1420]/70 font-sans">3,428 Verified Ratings</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#0E1420]/10">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <ShieldCheck size={16} />
                <span className="text-xs font-bold uppercase">100% Guaranteed</span>
              </div>
              <p className="text-xl font-serif font-bold text-[#0E1420] mt-1">Anti-Tarnish</p>
              <p className="text-[11px] text-[#0E1420]/70 font-sans">Lifetime Color Promise</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#0E1420]/10">
              <div className="flex items-center gap-1.5 text-blue-700">
                <Droplets size={16} />
                <span className="text-xs font-bold uppercase">Waterproof</span>
              </div>
              <p className="text-xl font-serif font-bold text-[#0E1420] mt-1">Shower Safe</p>
              <p className="text-[11px] text-[#0E1420]/70 font-sans">Sweat & Ocean Resilient</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#0E1420]/10">
              <div className="flex items-center gap-1.5 text-amber-700">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase">Skin Safe</span>
              </div>
              <p className="text-xl font-serif font-bold text-[#0E1420] mt-1">Hypoallergenic</p>
              <p className="text-[11px] text-[#0E1420]/70 font-sans">316L Surgical Base</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rating Breakdown & Write Review CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#0E1420]/15 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Star Breakdown */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full lg:w-auto">
            <div className="text-center sm:text-left">
              <div className="font-serif text-5xl font-bold text-[#0E1420]">{averageRating}</div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C9A461] my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#0E1420]/70">Based on {totalVerifiedCount} reviews</p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-800 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-full">
                <CheckCircle size={12} />
                <span>99.2% Recommend Nacre</span>
              </div>
            </div>

            {/* Bars */}
            <div className="space-y-1.5 w-full sm:w-64">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 text-[#0E1420]/80">5 Stars</span>
                <div className="flex-1 h-2 rounded-full bg-[#E2DDD2] overflow-hidden">
                  <div className="h-full bg-[#0E1420] rounded-full w-[94%]"></div>
                </div>
                <span className="w-8 text-right font-medium">94%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 text-[#0E1420]/80">4 Stars</span>
                <div className="flex-1 h-2 rounded-full bg-[#E2DDD2] overflow-hidden">
                  <div className="h-full bg-[#0E1420] rounded-full w-[5%]"></div>
                </div>
                <span className="w-8 text-right font-medium">5%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 text-[#0E1420]/80">3 Stars</span>
                <div className="flex-1 h-2 rounded-full bg-[#E2DDD2] overflow-hidden">
                  <div className="h-full bg-[#0E1420] rounded-full w-[1%]"></div>
                </div>
                <span className="w-8 text-right font-medium">1%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 text-[#0E1420]/80">2 Stars</span>
                <div className="flex-1 h-2 rounded-full bg-[#E2DDD2] overflow-hidden">
                  <div className="h-full bg-[#0E1420] rounded-full w-[0%]"></div>
                </div>
                <span className="w-8 text-right font-medium">0%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 text-[#0E1420]/80">1 Star</span>
                <div className="flex-1 h-2 rounded-full bg-[#E2DDD2] overflow-hidden">
                  <div className="h-full bg-[#0E1420] rounded-full w-[0%]"></div>
                </div>
                <span className="w-8 text-right font-medium">0%</span>
              </div>
            </div>
          </div>

          {/* Right: Write Review CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0E1420] hover:bg-[#1A233A] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider shadow-md transition-all active:scale-95"
            >
              <Plus size={16} />
              <span>Write a Collector Review</span>
            </button>
            <button
              onClick={() => onNavigatePage('shop')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#EDE7DD] hover:bg-[#E2DDD2] text-[#0E1420] text-xs font-semibold uppercase tracking-wider border border-[#0E1420]/20 transition-all"
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Collector Customer Photo Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#A63A32] font-bold">
              Unboxing & Styling
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#0E1420]">
              Collector Photo Showcase
            </h3>
          </div>
          <button
            onClick={() => setOnlyPhotos(!onlyPhotos)}
            className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
              onlyPhotos
                ? 'bg-[#0E1420] text-[#FAF7F2] border-[#0E1420]'
                : 'bg-[#FAF7F2] text-[#0E1420] border-[#0E1420]/20 hover:border-[#0E1420]'
            }`}
          >
            {onlyPhotos ? '✓ Showing Photo Reviews' : 'Show Only Photo Reviews'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              src: 'https://images.unsplash.com/photo-1611591475870-7607a90b8535?auto=format&fit=crop&w=600&q=80',
              author: 'Ananya S., Mumbai',
              product: 'Starlight Twisted Bangle',
              prodId: 'bangle-starlight-twisted'
            },
            {
              src: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80',
              author: 'Rhea K., Bangalore',
              product: 'Parisian Tulip Medallion',
              prodId: 'necklace-parisian-tulip'
            },
            {
              src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
              author: 'Tara M., Goa',
              product: 'Cousins Beach Infinity Bangle',
              prodId: 'bangle-cousins-infinity'
            },
            {
              src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
              author: 'Zoya M., Mumbai',
              product: 'Empress Filigree Teardrop',
              prodId: 'earrings-empress-teardrop'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-[#0E1420]/15 shadow-sm bg-[#EDE7DD]"
            >
              <img
                src={item.src}
                alt={item.product}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                <p className="text-[11px] font-semibold truncate">{item.product}</p>
                <p className="text-[10px] text-white/80">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Filters & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#0E1420]/15 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0E1420]/50" />
            <input
              type="text"
              placeholder="Search reviews (e.g., shower, tarnish, ring)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F7F3EC] border border-[#0E1420]/20 rounded-full text-xs text-[#0E1420] placeholder-[#0E1420]/50 focus:outline-none focus:border-[#0E1420]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0E1420]/50 hover:text-[#0E1420]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Universe filter */}
            <select
              value={selectedUniverse}
              onChange={(e) => setSelectedUniverse(e.target.value)}
              className="bg-[#F7F3EC] border border-[#0E1420]/20 rounded-full px-3.5 py-2 text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
            >
              <option value="all">All Fictional Eras</option>
              {UNIVERSE_EDITIONS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title}
                </option>
              ))}
            </select>

            {/* Rating filter */}
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="bg-[#F7F3EC] border border-[#0E1420]/20 rounded-full px-3.5 py-2 text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
            >
              <option value="all">All Star Ratings</option>
              <option value="5">5 Stars Only</option>
              <option value="4">4 Stars Only</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#F7F3EC] border border-[#0E1420]/20 rounded-full px-3.5 py-2 text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
            >
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="highest">Highest Rating</option>
            </select>
          </div>
        </div>
      </section>

      {/* 5. Reviews List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-[#0E1420]/75">
            Showing <strong className="text-[#0E1420]">{filteredReviews.length}</strong> verified reviews
          </p>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="py-20 text-center bg-[#FAF7F2] rounded-3xl border border-[#0E1420]/15 space-y-3">
            <p className="font-serif text-xl text-[#0E1420]/70 italic">
              No reviews match your selected filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedUniverse('all');
                setSelectedRating('all');
                setOnlyPhotos(false);
              }}
              className="px-6 py-2 rounded-full bg-[#0E1420] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => {
              const matchedProduct = PRODUCTS.find((p) => p.id === rev.productId);

              return (
                <div
                  key={rev.id}
                  className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#0E1420]/15 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Header: Stars & Verified Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        <div className="flex text-[#C9A461]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={15} className="fill-current" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[#0E1420] ml-1">
                          {rev.rating}.0
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                            <CheckCircle size={12} />
                            Verified Buyer
                          </span>
                        )}
                        <span className="text-[11px] text-[#0E1420]/60">{rev.date}</span>
                      </div>
                    </div>

                    {/* Review Title */}
                    <h3 className="font-serif text-lg font-semibold text-[#0E1420] mb-2 leading-snug">
                      "{rev.title}"
                    </h3>

                    {/* Review Body */}
                    <p className="text-xs sm:text-sm text-[#0E1420]/80 font-sans leading-relaxed mb-4">
                      {rev.comment}
                    </p>

                    {/* Optional Images */}
                    {rev.images && rev.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {rev.images.map((img, i) => (
                          <div
                            key={i}
                            className="w-16 h-16 rounded-xl overflow-hidden border border-[#0E1420]/15 bg-[#EDE7DD]"
                          >
                            <img
                              src={img}
                              alt="Customer review piece"
                              referrerPolicy="no-referrer"
                              onError={handleImageError}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Wear Test Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px]">
                      {rev.wearDuration && (
                        <span className="inline-flex items-center gap-1 bg-[#EDE7DD] px-2.5 py-1 rounded-full text-[#0E1420]/80 font-medium">
                          <span>⏱ Tested: {rev.wearDuration}</span>
                        </span>
                      )}
                      {rev.skinType && (
                        <span className="inline-flex items-center gap-1 bg-[#EDE7DD] px-2.5 py-1 rounded-full text-[#0E1420]/80 font-medium">
                          <span>✦ Skin: {rev.skinType}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer with Product Tag & Helpful Counter */}
                  <div className="pt-4 border-t border-[#0E1420]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Customer Info & Purchased Piece */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#0E1420]">{rev.name}</span>
                        <span className="text-[11px] text-[#0E1420]/60">· {rev.location}</span>
                      </div>
                      {matchedProduct ? (
                        <button
                          onClick={() => onSelectProduct(matchedProduct)}
                          className="mt-1 text-[11px] text-[#A63A32] hover:underline font-medium flex items-center gap-1"
                        >
                          <span>Item: {matchedProduct.name}</span>
                          <ArrowRight size={11} />
                        </button>
                      ) : (
                        <p className="mt-0.5 text-[11px] text-[#0E1420]/60">
                          Purchased: {rev.productName}
                        </p>
                      )}
                    </div>

                    {/* Helpful Button */}
                    <button
                      onClick={() => handleVoteHelpful(rev.id)}
                      disabled={helpfulVoted[rev.id]}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        helpfulVoted[rev.id]
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-[#EDE7DD] hover:bg-[#E2DDD2] text-[#0E1420] border border-[#0E1420]/15'
                      }`}
                    >
                      <ThumbsUp size={13} />
                      <span>
                        {helpfulVoted[rev.id] ? 'Helpful (' + rev.helpfulCount + ')' : 'Helpful (' + rev.helpfulCount + ')'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 6. Write Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] text-[#0E1420] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#0E1420]/20 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#EDE7DD] text-[#0E1420] transition-colors"
            >
              <X size={20} />
            </button>

            {formSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-2xl text-[#0E1420]">
                  Thank You, Collector!
                </h3>
                <p className="text-xs text-[#0E1420]/80 max-w-xs mx-auto">
                  Your verified review has been submitted to the community gallery.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="text-center mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63A32]">
                    Nacre Community
                  </span>
                  <h3 className="font-serif text-2xl text-[#0E1420] mt-1">
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-[#0E1420]/70 mt-1">
                    Help fellow jewelry lovers know how your pieces hold up.
                  </p>
                </div>

                {/* Rating Select */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E1420] mb-1.5 text-center">
                    Overall Rating
                  </label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className={`p-1.5 transition-transform hover:scale-110 ${
                          formRating >= star ? 'text-[#C9A461]' : 'text-gray-300'
                        }`}
                      >
                        <Star size={26} className="fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Select */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E1420] mb-1">
                    Piece You Purchased
                  </label>
                  <select
                    value={formProductId}
                    onChange={(e) => setFormProductId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3EC] border border-[#0E1420]/20 rounded-xl text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{p.price.toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0E1420] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya S."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#F7F3EC] border border-[#0E1420]/20 rounded-xl text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0E1420] mb-1">
                      Location / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bandra, Mumbai"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#F7F3EC] border border-[#0E1420]/20 rounded-xl text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                    />
                  </div>
                </div>

                {/* Review Headline */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E1420] mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wore it every single day for 3 months!"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F7F3EC] border border-[#0E1420]/20 rounded-xl text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                  />
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E1420] mb-1">
                    Your Honest Feedback
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the weight, shine, shower resistance, skin feel, or packaging..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F7F3EC] border border-[#0E1420]/20 rounded-xl text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                  ></textarea>
                </div>

                {/* Skin Sensitivity Tag */}
                <div>
                  <label className="block text-xs font-semibold text-[#0E1420] mb-1">
                    Skin Sensitivity
                  </label>
                  <select
                    value={formSkinType}
                    onChange={(e) => setFormSkinType(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F7F3EC] border border-[#0E1420]/20 rounded-xl text-xs text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                  >
                    <option value="Sensitive">Sensitive (prone to nickel itch)</option>
                    <option value="Severe allergy">Severe metal allergy</option>
                    <option value="Normal">Normal skin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#0E1420] hover:bg-[#1A233A] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Submit Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
