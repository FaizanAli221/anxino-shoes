import React from "react";
import { Sparkles, HeartHandshake, MapPin, Clock, ShieldCheck, Phone, MessageCircle } from "lucide-react";

export default function AboutPage({ onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
          The Anxino Walk Story
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 leading-tight">
          Handcrafted Pakistani Footwear Made For Everyday Movement
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Founded in Karachi, Anxino Walk emerged from a single mission: to create women's footwear that harmonizes traditional festive elegance with effortless, all-day comfort.
        </p>
      </div>

      {/* Story split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-100 shadow-md">
          <img
            src="/images/shoes/fawn-velvet-khussa.jpg"
            alt="Handcrafted Khussa Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
            Heritage Meets Ergonomics
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900">
            No More Compromising Comfort For Festive Beauty
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Every Pakistani woman knows the frustration of buying gorgeous embroidered khussas or festive heels, only to endure painful shoe bites within hours.
          </p>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            At Anxino Walk, our shoe artisans partner with orthopedic footwear designers. We line our khussas and slippers with genuine double memory foam, use supple vegetable-tanned lining leather, and install shock-absorbing rubber outsoles.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-neutral-800">
            <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-full">
              <Sparkles size={14} className="text-pink-600" /> 100% Bite-Free Guarantee
            </span>
            <span className="flex items-center gap-1.5 bg-neutral-100 px-3 py-1.5 rounded-full">
              <HeartHandshake size={14} className="text-pink-600" /> Supporting Master Artisans
            </span>
          </div>
        </div>
      </div>

      {/* Flagship Showrooms */}
      <div className="space-y-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
            Experience Our Footwear In Person
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 mt-1">
            Our Retail Stores Across Pakistan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Karachi */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">Karachi Flagship</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Shop #14, Ground Floor, Dolmen Mall Clifton, Marine Drive, Block 4, Clifton, Karachi.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs text-neutral-600 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-pink-600" />
                <span>Mon – Sun: 11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-pink-600" />
                <span>+92 21 3456 7890</span>
              </div>
            </div>
          </div>

          {/* Lahore */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">Lahore Outlet</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Plaza 28, Main Boulevard, Gulberg III (Near MM Alam Road), Lahore.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs text-neutral-600 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-pink-600" />
                <span>Mon – Sat: 11:00 AM – 10:30 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-pink-600" />
                <span>+92 301 9284752</span>
              </div>
            </div>
          </div>

          {/* Islamabad */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">Islamabad Studio</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Shop #04, F-7 Markaz, Jinnah Super Market, Islamabad.
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs text-neutral-600 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-pink-600" />
                <span>Mon – Sun: 12:00 PM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle size={14} className="text-green-600" />
                <span>WhatsApp: +92 312 8492061</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-5">
        <h2 className="font-serif text-2xl sm:text-4xl">Ready to Experience True Footwear Comfort?</h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
          Explore our complete catalogue with instant Cash on Delivery and free exchange policy.
        </p>
        <button
          onClick={() => onNavigate("shop")}
          className="px-8 py-3.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95"
        >
          Explore All Footwear
        </button>
      </div>
    </div>
  );
}
