import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function CartPage({ cart, setCart, navigate }) {
  const { update } = useCart(cart, setCart);
  const subtotal = cart.reduce(
    (s, c) => s + c.quantity * c.vegetable.pricePerKg,
    0,
  );
  const delivery = cart.length > 0 ? 25 : 0;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="pb-20 pt-8">
        <EmptyState
          icon={<ShoppingCart size={24} />}
          title="Your cart is empty"
          description="Add vegetables from a farmer's catalogue to get started."
          action={
            <Button
              onClick={() => navigate("consumer.home")}
              variant="secondary"
            >
              Browse Farmers
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="pb-32 px-5 pt-5">
      <div className="space-y-3 mb-5">
        {cart.map((item) => (
          <Card key={item.vegetable.id} className="p-4">
            <div className="flex gap-3">
              <img
                src={`https://images.unsplash.com/${item.vegetable.image}?w=96&h=96&fit=crop&auto=format`}
                alt={item.vegetable.name}
                className="w-16 h-16 rounded-xl object-cover bg-cream-dark flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-foreground">
                  {item.vegetable.name}
                </h4>
                <p className="text-xs text-muted">{item.farmer.name}</p>
                <p className="text-sm font-bold text-primary mt-1">
                  ₹{item.vegetable.pricePerKg}/kg
                </p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-sm font-bold text-foreground">
                  ₹{(item.quantity * item.vegetable.pricePerKg).toFixed(0)}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      update(item.vegetable, +(item.quantity - 0.5).toFixed(1))
                    }
                    className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center hover:bg-primary-muted transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-bold w-10 text-center">
                    {item.quantity} kg
                  </span>
                  <button
                    onClick={() =>
                      update(item.vegetable, +(item.quantity + 0.5).toFixed(1))
                    }
                    className="w-7 h-7 rounded-full bg-primary text-cream flex items-center justify-center hover:bg-primary-hover transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="p-5 mb-4">
        <h3 className="font-bold font-serif mb-3">Price Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal ({cart.length} items)</span>
            <span className="font-medium">₹{subtotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Delivery fee</span>
            <span className="font-medium">₹{delivery}</span>
          </div>
          <div className="border-t border-earth pt-2 flex justify-between font-bold text-base">
            <span>Total</span>
            <span className="text-primary">₹{total.toFixed(0)}</span>
          </div>
        </div>
      </Card>

      <div className="bg-primary-light rounded-2xl p-4 mb-4 flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-primary">
          <span className="font-bold">No hidden charges.</span> Price paid goes
          directly to your farmer — minus the platform fee that funds delivery
          and operations.
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-earth z-40">
        <Button
          className="w-full"
          size="lg"
          onClick={() => navigate("consumer.checkout")}
        >
          Proceed to Checkout · ₹{total.toFixed(0)}
        </Button>
      </div>
    </div>
  );
}

// ─── CHECKOUT PAGE ────────────────────────────────────────────────────────────
