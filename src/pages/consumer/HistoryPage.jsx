import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function HistoryPage({ navigate, setSelectedOrderId }) {
  const pastOrders = [
    {
      id: "ORD1026",
      status: "confirmed",
      date: "Today, Aug 20",
      total: 189,
      items: "Tomato · Brinjal · Okra",
      farmer: "Ramesh Patel",
    },
    {
      id: "ORD1019",
      status: "delivered",
      date: "Aug 18, 2026",
      total: 215,
      items: "Tomato · Potato · Spinach",
      farmer: "Sita Devi",
    },
    {
      id: "ORD1015",
      status: "delivered",
      date: "Aug 15, 2026",
      total: 148,
      items: "Onion · Carrot · Cauliflower",
      farmer: "Mohan Kumar",
    },
  ];

  return (
    <div className="pb-24 px-5 pt-5">
      <h2 className="text-xl font-bold font-serif mb-5">My Orders</h2>
      {pastOrders.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={24} />}
          title="No orders yet"
          description="Place your first order and it will appear here."
          action={
            <Button
              onClick={() => navigate("consumer.home")}
              variant="secondary"
            >
              Browse Farmers
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {pastOrders.map((order) => (
            <Card
              key={order.id}
              className="p-4"
              onClick={() => {
                setSelectedOrderId(order.id);
                navigate("consumer.tracking");
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-bold font-serif">#{order.id}</p>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-xs text-muted mb-0.5">{order.date}</p>
              <p className="text-sm text-muted mb-2">{order.items}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-subtle">{order.farmer}</p>
                  <p className="font-bold text-primary">₹{order.total}</p>
                </div>
                <span className="text-xs text-primary font-semibold flex items-center gap-0.5">
                  View details <ChevronRight size={12} />
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
