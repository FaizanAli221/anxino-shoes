# Anxino Walk — Ladies Footwear Fullstack Storefront

A modern, responsive fullstack e-commerce web application for **Anxino Walk** ladies footwear brand, built with **React**, **Tailwind CSS**, **Lucide Icons**, and an **Express API** backend. Ready for one-click deployment on **Vercel**.

---

## Features

- **Storefront UI**: Interactive carousel hero banner, category navigation, responsive product grid, product badges, star ratings, and size/color selection.
- **Dynamic Catalog**: Products and categories loaded directly from Express backend API (`/api/products`, `/api/categories`).
- **Live Filtering & Search**: Filter footwear by categories (*Chappals*, *Slippers*, *Sandals*, *Heels*, *Sneakers*) and search by keyword or SKU.
- **Cart & Slide-Over Bag**: Dynamic quantity controls, subtotal calculation, and free shipping progress meter (orders $\ge$ Rs. 3,500).
- **Checkout & Order Tracking**: Cash on Delivery (COD) order checkout modal submitting to `POST /api/checkout` with automated order ID and tracking code generation.

---

## Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, Lucide React
- **Backend**: Node.js, Express, CORS
- **Deployment**: Vercel (Serverless API Functions + Static Frontend Edge Hosting)

---

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run both frontend and backend concurrently**:
   ```bash
   npm run dev
   ```
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

---

## Deploy to Vercel

1. Push your code to GitHub (see below).
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your repository: `FaizanAli221/anxino-shoes`.
4. Keep the default settings (Framework preset: **Vite**, Build command: `vite build`, Output directory: `dist`).
5. Click **Deploy**. Vercel will host both your Vite frontend and serverless `/api` endpoints automatically.
