# FarmSetu — Hyper-Local Farm-to-Consumer Platform

**FarmSetu** is a modern AgriTech web platform designed to connect local farmers, conscious households, and delivery riders in one transparent food ecosystem. By eliminating unnecessary intermediaries, FarmSetu ensures growers earn fair prices while consumers receive farm-fresh produce within 24 hours of harvest.

---

## 🌟 Key Features

- **Modern Minimalist Agri Theme**: Custom design system crafted with earthy greens (`#1e4d3b`), warm cream tones (`#f9f8f4`), and natural accents (`#e2dfd5`).
- **GSAP Animations**:
  - **Hero Text Reveals**: Staggered entrance animations powered by `gsap.from()`.
  - **Interactive Draggable Role Selector**: Smooth touch/mouse card carousel built with `GSAP Draggable`.
  - **ScrollTrigger Impact Counters & Features**: Scroll-driven reveals for stats and ecosystem pillars.
  - **Floating Micro-Interactions**: Ambient floating sprout badges and dynamic hover states.
- **Multi-Role Flow**: Seamless experience for **Consumers**, **Farmers / Vendors**, and **Delivery Riders**.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19, Vite 8, JavaScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation Engine**: GSAP 3.15 (ScrollTrigger & Draggable)
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install # or npm install

# Start Vite development server
npm run dev

# Production build check
npm run build
```

---

## 📂 Project Structure

- `src/pages/auth/Landing.jsx` — GSAP-animated, interactive landing page
- `src/pages/auth/Auth.jsx` — Multi-role authentication & OTP verification
- `src/pages/consumer/` — Consumer marketplace, cart & order tracking
- `src/pages/farmer/` — Farmer dashboard & produce management
- `src/pages/rider/` — Delivery rider task board & route tracking
- `src/index.css` — Global CSS entrypoint and Tailwind theme setup
