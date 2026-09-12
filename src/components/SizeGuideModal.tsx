import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const RING_SIZES = [
  { us: 'US 5', inSize: 'Size 10', mm: '15.7 mm', circumference: '49.3 mm' },
  { us: 'US 6', inSize: 'Size 12', mm: '16.5 mm', circumference: '51.9 mm' },
  { us: 'US 7', inSize: 'Size 14', mm: '17.3 mm', circumference: '54.4 mm' },
  { us: 'US 8', inSize: 'Size 16', mm: '18.1 mm', circumference: '57.0 mm' },
  { us: 'US 9', inSize: 'Size 18', mm: '19.0 mm', circumference: '59.5 mm' }
];

const BRACELET_SIZES = [
  { label: 'Petite / Snug', wristCm: '14.0 - 15.5 cm', fits: 'Fits Seed Pearl Strand & delicate chains' },
  { label: 'Standard (Most Common)', wristCm: '15.5 - 17.5 cm', fits: 'Fits Starlight Bangle & Monaco Cuff' },
  { label: 'Relaxed / Layered', wristCm: '17.5 - 19.0 cm', fits: 'Use 4cm extender link on all chain bracelets' }
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  const [activeTab, setActiveTab] = useState<'rings' | 'bracelets'>(
    category === 'bracelets' ? 'bracelets' : 'rings'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0E1420] text-[#EDE7DD] border border-[#C9A461]/40 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#EDE7DD]/60 hover:text-white rounded-full transition-colors"
          aria-label="Close size guide"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-[#C9A461] mb-2">
          <Ruler size={20} />
          <span className="text-xs uppercase tracking-[0.2em] font-semibold">
            Nacre Fit & Sizing Studio
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#EDE7DD]">
          Find Your Perfect Fit
        </h2>
        <p className="text-xs sm:text-sm text-[#EDE7DD]/70 font-sans mt-1">
          Every Nacre piece is designed for comfortable daily wear with zero pinch or slip.
        </p>

        {/* Tabs */}
        <div className="flex border-b border-[#2A344A] mt-6 mb-6">
          <button
            onClick={() => setActiveTab('rings')}
            className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === 'rings' ? 'text-[#C9A461]' : 'text-[#EDE7DD]/60 hover:text-white'
            }`}
          >
            Ring Sizer
            {activeTab === 'rings' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A461]"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('bracelets')}
            className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === 'bracelets' ? 'text-[#C9A461]' : 'text-[#EDE7DD]/60 hover:text-white'
            }`}
          >
            Bangle & Bracelet Guide
            {activeTab === 'bracelets' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C9A461]"></span>
            )}
          </button>
        </div>

        {/* Content based on tab */}
        {activeTab === 'rings' ? (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#2A344A] text-[#C9A461] font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">US Size</th>
                    <th className="py-2.5 px-3">Indian Size</th>
                    <th className="py-2.5 px-3">Inner Diameter</th>
                    <th className="py-2.5 px-3">Circumference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A344A]/60">
                  {RING_SIZES.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#1A233A]/50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-white">{item.us}</td>
                      <td className="py-2.5 px-3 text-[#EDE7DD]">{item.inSize}</td>
                      <td className="py-2.5 px-3 text-[#EDE7DD]/80">{item.mm}</td>
                      <td className="py-2.5 px-3 text-[#C9A461]">{item.circumference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Measuring instructions */}
            <div className="bg-[#1A233A]/60 border border-[#2A344A] rounded-xl p-4 sm:p-5 text-xs text-[#EDE7DD]/80 space-y-2">
              <div className="font-semibold text-[#EDE7DD] text-sm flex items-center gap-2">
                <HelpCircle size={16} className="text-[#C9A461]" />
                How to measure your ring size at home:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-xs text-[#EDE7DD]/70">
                <li>Wrap a narrow strip of paper or non-stretchy string comfortably around your finger knuckle.</li>
                <li>Mark the exact point where the ends meet with a pen.</li>
                <li>Lay the string flat next to a metric ruler and measure the length in millimeters to find your Circumference above!</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-3">
              {BRACELET_SIZES.map((item, idx) => (
                <div key={idx} className="bg-[#1A233A]/60 border border-[#2A344A] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-base text-[#EDE7DD] font-medium">{item.label}</h4>
                    <p className="text-xs text-[#EDE7DD]/60">{item.fits}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#C9A461] bg-[#0E1420] px-3 py-1.5 rounded-full border border-[#C9A461]/30 self-start sm:self-auto">
                    {item.wristCm}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#1A233A]/60 border border-[#2A344A] rounded-xl p-4 text-xs text-[#EDE7DD]/80 space-y-2">
              <div className="font-semibold text-[#EDE7DD] text-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#C9A461]" />
                All chain bracelets include a 4cm adjustable extender:
              </div>
              <p className="text-xs text-[#EDE7DD]/70">
                You never have to stress about exact millimeters — our seed pearl strands and chain bracelets easily adjust between 16cm to 20cm.
              </p>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-[#2A344A] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#A63A32] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8e2e27] transition-colors"
          >
            Got It, Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
