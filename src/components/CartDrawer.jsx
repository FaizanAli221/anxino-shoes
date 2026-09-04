import React from "react";
import { X, ShoppingBag, Plus, Minus, CheckCircle2, ChevronRight } from "lucide-react";

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

export default function CartDrawer({
  open,
  onClose,
  items,
  onRemove,
  onQtyChange,
  onStartCheckout,
}) {
  const subtotal = items.reduce((sum, it) => sum + (it.product.price || 0) * it.qty, 0);
  const freeShippingThreshold = 3500;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-pink-600" />
            <h2 className="font-serif text-lg text-neutral-900">
              Shopping Bag ({items.reduce((s, it) => s + it.qty, 0)})
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-500 hover:text-neutral-900">
            <X size={20} />
          </button>
        </div>

        {items.length > 0 && (
          <div className="bg-pink-50 px-5 py-2.5 border-b border-pink-100 text-xs text-pink-900">
            {neededForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-pink-600">{formatPKR(neededForFreeShipping)}</strong> more to get{" "}
                <strong>FREE nationwide delivery</strong>!
              </span>
            ) : (
              <span className="font-semibold text-green-700 flex items-center gap-1">
                <CheckCircle2 size={14} /> You unlocked FREE nationwide shipping!
              </span>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-gray-100">
          {items.length === 0 ? (
            <div className="text-center mt-20 px-4">
              <ShoppingBag size={48} className="mx-auto text-neutral-300 mb-3" />
              <p className="text-base font-semibold text-neutral-800">Your bag is empty</p>
              <p className="text-xs text-neutral-500 mt-1">
                Discover our new Pakistani footwear collection and add your favorite shoes to the bag.
              </p>
            </div>
          ) : (
            items.map((it) => {
              const title = it.product.title || it.product.name;
              return (
                <div key={it.product.id + it.size} className="flex gap-3 py-3.5">
                  {it.product.image ? (
                    <img
                      src={it.product.image}
                      alt={title}
                      className="w-16 h-20 rounded-md object-cover bg-gray-100 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-20 rounded-md bg-gradient-to-br from-rose-100 to-amber-100 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 truncate">{title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Size {it.size || "Standard"}</p>
                    <p className="text-sm font-bold text-neutral-900 mt-1">
                      {formatPKR(it.product.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onQtyChange(it, -1)}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{it.qty}</span>
                      <button
                        onClick={() => onQtyChange(it, 1)}
                        className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
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
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4 bg-gray-50/70">
            <div className="flex items-center justify-between text-sm font-bold text-neutral-900 mb-3">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <button
              onClick={onStartCheckout}
              className="w-full bg-neutral-900 hover:bg-pink-600 text-white text-sm font-semibold py-3 rounded-lg transition-colors shadow flex items-center justify-center gap-2"
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
