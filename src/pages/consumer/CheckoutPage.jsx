import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function CheckoutPage({ cart, navigate, setSelectedOrderId, setCart }) {
  const [name, setName] = useState("Priya Sharma");
  const [address, setAddress] = useState(
    "14B, Shastri Nagar, Anand, Gujarat 388001",
  );
  const [mobile, setMobile] = useState("9876543210");
  const subtotal = cart.reduce(
    (s, c) => s + c.quantity * c.vegetable.pricePerKg,
    0,
  );
  const total = subtotal + 25;

  const handlePlace = () => {
    setSelectedOrderId("ORD1024");
    setCart([]);
    navigate("consumer.confirmation");
  };

  return (
    <div className="pb-28 px-5 pt-5">
      <Card className="p-5 mb-4">
        <h3 className="font-bold font-serif mb-4">Delivery Details</h3>
        <div className="space-y-3">
          {[
            { label: "Full Name", value: name, set: setName, type: "text" },
            {
              label: "Mobile Number",
              value: mobile,
              set: setMobile,
              type: "tel",
            },
          ].map(({ label, value, set, type }) => (
            <div key={label}>
              <label className="text-xs font-semibold text-muted mb-1.5 block">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-semibold text-muted mb-1.5 block">
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-earth px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>
      </Card>

      <Card className="p-5 mb-4">
        <h3 className="font-bold font-serif mb-3">Order Summary</h3>
        <div className="space-y-2">
          {cart.map((item) => (
            <div
              key={item.vegetable.id}
              className="flex justify-between text-sm"
            >
              <span className="text-muted">
                {item.vegetable.name} × {item.quantity} kg
              </span>
              <span className="font-medium">
                ₹{(item.quantity * item.vegetable.pricePerKg).toFixed(0)}
              </span>
            </div>
          ))}
          <div className="border-t border-earth pt-2 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Delivery</span>
              <span>₹25</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span className="text-primary">₹{total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-earth z-40">
        <Button className="w-full" size="lg" onClick={handlePlace}>
          Place Order · ₹{total.toFixed(0)}
        </Button>
      </div>
    </div>
  );
}

// ─── CONFIRMATION PAGE ────────────────────────────────────────────────────────
