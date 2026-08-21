import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function FarmersPage({ navigate, setSelectedFarmerId }) {
  const [filter, setFilter] = useState("all");

  const filtered = farmers.filter((f) => filter === "all" || f.type === filter);

  return (
    <div className="pb-24 px-5 pt-4">
      <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 mb-5">
        {[
          { id: "all", label: "All Sources" },
          { id: "Producer", label: "🌱 Direct Farmer" },
          { id: "Local Vendor", label: "🏪 Local Vendor" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
              filter === id
                ? "bg-primary text-cream border-primary shadow-sm"
                : "bg-white text-muted border-earth hover:border-primary-muted hover:bg-cream-dark/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted mb-4">
        {filtered.length} available near you
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search size={24} />}
          title="No farmers found"
          description="Try a different filter."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((f) => (
            <FarmerCard
              key={f.id}
              farmer={f}
              vegetables={getVegetablesByFarmer(f.id)}
              onClick={() => {
                setSelectedFarmerId(f.id);
                navigate("consumer.farmer-detail");
              }}
              layout="list"
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────────
