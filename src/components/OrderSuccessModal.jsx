import React from "react";
import { CheckCircle2, Truck, Copy, Check } from "lucide-react";

const formatPKR = (n) => `Rs. ${(n || 0).toLocaleString("en-PK")}`;

export default function OrderSuccessModal({ order, onClose, onTrackOrder }) {
  const [copied, setCopied] = React.useState(false);

  if (!order) return null;

  const copyTracking = () => {
    navigator.clipboard.writeText(order.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center px-4 py-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-center p-6 sm:p-8 border border-gray-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 size={36} />
        </div>

        <h3 className="font-serif text-2xl text-neutral-900">Order Confirmed!</h3>
        <p className="text-xs text-neutral-500 mt-1">
          Thank you for choosing Anxino Walk. Your parcel is being packed.
        </p>

        <div className="my-5 p-4 bg-pink-50/50 rounded-xl border border-pink-100 text-left text-xs space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-neutral-500">Tracking Code:</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-pink-600 text-sm">{order.trackingId}</span>
              <button
                onClick={copyTracking}
                className="p-1 hover:bg-pink-100 rounded text-neutral-500 hover:text-neutral-800"
                title="Copy tracking code"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Order ID:</span>
            <span className="font-mono text-neutral-700">{order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Courier Service:</span>
            <span className="font-medium text-neutral-800">{order.courier || "TCS Express"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-500">Estimated Delivery:</span>
            <span className="font-medium text-neutral-800">{order.estimatedDelivery || "3-5 business days"}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-pink-100 font-bold text-sm">
            <span className="text-neutral-900">Total COD Amount:</span>
            <span className="text-pink-600">{formatPKR(order.total)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => onTrackOrder(order.trackingId)}
            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
          >
            <Truck size={14} />
            Track This Order
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-3 rounded-lg transition-colors shadow"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
