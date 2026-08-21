import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, Home, ClipboardList, User, Leaf, ArrowLeft, MapPin, Phone, ChevronRight, Package, LogOut, Star, Clock, X, ShieldCheck, Truck, Plus, Minus } from "lucide-react";
import { farmers, vegetables, getVegetablesByFarmer, getFarmerById, getVegetableById, searchVegetables, searchFarmers } from "../../constants/data";
import { Button, Card, VegetableCard, FarmerCard, StatusBadge, OrderTimeline, EmptyState, Badge, StatCard, Toast, TrustStrip } from "../../components/ui";

import { useCart } from "../../hooks/useCart";

export default function SearchPage({
  navigate,
  cart,
  setCart,
  setSelectedFarmerId,
  setSelectedVegetableId,
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [toast, setToast] = useState(null);
  const { getItem, add, update } = useCart(cart, setCart);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const vegResults = query.length > 1 ? searchVegetables(query) : [];
  const farmerResults = query.length > 1 ? searchFarmers(query) : [];
  const hasResults = vegResults.length > 0 || farmerResults.length > 0;
  const searched = query.length > 1;

  return (
    <div className="pb-24">
      {/* Sticky search bar */}
      <div className="sticky top-0 bg-white border-b border-earth z-20 px-4 py-3">
        <div className="flex items-center gap-3 bg-cream-dark rounded-xl px-4 py-2.5">
          <Search size={16} className="text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vegetables, farmers, locations…"
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-subtle"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted hover:text-foreground"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 pt-4">
        {!searched && (
          <>
            <p className="text-xs text-muted uppercase tracking-wider mb-3 font-semibold">
              Quick picks
            </p>
            <div className="grid grid-cols-3 gap-2">
              {["Tomato", "Potato", "Onion", "Spinach", "Carrot", "Okra"].map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setQuery(v)}
                    className="bg-white border border-earth rounded-xl py-2.5 text-sm font-medium text-foreground hover:border-primary-muted hover:bg-primary-light transition-colors"
                  >
                    {v}
                  </button>
                ),
              )}
            </div>
          </>
        )}

        {searched && !hasResults && (
          <EmptyState
            icon={<Search size={24} />}
            title='No results for "{query}"'
            description="Try a different vegetable name or farmer's location."
          />
        )}

        {searched && farmerResults.length > 0 && (
          <div className="mb-6">
            <p className="text-xs text-muted uppercase tracking-wider mb-3 font-semibold">
              Farmers ({farmerResults.length})
            </p>
            <div className="space-y-3">
              {farmerResults.map((f) => (
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
          </div>
        )}

        {searched && vegResults.length > 0 && (
          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-3 font-semibold">
              Vegetables ({vegResults.length})
            </p>
            <div className="grid grid-cols-2 gap-3">
              {vegResults.map((v) => {
                const f = getFarmerById(v.farmerId);
                return (
                  <VegetableCard
                    key={v.id}
                    vegetable={v}
                    farmer={f}
                    cartItem={getItem(v.id)}
                    onAdd={(veg, farmer) => {
                      add(veg, farmer);
                      setToast(`${veg.name} added`);
                      setTimeout(() => setToast(null), 2000);
                    }}
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
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ─── FARMERS PAGE ─────────────────────────────────────────────────────────────
