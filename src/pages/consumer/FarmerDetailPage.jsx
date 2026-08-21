import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function FarmerDetailPage({
  farmerId,
  navigate,
  cart,
  setCart,
  setSelectedVegetableId,
}) {
  const farmer = getFarmerById(farmerId);
  const vegs = getVegetablesByFarmer(farmerId);
  const [toast, setToast] = useState(null);
  const { getItem, add, update } = useCart(cart, setCart);

  if (!farmer) return null;

  const toastAndAdd = (v, f) => {
    add(v, f);
    setToast(`${v.name} added to cart`);
    setTimeout(() => setToast(null), 2000);
  };

  const cartTotal = cart.reduce(
    (s, c) => s + c.quantity * c.vegetable.pricePerKg,
    0,
  );
  const cartKg = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="pb-32">
      {/* Cover */}
      <div className="relative h-56">
        <img
          src={`https://images.unsplash.com/${farmer.farmImage}?w=800&h=448&fit=crop&auto=format`}
          alt={`${farmer.name}'s farm`}
          className="w-full h-full object-cover bg-cream-dark"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3">
          <img
            src={`https://images.unsplash.com/${farmer.image}?w=96&h=96&fit=crop&auto=format`}
            alt={farmer.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-lg flex-shrink-0"
          />

          <div>
            <Badge
              variant={farmer.type === "Producer" ? "green" : "amber"}
              className="mb-1.5"
            >
              {farmer.type}
            </Badge>
            <h2 className="text-xl font-bold font-serif text-cream">
              {farmer.name}
            </h2>
            {farmer.tagline && (
              <p className="text-cream/70 text-xs mt-0.5">{farmer.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-white border-b border-earth px-5 py-3 flex items-center gap-5 text-xs overflow-x-auto scroll-none">
        <span className="flex items-center gap-1 text-muted flex-shrink-0">
          <MapPin size={12} className="text-primary" /> {farmer.location}
        </span>
        <span className="flex items-center gap-1 flex-shrink-0">
          <Star size={12} className="text-amber-400 fill-amber-400" />
          <span className="font-bold text-foreground">{farmer.rating}</span>
          <span className="text-muted">({farmer.reviewCount})</span>
        </span>
        <span className="flex items-center gap-1 text-muted flex-shrink-0">
          <Clock size={12} className="text-primary" /> {farmer.deliveryTime}
        </span>
        <span className="flex items-center gap-1 text-muted flex-shrink-0">
          <Phone size={12} className="text-primary" /> {farmer.mobile}
        </span>
      </div>

      {/* Vegetables */}
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold font-serif text-lg">Available Produce</h3>
          <span className="text-xs text-muted bg-cream-dark px-2.5 py-1 rounded-full">
            {vegs.filter((v) => v.available).length} items
          </span>
        </div>

        {vegs.length === 0 ? (
          <EmptyState
            icon={<Package size={24} />}
            title="No produce listed yet"
            description="This farmer hasn't added any vegetables yet."
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {vegs.map((v) => (
              <VegetableCard
                key={v.id}
                vegetable={v}
                farmer={farmer}
                cartItem={getItem(v.id)}
                onAdd={toastAndAdd}
                onUpdateQty={update}
                onDetail={(veg) => {
                  setSelectedVegetableId(veg.id);
                  navigate("consumer.product-detail");
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating cart bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-40">
          <Button
            className="w-full shadow-2xl"
            size="lg"
            onClick={() => navigate("consumer.cart")}
          >
            <ShoppingCart size={18} />
            View Cart ({cartKg.toFixed(1)} kg) · ₹{cartTotal.toFixed(0)}
          </Button>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────
