import React, { useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { ChevronRight, ChevronLeft, Sparkles, Award, Shield, Truck, ArrowRight, Star } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    tagline: "Festive Collection '26",
    title: "Step Into Pure Elegance",
    subtitle: "Artisanal Pakistani khussas, pearl-studded slippers, and comfortable block heels crafted for your unforgettable celebrations.",
    cta: "Explore Collection",
    catTarget: "khussa",
    bg: "from-rose-100 via-stone-50 to-pink-100",
  },
  {
    id: 2,
    tagline: "Daily Comfort Line",
    title: "Soft Orthopedic Soles",
    subtitle: "Specially contoured double memory foam cushioning so you can walk from morning errands to evening events without fatigue.",
    cta: "Shop Slippers & Chappals",
    catTarget: "slippers",
    bg: "from-amber-100 via-orange-50 to-stone-100",
  },
  {
    id: 3,
    tagline: "Online Exclusive Sale",
    title: "Flat Up To 45% Off",
    subtitle: "Discover high-grade leather sandals, sneakers, and evening pumps delivered free on orders over Rs. 3,500.",
    cta: "View Sale Shoes",
    catTarget: "all",
    bg: "from-sky-100 via-pink-50 to-white",
  },
];

export default function HomePage({
  categories,
  products,
  onNavigate,
  onSelectCategory,
  onAddToBag,
  onToggleWishlist,
  wishlist,
  onViewProductDetails,
}) {
  const [slideIdx, setSlideIdx] = useState(0);
  const slide = HERO_SLIDES[slideIdx];

  const goSlide = (delta) => {
    setSlideIdx((i) => (i + delta + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const featuredShoes = products.slice(0, 8);

  return (
    <div className="space-y-16">
      {/* 1. Hero Carousel Banner */}
      <section className={`relative overflow-hidden bg-gradient-to-r ${slide.bg} transition-colors duration-700 py-16 sm:py-24 px-4 sm:px-8 border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full text-pink-600 text-xs font-bold tracking-widest uppercase shadow-xs">
            <Sparkles size={14} />
            <span>{slide.tagline}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-neutral-900 tracking-tight max-w-3xl leading-tight">
            {slide.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                onSelectCategory(slide.catTarget);
                onNavigate("shop");
              }}
              className="px-7 py-3 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-pink-600 transition-all shadow-md flex items-center gap-2"
            >
              <span>{slide.cta}</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate("about")}
              className="px-6 py-3 rounded-full border border-neutral-900 text-neutral-900 text-sm font-semibold hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Our Story & Stores
            </button>
          </div>
        </div>

        {/* Slide navigation controls */}
        <button
          onClick={() => goSlide(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-neutral-800 transition-transform active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => goSlide(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-neutral-800 transition-transform active:scale-95"
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSlideIdx(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === slideIdx ? "w-6 bg-neutral-900" : "w-2 bg-neutral-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* 2. Explore by Category Circles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
            Handcrafted Categories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 mt-1">
            Shop by Footwear Style
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigate("shop");
              }}
              className="group flex flex-col items-center gap-2.5 cursor-pointer"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${
                  cat.swatch || "bg-pink-100"
                } flex items-center justify-center border-2 border-transparent group-hover:border-pink-600 group-hover:scale-105 transition-all shadow-sm`}
              >
                <span className="font-serif font-bold text-neutral-800 text-lg group-hover:text-pink-600 transition-colors">
                  {cat.label.slice(0, 2)}
                </span>
              </div>
              <span className="text-xs font-semibold text-neutral-800 group-hover:text-pink-600 transition-colors text-center uppercase tracking-wide">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Shoes Showcase (Leading Choices) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
              Curated Selection
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 mt-1">
              Bestsellers & Trending Pairs
            </h2>
          </div>
          <button
            onClick={() => onNavigate("shop")}
            className="text-xs font-bold uppercase tracking-wider text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            <span>View All ({products.length}) Shoes</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredShoes.map((shoe) => (
            <ProductCard
              key={shoe.id}
              product={shoe}
              onAddToBag={onAddToBag}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.has(shoe.id)}
              onViewDetails={onViewProductDetails}
            />
          ))}
        </div>
      </section>

      {/* 4. Brand Highlights & Craftsmanship Banner */}
      <section className="bg-stone-100 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-xs flex items-start gap-4">
            <div className="p-3 bg-pink-50 text-pink-600 rounded-lg shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-neutral-900 mb-1">
                Authentic Pakistani Craft
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Hand-stitched tilla, zardozi embroidery, and velvet work crafted by traditional master artisans of Lahore and Multan.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs flex items-start gap-4">
            <div className="p-3 bg-pink-50 text-pink-600 rounded-lg shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-neutral-900 mb-1">
                Orthopedic Arch Support
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Every insole incorporates dense dual-layer memory foam to cradle your feet during long hours, weddings, and formal wear.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-xs flex items-start gap-4">
            <div className="p-3 bg-pink-50 text-pink-600 rounded-lg shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-neutral-900 mb-1">
                Cash on Delivery (COD)
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Shop with 100% confidence. Receive your parcel via TCS or Leopards courier and inspect before paying the delivery rider.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
            Real Experiences
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 mt-1">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "Ordered the Royal Maroon Velvet Khussa for my sister's Mehndi in Lahore. Absolutely zero shoe bite, super soft cushioning, and the embroidery sparkles so nicely in photos!"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900">Ayesha Malik</span>
              <span className="text-neutral-400">Lahore, Gulberg</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "The Pink Pearl slide slipper is the most comfortable footwear I own. Delivered to Karachi within 2 days with tracking updates. Will order the heels next!"
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900">Dr. Madiha Siddiqui</span>
              <span className="text-neutral-400">Karachi, Clifton</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-700 italic leading-relaxed">
                "Customer service on WhatsApp was so cooperative. I needed a size 39 instead of 38, and they exchanged it within 4 days without any argument. 10/10 service."
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900">Zahra Farooq</span>
              <span className="text-neutral-400">Islamabad, F-7</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
