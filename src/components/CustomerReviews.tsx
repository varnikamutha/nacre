import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Ananya S.',
    location: 'Bandra, Mumbai',
    rating: 5,
    verified: true,
    title: 'Survives daily showers & gym sweat!',
    comment:
      'I was so skeptical because every gold piece I bought online turned green within a month. I have worn the Starlight Twisted Bangle every single day for 4 months — through hot showers, crossfit workouts, and humid Mumbai monsoons. It literally looks brand new.',
    productName: 'The Starlight Twisted Bangle',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Rhea K.',
    location: 'Indiranagar, Bangalore',
    rating: 5,
    verified: true,
    title: 'The Emily in Paris vibes are immaculate',
    comment:
      'The Parisian Tulip Enamel piece is pure art. The packaging arrived in a midnight navy box that looked like it cost ₹5,000. People constantly ask me if it’s solid vintage gold from Europe.',
    productName: 'Parisian Tulip Enamel Medallion',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Meera P.',
    location: 'Vasant Vihar, Delhi',
    rating: 5,
    verified: true,
    title: 'Zero allergic reaction, 100% skin safe',
    comment:
      'I have severe nickel sensitivity and usually get itchy red hives within 30 minutes of wearing fashion jewellery. Nacre’s surgical steel and silver base feels like nothing on my skin. Lifelong customer now!',
    productName: 'Capri Seed Pearl Strand',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80'
  }
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="w-full bg-[#0E1420] text-[#EDE7DD] py-16 sm:py-20 border-t border-[#2A344A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C9A461]">
            Real Wearers · Verified Results
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white mt-1 font-light">
            Loved by 12,000+ daily jewelry lovers.
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-[#C9A461]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-white">4.9 / 5.0 Average Rating</span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#141C2B] p-6 rounded-2xl border border-[#2A344A] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#C9A461]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle size={12} />
                    Verified Buyer
                  </span>
                </div>

                <h4 className="font-serif text-base font-semibold text-white mb-2">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[#EDE7DD]/80 font-sans leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A344A] flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#C9A461]/30"
                />
                <div>
                  <h5 className="text-xs font-semibold text-white">{rev.name}</h5>
                  <p className="text-[11px] text-[#EDE7DD]/50">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
