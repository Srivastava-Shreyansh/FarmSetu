import { useState } from "react";
import { Leaf, Navigation, Phone, CheckCircle, Package, TrendingUp, Clock, MapPin, LogOut, ChevronRight, Bell, Star } from "lucide-react";
import { Button, Card, Badge, StatCard, EmptyState } from "../../components/ui";

import { pickupRequests } from "../../components/rider/pickupRequests";
import { deliverySteps } from "../../components/rider/deliverySteps";
import ActiveDeliveryPage from "./ActiveDeliveryPage";
import RiderDashboard from "./RiderDashboard";

export default function Rider({ page, navigate, onLogout }) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-earth h-14 flex items-center justify-between px-4 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => navigate("auth")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          title="Return to Landing Page"
        >
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <Leaf size={14} className="text-cream" />
          </div>
          <span className="font-bold font-serif text-foreground tracking-tight">
            FarmSetu
          </span>
          <span className="text-muted text-sm">
            · {page === "rider.dashboard" ? "Dashboard" : "Active Delivery"}
          </span>
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
        >
          <LogOut size={14} /> Sign out
        </button>
      </header>

      <main>
        {page === "rider.dashboard" && <RiderDashboard navigate={navigate} />}
        {page === "rider.delivery" && (
          <ActiveDeliveryPage navigate={navigate} />
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-earth flex z-30">
        {[
          { icon: Package, label: "Requests", p: "rider.dashboard" },
          { icon: Navigation, label: "Active", p: "rider.delivery" },
        ].map(({ icon: Icon, label, p }) => (
          <button
            key={p}
            onClick={() => navigate(p)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
              page === p ? "text-primary" : "text-muted hover:text-foreground"
            }`}
          >
            <Icon size={21} />
            <span
              className={`text-xs font-medium ${page === p ? "font-bold" : ""}`}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>

      <div className="h-16" />
    </div>
  );
}
