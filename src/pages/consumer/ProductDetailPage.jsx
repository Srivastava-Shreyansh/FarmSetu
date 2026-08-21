import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function ProductDetailPage({ vegetableId, navigate, cart, setCart }) {
  const vegetable = getVegetableById(vegetableId);
  const [qty, setQty] = useState(0.5);
  const [added, setAdded] = useState(false);
  const { getItem, add, update } = useCart(cart, setCart);

  if (!vegetable) return null;
  const farmer = getFarmerById(vegetable.farmerId);
  const cartItem = getItem(vegetable.id);
  const relatedVegs = getVegetablesByFarmer(farmer.id)
    .filter((v) => v.id !== vegetable.id && v.available)
    .slice(0, 4);

  const handleAdd = () => {
    if (cartItem) update(vegetable, qty);
    else add(vegetable, farmer);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="pb-32">
      {/* Hero image */}
      <div className="relative h-72">
        <img
          src={`https://images.unsplash.com/${vegetable.image}?w=800&h=576&fit=crop&auto=format`}
          alt={vegetable.name}
          className="w-full h-full object-cover bg-cream-dark"
        />

        {!vegetable.available && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-cream font-semibold text-lg bg-foreground/80 px-5 py-2 rounded-full">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content card */}
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-5 pt-6 pb-4">
        {/* Name + price */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold font-serif text-foreground">
              {vegetable.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={vegetable.available ? "green" : "gray"}>
                {vegetable.available ? "In Stock" : "Out of Stock"}
              </Badge>
              <Badge variant={farmer.type === "Producer" ? "green" : "amber"}>
                {farmer.type}
              </Badge>
            </div>
            <p className="mt-2 inline-flex items-center gap-1 rounded-lg bg-primary-light px-2 py-1 text-xs font-bold text-primary">
              <Leaf size={12} /> Harvested {vegetable.harvestedAt || "today"} · {vegetable.availableQuantity || "fresh stock"} left
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ₹{vegetable.pricePerKg}
            </p>
            <p className="text-xs text-muted">per kg</p>
          </div>
        </div>

        {/* Description */}
        {vegetable.description && (
          <p className="text-sm text-muted leading-relaxed mb-5">
            {vegetable.description}
          </p>
        )}

        {/* Trust indicators */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            {
              icon: <ShieldCheck size={16} />,
              label: "No middlemen",
              sub: "Direct price",
            },
            {
              icon: <Star size={16} />,
              label: "Farmer rated",
              sub: `${farmer.rating} ★`,
            },
            {
              icon: <Truck size={16} />,
              label: "Quick delivery",
              sub: farmer.deliveryTime,
            },
          ].map(({ icon, label, sub }) => (
            <div
              key={label}
              className="bg-cream-dark rounded-xl p-3 text-center"
            >
              <span className="text-primary flex justify-center mb-1">
                {icon}
              </span>
              <p className="text-xs font-semibold text-foreground leading-tight">
                {label}
              </p>
              <p className="text-xs text-muted">{sub}</p>
            </div>
          ))}
        </div>

        {/* Farmer info */}
        <button
          onClick={() => navigate("consumer.farmer-detail")}
          className="w-full flex items-center gap-3 bg-cream-dark rounded-2xl p-4 hover:bg-earth transition-colors mb-5"
        >
          <img
            src={`https://images.unsplash.com/${farmer.image}?w=64&h=64&fit=crop&auto=format`}
            alt={farmer.name}
            className="w-11 h-11 rounded-xl object-cover bg-earth flex-shrink-0"
          />

          <div className="flex-1 text-left min-w-0">
            <p className="text-sm font-bold text-foreground">{farmer.name}</p>
            <p className="text-xs text-muted flex items-center gap-1">
              <MapPin size={10} /> {farmer.location}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold">{farmer.rating}</span>
              <span className="text-xs text-subtle">
                ({farmer.reviewCount} reviews)
              </span>
            </div>
          </div>
          <ChevronRight size={16} className="text-muted flex-shrink-0" />
        </button>

        {/* Related vegetables */}
        {relatedVegs.length > 0 && (
          <div>
            <h3 className="font-bold font-serif mb-3">
              More from {farmer.name}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {relatedVegs.map((v) => {
                const ci = getItem(v.id);
                return (
                  <VegetableCard
                    key={v.id}
                    vegetable={v}
                    farmer={farmer}
                    cartItem={ci}
                    onAdd={add}
                    onUpdateQty={update}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fixed CTA */}
      {vegetable.available && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-earth p-4 flex items-center gap-4 z-40">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setQty((q) => Math.max(0.5, +(q - 0.5).toFixed(1)))
              }
              className="w-9 h-9 rounded-full bg-primary-light text-primary flex items-center justify-center hover:bg-primary-muted transition-colors"
            >
              <Minus size={15} />
            </button>
            <span className="text-sm font-bold w-14 text-center">{qty} kg</span>
            <button
              onClick={() => setQty((q) => +(q + 0.5).toFixed(1))}
              className="w-9 h-9 rounded-full bg-primary text-cream flex items-center justify-center hover:bg-primary-hover transition-colors"
            >
              <Plus size={15} />
            </button>
          </div>
          <Button className="flex-1" size="lg" onClick={handleAdd}>
            {added
              ? "✓ Added!"
              : `Add to Cart · ₹${(qty * vegetable.pricePerKg).toFixed(0)}`}
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── FARMER DETAIL PAGE ───────────────────────────────────────────────────────
