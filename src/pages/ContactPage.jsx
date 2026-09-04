import React, { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle2, Clock, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setTicketId(data.ticketId || `INQ-${Date.now()}`);
      setFormData({ name: "", phone: "", email: "", subject: "Order Inquiry", message: "" });
    } catch (err) {
      setError(err.message || "Failed to submit message. Please contact us directly via WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
          We Are Here For You
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900">
          Get in Touch With Anxino Walk
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Need size advice, order tracking support, or bulk inquiries? Contact our team in Pakistan via WhatsApp, phone, or visit our showrooms.
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* WhatsApp Card */}
        <div className="bg-green-50/70 border border-green-200 rounded-2xl p-6 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <MessageCircle size={26} />
          </div>
          <h3 className="font-serif text-lg font-bold text-neutral-900">WhatsApp Live Chat</h3>
          <p className="text-xs text-neutral-600">
            Fastest reply for size questions, live shoe video photos, and urgent orders.
          </p>
          <a
            href="https://wa.me/923128492061?text=Hello%20Anxino%20Walk,%20I%20need%20assistance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-lg shadow transition-colors"
          >
            <span>+92 312 8492061</span>
          </a>
        </div>

        {/* Phone Call Card */}
        <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-6 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Phone size={24} />
          </div>
          <h3 className="font-serif text-lg font-bold text-neutral-900">Phone Support Hotline</h3>
          <p className="text-xs text-neutral-600">
            Available Monday to Saturday from 11:00 AM to 10:00 PM (Pakistan Standard Time).
          </p>
          <div className="space-y-1">
            <a
              href="tel:+922134567890"
              className="block text-xs font-bold text-neutral-900 hover:text-pink-600"
            >
              +92 21 3456 7890 (Karachi UAN)
            </a>
            <span className="block text-xs text-neutral-500">+92 301 9284752</span>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-neutral-50 border border-gray-200 rounded-2xl p-6 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Mail size={24} />
          </div>
          <h3 className="font-serif text-lg font-bold text-neutral-900">Official Support Email</h3>
          <p className="text-xs text-neutral-600">
            For official feedback, business partnerships, and corporate orders.
          </p>
          <a
            href="mailto:care@anxinowalk.pk"
            className="inline-block text-xs font-bold text-pink-600 hover:underline"
          >
            care@anxinowalk.pk
          </a>
        </div>
      </div>

      {/* Contact Form & Physical Outlets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="font-serif text-xl text-neutral-900 mb-1">Send Us a Direct Message</h3>
          <p className="text-xs text-neutral-500 mb-6">
            We will get back to you via WhatsApp or phone call within 2-4 hours.
          </p>

          {ticketId ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center space-y-3">
              <CheckCircle2 size={36} className="text-green-600 mx-auto" />
              <h4 className="font-serif text-lg text-neutral-900">Message Received!</h4>
              <p className="text-xs text-neutral-600">
                Your inquiry has been logged under reference ticket{" "}
                <strong className="font-mono text-green-700">{ticketId}</strong>. A customer support representative will reach out to you shortly.
              </p>
              <button
                onClick={() => setTicketId(null)}
                className="mt-2 px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded-lg"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sara Khan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-pink-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-pink-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="sara@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-pink-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Topic / Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-pink-600 bg-white"
                  >
                    <option>Order & Tracking Inquiry</option>
                    <option>Size Exchange Request</option>
                    <option>Product Information</option>
                    <option>Bridal / Bulk Wedding Inquiry</option>
                    <option>Store Visit & Timings</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  How can we help you? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry or order requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs border border-gray-300 rounded-lg p-3 outline-none focus:border-pink-600"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-neutral-900 hover:bg-pink-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
              >
                {sending ? "Sending..." : (
                  <>
                    <Send size={14} />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Physical Showrooms Details */}
        <div className="space-y-6">
          <h3 className="font-serif text-xl text-neutral-900">Visit Our Flagship Outlets</h3>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-neutral-50/50 flex gap-3.5">
              <MapPin size={20} className="text-pink-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-neutral-900">Dolmen Mall Clifton, Karachi</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Shop #14, Ground Floor, Marine Drive, Block 4, Clifton, Karachi.
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">Open 11:00 AM – 11:00 PM Daily · Phone: +92 21 3456 7890</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-neutral-50/50 flex gap-3.5">
              <MapPin size={20} className="text-pink-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-neutral-900">Gulberg III, Lahore</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Plaza 28, Main Boulevard (Near Siddique Trade Center & MM Alam), Lahore.
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">Open 11:00 AM – 10:30 PM · Phone: +92 301 9284752</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-neutral-50/50 flex gap-3.5">
              <MapPin size={20} className="text-pink-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-neutral-900">F-7 Markaz, Islamabad</h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Shop #04, Jinnah Super Market, Sector F-7, Islamabad.
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">Open 12:00 PM – 10:00 PM · WhatsApp: +92 312 8492061</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
