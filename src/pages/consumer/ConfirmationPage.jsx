import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function ConfirmationPage({ navigate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mb-6">
        <span className="text-5xl">🎉</span>
      </div>
      <h2 className="text-2xl font-bold font-serif mb-2">Order Placed!</h2>
      <p className="text-muted text-sm mb-1">
        Your order <span className="font-bold text-foreground">#ORD1024</span>{" "}
        has been placed.
      </p>
      <p className="text-muted text-sm mb-8">
        The farmer will confirm it shortly.
      </p>

      <Card className="p-5 w-full mb-6 text-left">
        <p className="text-xs text-muted mb-2">Estimated delivery</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center">
            <Truck size={18} className="text-primary" />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">2–3 hours</p>
            <p className="text-xs text-muted">Fresh from Ramesh Patel's farm</p>
          </div>
        </div>
      </Card>

      <div className="space-y-3 w-full">
        <Button
          className="w-full"
          size="lg"
          onClick={() => navigate("consumer.tracking")}
        >
          Track My Order
        </Button>
        <Button
          className="w-full"
          variant="outline"
          size="lg"
          onClick={() => navigate("consumer.home")}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

// ─── TRACKING PAGE ────────────────────────────────────────────────────────────
