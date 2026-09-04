import React from "react";
import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-20 border-t border-neutral-800">
      {/* Value props banner */}
      <div className="border-b border-neutral-800 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Truck className="text-pink-400" size={28} />
            <h4 className="font-medium text-white text-sm">Nationwide Express Delivery</h4>
            <p className="text-xs text-neutral-400 max-w-xs">
              Delivery across all cities in Pakistan within 3 to 5 business days via TCS & Leopards.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="text-pink-400" size={28} />
            <h4 className="font-medium text-white text-sm">Cash on Delivery (COD)</h4>
            <p className="text-xs text-neutral-400 max-w-xs">
              Pay with complete peace of mind at your doorstep upon receiving your footwear parcel.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RotateCcw className="text-pink-400" size={28} />
            <h4 className="font-medium text-white text-sm">7-Day Easy Size Exchange</h4>
            <p className="text-xs text-neutral-400 max-w-xs">
              Shoe didn't fit? We offer smooth size replacement through WhatsApp support.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* Col 1: Brand & Bio */}
        <div>
          <h3 className="font-serif text-2xl text-white mb-3">
            anxino<span className="text-pink-400"> walk</span>
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            Anxino Walk is Pakistan's premier ladies footwear brand blending traditional handcrafted embellishments with ergonomic memory foam comfort.
          </p>
          <div className="space-y-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-pink-400 shrink-0" />
              <span>Mon – Sat: 11:00 AM – 10:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-pink-400 shrink-0" />
              <span>Sunday: 02:00 PM – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Col 2: Real Contact Details */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
            Customer Care
          </h4>
          <ul className="space-y-3 text-xs text-neutral-300">
            <li className="flex items-start gap-2.5">
              <MessageCircle size={16} className="text-green-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block">WhatsApp Support:</span>
                <a
                  href="https://wa.me/923128492061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-green-400 hover:underline"
                >
                  +92 312 8492061
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="text-pink-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block">UAN / Landline:</span>
                <a href="tel:+922134567890" className="hover:text-white">
                  +92 21 3456 7890
                </a>
                <span className="text-neutral-500 block">+92 301 9284752</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="text-pink-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-neutral-400 block">Official Support Email:</span>
                <a href="mailto:care@anxinowalk.pk" className="hover:text-white">
                  care@anxinowalk.pk
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 3: Flagship Store Addresses */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
            Physical Stores
          </h4>
          <ul className="space-y-3 text-xs text-neutral-400">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-pink-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-200 block">Karachi Flagship:</strong>
                Shop #14, Ground Floor, Dolmen Mall Clifton, Marine Drive, Karachi.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-pink-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-200 block">Lahore Outlet:</strong>
                Plaza 28, Main Boulevard, Gulberg III, Lahore.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="text-pink-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-200 block">Islamabad Studio:</strong>
                Shop #04, F-7 Markaz, Jinnah Super Market, Islamabad.
              </div>
            </li>
          </ul>
        </div>

        {/* Col 4: Quick Navigation & Services */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
            Explore Pages
          </h4>
          <ul className="space-y-2 text-xs text-neutral-400">
            <li>
              <button onClick={() => onNavigate("home")} className="hover:text-white transition-colors">
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("shop")} className="hover:text-white transition-colors">
                Complete Footwear Catalog
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("track")} className="hover:text-pink-400 text-pink-400 font-medium transition-colors">
                Track Your Parcel (Live)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("about")} className="hover:text-white transition-colors">
                About Anxino Walk Heritage
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate("contact")} className="hover:text-white transition-colors">
                Contact & Showrooms
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-6 px-4 text-center text-xs text-neutral-500">
        <p>© 2026 Anxino Walk Shoes Pakistan. All rights reserved. Designed for Pakistani women with pride.</p>
      </div>
    </footer>
  );
}
