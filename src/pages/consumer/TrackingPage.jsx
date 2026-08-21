import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function TrackingPage({ navigate }) {
  const statuses = [
    "placed",
    "confirmed",
    "preparing",
    "ready",
    "rider_assigned",
    "picked_up",
    "out_for_delivery",
    "delivered",
  ];
  const [idx, setIdx] = useState(1);
  const status = statuses[idx];

  return (
    <div className="pb-24 px-5 pt-5">
      <Card className="p-5 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-muted mb-1">Order ID</p>
            <p className="font-bold font-serif text-lg">#ORD1024</p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="bg-cream-dark rounded-xl p-3 mb-3">
          <p className="text-xs text-muted mb-1">Delivering to</p>
          <p className="text-sm font-medium flex items-start gap-1.5">
            <MapPin size={14} className="text-primary mt-0.5 flex-shrink-0" />
            14B, Shastri Nagar, Anand, Gujarat 388001
          </p>
        </div>

        {status !== "delivered" && (
          <div className="flex items-center gap-2 bg-primary-light rounded-xl p-3">
            <Clock size={14} className="text-primary flex-shrink-0" />
            <p className="text-xs text-primary font-medium">
              Estimated arrival in {Math.max(1, 3 - Math.floor(idx / 3))}–
              {Math.max(2, 4 - Math.floor(idx / 3))} hours
            </p>
          </div>
        )}
      </Card>

      {/* Rider card — appears when assigned */}
      {idx >= 4 && idx < 7 && (
        <Card className="p-4 mb-4">
          <p className="text-xs text-muted mb-3">Your Rider</p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-primary-light rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              🏍️
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-foreground">Arjun Kumar</p>
              <p className="text-xs text-muted">2-Wheeler · KA 05 AB 1234</p>
            </div>
            <button className="w-9 h-9 bg-primary-light rounded-full flex items-center justify-center text-primary hover:bg-primary-muted transition-colors">
              <Phone size={15} />
            </button>
          </div>
        </Card>
      )}

      <Card className="p-5 mb-4">
        <h3 className="font-bold font-serif mb-5">Order Progress</h3>
        <OrderTimeline status={status} />
      </Card>

      {/* Demo stepper */}
      <Card className="p-4">
        <p className="text-xs text-muted mb-3 font-medium">Demo controls</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
          >
            ← Prev
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => setIdx((i) => Math.min(statuses.length - 1, i + 1))}
            disabled={idx === statuses.length - 1}
          >
            Advance Status →
          </Button>
        </div>
      </Card>

      {status === "delivered" && (
        <div className="mt-4">
          <Button className="w-full" onClick={() => navigate("consumer.home")}>
            Back to Home
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────────────────
