import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Sprout,
  Wallet,
  LogOut,
  Menu,
  Plus,
  Edit2,
  Trash2,
  Bell,
  TrendingUp,
  Package,
  CheckCircle,
  Leaf,
  ChevronRight,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  User,
  MapPin,
  Clock,
} from "lucide-react";
import { gsap } from "gsap";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";

const nextStatus = {
  placed: "confirmed",
  confirmed: "preparing",
  preparing: "ready",
};

const actionLabel = {
  placed: "Accept Order",
  confirmed: "Start Preparing",
  preparing: "Mark Ready (Ping Rider)",
};

export default function OrdersPage() {
  const containerRef = useRef(null);
  const [orders, setOrders] = useState(
    farmerOrders.filter((o) => o.farmerId === "f1"),
  );
  const [activeTab, setActiveTab] = useState("active");

  const active = orders.filter((o) => o.status !== "delivered");
  const done = orders.filter((o) => o.status === "delivered");
  const shown = activeTab === "active" ? active : done;

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll("[data-animate-order]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
          }
        );
      }
    }
  }, [activeTab]);

  const advance = (orderId, current) => {
    const next = nextStatus[current];
    if (!next) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: next } : o)),
    );
  };

  const OrderCard = ({ order }) => (
    <div data-animate-order>
      <Card className="p-6 bg-white border-earth hover:border-primary-muted transition-all shadow-sm">
        <div className="flex items-start justify-between mb-4 border-b border-earth pb-3">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold font-serif text-xl text-foreground">Order #{order.id}</p>
              <Badge variant="blue">{order.items.length} items</Badge>
            </div>
            <p className="text-xs text-muted mt-1 flex items-center gap-1">
              <Clock size={13} />
              {new Date(order.placedAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" · "}
              {new Date(order.placedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="bg-cream/70 border border-earth/60 rounded-2xl p-4 mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
            <User size={13} /> Customer Details
          </p>
          <p className="text-sm font-bold text-foreground">
            {order.consumerName}
          </p>
          <p className="text-xs text-muted mt-0.5 leading-relaxed flex items-start gap-1">
            <MapPin size={13} className="flex-shrink-0 mt-0.5" />
            {order.consumerAddress}
          </p>
        </div>

        <div className="mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Order Items</p>
          <div className="space-y-1.5 bg-[#fcfcf8] p-3 rounded-xl border border-earth/60">
            {order.items.map((item) => (
              <div
                key={item.vegetableId}
                className="flex justify-between text-sm py-1 border-b border-earth/40 last:border-0"
              >
                <span className="text-foreground font-medium">
                  {item.name} <span className="text-muted text-xs">({item.quantity} kg)</span>
                </span>
                <span className="font-bold text-foreground">
                  ₹{(item.quantity * item.pricePerKg).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-earth mt-3 pt-3 flex justify-between items-center font-bold">
            <span className="text-sm text-foreground">Total Payout</span>
            <span className="text-primary text-xl font-extrabold">
              ₹{order.total.toFixed(0)}
            </span>
          </div>
        </div>

        {actionLabel[order.status] && (
          <Button
            className="w-full bg-primary hover:bg-primary-hover font-bold py-2.5 text-sm"
            size="sm"
            onClick={() => advance(order.id, order.status)}
          >
            {order.status === "ready" ? (
              <Bell size={15} />
            ) : (
              <CheckCircle size={15} />
            )}
            {actionLabel[order.status]}
          </Button>
        )}
      </Card>
    </div>
  );

  return (
    <div ref={containerRef} className="p-5 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-earth shadow-sm">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Order Operations Hub</h2>
          <p className="text-xs text-muted mt-1">Accept incoming harvest orders and update preparation status for riders</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-cream rounded-2xl p-1 gap-1 border border-earth">
          {[
            ["active", `Active Orders (${active.length})`],
            ["done", `Completed (${done.length})`],
          ].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-primary text-cream shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <EmptyState
          icon={<Package size={28} />}
          title={
            activeTab === "active"
              ? "No active orders right now"
              : "No completed orders yet"
          }
          description={
            activeTab === "active"
              ? "New consumer orders will appear here automatically."
              : "Delivered orders will show up here."
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}
