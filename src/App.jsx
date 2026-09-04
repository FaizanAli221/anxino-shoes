import React, { useState, useEffect, useCallback } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import OrderSuccessModal from "./components/OrderSuccessModal.jsx";
import SearchModal from "./components/SearchModal.jsx";

import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import TrackOrderPage from "./pages/TrackOrderPage.jsx";

const DEFAULT_CATEGORIES = [
  { id: "chappals", label: "Chappals", swatch: "bg-amber-200" },
  { id: "slippers", label: "Slippers", swatch: "bg-rose-200" },
  { id: "sandals", label: "Sandals", swatch: "bg-orange-200" },
  { id: "heels", label: "Heels", swatch: "bg-pink-200" },
  { id: "sneakers", label: "Sneakers", swatch: "bg-slate-200" },
  { id: "khussa", label: "Khussa", swatch: "bg-emerald-200" },
];

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [trackingSearchCode, setTrackingSearchCode] = useState("");

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (["home", "shop", "about", "contact", "track"].includes(hash)) {
        setActivePage(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Fetch API categories and products
  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/products"),
        ]);
        if (catRes.ok) {
          const catData = await catRes.json();
          if (catData.categories?.length) setCategories(catData.categories);
        }
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData.products?.length) setProducts(prodData.products);
        }
      } catch (err) {
        console.warn("API loading fallback:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const navigateTo = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setActivePage("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToBag = useCallback((product, size, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (it) => it.product.id === product.id && it.size === size
      );
      if (existing) {
        return prev.map((it) =>
          it === existing ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [...prev, { product, size, qty }];
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

  const handleRemoveItem = useCallback((item) => {
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

  const handleTrackFromSuccess = (trackingCode) => {
    setConfirmedOrder(null);
    setTrackingSearchCode(trackingCode);
    navigateTo("track");
  };

  const cartCount = cartItems.reduce((s, it) => s + it.qty, 0);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-neutral-900 flex flex-col selection:bg-pink-100 selection:text-pink-900">
      <Header
        activePage={activePage}
        onNavigate={navigateTo}
        cartCount={cartCount}
        wishlistCount={wishlist.size}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        {activePage === "home" && (
          <HomePage
            categories={categories}
            products={products}
            onNavigate={navigateTo}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              navigateTo("shop");
            }}
            onAddToBag={handleAddToBag}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onViewProductDetails={handleViewProduct}
          />
        )}

        {activePage === "shop" && (
          <ShopPage
            categories={categories}
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToBag={handleAddToBag}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onViewProductDetails={handleViewProduct}
          />
        )}

        {activePage === "product" && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => navigateTo("shop")}
            onAddToBag={handleAddToBag}
            onStartDirectCheckout={handleStartCheckout}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.has(selectedProduct.id)}
          />
        )}

        {activePage === "about" && <AboutPage onNavigate={navigateTo} />}

        {activePage === "contact" && <ContactPage />}

        {activePage === "track" && (
          <TrackOrderPage initialTrackingId={trackingSearchCode} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Slideout Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveItem}
        onQtyChange={handleQtyChange}
        onStartCheckout={handleStartCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderSuccess}
      />

      {/* Order Confirmation Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onTrackOrder={handleTrackFromSuccess}
      />

      {/* Live Search Modal */}
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        onSelectProduct={handleViewProduct}
      />
    </div>
  );
}
