import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());
app.use(express.json());

/* ------------------------------------------------------------------ */
/* Mock data                                                          */
/* ------------------------------------------------------------------ */

export const CATEGORIES = [
  { id: "chappals", label: "Chappals", swatch: "bg-amber-200" },
  { id: "slippers", label: "Slippers", swatch: "bg-rose-200" },
  { id: "women-shoes", label: "Women Shoes", swatch: "bg-stone-300" },
  { id: "sandals", label: "Sandals", swatch: "bg-orange-200" },
  { id: "heels", label: "Heels", swatch: "bg-pink-200" },
  { id: "sneakers", label: "Sneakers", swatch: "bg-slate-200" },
];

export const PRODUCTS = [
  {
    id: "aw-8431",
    name: "Pink Formal Women Slipper",
    title: "Pink Formal Women Slipper",
    sku: "FR8431",
    category: "slippers",
    price: 2060,
    originalPrice: 4200,
    discountPercent: 51,
    rating: 4.1,
    reviews: 12,
    badge: "Sale",
    colors: ["blush", "black"],
    sizes: [36, 37, 38, 39, 40, 41, 42],
    outOfStock: [42],
    image: "https://picsum.photos/seed/aw-8431/600/800",
  },
  {
    id: "aw-0838",
    name: "Black Fancy Chappal for Women",
    title: "Black Fancy Chappal for Women",
    sku: "FN0838",
    category: "chappals",
    price: 2900,
    originalPrice: 4200,
    discountPercent: 31,
    rating: 4.8,
    reviews: 34,
    badge: "Sale",
    colors: ["black", "fawn"],
    sizes: [36, 37, 38, 39, 40, 41, 42],
    outOfStock: [],
    image: "https://picsum.photos/seed/aw-0838/600/800",
  },
  {
    id: "aw-0853",
    name: "Fawn Fancy Chappal for Women",
    title: "Fawn Fancy Chappal for Women",
    sku: "FN0853",
    category: "chappals",
    price: 1730,
    originalPrice: 2500,
    discountPercent: 31,
    rating: 5,
    reviews: 3,
    badge: "Sale",
    colors: ["fawn", "cream"],
    sizes: [36, 37, 38, 39, 40, 41, 42],
    outOfStock: [],
    image: "https://picsum.photos/seed/aw-0853/600/800",
  },
  {
    id: "aw-6306",
    name: "Grey Fancy Women Sandal",
    title: "Grey Fancy Women Sandal",
    sku: "FN6306",
    category: "sandals",
    price: 1730,
    originalPrice: 2500,
    discountPercent: 31,
    rating: 4.6,
    reviews: 6,
    badge: "Online Exclusive",
    colors: ["olive", "black"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [41],
    image: "https://picsum.photos/seed/aw-6306/600/800",
  },
  {
    id: "aw-6204",
    name: "Olive Casual Sneaker",
    title: "Olive Casual Sneaker",
    sku: "WN6204",
    category: "sneakers",
    price: 999,
    originalPrice: 1800,
    discountPercent: 45,
    rating: 4.5,
    reviews: 191,
    badge: "Online Exclusive",
    colors: ["olive", "black"],
    sizes: [36, 37, 38],
    outOfStock: [],
    image: "https://picsum.photos/seed/aw-6204/600/800",
  },
  {
    id: "aw-3801",
    name: "Women Casual Strappy Sandal",
    title: "Women Casual Strappy Sandal",
    sku: "CL563801",
    category: "sandals",
    price: 1499,
    originalPrice: 3500,
    discountPercent: 57,
    rating: 4.9,
    reviews: 31,
    badge: "Sale",
    colors: ["fawn", "black"],
    sizes: [38, 39, 40, 41],
    outOfStock: [],
    image: "https://picsum.photos/seed/aw-3801/600/800",
  },
  {
    id: "aw-7215",
    name: "Maroon Suede Block Heel",
    title: "Maroon Suede Block Heel",
    sku: "HL7215",
    category: "heels",
    price: 2450,
    originalPrice: 3900,
    discountPercent: 37,
    rating: 4.4,
    reviews: 18,
    badge: "New In",
    colors: ["black", "fawn"],
    sizes: [36, 37, 38, 39],
    outOfStock: [],
    image: "https://picsum.photos/seed/aw-7215/600/800",
  },
  {
    id: "aw-4401",
    name: "Women Formal Softy Pump",
    title: "Women Formal Softy Pump",
    sku: "FR854401",
    category: "heels",
    price: 1499,
    originalPrice: 4000,
    discountPercent: 63,
    rating: 4.9,
    reviews: 3,
    badge: "Sale",
    colors: ["black", "olive"],
    sizes: [36, 37, 38, 39, 40, 41],
    outOfStock: [],
    image: "https://picsum.photos/seed/aw-4401/600/800",
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const generateTrackingId = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "AW-";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

/* ------------------------------------------------------------------ */
/* Router setup (handles both /api/* and root paths)                   */
/* ------------------------------------------------------------------ */

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({
    name: "Anxino Walk API",
    status: "ok",
    endpoints: [
      "GET /api/categories",
      "GET /api/products",
      "GET /api/products?category=sandals",
      "GET /api/products/:id",
      "POST /api/checkout",
    ],
  });
});

apiRouter.get("/categories", (req, res) => {
  res.json({ categories: CATEGORIES });
});

apiRouter.get("/products", (req, res) => {
  const { category, search } = req.query;

  let results = PRODUCTS;

  if (category && category !== "all") {
    const normalized = String(category).toLowerCase();
    results = results.filter((p) => p.category === normalized);
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

    const qty = Number(item.qty) > 0 ? Number(item.qty) : 1;

    if (item.size && !product.sizes.includes(Number(item.size))) {
      return res.status(400).json({
        error: `Size ${item.size} not available for "${product.title || product.name}"`,
        availableSizes: product.sizes,
      });
    }

    const lineTotal = product.price * qty;
    subtotal += lineTotal;

    lineItems.push({
      productId: product.id,
      title: product.title || product.name,
      size: item.size || null,
      qty,
      unitPrice: product.price,
      lineTotal,
    });
  }

  const shipping = subtotal >= 3500 ? 0 : 250;
  const total = subtotal + shipping;

  const order = {
    orderId: `ORD-${Date.now()}`,
    trackingId: generateTrackingId(),
    status: "confirmed",
    customer: customer || {
      name: "Guest",
      phone: "",
      address: "",
      city: "",
    },
    items: lineItems,
    subtotal,
    shipping,
    total,
    estimatedDelivery: "3-5 business days",
    placedAt: new Date().toISOString(),
  };

  res.status(201).json({ message: "Order placed successfully", order });
});

// Mount router on both /api and / to support local dev and Vercel serverless rewrites
app.use("/api", apiRouter);
app.use(apiRouter);

/* ------------------------------------------------------------------ */
/* Local dev server runner (skipped on Vercel)                        */
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
