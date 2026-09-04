import React, { useState, useMemo } from "react";
import { Search, X, ChevronRight } from "lucide-react";

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

export default function SearchModal({ open, onClose, products, onSelectProduct }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => {
        const title = p.title || p.name || "";
        const sku = p.sku || "";
        const cat = p.category || "";
        return (
          title.toLowerCase().includes(q) ||
          sku.toLowerCase().includes(q) ||
          cat.toLowerCase().includes(q)
        );
      })
      .slice(0, 6);
  }, [query, products]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center px-4 pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
          <Search size={20} className="text-pink-600 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search slippers, chappals, heels, khussa, sandals, sneakers..."
            className="flex-1 text-sm outline-none placeholder:text-neutral-400"
          />
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-700">
            <X size={18} />
          </button>
        </div>

        {query.trim() !== "" && (
          <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
            {results.length === 0 ? (
              <li className="px-5 py-8 text-sm text-neutral-400 text-center">
                No shoes found matching "{query}"
              </li>
            ) : (
              results.map((r) => {
                const title = r.title || r.name;
                return (
                  <li
                    key={r.id}
                    onClick={() => {
                      onSelectProduct(r);
                      onClose();
                    }}
                    className="px-5 py-3.5 hover:bg-pink-50/50 flex items-center gap-3.5 cursor-pointer transition-colors"
                  >
                    {r.image ? (
                      <img
                        src={r.image}
                        alt={title}
                        className="w-12 h-14 rounded-md object-cover bg-gray-100 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-14 rounded-md bg-gradient-to-br from-rose-100 to-amber-100 shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-neutral-900 truncate">{title}</p>
                      <p className="text-xs text-neutral-500 capitalize">{r.category || "Footwear"} · {formatPKR(r.price)}</p>
                    </div>
                    <ChevronRight size={16} className="text-neutral-400" />
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
