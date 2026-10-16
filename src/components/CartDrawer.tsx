import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Gift, ArrowRight, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Mail } from 'lucide-react';
import { CartItem } from '../types';
import { handleImageError } from '../utils/imageResolver';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 999;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [includeGiftWrapping, setIncludeGiftWrapping] = useState(false);
  const [includeGiftMessage, setIncludeGiftMessage] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState('');
  const [giftSender, setGiftSender] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [formData, setFormData] = useState({
    name: 'Varnika Mutha',
    email: 'varnikamutha2008@gmail.com',
    phone: '+91 98765 43210',
    address: 'B-402, Sea Pearl Residences, Bandra West',
    city: 'Mumbai',
    pincode: '400050'
  });

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const giftWrappingFee = includeGiftWrapping ? 99 : 0;
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const subtotalAfterDiscount = rawSubtotal - discountAmount;
  const isFreeShipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD || rawSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 99;
  const grandTotal = subtotalAfterDiscount + giftWrappingFee + (rawSubtotal > 0 ? shippingFee : 0);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount);
  const progressPercent = Math.min(100, (subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'MAINCHARACTER') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid code. Try code "MAINCHARACTER" for 10% off!');
    }
  };

  const handlePlaceOrder = () => {
    const generatedId = `NCR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF7F2] text-[#0E1420] h-full shadow-2xl flex flex-col justify-between border-l border-[#0E1420]/20">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#0E1420]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#A63A32]" />
            <h3 className="font-serif text-xl tracking-wide font-medium text-[#0E1420]">Your Shopping Bag</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#EDE7DD] text-[#0E1420] border border-[#0E1420]/20 font-semibold">
              {cart.reduce((c, i) => c + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#0E1420]/60 hover:text-[#0E1420] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Free Shipping Meter */}
        <div className="px-5 py-3.5 bg-[#EDE7DD] border-b border-[#0E1420]/15">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {isFreeShipping ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} />
                You unlocked FREE Pan-India Shipping!
              </span>
            ) : (
              <span className="text-[#0E1420]/90">
                Add <strong className="text-[#A63A32]">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
              </span>
            )}
            <span className="text-[10px] text-[#0E1420]/60 font-medium">Target: ₹999</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#0E1420]/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C98B7A] to-[#A63A32] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderComplete ? (
            /* Order Success State */
            <div className="py-12 px-4 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-serif text-2xl text-[#0E1420]">
                Thank You For Your Order!
              </h3>
              <p className="text-xs text-[#0E1420]/80 max-w-xs mx-auto">
                Your Nacre pieces are being lovingly packed into our signature velvet box. Order confirmation sent to {formData.email}.
              </p>
              <div className="p-3 bg-white rounded-xl border border-[#0E1420]/20 inline-block text-xs font-mono text-[#0E1420] font-semibold">
                Tracking ID: {orderId}
              </div>

              {(includeGiftWrapping || includeGiftMessage) && (
                <div className="p-4 bg-white rounded-xl border border-[#0E1420]/20 text-left space-y-2.5 max-w-sm mx-auto shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#A63A32]">
                    <Gift size={15} />
                    <span>Gifting Presentation Included</span>
                  </div>
                  {includeGiftWrapping && (
                    <p className="text-[11px] text-[#0E1420]/80 flex items-center gap-1.5">
                      <span className="text-emerald-700 font-bold">✓</span> Midnight navy velvet keepsake box with hand-tied gold ribbon
                    </p>
                  )}
                  {includeGiftMessage && (
                    <div className="pt-2 border-t border-[#0E1420]/10 text-xs">
                      <div className="text-[10px] uppercase font-sans tracking-widest text-[#A63A32] font-semibold mb-1">
                        Handwritten Note Card {giftRecipient ? `• To: ${giftRecipient}` : ''} {giftSender ? `• From: ${giftSender}` : ''}
                      </div>
                      <p className="font-serif italic text-[#0E1420] text-xs bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E2DDD2]">
                        "{giftNote || 'With warm love and blessings.'}"
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-full bg-[#A63A32] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8e2e27] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form Step */
            <div className="space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between pb-2 border-b border-[#0E1420]/15">
                <span className="font-serif text-base text-[#0E1420] font-medium">Express Shipping Address</span>
                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#A63A32] hover:underline font-medium"
                >
                  ← Edit Bag
                </button>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] text-[#0E1420]/75 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#0E1420]/75 mb-1 font-medium">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#0E1420]/75 mb-1 font-medium">Phone (for COD/Updates)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] text-[#0E1420]/75 mb-1 font-medium">Delivery Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#0E1420]/75 mb-1 font-medium">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#0E1420]/75 mb-1 font-medium">PIN Code</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-[#0E1420] focus:outline-none focus:border-[#0E1420]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-3 border-t border-[#0E1420]/15">
                <label className="block text-xs font-semibold text-[#0E1420] mb-2">
                  Select Payment Option (India-First)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#0E1420] bg-[#EDE7DD] text-[#0E1420] font-semibold'
                        : 'border-[#E2DDD2] bg-white text-[#0E1420]/75 hover:border-[#0E1420]/40'
                    }`}
                  >
                    <span className="block text-xs font-semibold">⚡ Instant UPI</span>
                    <span className="block text-[9px] text-[#0E1420]/60">GPay, PhonePe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#0E1420] bg-[#EDE7DD] text-[#0E1420] font-semibold'
                        : 'border-[#E2DDD2] bg-white text-[#0E1420]/75 hover:border-[#0E1420]/40'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Cards & Net</span>
                    <span className="block text-[9px] text-[#0E1420]/60">Visa, RuPay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-lg border text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#0E1420] bg-[#EDE7DD] text-[#0E1420] font-semibold'
                        : 'border-[#E2DDD2] bg-white text-[#0E1420]/75 hover:border-[#0E1420]/40'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Cash on Del.</span>
                    <span className="block text-[9px] text-[#0E1420]/60">₹0 extra fee</span>
                  </button>
                </div>
              </div>

              {/* Gifting Checkout Notice if selected */}
              {(includeGiftWrapping || includeGiftMessage) && (
                <div className="p-3 rounded-lg bg-white border border-[#0E1420]/20 text-xs space-y-1 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[#A63A32] font-semibold text-[11px]">
                    <Gift size={13} />
                    <span>Gifting Order Prepared</span>
                  </div>
                  {includeGiftWrapping && (
                    <p className="text-[10px] text-[#0E1420]/80">
                      • Midnight navy keepsake velvet box with gold ribbon (+₹99)
                    </p>
                  )}
                  {includeGiftMessage && (
                    <p className="text-[10px] text-[#0E1420]/80">
                      • Handwritten ivory gift note {giftRecipient ? `to ${giftRecipient}` : ''} {giftSender ? `from ${giftSender}` : ''}
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart */
            <div className="py-16 text-center space-y-3">
              <p className="font-serif text-lg text-[#0E1420]/70 italic">
                Nothing saved in your bag yet.
              </p>
              <p className="text-xs text-[#0E1420]/50">
                Go fall in love with something crafted to last.
              </p>
            </div>
          ) : (
            /* Items List */
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-3 bg-white p-3 rounded-xl border border-[#E2DDD2] shadow-sm"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, item.product.category)}
                      className="w-16 h-16 rounded-lg object-cover bg-[#EDE7DD] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-sm font-medium text-[#0E1420] leading-tight line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#0E1420]/40 hover:text-[#A63A32] transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        {item.selectedSize && (
                          <span className="text-[11px] text-[#A63A32] font-medium">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#E2DDD2] rounded-md bg-[#FAF7F2] text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-[#0E1420] hover:bg-[#EDE7DD]"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-[#0E1420] font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-[#0E1420] hover:bg-[#EDE7DD]"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-[#0E1420]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gifting Suite: Gift Wrapping & Gift Message Options */}
              <div id="gifting-options-container" className="p-4 rounded-xl border border-[#0E1420]/15 bg-[#EDE7DD] space-y-3.5">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#0E1420]/15">
                  <div className="flex items-center gap-2">
                    <Gift size={16} className="text-[#A63A32]" />
                    <h5 className="text-xs font-semibold text-[#0E1420] tracking-wide">
                      Purchasing As A Gift?
                    </h5>
                  </div>
                  <span className="text-[10px] text-[#A63A32] tracking-wider uppercase font-semibold">
                    Gifting Suite
                  </span>
                </div>

                {/* Option 1: Gift Wrapping Checkbox */}
                <label
                  htmlFor="gift-wrapping-checkbox"
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    includeGiftWrapping
                      ? 'border-[#0E1420] bg-white shadow-sm'
                      : 'border-[#E2DDD2] bg-white/70 hover:border-[#0E1420]/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    id="gift-wrapping-checkbox"
                    checked={includeGiftWrapping}
                    onChange={(e) => setIncludeGiftWrapping(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#E2DDD2] accent-[#0E1420] cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#0E1420]">
                        Add Signature Gift Wrapping
                      </span>
                      <span className="text-xs font-serif font-bold text-[#A63A32]">
                        +₹99
                      </span>
                    </div>
                    <p className="text-[10px] text-[#0E1420]/70 leading-relaxed mt-0.5">
                      Midnight navy velvet keepsake presentation box tied with gold satin ribbon and archival tissue.
                    </p>
                  </div>
                </label>

                {/* Option 2: Gift Message Checkbox */}
                <div className="space-y-2.5">
                  <label
                    htmlFor="gift-message-checkbox"
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      includeGiftMessage
                        ? 'border-[#0E1420] bg-white shadow-sm'
                        : 'border-[#E2DDD2] bg-white/70 hover:border-[#0E1420]/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="gift-message-checkbox"
                      checked={includeGiftMessage}
                      onChange={(e) => setIncludeGiftMessage(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#E2DDD2] accent-[#0E1420] cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0E1420] flex items-center gap-1.5">
                          <span>Add Handwritten Gift Message</span>
                          <Mail size={12} className="text-[#A63A32]" />
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Free
                        </span>
                      </div>
                      <p className="text-[10px] text-[#0E1420]/70 leading-relaxed mt-0.5">
                        Penned with calligraphic ink on textured cotton cardstock and sealed with our gold wax seal.
                      </p>
                    </div>
                  </label>

                  {/* Expandable Gift Note Editor */}
                  {includeGiftMessage && (
                    <div className="p-3 bg-white rounded-lg border border-[#0E1420]/20 space-y-2.5 animate-fade-in shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="gift-recipient-input" className="block text-[10px] text-[#0E1420]/75 mb-1 font-medium">
                            To (Recipient)
                          </label>
                          <input
                            type="text"
                            id="gift-recipient-input"
                            value={giftRecipient}
                            onChange={(e) => setGiftRecipient(e.target.value)}
                            placeholder="e.g., Belly"
                            className="w-full bg-[#FAF7F2] border border-[#E2DDD2] rounded-md px-2.5 py-1.5 text-xs text-[#0E1420] placeholder:text-[#0E1420]/40 focus:outline-none focus:border-[#0E1420]"
                          />
                        </div>
                        <div>
                          <label htmlFor="gift-sender-input" className="block text-[10px] text-[#0E1420]/75 mb-1 font-medium">
                            From (Sender)
                          </label>
                          <input
                            type="text"
                            id="gift-sender-input"
                            value={giftSender}
                            onChange={(e) => setGiftSender(e.target.value)}
                            placeholder="e.g., Conrad"
                            className="w-full bg-[#FAF7F2] border border-[#E2DDD2] rounded-md px-2.5 py-1.5 text-xs text-[#0E1420] placeholder:text-[#0E1420]/40 focus:outline-none focus:border-[#0E1420]"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label htmlFor="gift-message-textarea" className="text-[10px] text-[#0E1420]/75 font-medium">
                            Personalized Note
                          </label>
                          <span className="text-[9px] text-[#0E1420]/50 font-mono">
                            {giftNote.length}/200
                          </span>
                        </div>
                        <textarea
                          id="gift-message-textarea"
                          rows={2}
                          maxLength={200}
                          value={giftNote}
                          onChange={(e) => setGiftNote(e.target.value)}
                          placeholder="Type your heartfelt note to be handwritten..."
                          className="w-full bg-[#FAF7F2] border border-[#E2DDD2] rounded-md p-2 text-xs text-[#0E1420] placeholder:text-[#0E1420]/40 focus:outline-none focus:border-[#0E1420] resize-none"
                        />
                      </div>

                      {/* Quick Suggestions */}
                      <div>
                        <span className="block text-[9px] text-[#0E1420]/60 mb-1.5">
                          Quick message inspirations:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'Happy Birthday ✨',
                            'With All My Love 🤍',
                            'For Someone Special 🌸',
                            'A Little Magic For You 💫'
                          ].map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => setGiftNote(prompt)}
                              className="text-[10px] px-2.5 py-1 rounded-full bg-[#EDE7DD] hover:bg-[#E2DDD2] text-[#0E1420] border border-[#0E1420]/20 transition-colors whitespace-nowrap font-medium"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (MAINCHARACTER)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-white border border-[#E2DDD2] rounded-lg px-3 py-2 text-xs text-[#0E1420] placeholder-[#0E1420]/40 focus:outline-none focus:border-[#0E1420]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0E1420] hover:bg-[#1A233A] text-[#EDE7DD] text-xs font-semibold rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-sans font-medium">
                    <Sparkles size={12} />
                    MAINCHARACTER applied! (10% off entire order)
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-[#A63A32] mt-1 font-sans font-medium">
                    {promoError}
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer / Order Summary */}
        {!orderComplete && cart.length > 0 && (
          <div className="p-5 bg-[#EDE7DD] border-t border-[#0E1420]/15 space-y-3">
            <div className="space-y-1.5 text-xs text-[#0E1420]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>First-Order Discount (10%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              {includeGiftWrapping && (
                <div className="flex justify-between text-[#0E1420]">
                  <span>Signature Luxury Gift Wrapping</span>
                  <span className="text-[#A63A32] font-semibold">₹99</span>
                </div>
              )}

              {includeGiftMessage && (
                <div className="flex justify-between text-[#0E1420]">
                  <span>Handwritten Gift Message Card</span>
                  <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Pan-India Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : '₹99'}</span>
              </div>

              <div className="pt-2 border-t border-[#0E1420]/15 flex justify-between font-serif text-base font-bold text-[#0E1420]">
                <span>Grand Total</span>
                <span className="text-[#A63A32]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Button */}
            {isCheckingOut ? (
              <button
                id="place-order-btn"
                onClick={handlePlaceOrder}
                className="w-full py-3.5 rounded-full bg-[#A63A32] hover:bg-[#8e2e27] text-white text-xs uppercase font-bold tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm & Place Order (₹{grandTotal.toLocaleString('en-IN')})</span>
                <CheckCircle2 size={16} />
              </button>
            ) : (
              <button
                id="checkout-step-btn"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3.5 rounded-full bg-[#A63A32] hover:bg-[#8e2e27] text-white text-xs uppercase font-medium tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={15} />
              </button>
            )}

            <div className="flex items-center justify-center gap-4 text-[10px] text-[#0E1420]/60 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#A63A32]" />
                Secure 256-bit SSL
              </span>
              <span>•</span>
              <span>UPI / Cards / COD</span>
              <span>•</span>
              <span>7-Day Return</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
