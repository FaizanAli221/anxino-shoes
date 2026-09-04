import React, { useState } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, Phone, MessageCircle } from "lucide-react";

export default function Header({
  activePage,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop Catalog" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
    { id: "track", label: "Track Order", highlight: true },
  ];

  const handleNav = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Announcement & Quick Contact Bar */}
      <div className="w-full bg-neutral-900 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1">
              <Phone size={12} className="text-pink-400" />
              <span>+92 21 3456 7890</span>
            </span>
            <a
              href="https://wa.me/923128492061?text=Hi%20Anxino%20Walk,%20I%20have%20an%20inquiry%20about%20your%20shoes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
            >
              <MessageCircle size={12} />
              <span>WhatsApp: +92 312 8492061</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <p className="truncate">
              Free Shipping Across Pakistan on Orders Over{" "}
              <strong className="text-pink-400">Rs. 3,500</strong>
            </p>
            <span className="hidden md:inline-block text-neutral-500">|</span>
            <span className="hidden md:inline-block text-neutral-300">Cash on Delivery (COD)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-800 hover:text-pink-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Brand Logo */}
            <button
              onClick={() => handleNav("home")}
              className="font-serif text-2xl sm:text-3xl tracking-tight text-pink-600 select-none text-left"
            >
              anxino<span className="text-neutral-900 font-sans font-light text-xl sm:text-2xl"> walk</span>
              <span className="block text-[9px] font-sans tracking-[0.2em] text-neutral-400 uppercase -mt-1">
                Ladies Footwear & Fashion
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNav(link.id)}
                    className={`text-sm tracking-wide font-medium transition-colors relative py-1 ${
                      isActive
                        ? "text-pink-600 font-semibold"
                        : "text-neutral-700 hover:text-neutral-900"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-full" />
                    )}
                    {link.highlight && !isActive && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-pink-100 text-pink-700 rounded font-semibold">
                        Live
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Header Right Actions (Search, Wishlist, Bag) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenSearch}
                className="p-2 text-neutral-700 hover:text-pink-600 transition-colors"
                aria-label="Search shoes"
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => handleNav("contact")}
                className="hidden sm:inline-flex p-2 text-neutral-700 hover:text-pink-600 transition-colors"
                aria-label="Account / Support"
                title="Customer Support"
              >
                <User size={20} />
              </button>

              <button
                onClick={() => handleNav("shop")}
                className="relative p-2 text-neutral-700 hover:text-pink-600 transition-colors"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart size={20} className={wishlistCount > 0 ? "fill-pink-600 text-pink-600" : ""} />
                {wishlistCount > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 bg-pink-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenCart}
                className="relative p-2 text-neutral-700 hover:text-pink-600 transition-colors bg-pink-50/60 hover:bg-pink-100 rounded-full"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} className="text-neutral-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 shadow-lg flex flex-col gap-2 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? "bg-pink-50 text-pink-600 font-semibold"
                    : "text-neutral-800 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-gray-100 pt-3 mt-2 text-xs text-neutral-500 space-y-2">
              <p className="font-semibold text-neutral-700">Need Immediate Help?</p>
              <a
                href="https://wa.me/923128492061"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 font-medium"
              >
                <MessageCircle size={16} /> WhatsApp: +92 312 8492061
              </a>
              <p className="text-neutral-600">Landline: +92 21 3456 7890</p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
