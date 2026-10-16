import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { handleImageError } from '../utils/imageResolver';
import {
  ShieldCheck,
  Droplets,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle,
  X,
  Heart
} from 'lucide-react';

interface JournalCraftPageProps {
  onSelectProduct: (product: Product) => void;
  onNavigatePage: (page: 'shop' | 'fictional-era' | 'gifting') => void;
}

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
    title: 'The French Girl’s Secret to Effortless Ring Stacking',
    category: 'Styling Handbook',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Forget symmetrical pairing. Why Parisiennes mix twisted croissant bands with barely-there plain wires — and how to master proportions on both hands without looking cluttered.',
    content: [
      'The biggest myth in contemporary styling is that every finger needs equal weight. Parisian jewelers operate on an asymmetrical rule of thirds: anchor your index finger with a sculptural, architectural statement band (like our Knot of Monaco Crossover Bangle or Croissant Dome Ring), leave the middle finger bare or crowned with a flush wire, and nestle a textured midi on the ring finger.',
      'Always leave negative space. When your hands gesture during an animated coffee debate or reach for your morning espresso, the sliver of bare skin between 18k yellow gold layers catches light far more dramatically than a solid block of metal.',
      'Mix textures, not metals. Combine high-polish mirror finishes with braided twisted wire or pave crystal micro-huggies. That subtle tactile contrast makes your jewelry look collected over memorable trips rather than purchased in a set.'
    ],
    featuredProductId: 'monaco-cuff-03'
  },
  {
    id: 'pvd-science',
    title: 'Can You Really Shower and Swim in PVD Gold? A Metallurgist Explains',
    category: 'Material Science',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Traditional gold-dipped fashion brass dissolves within weeks of ocean salt or gym sweat. Here is the quantum physics behind Physical Vapor Deposition and why Nacre never greens your skin.',
    content: [
      'Standard fashion jewelry is dipped in a liquid galvanic bath that deposits a fragile layer of gold measuring less than 0.1 microns over base copper or brass. The moment water or skin acidity penetrates that microscopic film, copper ions oxidize, creating the infamous green skin stain and tarnishing into dull bronze.',
      'At Nacre, we utilize Physical Vapor Deposition (PVD). Inside an industrial vacuum chamber heated to 400°C, high-grade 316L surgical stainless steel is bombarded with real 18-karat gold vapor. The gold atoms do not just sit on top — they vapor-deposit and molecularly fuse directly into the lattice structure of the steel core.',
      'The result is a surface 10 times thicker than standard flash plating that is chemically inert. Pool chlorine, beach saltwater, sauna heat, workout sweat, and perfumes cannot breach this metallurgical bond. That is why our lifetime anti-tarnish commitment is not marketing — it is fundamental chemistry.'
    ],
    featuredProductId: 'aurora-heart-06'
  },
  {
    id: 'layering-rules',
    title: 'How to Layer Necklaces Without Tangling: The 3-Length Formula',
    category: 'Jewelry Care & Wear',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Nothing ruins an outfit faster than three chains knotted into an impossible knot by lunchtime. Here is the foolproof graduated weight formula our Mumbai stylists swear by.',
    content: [
      'Necklaces tangle when chains of similar weight and link gauge brush against each other at identical pivot points. When you turn your head, friction locks the links together into a bird’s nest.',
      'The solution is the Graduated Weight Formula: 1. Base Anchor (14-15 inches): Start closest to the collarbone with a lightweight textured choker or delicate freshwater seed pearl strand that stays flush to the skin. 2. Intermediate Focal (16-18 inches): Add a chain with distinct link architecture, like our paperclip oval link. 3. Weighted Drop (20-22 inches): Finish with a pendant that has enough gravitas (like our Jardin Tulip Medallion or Pavé Swan) to keep vertical tension.',
      'Because each layer possesses a different gravitational center and link shape, they float past one another smoothly throughout the day.'
    ],
    featuredProductId: 'starlight-bangle-01'
  }
];

