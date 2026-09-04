import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

/* ------------------------------------------------------------------ */
/* Categories                                                         */
/* ------------------------------------------------------------------ */

export const CATEGORIES = [
  { id: "chappals", label: "Chappals", swatch: "bg-amber-200" },
  { id: "slippers", label: "Slippers", swatch: "bg-rose-200" },
  { id: "sandals", label: "Sandals", swatch: "bg-orange-200" },
  { id: "heels", label: "Heels", swatch: "bg-pink-200" },
  { id: "sneakers", label: "Sneakers", swatch: "bg-slate-200" },
  { id: "khussa", label: "Khussa", swatch: "bg-emerald-200" },
];

/* ------------------------------------------------------------------ */
/* 25 Products Catalog (All Verified Footwear Photos + Out of Stock)   */
/* ------------------------------------------------------------------ */

export const PRODUCTS = [
  // 1. Slippers
  {
    id: "aw-8431",
    name: "Pink Formal Pearl Slide Slipper",
    title: "Pink Formal Pearl Slide Slipper",
    sku: "SL8431",
    category: "slippers",
    price: 2450,
    originalPrice: 4500,
    discountPercent: 46,
    rating: 4.8,
    reviews: 42,
    badge: "Bestseller",
    isOutOfStock: false,
    description: "Handcrafted velvet slide slipper featuring soft memory-foam orthopedic sole and exquisite cluster pearl embellishment. Perfect for festive lounging and formal gatherings.",
    colors: ["blush", "cream"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [41],
    image: "/images/shoes/pink-formal-slipper.jpg",
  },
  {
    id: "aw-5512",
    name: "Cozy Blush Memory Foam Slipper",
    title: "Cozy Blush Memory Foam Slipper",
    sku: "SL5512",
    category: "slippers",
    price: 1350,
    originalPrice: 2200,
    discountPercent: 38,
    rating: 4.6,
    reviews: 38,
    badge: "Sale",
    isOutOfStock: false,
    description: "Everyday ultra-soft indoor slipper with plush fleece lining and durable ribbed non-slip sole.",
    colors: ["blush", "cream"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [],
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-5518",
    name: "Cross-Band Fluffy Fur Velvet Slipper",
    title: "Cross-Band Fluffy Fur Velvet Slipper",
    sku: "SL5518",
    category: "slippers",
    price: 1850,
    originalPrice: 2900,
    discountPercent: 36,
    rating: 4.9,
    reviews: 54,
    badge: "Sold Out",
    isOutOfStock: true, // OUT OF STOCK
    description: "Luxurious cross-strap fluffy bedroom slipper in rose blush. High-density rebound cushion footbed.",
    colors: ["blush"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [36, 37, 38, 39, 40],
    image: "/images/shoes/pink-formal-slipper.jpg",
  },
  {
    id: "aw-5524",
    name: "Muted Lavender Ortho Comfort Slide",
    title: "Muted Lavender Ortho Comfort Slide",
    sku: "SL5524",
    category: "slippers",
    price: 1650,
    originalPrice: 2500,
    discountPercent: 34,
    rating: 4.7,
    reviews: 29,
    badge: "Popular",
    isOutOfStock: false,
    description: "Ergonomic arch-support molded slide designed for home and casual patio comfort.",
    colors: ["cream", "blush"],
    sizes: [37, 38, 39, 40],
    outOfStock: [],
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80",
  },

  // 2. Chappals
  {
    id: "aw-0838",
    name: "Black Royal Gold Tilla Chappal",
    title: "Black Royal Gold Tilla Chappal",
    sku: "CH0838",
    category: "chappals",
    price: 2950,
    originalPrice: 4800,
    discountPercent: 38,
    rating: 4.9,
    reviews: 68,
    badge: "Sale",
    isOutOfStock: false,
    description: "Premium festive black toe-ring chappal enriched with traditional hand-embroidered metallic tilla work and subtle zircon stone accents.",
    colors: ["black", "fawn"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [],
    image: "/images/shoes/black-fancy-chappal.jpg",
  },
  {
    id: "aw-0853",
    name: "Fawn Dotted Fancy Evening Chappal",
    title: "Fawn Dotted Fancy Evening Chappal",
    sku: "CH0853",
    category: "chappals",
    price: 1850,
    originalPrice: 2800,
    discountPercent: 34,
    rating: 4.7,
    reviews: 18,
    badge: "Sale",
    isOutOfStock: false,
    description: "Classic fawn partywear chappal with lustrous micro-sequin band and flexible anti-skid rubber base.",
    colors: ["fawn", "cream"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [41],
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-3304",
    name: "Mustard Tassel Kolhapuri Flat",
    title: "Mustard Tassel Kolhapuri Flat",
    sku: "CH3304",
    category: "chappals",
    price: 2150,
    originalPrice: 3400,
    discountPercent: 36,
    rating: 4.7,
    reviews: 19,
    badge: "Handmade",
    isOutOfStock: false,
    description: "Traditional mustard yellow Kolhapuri chappal featuring genuine leather braids and cheerful fringe tassels.",
    colors: ["fawn"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-3315",
    name: "Emerald Velvet Toe-Ring Festive Chappal",
    title: "Emerald Velvet Toe-Ring Festive Chappal",
    sku: "CH3315",
    category: "chappals",
    price: 2750,
    originalPrice: 4200,
    discountPercent: 35,
    rating: 4.8,
    reviews: 31,
    badge: "Sold Out",
    isOutOfStock: true, // OUT OF STOCK
    description: "Deep emerald green velvet upper with dabka bullion wire embroidery. Currently sold out due to wedding season demand.",
    colors: ["black", "fawn"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [36, 37, 38, 39, 40],
    image: "/images/shoes/black-fancy-chappal.jpg",
  },

  // 3. Khussa
  {
    id: "aw-0910",
    name: "Royal Maroon Bridal Velvet Khussa",
    title: "Royal Maroon Bridal Velvet Khussa",
    sku: "KH0910",
    category: "khussa",
    price: 3499,
    originalPrice: 5500,
    discountPercent: 36,
    rating: 5.0,
    reviews: 29,
    badge: "New Arrival",
    isOutOfStock: false,
    description: "Authentic Pakistani pure velvet bridal khussa featuring double-padded soft leather insoles to prevent bite, decorated with heavy zardozi and dabka embroidery.",
    colors: ["fawn", "black"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [],
    image: "/images/shoes/fawn-velvet-khussa.jpg",
  },
  {
    id: "aw-9042",
    name: "Golden Champagne Zari Khussa",
    title: "Golden Champagne Zari Khussa",
    sku: "KH9042",
    category: "khussa",
    price: 2850,
    originalPrice: 4200,
    discountPercent: 32,
    rating: 4.9,
    reviews: 51,
    badge: "Festive",
    isOutOfStock: false,
    description: "Glistening champagne gold raw silk khussa embroidered with delicate zari threads, perfect for Eid and weddings.",
    colors: ["cream", "fawn"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [36],
    image: "/images/shoes/fawn-velvet-khussa.jpg",
  },
  {
    id: "aw-9901",
    name: "Lavender Velvet Embroidered Khussa",
    title: "Lavender Velvet Embroidered Khussa",
    sku: "KH9901",
    category: "khussa",
    price: 2950,
    originalPrice: 4500,
    discountPercent: 34,
    rating: 4.8,
    reviews: 21,
    badge: "Trending",
    isOutOfStock: false,
    description: "Enchanting pastel lavender velvet khussa accented with silver sitara work and cushioned genuine leather soul.",
    colors: ["blush"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [],
    image: "/images/shoes/fawn-velvet-khussa.jpg",
  },
  {
    id: "aw-9915",
    name: "Pure Ivory Pearl Mirror-Work Khussa",
    title: "Pure Ivory Pearl Mirror-Work Khussa",
    sku: "KH9915",
    category: "khussa",
    price: 3600,
    originalPrice: 5800,
    discountPercent: 38,
    rating: 5.0,
    reviews: 47,
    badge: "Sold Out",
    isOutOfStock: true, // OUT OF STOCK
    description: "Bridal masterpiece khussa adorned with real glass mirror work, tiny pearls, and hand-twisted silver wire.",
    colors: ["cream"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [36, 37, 38, 39, 40, 41],
    image: "/images/shoes/fawn-velvet-khussa.jpg",
  },
  {
    id: "aw-9922",
    name: "Royal Peacock Blue Dabka Khussa",
    title: "Royal Peacock Blue Dabka Khussa",
    sku: "KH9922",
    category: "khussa",
    price: 3250,
    originalPrice: 4900,
    discountPercent: 33,
    rating: 4.8,
    reviews: 15,
    badge: "Exclusive",
    isOutOfStock: false,
    description: "Vibrant royal blue velvet base with peacock feather motifs hand-embroidered in gold and copper dabka.",
    colors: ["black", "fawn"],
    sizes: [37, 38, 39, 40],
    outOfStock: [],
    image: "/images/shoes/fawn-velvet-khussa.jpg",
  },

  // 4. Heels
  {
    id: "aw-7215",
    name: "Maroon Suede Ankle-Strap Block Heel",
    title: "Maroon Suede Ankle-Strap Block Heel",
    sku: "HL7215",
    category: "heels",
    price: 3200,
    originalPrice: 5200,
    discountPercent: 38,
    rating: 4.7,
    reviews: 35,
    badge: "Trending",
    isOutOfStock: false,
    description: "Graceful 2.5-inch sturdy block heel in rich Italian-feel maroon faux suede, accented with a polished gold-tone buckle and non-slip rubber outsoles.",
    colors: ["black", "fawn"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [],
    image: "/images/shoes/maroon-block-heel.jpg",
  },
  {
    id: "aw-4401",
    name: "Glossy Black Pointed Court Pump",
    title: "Glossy Black Pointed Court Pump",
    sku: "HL4401",
    category: "heels",
    price: 2850,
    originalPrice: 4600,
    discountPercent: 38,
    rating: 4.8,
    reviews: 22,
    badge: "Formal",
    isOutOfStock: false,
    description: "Timeless black pointed-toe office and evening court shoe with supportive 2-inch heel and foam heel grip.",
    colors: ["black"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [40],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-8821",
    name: "Crystal Brooch Evening Stiletto Heel",
    title: "Crystal Brooch Evening Stiletto Heel",
    sku: "HL8821",
    category: "heels",
    price: 3950,
    originalPrice: 6200,
    discountPercent: 36,
    rating: 4.9,
    reviews: 16,
    badge: "Luxury",
    isOutOfStock: false,
    description: "Dazzling 3-inch party stiletto embellished with an opulent crystal cluster brooch on shimmering satin fabric.",
    colors: ["black", "cream"],
    sizes: [36, 37, 38, 39],
    outOfStock: [],
    image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-8835",
    name: "Nude Champagne Strappy Kitten Heel",
    title: "Nude Champagne Strappy Kitten Heel",
    sku: "HL8835",
    category: "heels",
    price: 2750,
    originalPrice: 4400,
    discountPercent: 37,
    rating: 4.8,
    reviews: 41,
    badge: "Sold Out",
    isOutOfStock: true, // OUT OF STOCK
    description: "Ultra-chic 1.75-inch kitten heel with delicate champagne gold crossover straps.",
    colors: ["cream", "fawn"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [36, 37, 38, 39, 40],
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=700&q=80",
  },

  // 5. Sandals
  {
    id: "aw-6306",
    name: "Grey & Tan Dual-Tone Strappy Sandal",
    title: "Grey & Tan Dual-Tone Strappy Sandal",
    sku: "SD6306",
    category: "sandals",
    price: 1950,
    originalPrice: 3200,
    discountPercent: 39,
    rating: 4.6,
    reviews: 24,
    badge: "Online Exclusive",
    isOutOfStock: false,
    description: "Modern multi-strap summer flat sandal crafted with soft vegan leather straps and contoured suede-finish footbed for effortless city strolling.",
    colors: ["olive", "black"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [41],
    image: "/images/shoes/grey-strappy-sandal.jpg",
  },
  {
    id: "aw-3801",
    name: "Tan Braided Summer Slide Sandal",
    title: "Tan Braided Summer Slide Sandal",
    sku: "SD3801",
    category: "sandals",
    price: 1650,
    originalPrice: 2900,
    discountPercent: 43,
    rating: 4.9,
    reviews: 31,
    badge: "Popular",
    isOutOfStock: false,
    description: "Artisanal woven faux-leather dual straps in warm tan, cushioned insole with moisture-absorbing lining.",
    colors: ["fawn", "black"],
    sizes: [37, 38, 39, 40, 41],
    outOfStock: [],
    image: "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-7709",
    name: "Nude Cross-Strap Wedge Sandal",
    title: "Nude Cross-Strap Wedge Sandal",
    sku: "SD7709",
    category: "sandals",
    price: 2650,
    originalPrice: 4100,
    discountPercent: 35,
    rating: 4.8,
    reviews: 27,
    badge: "Comfort",
    isOutOfStock: false,
    description: "Lightweight faux-cork 1.5-inch wedge sandal with elastic criss-cross straps in flattering nude beige.",
    colors: ["cream", "fawn"],
    sizes: [37, 38, 39, 40],
    outOfStock: [],
    image: "/images/shoes/grey-strappy-sandal.jpg",
  },
  {
    id: "aw-7720",
    name: "Rose Gold Metallic Gladiator Sandal",
    title: "Rose Gold Metallic Gladiator Sandal",
    sku: "SD7720",
    category: "sandals",
    price: 2250,
    originalPrice: 3600,
    discountPercent: 37,
    rating: 4.7,
    reviews: 19,
    badge: "Sold Out",
    isOutOfStock: true, // OUT OF STOCK
    description: "Shimmering rose gold metallic cage sandals with flexible rubber bottom and cushioned heel pad.",
    colors: ["blush", "cream"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [36, 37, 38, 39, 40],
    image: "/images/shoes/grey-strappy-sandal.jpg",
  },

  // 6. Sneakers
  {
    id: "aw-6204",
    name: "Olive Active Comfort Platform Sneaker",
    title: "Olive Active Comfort Platform Sneaker",
    sku: "SN6204",
    category: "sneakers",
    price: 2750,
    originalPrice: 4200,
    discountPercent: 35,
    rating: 4.8,
    reviews: 142,
    badge: "Hot Choice",
    isOutOfStock: false,
    description: "Breathable mesh and suede low-top urban sneakers with lightweight EVA midsoles and retro gum rubber grip tread.",
    colors: ["olive", "black"],
    sizes: [36, 37, 38, 39],
    outOfStock: [],
    image: "/images/shoes/olive-casual-sneaker.jpg",
  },
  {
    id: "aw-1120",
    name: "Pure White Chunky Walking Sneaker",
    title: "Pure White Chunky Walking Sneaker",
    sku: "SN1120",
    category: "sneakers",
    price: 2999,
    originalPrice: 4800,
    discountPercent: 37,
    rating: 4.9,
    reviews: 73,
    badge: "Bestseller",
    isOutOfStock: false,
    description: "Minimalist white chunky trainer crafted from wipe-clean synthetic leather with cloud-bounce insoles.",
    colors: ["cream"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-1135",
    name: "Pastel Colorblock Retro Jogger",
    title: "Pastel Colorblock Retro Jogger",
    sku: "SN1135",
    category: "sneakers",
    price: 2850,
    originalPrice: 4500,
    discountPercent: 36,
    rating: 4.8,
    reviews: 48,
    badge: "New In",
    isOutOfStock: false,
    description: "Trendy pastel blush and mint green colorblocked trainers with ultra-cushioned footbeds.",
    colors: ["blush", "olive"],
    sizes: [36, 37, 38, 39],
    outOfStock: [36],
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "aw-1148",
    name: "Charcoal Slip-On Breathable Sneaker",
    title: "Charcoal Slip-On Breathable Sneaker",
    sku: "SN1148",
    category: "sneakers",
    price: 2450,
    originalPrice: 3800,
    discountPercent: 35,
    rating: 4.7,
    reviews: 33,
    badge: "Sold Out",
    isOutOfStock: true, // OUT OF STOCK
    description: "Laceless stretch-knit charcoal sneaker with memory foam arch support. Temporarily out of stock.",
    colors: ["black"],
    sizes: [36, 37, 38, 39, 40],
    outOfStock: [36, 37, 38, 39, 40],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80",
  },
];

/* ------------------------------------------------------------------ */
/* In-memory Orders Store                                             */
/* ------------------------------------------------------------------ */

const ORDERS_STORE = [
  {
    orderId: "ORD-1788510001",
    trackingId: "AW-3P7CAMCZ",
    status: "dispatched",
    courier: "TCS Express",
    courierTrackingNumber: "TCS-928472910",
    customer: {
      name: "Sana Tariq",
      phone: "+92 300 8472910",
      address: "House 14-B, Street 3, DHA Phase 5",
      city: "Karachi",
    },
    items: [
      {
        productId: "aw-8431",
        title: "Pink Formal Pearl Slide Slipper",
        size: 38,
        qty: 1,
        unitPrice: 2450,
        lineTotal: 2450,
      },
    ],
    subtotal: 2450,
    shipping: 250,
    total: 2700,
    estimatedDelivery: "September 06, 2026",
    placedAt: "2026-09-02T10:15:00.000Z",
    events: [
      { status: "Order Confirmed", time: "Sep 02, 10:15 AM", done: true },
      { status: "Packed at Karachi Hub", time: "Sep 02, 04:30 PM", done: true },
      { status: "Dispatched via TCS Express", time: "Sep 03, 09:00 AM", done: true },
      { status: "Out for Delivery", time: "Expected Sep 06", done: false },
      { status: "Delivered", time: "Pending", done: false },
    ],
  },
];

const CONTACT_INQUIRIES = [];

const generateTrackingId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AW-";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

/* ------------------------------------------------------------------ */
/* API Router                                                         */
/* ------------------------------------------------------------------ */

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({
    name: "Anxino Walk API",
    status: "ok",
    version: "2.1.0",
    endpoints: [
      "GET /api/categories",
      "GET /api/products",
      "GET /api/products/:id",
      "POST /api/checkout",
      "GET /api/orders/:idOrTracking",
      "POST /api/contact",
    ],
  });
});

apiRouter.get("/categories", (req, res) => {
  res.json({ categories: CATEGORIES });
});

apiRouter.get("/products", (req, res) => {
  const { category, search, sort, inStockOnly } = req.query;

  let results = [...PRODUCTS];

  if (category && category !== "all") {
    const normalized = String(category).toLowerCase();
    results = results.filter((p) => p.category === normalized);
  }

  if (inStockOnly === "true") {
    results = results.filter((p) => !p.isOutOfStock);
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.name && p.name.toLowerCase().includes(q)) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  if (sort === "price-low") {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  res.json({ count: results.length, products: results });
});

apiRouter.get("/products/:id", (req, res) => {
  const product = PRODUCTS.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: `Product "${req.params.id}" not found` });
  }

  res.json({ product });
});

apiRouter.post("/checkout", (req, res) => {
  const { items, customer } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "checkout requires a non-empty items array" });
  }

  let subtotal = 0;
  const lineItems = [];

  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      return res.status(400).json({ error: `Unknown productId "${item.productId}"` });
    }

    if (product.isOutOfStock) {
      return res.status(400).json({ error: `"${product.title}" is currently out of stock.` });
    }

    const qty = Number(item.qty) > 0 ? Number(item.qty) : 1;
    const lineTotal = product.price * qty;
    subtotal += lineTotal;

    lineItems.push({
      productId: product.id,
      title: product.title || product.name,
      image: product.image,
      size: item.size || null,
      qty,
      unitPrice: product.price,
      lineTotal,
    });
  }

  const shipping = subtotal >= 3500 ? 0 : 250;
  const total = subtotal + shipping;
  const trackingId = generateTrackingId();
  const orderId = `ORD-${Date.now()}`;

  const order = {
    orderId,
    trackingId,
    status: "confirmed",
    courier: "TCS Express",
    courierTrackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`,
    customer: customer || {
      name: "Valued Customer",
      phone: "+92 300 0000000",
      address: "Delivery address",
      city: "Karachi",
    },
    items: lineItems,
    subtotal,
    shipping,
    total,
    estimatedDelivery: "3-5 business days",
    placedAt: new Date().toISOString(),
    events: [
      { status: "Order Confirmed", time: "Just now", done: true },
      { status: "Packed at Warehouse", time: "In progress", done: false },
      { status: "Dispatched via TCS", time: "Pending", done: false },
      { status: "Out for Delivery", time: "Pending", done: false },
      { status: "Delivered", time: "Pending", done: false },
    ],
  };

  ORDERS_STORE.unshift(order);

  res.status(201).json({ message: "Order placed successfully", order });
});

apiRouter.get("/orders/:idOrTracking", (req, res) => {
  const query = String(req.params.idOrTracking || "").trim().toUpperCase();

  const order = ORDERS_STORE.find(
    (o) =>
      o.trackingId.toUpperCase() === query ||
      o.orderId.toUpperCase() === query
  );

  if (!order) {
    return res.status(404).json({
      error: `No order found with tracking code or ID "${query}". Please verify your receipt or confirmation message.`,
    });
  }

  res.json({ order });
});

apiRouter.post("/contact", (req, res) => {
  const { name, phone, email, subject, message } = req.body || {};

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required." });
  }

  const inquiry = {
    id: `INQ-${Date.now()}`,
    name,
    phone: phone || "",
    email: email || "",
    subject: subject || "General Inquiry",
    message,
    receivedAt: new Date().toISOString(),
  };

  CONTACT_INQUIRIES.push(inquiry);

  res.status(201).json({
    message: "Your message has been received. Our team will contact you via WhatsApp / phone shortly.",
    ticketId: inquiry.id,
  });
});

app.use("/api", apiRouter);
app.use(apiRouter);

/* ------------------------------------------------------------------ */
/* Dev server runner                                                  */
/* ------------------------------------------------------------------ */

if (!process.env.VERCEL) {
  const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
  if (isMainModule || process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Anxino Walk API running on http://localhost:${PORT}`);
    });
  }
}

export default app;
