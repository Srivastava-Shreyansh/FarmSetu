import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function ProfilePage({ onLogout }) {
  const menuItems = [
    { icon: MapPin, label: "Saved Addresses", sub: "2 saved locations" },
    { icon: Phone, label: "Contact Support", sub: "Help & FAQ" },
    { icon: Star, label: "Rate the App", sub: "Share your feedback" },
    {
      icon: ShieldCheck,
      label: "Privacy & Security",
      sub: "Manage your account",
    },
  ];

  return (
    <div className="pb-24 px-5 pt-5">
      {/* Profile card */}
      <div className="flex items-center gap-4 bg-white border border-earth rounded-2xl p-5 mb-6">
        <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
          🧑‍💼
        </div>
        <div>
          <h3 className="font-bold font-serif text-xl">Priya Sharma</h3>
          <p className="text-sm text-muted">+91 9876543210</p>
          <Badge variant="green" className="mt-1.5">
            Consumer
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Orders", value: "12" },
          { label: "Spent", value: "₹2,840" },
          { label: "Farmers", value: "4" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-earth rounded-2xl p-3 text-center"
          >
            <p className="font-bold text-lg font-serif">{value}</p>
            <p className="text-xs text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-5">
        {menuItems.map(({ icon: Icon, label, sub }) => (
          <Card key={label} className="p-4" onClick={() => {}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cream-dark rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted">{sub}</p>
              </div>
              <ChevronRight size={15} className="text-muted" />
            </div>
          </Card>
        ))}
      </div>

      <Button variant="danger" className="w-full" onClick={onLogout}>
        <LogOut size={16} /> Sign Out
      </Button>
    </div>
  );
}

// ─── ROOT CONSUMER ────────────────────────────────────────────────────────────

export const showBottomNav = [
  "consumer.home",
  "consumer.search",
  "consumer.history",
  "consumer.profile",
];



