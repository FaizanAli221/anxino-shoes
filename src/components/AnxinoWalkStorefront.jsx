import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  X,
  Menu,
  Star,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  Truck,
  Loader2,
  RefreshCw,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Fallback / Initial Mock Data                                       */
/* ------------------------------------------------------------------ */

const INITIAL_CATEGORIES = [
  { id: "all", label: "All Shoes", swatch: "bg-neutral-800" },
  { id: "chappals", label: "Chappals", swatch: "bg-amber-200" },
  { id: "slippers", label: "Slippers", swatch: "bg-rose-200" },
  { id: "sandals", label: "Sandals", swatch: "bg-orange-200" },
  { id: "heels", label: "Heels", swatch: "bg-pink-200" },
  { id: "sneakers", label: "Sneakers", swatch: "bg-slate-200" },
];

const NAV_LINKS = [
  { label: "Sale", href: "#leading-choices", accent: true },
  { label: "New In", href: "#leading-choices", accent: true },
  { label: "Footwear", href: "#categories" },
  { label: "Sandals", href: "#categories" },
  { label: "Heels", href: "#categories" },
  { label: "Sneakers", href: "#categories" },
];

const COLOR_SWATCHES = {
  blush: "bg-rose-300",
  black: "bg-neutral-900",
  fawn: "bg-amber-700",
  olive: "bg-lime-800",
  cream: "bg-stone-200",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

const percentOff = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

/* ------------------------------------------------------------------ */
/* Announcement bar                                                   */
/* ------------------------------------------------------------------ */

function AnnouncementBar() {
  return (
    <div className="w-full bg-neutral-900 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-2">
        <p className="flex-1 text-center sm:text-left truncate">
          Free shipping on orders over{" "}
          <span className="text-pink-400 font-semibold">Rs. 3,500</span> · Flat 20% Off — live now
        </p>
        <div className="hidden sm:flex items-center gap-1 shrink-0 text-xs text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span>API Connected · PKR</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Header                                                             */
/* ------------------------------------------------------------------ */

function Header({ cartCount, wishlistCount, onOpenCart, onOpenSearch, onSelectCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            className="lg:hidden p-2 -ml-2 text-neutral-900"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          <a
            href="#top"
            className="font-serif text-2xl sm:text-3xl tracking-tight text-pink-600 select-none hover:opacity-90 transition-opacity"
          >
            anxino<span className="text-neutral-900"> walk</span>
          </a>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  const cat = link.label.toLowerCase();
                  if (["sandals", "heels", "sneakers"].includes(cat)) {
                    onSelectCategory(cat);
                  }
                }}
                className={
                  "text-sm font-medium tracking-wide transition-colors " +
                  (link.accent
                    ? "text-pink-600 hover:text-pink-700 font-semibold"
                    : "text-neutral-700 hover:text-neutral-900")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label="Search products"
              onClick={onOpenSearch}
            >
              <Search size={20} aria-hidden="true" />
            </button>
            <button
              className="hidden sm:inline-flex p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label="Account"
            >
              <User size={20} aria-hidden="true" />
            </button>
            <button
              className="relative p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label={`Wishlist, ${wishlistCount} items`}
            >
              <Heart size={20} aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-600 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              className="relative p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
              aria-label={`Shopping bag, ${cartCount} items`}
              onClick={onOpenCart}
            >
              <ShoppingBag size={20} aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-600 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center font-bold animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className="lg:hidden border-t border-gray-200 py-3 flex flex-col gap-1"
            aria-label="Mobile primary"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setMenuOpen(false);
                  const cat = link.label.toLowerCase();
                  if (["sandals", "heels", "sneakers"].includes(cat)) {
                    onSelectCategory(cat);
                  }
                }}
                className={
                  "px-1 py-2 text-sm font-medium " +
                  (link.accent ? "text-pink-600" : "text-neutral-700")
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero banner                                                        */
/* ------------------------------------------------------------------ */

const SLIDES = [
  {
    id: 1,
    eyebrow: "Footwear collection '26",
    title: "Beyond ordinary",
    cta1: "Women slippers",
    cta2: "Women shoes",
    catTarget: "slippers",
    bg: "from-rose-100 via-stone-100 to-neutral-200",
  },
  {
    id: 2,
    eyebrow: "Summer sandals '26",
    title: "Step with grace",
    cta1: "Shop sandals",
    cta2: "View heels",
    catTarget: "sandals",
    bg: "from-sky-100 via-amber-50 to-stone-100",
  },
  {
    id: 3,
    eyebrow: "Online only",
    title: "Flat 20% off",
    cta1: "Shop sneakers",
    cta2: "View all",
    catTarget: "sneakers",
    bg: "from-pink-100 via-rose-50 to-white",
  },
];

function HeroBanner({ onSelectCategory }) {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  );

  return (
    <section
      className={`relative w-full overflow-hidden bg-gradient-to-br ${slide.bg} transition-colors duration-500`}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 flex flex-col items-center text-center gap-5">
        <p className="text-xs sm:text-sm tracking-[0.2em] text-neutral-700 font-medium uppercase">
          {slide.eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl text-neutral-900 tracking-tight">
          {slide.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <button
            onClick={() => {
              onSelectCategory(slide.catTarget);
              const el = document.getElementById("leading-choices");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 rounded-full border border-neutral-900 bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors shadow-sm"
          >
            {slide.cta1}
          </button>
          <button
            onClick={() => {
              onSelectCategory("all");
              const el = document.getElementById("leading-choices");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 rounded-full border border-neutral-900 text-neutral-900 text-sm font-medium hover:bg-neutral-900 hover:text-white transition-colors"
          >
            {slide.cta2}
          </button>
        </div>
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-transform active:scale-95"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-transform active:scale-95"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={
              "w-2.5 h-2.5 rounded-full transition-all " +
              (i === index ? "bg-neutral-900 w-6" : "bg-neutral-900/30")
            }
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Circular category navigation                                       */
/* ------------------------------------------------------------------ */

function CategoryNav({ categories, selectedCategory, onSelectCategory }) {
  const allCategories = [
    { id: "all", label: "All Footwear", swatch: "bg-neutral-800 text-white" },
    ...categories.filter((c) => c.id !== "all"),
  ];

  return (
    <nav
      id="categories"
      aria-label="Shop by category"
      className="max-w-7xl mx-auto px-4 py-10 overflow-x-auto scrollbar-none"
    >
      <div className="text-center mb-6">
        <h2 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
          Explore by Category
        </h2>
      </div>
      <ul className="flex gap-6 sm:gap-8 sm:justify-center min-w-max sm:min-w-0 pb-2">
        {allCategories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <li key={cat.id} className="flex flex-col items-center gap-2 w-20">
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${cat.swatch || "bg-rose-200"} flex items-center justify-center border-2 transition-all duration-200 shadow-sm ${
                  isSelected
                    ? "border-pink-600 ring-2 ring-pink-400/40 scale-105"
                    : "border-transparent hover:border-pink-400 hover:scale-102"
                }`}
                aria-label={`Filter by ${cat.label}`}
              >
                {cat.id === "all" ? (
                  <span className="text-xs font-bold text-white uppercase">All</span>
                ) : null}
              </button>
              <span
                className={`text-[11px] sm:text-xs font-medium text-center tracking-wide uppercase transition-colors ${
                  isSelected ? "text-pink-600 font-bold" : "text-neutral-700"
                }`}
              >
                {cat.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Star rating                                                        */
/* ------------------------------------------------------------------ */

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5, ${reviews} reviews`}>
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={13}
            className={
              n <= Math.round(rating || 5)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-[11px] text-neutral-500">({reviews || 0})</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product card                                                       */
/* ------------------------------------------------------------------ */

function ProductCard({ product, onAddToBag, onToggleWishlist, isWishlisted }) {
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

  const swatchBg = {
    blush: "from-rose-200 to-rose-100",
    black: "from-neutral-700 to-neutral-500",
    fawn: "from-amber-300 to-amber-100",
    olive: "from-lime-700 to-lime-500",
    cream: "from-stone-200 to-stone-50",
  }[activeColor] || "from-stone-200 to-stone-100";

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm">
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${swatchBg} transition-transform duration-300 ease-out group-hover:scale-105 flex items-center justify-center p-4 text-center`}
            role="img"
            aria-label={`${title} in ${activeColor}`}
          >
            <span className="font-serif text-sm text-neutral-700/60 font-medium">
              {title}
            </span>
          </div>
        )}

        {product.badge && (
          <span className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => onToggleWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm transition-transform active:scale-90"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-pink-600 text-pink-600" : "text-neutral-700"}
            aria-hidden="true"
          />
        </button>

        <button
          onClick={() => onAddToBag(product, selectedSize || sizes[0])}
          className={
            "absolute inset-x-2 bottom-2 bg-neutral-900 text-white text-xs font-medium py-2.5 rounded-md transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md " +
            (hovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 sm:opacity-0 pointer-events-none sm:pointer-events-auto")
          }
        >
          <ShoppingBag size={14} aria-hidden="true" />
          Add to bag {selectedSize ? `(Size ${selectedSize})` : ""}
        </button>
      </div>

      <div className="flex items-center gap-1.5 mt-2" aria-label="Choose color">
        {colors.map((c, i) => (
          <button
            key={c}
            onClick={() => setColorIndex(i)}
            aria-label={`View in ${c}`}
            aria-pressed={i === colorIndex}
            className={
              "w-4 h-4 rounded-full border-2 transition-all " +
              (i === colorIndex ? "border-pink-600 scale-110" : "border-transparent") +
              " " +
              (COLOR_SWATCHES[c] || "bg-gray-300")
            }
          />
        ))}
      </div>

      <h3 className="mt-1.5 text-sm font-semibold text-neutral-900 leading-snug line-clamp-1">
        {title}
      </h3>

      <div className="mt-1">
        <StarRating rating={product.rating || 4.5} reviews={product.reviews || 10} />
      </div>

      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-sm font-semibold text-neutral-900">
          {formatPKR(product.price)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <>
            <span className="text-xs text-neutral-400 line-through">
              {formatPKR(product.originalPrice)}
            </span>
            <span className="text-xs font-medium text-pink-600">
              Save {discount}%
            </span>
          </>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-1" role="group" aria-label="Select size">
        {sizes.map((size) => {
          const disabled = outOfStock.includes(size);
          const active = selectedSize === size;
          return (
            <button
              key={size}
              disabled={disabled}
              aria-pressed={active}
              aria-label={`Size ${size}${disabled ? ", out of stock" : ""}`}
              onClick={() => setSelectedSize(active ? null : size)}
              className={
                "text-[10px] w-7 h-7 rounded border flex items-center justify-center transition-colors " +
                (disabled
                  ? "border-gray-100 text-gray-300 line-through cursor-not-allowed"
                  : active
                  ? "border-pink-600 bg-pink-600 text-white font-bold"
                  : "border-gray-300 text-neutral-700 hover:border-neutral-900")
              }
            >
              {size}
            </button>
          );
        })}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Product grid section                                               */
/* ------------------------------------------------------------------ */

function ProductGrid({
  title,
  products,
  loading,
  error,
  onRetry,
  onAddToBag,
  onToggleWishlist,
  wishlist,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12" id="leading-choices">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
            {title}
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            {selectedCategory === "all"
              ? `Showing all ${products.length} products from backend`
              : `Filtered by category: ${selectedCategory.toUpperCase()} (${products.length} products)`}
          </p>
        </div>

        {selectedCategory !== "all" && (
          <button
            onClick={() => onSelectCategory("all")}
            className="text-xs font-semibold tracking-wider uppercase border border-neutral-900 px-4 py-2 rounded hover:bg-neutral-900 hover:text-white transition-colors"
          >
            Show all products
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="animate-spin text-pink-600" size={32} />
          <p className="text-sm text-neutral-500">Loading catalog from Express API...</p>
        </div>
      ) : error ? (
        <div className="py-12 bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-sm text-red-700 mb-3">{error}</p>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded hover:bg-neutral-800"
          >
            <RefreshCw size={14} /> Retry loading products
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center text-neutral-500">
          <p className="text-base font-medium">No shoes found in this category.</p>
          <button
            onClick={() => onSelectCategory("all")}
            className="mt-3 text-sm text-pink-600 hover:underline font-semibold"
          >
            View all categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToBag={onAddToBag}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.has(p.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cart drawer                                                        */
/* ------------------------------------------------------------------ */

function CartDrawer({ open, onClose, items, onRemove, onQtyChange, onStartCheckout }) {
  const subtotal = items.reduce((sum, it) => sum + (it.product.price || 0) * it.qty, 0);
  const freeShippingThreshold = 3500;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      className={
        "fixed inset-0 z-40 transition-visibility " + (open ? "" : "pointer-events-none")
      }
      aria-hidden={!open}
    >
      <div
        className={
          "absolute inset-0 bg-black/40 transition-opacity duration-300 " +
          (open ? "opacity-100" : "opacity-0")
        }
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        aria-modal="true"
        className={
          "absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl flex flex-col transition-transform duration-300 " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-serif text-xl text-neutral-900">
            Your bag ({items.reduce((s, it) => s + it.qty, 0)})
          </h2>
          <button onClick={onClose} aria-label="Close bag" className="p-1 text-neutral-700 hover:text-neutral-900">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {items.length > 0 && (
          <div className="bg-pink-50 px-5 py-2.5 border-b border-pink-100 text-xs text-pink-900">
            {neededForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-pink-600">{formatPKR(neededForFreeShipping)}</strong> more for <strong>FREE shipping</strong>!
              </span>
            ) : (
              <span className="font-semibold text-green-700 flex items-center gap-1">
                <CheckCircle2 size={14} /> You unlocked FREE shipping!
              </span>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {items.length === 0 && (
            <div className="text-center mt-16 px-4">
              <ShoppingBag size={48} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-base font-medium text-neutral-800">Your bag is empty</p>
              <p className="text-xs text-neutral-500 mt-1">
                Browse our new collection and add your favorite shoes to the bag.
              </p>
            </div>
          )}

          {items.map((it) => {
            const title = it.product.title || it.product.name;
            return (
              <div key={it.product.id + it.size} className="flex gap-3 pb-3 border-b border-gray-100">
                {it.product.image ? (
                  <img
                    src={it.product.image}
                    alt={title}
                    className="w-16 h-20 rounded-md object-cover bg-gray-100 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-20 rounded-md bg-gradient-to-br from-rose-100 to-stone-100 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {title}
                  </p>
                  <p className="text-xs text-neutral-500">Size {it.size || "Standard"}</p>
                  <p className="text-sm font-semibold text-neutral-900 mt-1">
                    {formatPKR(it.product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onQtyChange(it, -1)}
                      aria-label="Decrease quantity"
                      className="p-1 border border-gray-300 rounded hover:border-neutral-700"
                    >
                      <Minus size={12} aria-hidden="true" />
                    </button>
                    <span className="text-xs w-4 text-center font-semibold">{it.qty}</span>
                    <button
                      onClick={() => onQtyChange(it, 1)}
                      aria-label="Increase quantity"
                      className="p-1 border border-gray-300 rounded hover:border-neutral-700"
                    >
                      <Plus size={12} aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => onRemove(it)}
                      className="ml-auto text-xs text-neutral-400 hover:text-pink-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4 bg-gray-50/50">
            <div className="flex items-center justify-between text-sm font-semibold text-neutral-900 mb-3">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <button
              onClick={onStartCheckout}
              className="w-full bg-neutral-900 text-white text-sm font-medium py-3 rounded-md hover:bg-pink-600 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checkout Modal                                                     */
/* ------------------------------------------------------------------ */

function CheckoutModal({ open, onClose, items, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Karachi",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = items.reduce((sum, it) => sum + (it.product.price || 0) * it.qty, 0);
  const shipping = subtotal >= 3500 ? 0 : 250;
  const total = subtotal + shipping;

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setError("Please fill in your name, phone number, and address.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        customer: formData,
        items: items.map((it) => ({
          productId: it.product.id,
          qty: it.qty,
          size: it.size ? Number(it.size) : (it.product.sizes && it.product.sizes[0]) || 38,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process checkout");
      }

      onOrderPlaced(data.order);
    } catch (err) {
      setError(err.message || "An error occurred during checkout.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-neutral-50">
          <div>
            <h3 className="font-serif text-lg text-neutral-900">Complete Your Order</h3>
            <p className="text-xs text-neutral-500">Cash on Delivery across Pakistan</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 text-neutral-500 hover:text-neutral-900">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Full Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Fatima Ali"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone Number *
              </label>
              <input
                required
                type="tel"
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Delivery Address *
            </label>
            <input
              required
              type="text"
              placeholder="House/Apartment #, Street, Area"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full text-sm border border-gray-300 rounded px-3 py-2 outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                City *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 outline-none focus:border-pink-600 bg-white"
              >
                <option>Karachi</option>
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Rawalpindi</option>
                <option>Faisalabad</option>
                <option>Multan</option>
                <option>Peshawar</option>
                <option>Quetta</option>
                <option>Other City</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                placeholder="for order tracking updates"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded px-3 py-2 outline-none focus:border-pink-600"
              />
            </div>
          </div>

          {/* Order summary box */}
          <div className="bg-neutral-50 rounded-lg p-3 text-xs space-y-1.5 border border-gray-200">
            <div className="flex justify-between text-neutral-600">
              <span>Items Subtotal:</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Shipping Fee:</span>
              <span>{shipping === 0 ? <strong className="text-green-600">FREE</strong> : formatPKR(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900 text-sm pt-1.5 border-t border-gray-200">
              <span>Total Payable (COD):</span>
              <span className="text-pink-600">{formatPKR(total)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 border border-gray-300 text-neutral-700 text-xs font-semibold rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Placing Order...
                </>
              ) : (
                "Confirm & Place Order"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Order Confirmation Dialog                                          */
/* ------------------------------------------------------------------ */

function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-center p-6 sm:p-8 animate-scale-in">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={36} />
        </div>

        <h3 className="font-serif text-2xl text-neutral-900">Thank You!</h3>
        <p className="text-xs text-neutral-500 mt-1">
          Your order has been received and is being prepared.
        </p>

        <div className="my-5 p-4 bg-pink-50/50 rounded-xl border border-pink-100 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-neutral-500">Order ID:</span>
            <span className="font-mono font-semibold text-neutral-800">{order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Tracking Code:</span>
            <span className="font-mono font-bold text-pink-600">{order.trackingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Estimated Delivery:</span>
            <span className="font-medium text-neutral-800">{order.estimatedDelivery || "3-5 business days"}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-pink-100 font-bold text-sm">
            <span className="text-neutral-900">Total Amount:</span>
            <span className="text-pink-600">{formatPKR(order.total)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-3 rounded-lg transition-colors shadow"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search modal                                                       */
/* ------------------------------------------------------------------ */

function SearchModal({ open, onClose, products, onSelectProduct }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => {
        const title = p.title || p.name || "";
        return title.toLowerCase().includes(q) || (p.sku && p.sku.toLowerCase().includes(q));
      })
      .slice(0, 5);
  }, [query, products]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center px-4 pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
          <Search size={18} className="text-neutral-400" aria-hidden="true" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shoes, sandals, slippers, sneakers…"
            aria-label="Search products"
            className="flex-1 text-sm outline-none placeholder:text-neutral-400"
          />
          <button onClick={onClose} aria-label="Close search" className="p-1 text-neutral-500">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {query.trim() !== "" && (
          <ul className="max-h-72 overflow-y-auto">
            {results.length === 0 && (
              <li className="px-4 py-6 text-sm text-neutral-400 text-center">
                No results for "{query}"
              </li>
            )}
            {results.map((r) => {
              const title = r.title || r.name;
              return (
                <li
                  key={r.id}
                  onClick={() => {
                    if (onSelectProduct) onSelectProduct(r);
                    onClose();
                  }}
                  className="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 cursor-pointer border-b border-gray-50"
                >
                  {r.image ? (
                    <img src={r.image} alt={title} className="w-10 h-12 rounded object-cover bg-gray-100 shrink-0" />
                  ) : (
                    <div className="w-10 h-12 rounded bg-gradient-to-br from-rose-100 to-stone-100 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-900 truncate">{title}</p>
                    <p className="text-xs text-neutral-500">{formatPKR(r.price)}</p>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400" />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-serif text-2xl text-white mb-2">anxino walk</p>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Premium women's footwear crafted with elegance and everyday comfort.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-pink-400">
            <Truck size={16} />
            <span>Fast nationwide delivery</span>
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Shop</h4>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li><a href="#leading-choices" className="hover:text-white transition-colors">New arrivals</a></li>
            <li><a href="#leading-choices" className="hover:text-white transition-colors">Sale items</a></li>
            <li><a href="#categories" className="hover:text-white transition-colors">Footwear</a></li>
            <li><a href="#categories" className="hover:text-white transition-colors">Sandals & Chappals</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Customer Care</h4>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li><a href="#top" className="hover:text-white transition-colors">Track your order</a></li>
            <li><a href="#top" className="hover:text-white transition-colors">Returns & Exchange</a></li>
            <li><a href="#top" className="hover:text-white transition-colors">Size guide</a></li>
            <li><a href="#top" className="hover:text-white transition-colors">Contact WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">About Anxino</h4>
          <ul className="space-y-2 text-neutral-400 text-xs">
            <li><a href="#top" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#top" className="hover:text-white transition-colors">Retail Stores</a></li>
            <li><a href="#top" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#top" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-800 px-4 py-4 text-center text-xs text-neutral-500">
        © 2026 Anxino Walk. All rights reserved. Fullstack Express & React Storefront.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root app                                                            */
/* ------------------------------------------------------------------ */

export default function AnxinoWalkStorefront() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Fetch categories from Express API
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      }
    } catch (err) {
      console.warn("Could not load categories from API, using defaults:", err);
    }
  }, []);

  // Fetch products from Express API
  const fetchProducts = useCallback(async (cat = "all") => {
    setLoading(true);
    setApiError(null);
    try {
      const url = cat && cat !== "all" ? `/api/products?category=${cat}` : "/api/products";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`API error: ${res.statusText}`);
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to load products from API:", err);
      setApiError("Could not connect to the shoes API backend. Please ensure the server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts("all");
  }, [fetchCategories, fetchProducts]);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    fetchProducts(catId);
  };

  const handleAddToBag = useCallback((product, size) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (it) => it.product.id === product.id && it.size === size
      );
      if (existing) {
        return prev.map((it) =>
          it === existing ? { ...it, qty: it.qty + 1 } : it
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const handleQtyChange = useCallback((item, delta) => {
    setCartItems((prev) =>
      prev
        .map((it) =>
          it === item ? { ...it, qty: Math.max(1, it.qty + delta) } : it
        )
        .filter((it) => it.qty > 0)
    );
  }, []);

  const handleRemove = useCallback((item) => {
    setCartItems((prev) => prev.filter((it) => it !== item));
  }, []);

  const handleToggleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleStartCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setCheckoutOpen(false);
    setCartItems([]);
    setConfirmedOrder(order);
  };

  const cartCount = cartItems.reduce((sum, it) => sum + it.qty, 0);

  return (
    <div id="top" className="min-h-screen bg-white font-sans antialiased selection:bg-pink-100 selection:text-pink-900">
      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onSelectCategory={handleCategorySelect}
      />
      <main>
        <HeroBanner onSelectCategory={handleCategorySelect} />
        <CategoryNav
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <ProductGrid
          title="Leading choices"
          products={products}
          loading={loading}
          error={apiError}
          onRetry={() => fetchProducts(selectedCategory)}
          onAddToBag={handleAddToBag}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemove}
        onQtyChange={handleQtyChange}
        onStartCheckout={handleStartCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderSuccess}
      />

      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => {
          handleCategorySelect(p.category || "all");
        }}
      />
    </div>
  );
}
