import React, { useState, useEffect } from "react";
import { Search, Truck, Package, CheckCircle2, Clock, MapPin, AlertCircle, MessageCircle } from "lucide-react";

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

export default function TrackOrderPage({ initialTrackingId = "" }) {
  const [trackingCode, setTrackingCode] = useState(initialTrackingId || "");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrder = async (codeToSearch) => {
    const code = (codeToSearch || trackingCode).trim();
    if (!code) {
      setError("Please enter your Order Tracking ID (e.g. AW-XXXXXX) or Order ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(code)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Order not found. Please verify your tracking code.");
      }
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTrackingId) {
      fetchOrder(initialTrackingId);
    }
  }, [initialTrackingId]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
          Live Shipment Status
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900">
          Track Your Footwear Parcel
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Enter your Anxino Walk tracking code (from your checkout receipt or confirmation message) to view real-time courier updates.
        </p>
      </div>

      {/* Tracker Search Box */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchOrder();
          }}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="e.g. AW-3P7CAMCZ or ORD-1788510001"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
              className="w-full text-sm font-mono pl-10 pr-3 py-3 border border-gray-300 rounded-xl outline-none focus:border-pink-600 uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-neutral-900 hover:bg-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow flex items-center justify-center gap-2"
          >
            {loading ? "Searching..." : "Track Parcel"}
          </button>
        </form>

        {/* Quick Demo Test Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-500">
          <span>Try demo tracking:</span>
          <button
            onClick={() => {
              setTrackingCode("AW-3P7CAMCZ");
              fetchOrder("AW-3P7CAMCZ");
            }}
            className="px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 font-mono font-semibold rounded-md border border-pink-200"
          >
            AW-3P7CAMCZ (TCS In-Transit)
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-xs text-red-700">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-600">
              Need assistance? WhatsApp our care team at{" "}
              <a href="https://wa.me/923128492061" className="underline font-bold">
                +92 312 8492061
              </a>{" "}
              with your phone number.
            </p>
          </div>
        </div>
      )}

      {/* Tracking Result Card */}
      {order && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm space-y-6">
          {/* Header Banner */}
          <div className="bg-neutral-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">
                Status: {order.status?.toUpperCase() || "CONFIRMED"}
              </span>
              <h2 className="font-mono text-2xl font-bold mt-0.5">{order.trackingId}</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Courier: <strong>{order.courier || "TCS Express"}</strong> (Tracking: {order.courierTrackingNumber || "Pending"})
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-neutral-400 block">Expected Arrival:</span>
              <span className="text-base font-bold text-pink-300">
                {order.estimatedDelivery || "3-5 Business Days"}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-6 sm:p-8">
            <h3 className="font-serif text-lg text-neutral-900 mb-6">Shipment Journey</h3>
            <div className="relative border-l-2 border-pink-200 ml-4 pl-6 space-y-6">
              {(order.events || []).map((ev, i) => (
                <div key={i} className="relative">
                  <div
                    className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-white ${
                      ev.done ? "bg-pink-600 ring-4 ring-pink-100" : "bg-gray-300"
                    }`}
                  />
                  <div>
                    <h4 className={`text-sm font-semibold ${ev.done ? "text-neutral-900" : "text-neutral-400"}`}>
                      {ev.status}
                    </h4>
                    <span className="text-xs text-neutral-500">{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details breakdown */}
          <div className="p-6 sm:p-8 border-t border-gray-100 bg-neutral-50/60 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Delivery address */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Recipient Details
              </h4>
              <p className="text-neutral-900 font-semibold">{order.customer?.name}</p>
              <p className="text-neutral-600">{order.customer?.phone}</p>
              <p className="text-neutral-600 mt-1">{order.customer?.address}, {order.customer?.city}</p>
            </div>

            {/* Order summary */}
            <div>
              <h4 className="font-bold uppercase tracking-wider text-neutral-700 mb-2">
                Order Items & Payment
              </h4>
              <div className="space-y-1.5 mb-2">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-neutral-700">
                    <span>{item.title} (Size {item.size || "—"}) x{item.qty}</span>
                    <span className="font-semibold">{formatPKR(item.lineTotal || item.unitPrice)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-neutral-900">
                <span>Total Cash on Delivery:</span>
                <span className="text-pink-600">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp rider check support */}
          <div className="px-6 py-4 bg-pink-50/50 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-neutral-700">
              Courier rider delayed or need to reschedule delivery date?
            </span>
            <a
              href={`https://wa.me/923128492061?text=Hi,%20please%20update%20me%20on%20my%20order%20${order.trackingId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold shadow-xs transition-colors shrink-0"
            >
              <MessageCircle size={14} />
              <span>Contact Courier Help via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
