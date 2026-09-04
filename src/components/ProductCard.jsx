import React, { useState } from "react";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

const percentOff = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export default function ProductCard({
  product,
  onAddToBag,
  onToggleWishlist,
  isWishlisted,
  onViewDetails,
}) {
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = product.discountPercent || percentOff(product.price, product.originalPrice);
  const colors = product.colors && product.colors.length > 0 ? product.colors : ["blush", "black"];
  const activeColor = colors[colorIndex] || "blush";
  const sizes = product.sizes || [36, 37, 38, 39, 40, 41];
  const outOfStock = product.outOfStock || [];
  const title = product.title || product.name;

  return (
    <article
      className="group relative flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 cursor-pointer">
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={title}
            onError={() => setImgError(true)}
            onClick={() => onViewDetails(product)}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            onClick={() => onViewDetails(product)}
            className="w-full h-full bg-gradient-to-br from-rose-100 to-amber-50 flex items-center justify-center p-4 text-center cursor-pointer"
          >
            <span className="font-serif text-sm text-neutral-600 font-medium">
              {title}
            </span>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 bg-pink-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm transition-transform active:scale-90"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-pink-600 text-pink-600" : "text-neutral-700"}
          />
        </button>

        {/* Quick View Button */}
        <button
          onClick={() => onViewDetails(product)}
          className={`absolute top-11 right-2.5 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm transition-all duration-200 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
          }`}
          title="Quick View Details"
        >
          <Eye size={16} className="text-neutral-700 hover:text-pink-600" />
        </button>

        {/* Add to bag quick action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToBag(product, selectedSize || sizes[0]);
          }}
          className={`absolute inset-x-3 bottom-3 bg-neutral-900 text-white text-xs font-semibold py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg ${
            hovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none sm:pointer-events-auto"
          }`}
        >
          <ShoppingBag size={14} />
          Quick Add {selectedSize ? `(Size ${selectedSize})` : ""}
        </button>
      </div>

      <div className="p-3.5 flex flex-col flex-1">
        <span className="text-[10px] text-pink-600 font-semibold tracking-wider uppercase">
          {product.category || "Footwear"}
        </span>

        <h3
          onClick={() => onViewDetails(product)}
          className="mt-1 text-sm font-semibold text-neutral-900 leading-snug line-clamp-1 hover:text-pink-600 cursor-pointer transition-colors"
        >
          {title}
        </h3>

        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={12}
                className={n <= Math.round(product.rating || 5) ? "fill-current" : "text-gray-200"}
              />
            ))}
          </div>
          <span className="text-[11px] text-neutral-400">({product.reviews || 12})</span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-bold text-neutral-900">
            {formatPKR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-xs text-neutral-400 line-through">
                {formatPKR(product.originalPrice)}
              </span>
              <span className="text-[11px] font-semibold text-pink-600">
                -{discount}%
              </span>
            </>
          )}
        </div>

        {/* Sizes row */}
        <div className="mt-3 flex flex-wrap gap-1">
          {sizes.map((sz) => {
            const isOut = outOfStock.includes(sz);
            const isSelected = selectedSize === sz;
            return (
              <button
                key={sz}
                disabled={isOut}
                onClick={() => setSelectedSize(isSelected ? null : sz)}
                className={`text-[10px] w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                  isOut
                    ? "border-gray-100 text-gray-300 line-through cursor-not-allowed"
                    : isSelected
                    ? "border-pink-600 bg-pink-600 text-white font-bold"
                    : "border-gray-200 text-neutral-600 hover:border-neutral-900"
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}
