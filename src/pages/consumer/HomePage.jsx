import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function HomePage({
  navigate,
  cart,
  setCart,
  setSelectedFarmerId,
  setSelectedVegetableId,
}) {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState("Producer");
  const [toast, setToast] = useState(null);
  const { getItem, add, update } = useCart(cart, setCart);

  const filteredFarmers = farmers.filter((f) => f.type === filter);
  const popularVegs = vegetables.filter((v) => v.available).slice(0, 8);

  useEffect(() => {
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from("[data-animate-home]", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "opacity,transform",
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const toastAndAdd = (v, f) => {
    add(v, f);
    setToast(`${v.name} added to cart`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div ref={containerRef} className="pb-24 max-w-7xl mx-auto w-full">
      {/* Hero Banner */}
      <div data-animate-home className="relative h-60 sm:h-72 overflow-hidden rounded-b-3xl sm:rounded-3xl sm:mt-4 sm:mx-5 lg:mx-8 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&h=600&fit=crop&auto=format"
          alt="Fresh vegetables market"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#103d2d]/95 via-primary/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col justify-end">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#d8e9b6]/20 px-3.5 py-1 text-xs font-bold text-[#d8e9b6] backdrop-blur-sm self-start mb-2">
            <Sparkles size={14} /> Direct Farm Market
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold font-serif leading-tight">
            Fresh harvest, delivered in 24 hrs.
          </h2>
          <p className="text-cream/80 text-xs sm:text-sm mt-1 max-w-md">
            Directly from verified local farmers in Lucknow to your doorstep.
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div data-animate-home className="px-5 lg:px-8 -mt-5 relative z-10 mb-6">
        <button
          onClick={() => navigate("consumer.search")}
          className="w-full max-w-2xl mx-auto flex items-center gap-3 bg-white border border-earth rounded-2xl px-5 py-3.5 shadow-lg hover:border-primary-muted transition-colors cursor-pointer"
        >
          <Search size={18} className="text-primary flex-shrink-0" />
          <span className="text-muted text-sm font-medium">
            Search 25+ fresh vegetables, local growers in Lucknow…
          </span>
        </button>
      </div>

      <div className="px-5 lg:px-8 space-y-8">
        {/* Categories */}
        <div data-animate-home>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">
            {[
              { emoji: "🍅", label: "Tomato" },
              { emoji: "🥔", label: "Potato" },
              { emoji: "🧅", label: "Onion" },
              { emoji: "🥕", label: "Carrot" },
              { emoji: "🥬", label: "Greens" },
              { emoji: "🫑", label: "Okra" },
              { emoji: "🫛", label: "Green Peas" },
              { emoji: "🥦", label: "Cauliflower" },
            ].map((cat) => (
              <button
                key={cat.label}
                onClick={() => navigate("consumer.search")}
                className="flex-shrink-0 flex items-center gap-2 bg-white border border-earth rounded-full px-4 py-2 text-xs font-bold text-foreground hover:border-primary hover:bg-primary-light transition-all cursor-pointer shadow-xs"
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Producer / Local Vendor Section */}
        <div data-animate-home className="bg-white rounded-3xl border border-earth p-4 sm:p-6 lg:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6 border-b border-earth/50 pb-4">
            <div>
              <h3 className="font-bold font-serif text-lg sm:text-xl lg:text-2xl text-foreground flex items-center gap-2">
                Browse by Farm Source
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-0.5">
                Direct growers & verified local market partners
              </p>
            </div>

            {/* Toggle */}
            <div className="flex w-full sm:w-auto bg-cream rounded-2xl p-1.5 gap-1.5 border border-earth shadow-xs items-center">
              {["Producer", "Local Vendor"].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`flex-1 sm:flex-initial text-center justify-center px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    filter === t
                      ? "bg-primary text-cream shadow-sm"
                      : "text-muted hover:text-foreground hover:bg-cream-dark/60"
                  }`}
                >
                  {t === "Producer" ? "🌱 Direct Farmer" : "🏪 Local Vendor"}
                </button>
              ))}
            </div>
          </div>

          {/* Farmers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {filteredFarmers.map((f) => (
              <FarmerCard
                key={f.id}
                farmer={f}
                layout="grid"
                vegetables={getVegetablesByFarmer(f.id)}
                onClick={() => {
                  setSelectedFarmerId(f.id);
                  navigate("consumer.farmer-detail");
                }}
              />
            ))}
          </div>
        </div>

        {/* Popular Today Produce Section */}
        <div data-animate-home className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold font-serif text-2xl text-foreground">Popular Produce Today</h3>
              <p className="text-xs text-muted">Freshly harvested morning stock</p>
            </div>
          </div>
          <TrustStrip />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularVegs.map((v) => {
              const f = getFarmerById(v.farmerId);
              return (
                <VegetableCard
                  key={v.id}
                  vegetable={v}
                  farmer={f}
                  cartItem={getItem(v.id)}
                  onAdd={toastAndAdd}
                  onUpdateQty={update}
                  onDetail={(veg) => {
                    setSelectedVegetableId(veg.id);
                    navigate("consumer.product-detail");
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
