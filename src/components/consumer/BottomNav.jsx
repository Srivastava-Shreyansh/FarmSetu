import { bottomNavItems } from "./bottomNavItems";
import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function BottomNav({ page, navigate, cartCount }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-earth z-40 safe-area-bottom">
      <div className="flex">
        {bottomNavItems.map(({ icon: Icon, label, page: p }) => {
          const active = page === p;
          return (
            <button
              key={p}
              onClick={() => navigate(p)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                active ? "text-primary" : "text-muted hover:text-foreground"
              }`}
            >
              <div className="relative">
                <Icon size={21} />
                {label === "Orders" && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-cream text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-xs font-medium ${active ? "font-bold" : ""}`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Consumer Header ──────────────────────────────────────────────────────────

