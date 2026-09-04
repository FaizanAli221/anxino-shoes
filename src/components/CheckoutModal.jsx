import React, { useState } from "react";
import { X, Loader2, ShieldCheck } from "lucide-react";

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

export default function CheckoutModal({ open, onClose, items, onOrderPlaced }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Karachi",
    deliveryInstructions: "",
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
      setError("Please fill in your name, contact phone number, and delivery address.");
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
          size: it.size ? Number(it.size) : 38,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process order");
      }

      onOrderPlaced(data.order);
    } catch (err) {
      setError(err.message || "An error occurred during order placement.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-auto border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-neutral-50/70">
          <div>
            <h3 className="font-serif text-xl text-neutral-900">Confirm Order Details</h3>
            <p className="text-xs text-neutral-500">Cash on Delivery (COD) · Pakistan Nationwide</p>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-900">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
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
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Phone Number (WhatsApp Active) *
              </label>
              <input
                required
                type="tel"
                placeholder="0300-1234567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Complete Delivery Address *
            </label>
            <input
              required
              type="text"
              placeholder="House #, Street / Colony, Nearest Landmark"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                City / Region *
              </label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-pink-600 bg-white"
              >
                <option>Karachi</option>
                <option>Lahore</option>
                <option>Islamabad</option>
                <option>Rawalpindi</option>
                <option>Faisalabad</option>
                <option>Multan</option>
                <option>Peshawar</option>
                <option>Quetta</option>
                <option>Sialkot</option>
                <option>Gujranwala</option>
                <option>Hyderabad</option>
                <option>Other City</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="to receive tracking receipt"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-pink-600"
              />
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="bg-neutral-50 rounded-xl p-4 border border-gray-200 text-xs space-y-2">
            <div className="flex justify-between text-neutral-600">
              <span>Items Total ({items.reduce((s, it) => s + it.qty, 0)} items):</span>
              <span className="font-semibold text-neutral-800">{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Courier Delivery Fee:</span>
              <span>
                {shipping === 0 ? (
                  <strong className="text-green-600">FREE Delivery</strong>
                ) : (
                  formatPKR(shipping)
                )}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-bold text-neutral-900">
              <span>Total Due (Payable on Delivery):</span>
              <span className="text-pink-600 font-extrabold">{formatPKR(total)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-neutral-500">
            <ShieldCheck size={16} className="text-green-600 shrink-0" />
            <span>Open Parcel facility available. Check shoe size with delivery rider.</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 border border-gray-300 text-neutral-700 text-xs font-semibold rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 py-2.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-lg shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Confirming Order...
                </>
              ) : (
                "Place Order (Cash on Delivery)"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
