import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function ConsumerHeader({ title, back, onBack, navigate, cartCount }) {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-earth z-30 px-4 h-14 flex items-center justify-between gap-3">
      {back ? (
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-cream-dark flex items-center justify-center hover:bg-earth transition-colors flex-shrink-0"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate("auth")}
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          title="Return to Landing Page"
        >
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Leaf size={14} className="text-cream" />
          </div>
          <span className="font-bold font-serif text-foreground tracking-tight">
            FarmSetu
          </span>
        </button>
      )}

      {title && (
        <h1 className="font-bold text-sm text-foreground flex-1 text-center truncate">
          {title}
        </h1>
      )}
      {!title && <div className="flex-1" />}

      <button
        onClick={() => navigate("consumer.cart")}
        className="relative w-9 h-9 rounded-full bg-cream-dark flex items-center justify-center hover:bg-earth transition-colors"
      >
        <ShoppingCart size={17} className="text-foreground" />
        {cartCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 w-[18px] h-[18px] bg-primary text-cream text-xs rounded-full flex items-center justify-center font-bold leading-none">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