export const JournalCraftPage: React.FC<JournalCraftPageProps> = ({
  onSelectProduct,
  onNavigatePage
}) => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const getFeaturedProduct = (productId: string) => {
    return PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  };

  return (
    <div className="w-full bg-[#F7F3EC] text-[#0E1420] min-h-screen">
      {/* 1. Page Header */}
      <section className="relative w-full bg-[#EDE7DD] border-b border-[#0E1420]/15 py-14 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F7F3EC] border border-[#0E1420]/20 text-xs font-semibold text-[#0E1420] uppercase tracking-[0.25em] mb-4 shadow-sm">
            <BookOpen size={13} className="text-[#A63A32]" />
            <span>The Nacre Journal & Craft Studio</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0E1420] font-light tracking-tight leading-tight">
            Crafted for real life. <br />
            <span className="italic text-[#A63A32] font-normal">Stories, science & styling.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#0E1420]/80 mt-4 max-w-2xl mx-auto font-light leading-relaxed">
            We believe you shouldn't have to choose between precious fine jewelry that requires a bank vault or cheap fashion jewelry that turns your skin green. Discover how our vacuum PVD metallurgy changes everything.
          </p>
        </div>
      </section>

      {/* 2. The Metallurgy Science & Craft Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A63A32]">
            Engineering Excellence
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#0E1420] mt-1 font-light">
            Why Nacre never tarnishes or turns green.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#0E1420]/75 mt-2">
            The difference between disposable fast fashion and demi-fine jewelry you never have to take off.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E2DDD2] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EDE7DD] border border-[#0E1420]/15 flex items-center justify-center text-[#A63A32] mb-5">
                <Layers size={22} />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#0E1420] mb-2">
                10x Thicker 18k Real Gold
              </h3>
              <p className="text-xs text-[#0E1420]/75 font-sans leading-relaxed">
                Traditional fashion jewelry uses less than 0.1 microns of flash plating. Nacre uses vacuum Physical Vapor Deposition to bind genuine 18-karat gold at molecular thickness directly onto surgical steel.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0E1420]/10 text-[11px] text-[#A63A32] font-semibold">
              ✦ Molecular vacuum bond
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E2DDD2] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EDE7DD] border border-[#0E1420]/15 flex items-center justify-center text-[#A63A32] mb-5">
                <Droplets size={22} />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#0E1420] mb-2">
                100% Waterproof & Gym-Safe
              </h3>
              <p className="text-xs text-[#0E1420]/75 font-sans leading-relaxed">
                Shower, swim in the sea, sprint in high humidity, and spritz your signature perfume without fear. Our pieces are chemically impervious to salt, sweat, chlorine, and soap.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0E1420]/10 text-[11px] text-[#A63A32] font-semibold">
              ✦ Zero tarnishing, forever
            </div>
          </div>

          <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E2DDD2] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EDE7DD] border border-[#0E1420]/15 flex items-center justify-center text-[#A63A32] mb-5">
                <ShieldCheck size={22} />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#0E1420] mb-2">
                Hypoallergenic & Nickel-Free
              </h3>
              <p className="text-xs text-[#0E1420]/75 font-sans leading-relaxed">
                Every Nacre piece begins with a medical-grade 316L stainless steel foundation. Free of toxic nickel and lead, our jewelry will never turn sensitive skin green or cause itchiness.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0E1420]/10 text-[11px] text-[#A63A32] font-semibold">
              ✦ Safe for sensitive ears & skin
            </div>
          </div>
        </div>

        {/* Metallurgy Comparison Table */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E2DDD2] p-6 sm:p-10 shadow-sm overflow-x-auto">
          <h3 className="font-serif text-xl sm:text-2xl font-light text-[#0E1420] mb-6 text-center">
            How Nacre Compares to Other Jewelry
          </h3>
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#0E1420]/15 text-[#A63A32] font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4 bg-[#EDE7DD] rounded-t-xl text-[#0E1420]">Nacre Demi-Fine</th>
                <th className="py-3 px-4">Fast Fashion Brands</th>
                <th className="py-3 px-4">Traditional Solid Gold</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0E1420]/10 font-sans">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0E1420]">Gold Layer Quality</td>
                <td className="py-3.5 px-4 bg-[#EDE7DD]/60 font-semibold text-[#0E1420]">18k Real Gold PVD Vacuum Plated</td>
                <td className="py-3.5 px-4 text-[#0E1420]/60">Micro Flash Dip (&lt;0.05μm)</td>
                <td className="py-3.5 px-4 text-[#0E1420]/80">14k / 18k Solid Metal</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0E1420]">Water & Shower Safe</td>
                <td className="py-3.5 px-4 bg-[#EDE7DD]/60 font-semibold text-emerald-700">✓ 100% Shower, Pool & Ocean Safe</td>
                <td className="py-3.5 px-4 text-red-600">✗ Tarnishes within 2-3 wears</td>
                <td className="py-3.5 px-4 text-emerald-700">✓ Safe (scratches easily)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0E1420]">Green Skin Reaction</td>
                <td className="py-3.5 px-4 bg-[#EDE7DD]/60 font-semibold text-emerald-700">✓ Zero Green Skin (Nickel Free)</td>
                <td className="py-3.5 px-4 text-red-600">✗ Brass oxidizes green</td>
                <td className="py-3.5 px-4 text-emerald-700">✓ No green skin</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#0E1420]">Price Point</td>
                <td className="py-3.5 px-4 bg-[#EDE7DD]/60 font-semibold text-[#A63A32]">₹699 – ₹1,899 (Accessible Luxury)</td>
                <td className="py-3.5 px-4 text-[#0E1420]/60">₹399 – ₹899 (Disposable)</td>
                <td className="py-3.5 px-4 text-[#0E1420]/80">₹25,000 – ₹1,50,000+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. The Nacre Journal Editorial Articles */}
      <section className="w-full bg-[#EDE7DD] py-16 sm:py-24 border-t border-[#0E1420]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A63A32]">
              Curated by Mumbai Studio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0E1420] mt-1 font-light">
              Stories, styling rules & inspiration.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article) => {
              const featuredProd = getFeaturedProduct(article.featuredProductId);

              return (
                <article
                  key={article.id}
                  className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-[#E2DDD2] hover:border-[#0E1420]/40 transition-all hover:shadow-md"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-[#EDE7DD]">
                      <img
                        src={article.image}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, 'default')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-[#0E1420]/50 mb-2">
                        <span className="text-[#A63A32] uppercase tracking-wider font-semibold text-[10px]">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#0E1420] leading-snug group-hover:text-[#A63A32] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#0E1420]/70 font-sans mt-2.5 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#F2ECE3]">
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#0E1420] group-hover:text-[#A63A32] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <button
                      onClick={() => onSelectProduct(featuredProd)}
                      className="text-[11px] text-[#A63A32] hover:underline font-medium truncate max-w-[140px]"
                    >
                      ✦ Shop Piece
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#FAF7F2] text-[#0E1420] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-[#E2DDD2]">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 text-[#0E1420]/60 hover:text-black rounded-full"
            >
              <X size={20} />
            </button>

            <span className="text-xs uppercase font-bold tracking-widest text-[#A63A32]">
              {activeArticle.category} · {activeArticle.readTime}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#0E1420] mt-2 mb-4 leading-tight">
              {activeArticle.title}
            </h3>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, 'default')}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-[#0E1420]/85 font-sans leading-relaxed">
              {activeArticle.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Embedded Buy Button in Article */}
            <div className="mt-8 p-4 bg-white rounded-2xl border border-[#E8E3DA] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={getFeaturedProduct(activeArticle.featuredProductId).images[0]}
                  alt="Featured piece"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, getFeaturedProduct(activeArticle.featuredProductId).category)}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A63A32] font-semibold block">
                    Featured in this article
                  </span>
                  <span className="font-serif text-sm font-medium text-[#0E1420]">
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

      {/* 4. Bottom Page CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#E2DDD2] max-w-3xl mx-auto shadow-sm">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1420] font-light">
            Ready to find your everyday pieces?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#0E1420]/75 mt-2 max-w-md mx-auto">
            Explore our best-sellers or find your aesthetic capsule across our cinematic fictional eras.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigatePage('shop')}
              className="px-6 py-3 rounded-full bg-[#0E1420] hover:bg-[#1A233A] text-[#EDE7DD] text-xs font-semibold uppercase tracking-widest transition-all shadow-md"
            >
              Shop All Jewellery
            </button>
            <button
              onClick={() => onNavigatePage('fictional-era')}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#EDE7DD] text-[#0E1420] text-xs font-semibold uppercase tracking-widest border border-[#0E1420]/20 transition-colors flex items-center gap-1.5"
            >
              <Sparkles size={13} className="text-[#A63A32]" />
              <span>Explore Fictional Eras</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
