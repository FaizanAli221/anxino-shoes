import React, { useState } from "react";
import { ArrowLeft, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Sparkles, Ban, MessageCircle } from "lucide-react";

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

export default function ProductDetailPage({
  product,
  onBack,
  onAddToBag,
  onStartDirectCheckout,
  onToggleWishlist,
  isWishlisted,
}) {
  const isSoldOut = Boolean(product.isOutOfStock);
  const sizes = product.sizes || [36, 37, 38, 39, 40, 41];
  const outOfStockSizes = product.outOfStock || [];

  const availableSizes = sizes.filter((s) => !outOfStockSizes.includes(s));
  const [selectedSize, setSelectedSize] = useState(
    availableSizes.length > 0 ? availableSizes[0] : sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const title = product.title || product.name;

  const handleAdd = () => {
    if (isSoldOut) return;
    onAddToBag(product, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    if (isSoldOut) return;
    onAddToBag(product, selectedSize, quantity);
    onStartDirectCheckout();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-pink-600 transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        <span>Back to Collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left Column: Image Preview */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm">
            {product.image ? (
              <img
                src={product.image}
                alt={title}
                className={`w-full h-full object-cover object-center ${isSoldOut ? "grayscale-20" : ""}`}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-100 to-amber-100 flex items-center justify-center p-8 text-center">
                <span className="font-serif text-2xl text-neutral-700">{title}</span>
              </div>
            )}

            {isSoldOut ? (
              <span className="absolute top-4 left-4 bg-neutral-900 text-white text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-md shadow-md border border-neutral-700">
                Out of Stock
              </span>
            ) : product.badge ? (
              <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow">
                {product.badge}
              </span>
            ) : null}

            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-md transition-transform active:scale-90"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className={isWishlisted ? "fill-pink-600 text-pink-600" : "text-neutral-700"}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
                {product.category || "Footwear"} · SKU: {product.sku || "AW-001"}
              </span>
              {isSoldOut && (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded">
                  Sold Out
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-neutral-900 mt-1">
              {title}
            </h1>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={16}
                    className={n <= Math.round(product.rating || 5) ? "fill-current" : "text-gray-200"}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-600 font-medium">
                {product.rating || 4.8} ({product.reviews || 25} Customer Reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 p-4 bg-pink-50/50 rounded-xl border border-pink-100">
            <span className="text-2xl font-bold text-neutral-900">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm text-neutral-400 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
                <span className="px-2 py-0.5 bg-pink-600 text-white text-xs font-bold rounded">
                  Save {product.discountPercent || 35}% OFF
                </span>
              </>
            )}
            <span className={`text-[11px] ml-auto font-medium ${isSoldOut ? "text-red-600 font-bold" : "text-green-700"}`}>
              {isSoldOut ? "Temporarily Out of Stock" : "In Stock · Fast Courier Dispatch"}
            </span>
          </div>

          {/* Out of Stock Notice Banner */}
          {isSoldOut && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-800">
              <Ban size={18} className="shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong className="block font-bold">This pair is currently sold out!</strong>
                <span>We are producing a fresh batch at our workshops. Contact us on WhatsApp to reserve yours when restocked.</span>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {product.description ||
              "Handcrafted with precision using high-grade materials, ergonomic memory foam footbeds, and flexible anti-skid outsoles designed for Pakistani women's lifestyles."}
          </p>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Select EU Size:
              </label>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-xs text-pink-600 hover:underline font-semibold"
              >
                Size Guide & Measurement Chart
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((sz) => {
                const disabled = isSoldOut || outOfStockSizes.includes(sz);
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    disabled={disabled}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-11 rounded-lg border text-xs font-bold transition-all ${
                      disabled
                        ? "border-gray-200 text-gray-300 line-through cursor-not-allowed bg-gray-50"
                        : isSelected
                        ? "border-pink-600 bg-pink-600 text-white shadow-sm scale-105"
                        : "border-gray-300 text-neutral-700 hover:border-neutral-900 bg-white"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity selector (disabled if sold out) */}
          {!isSoldOut && (
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-neutral-600 hover:bg-gray-100 text-sm font-semibold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-neutral-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-neutral-600 hover:bg-gray-100 text-sm font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            {isSoldOut ? (
              <>
                <button
                  disabled
                  className="w-full py-3.5 bg-gray-300 text-gray-500 text-sm font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Ban size={18} />
                  <span>Sold Out (Currently Unavailable)</span>
                </button>
                <a
                  href={`https://wa.me/923128492061?text=Hi%20Anxino%20Walk,%20please%20notify%20me%20when%20${encodeURIComponent(title)}%20is%20back%20in%20stock.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  <span>Inquire Restock Date on WhatsApp</span>
                </a>
              </>
            ) : (
              <>
                <button
                  onClick={handleAdd}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  <span>Add To Shopping Bag (Size {selectedSize})</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles size={18} />
                  <span>Buy Now (Cash on Delivery)</span>
                </button>
              </>
            )}

            {addedToast && (
              <div className="p-2.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg flex items-center justify-center gap-1.5 font-semibold animate-fade-in">
                <Check size={16} /> Added {quantity} item(s) to your shopping bag!
              </div>
            )}
          </div>

          {/* Value Props */}
          <div className="border-t border-gray-200 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-pink-600 shrink-0" />
              <span>Free delivery $\ge$ Rs. 3,500</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-pink-600 shrink-0" />
              <span>Open Parcel Available</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-pink-600 shrink-0" />
              <span>7-Day Size Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-serif text-lg text-neutral-900">Footwear Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-neutral-400 hover:text-neutral-700">
                ✕
              </button>
            </div>
            <p className="text-xs text-neutral-600">
              Pakistani standard women sizes correspond directly to EU sizing:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-700">
                    <th className="p-2 border">PK / EU</th>
                    <th className="p-2 border">Foot Length (cm)</th>
                    <th className="p-2 border">US Equivalent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border font-bold">36</td><td className="p-2 border">22.5 cm</td><td className="p-2 border">5.5</td></tr>
                  <tr><td className="p-2 border font-bold">37</td><td className="p-2 border">23.2 cm</td><td className="p-2 border">6.5</td></tr>
                  <tr><td className="p-2 border font-bold">38</td><td className="p-2 border">24.0 cm</td><td className="p-2 border">7.5</td></tr>
                  <tr><td className="p-2 border font-bold">39</td><td className="p-2 border">24.8 cm</td><td className="p-2 border">8.5</td></tr>
                  <tr><td className="p-2 border font-bold">40</td><td className="p-2 border">25.5 cm</td><td className="p-2 border">9.0</td></tr>
                  <tr><td className="p-2 border font-bold">41</td><td className="p-2 border">26.2 cm</td><td className="p-2 border">10.0</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
