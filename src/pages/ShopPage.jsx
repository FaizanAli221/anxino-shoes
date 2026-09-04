import React, { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Filter, Search, SlidersHorizontal, CheckSquare, Square } from "lucide-react";

export default function ShopPage({
  categories,
  products,
  selectedCategory,
  onSelectCategory,
  onAddToBag,
  onToggleWishlist,
  wishlist,
  onViewProductDetails,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceMax, setPriceMax] = useState(6000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // In Stock Only filter
    if (onlyInStock) {
      list = list.filter((p) => !p.isOutOfStock);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // Price filter
    list = list.filter((p) => p.price <= priceMax);

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [products, selectedCategory, onlyInStock, searchQuery, sortBy, priceMax]);

  const inStockCount = products.filter((p) => !p.isOutOfStock).length;
  const outOfStockCount = products.filter((p) => p.isOutOfStock).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <div className="text-xs text-neutral-400 mb-1">Home / Footwear Catalog</div>
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">
          Ladies Footwear Collection
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Showing {filteredProducts.length} handcrafted shoes ({inStockCount} In Stock, {outOfStockCount} Sold Out)
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-neutral-50 border border-gray-200 rounded-2xl p-4 sm:p-5 mb-8 space-y-4 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
              selectedCategory === "all"
                ? "bg-neutral-900 text-white shadow-sm"
                : "bg-white text-neutral-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            All Footwear ({products.length})
          </button>
          {categories.map((c) => {
            const isSelected = selectedCategory === c.id;
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 ${
                  isSelected
                    ? "bg-pink-600 text-white shadow-sm"
                    : "bg-white text-neutral-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {c.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Search, Sort, In-Stock, Price Filter row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-gray-200">
          {/* Search Box */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by shoe name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg outline-none focus:border-pink-600"
            />
          </div>

          {/* In Stock Only Checkbox Button */}
          <button
            onClick={() => setOnlyInStock(!onlyInStock)}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
              onlyInStock
                ? "bg-pink-50 border-pink-600 text-pink-700 font-bold"
                : "bg-white border-gray-300 text-neutral-700 hover:border-neutral-900"
            }`}
          >
            {onlyInStock ? (
              <CheckSquare size={16} className="text-pink-600" />
            ) : (
              <Square size={16} className="text-neutral-400" />
            )}
            <span>In Stock Only ({inStockCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-neutral-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs py-2.5 px-3 bg-white border border-gray-300 rounded-lg outline-none focus:border-pink-600"
            >
              <option value="featured">Featured / Trending</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rated</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-3 py-1.5">
            <Filter size={15} className="text-pink-600 shrink-0" />
            <div className="flex-1 text-xs">
              <div className="flex justify-between text-[11px] text-neutral-500 mb-0.5">
                <span>Max Price:</span>
                <span className="font-bold text-neutral-900">Rs. {priceMax.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="250"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 rounded-2xl border border-gray-200 p-8">
          <p className="text-base font-semibold text-neutral-800">No shoes matched your current filters.</p>
          <p className="text-xs text-neutral-500 mt-1">Try turning off "In Stock Only" or adjusting your price slider.</p>
          <button
            onClick={() => {
              onSelectCategory("all");
              setSearchQuery("");
              setPriceMax(6000);
              setOnlyInStock(false);
            }}
            className="mt-4 px-5 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-pink-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((shoe) => (
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
      )}
    </div>
  );
}
