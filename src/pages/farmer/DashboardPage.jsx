import { useEffect, useRef } from "react";
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
} from "lucide-react";
import { gsap } from "gsap";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";

export default function DashboardPage({ navigate }) {
  const containerRef = useRef(null);
  const farmer = farmers[0];
  const vegs = getVegetablesByFarmer("f1");
  const todayOrders = farmerOrders.filter(
    (o) => o.farmerId === "f1",
  );
  const pendingOrders = farmerOrders.filter(
    (o) => o.farmerId === "f1" && o.status === "placed",
  );
  const todaySales = todayOrders.reduce((s, o) => s + o.total, 0);
  const isLowBalance = farmer.walletBalance < 500;

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll("[data-animate-card]");
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
  }, []);

  return (
    <div ref={containerRef} className="p-5 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Greeting Banner */}
      <div data-animate-card className="flex items-center justify-between rounded-3xl border border-earth bg-gradient-to-r from-[#103d2d] to-[#1e4d3b] p-6 text-cream shadow-lg">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#d8e9b6] backdrop-blur-sm">
            <Sprout size={14} />
            <span>Lucknow Farmer Hub</span>
          </div>
          <h2 className="text-3xl font-extrabold font-serif leading-tight mt-2 text-white">
            Welcome back, {farmer.name} 👋
          </h2>
          <p className="text-xs text-cream/80 mt-1">
            Here is your live daily farm performance and order dispatch overview.
          </p>
        </div>
        <img
          src={`https://images.unsplash.com/${farmer.image}?w=120&h=120&fit=crop&auto=format`}
          alt={farmer.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md hidden sm:block"
        />
      </div>

      {/* Low balance alert */}
      {isLowBalance && (
        <div data-animate-card className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
          <AlertCircle size={20} className="text-amber-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-amber-900">
              Low Wallet Security Balance
            </p>
            <p className="text-xs text-amber-700">
              Recharge your security wallet to maintain uninterrupted order dispatch.
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate("farmer.wallet")}
            className="flex-shrink-0 bg-amber-100 text-amber-900 hover:bg-amber-200 font-bold"
          >
            Recharge
          </Button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div data-animate-card>
          <StatCard
            label="Today's Sales"
            value={`₹${todaySales.toFixed(0)}`}
            sub={`${todayOrders.length} orders today`}
            icon={<TrendingUp size={20} />}
            color="green"
          />
        </div>
        <div data-animate-card>
          <StatCard
            label="Wallet Balance"
            value={`₹${farmer.walletBalance.toLocaleString()}`}
            sub="Available for payout"
            icon={<Wallet size={20} />}
            color="blue"
          />
        </div>
        <div data-animate-card>
          <StatCard
            label="Pending Orders"
            value={pendingOrders.length}
            sub="Needs action"
            icon={<Package size={20} />}
            color="amber"
          />
        </div>
        <div data-animate-card>
          <StatCard
            label="Active Produce"
            value={vegs.filter((v) => v.available).length}
            sub={`of ${vegs.length} items listed`}
            icon={<Sprout size={20} />}
            color="violet"
          />
        </div>
      </div>

      {/* Main Grid: Orders & Produce Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's orders preview */}
        <div data-animate-card className="lg:col-span-7 bg-white rounded-3xl border border-earth p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold font-serif text-xl text-foreground">Recent Orders</h3>
              <p className="text-xs text-muted">Incoming orders from local Lucknow households</p>
            </div>
            <button
              onClick={() => navigate("farmer.orders")}
              className="text-xs text-primary font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              View all <ChevronRight size={14} />
            </button>
          </div>

          {farmerOrders.filter((o) => o.farmerId === "f1").length === 0 ? (
            <EmptyState
              icon={<Package size={24} />}
              title="No orders today"
              description="New orders from consumers will appear here."
            />
          ) : (
            <div className="space-y-3">
              {farmerOrders
                .filter((o) => o.farmerId === "f1")
                .slice(0, 4)
                .map((order) => (
                  <Card key={order.id} className="px-5 py-4 hover:border-primary-muted transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-base text-foreground">Order #{order.id}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-cream font-medium text-muted">
                            {order.items.length} items
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-1 flex items-center gap-1">
                          <User size={13} /> {order.consumerName}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={order.status} />
                        <p className="text-base font-extrabold text-primary mt-1.5">
                          ₹{order.total.toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>

        {/* Produce quick glance */}
        <div data-animate-card className="lg:col-span-5 bg-white rounded-3xl border border-earth p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold font-serif text-xl text-foreground">My Listed Produce</h3>
                <p className="text-xs text-muted">Active crops listed for sale</p>
              </div>
              <button
                onClick={() => navigate("farmer.produce")}
                className="text-xs text-primary font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
              >
                Manage <ChevronRight size={14} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {vegs.slice(0, 6).map((v) => (
                <div
                  key={v.id}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-earth/80 bg-[#fcfcf8] hover:border-primary-muted transition-all text-center"
                >
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/${v.image}?w=100&h=100&fit=crop&auto=format`}
                      alt={v.name}
                      className="w-14 h-14 rounded-xl object-cover bg-cream-dark shadow-sm"
                    />

                    {!v.available && (
                      <div className="absolute inset-0 bg-foreground/50 rounded-xl flex items-center justify-center">
                        <span className="text-[9px] font-bold text-white uppercase tracking-wider">Out</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-foreground font-bold truncate w-full">
                    {v.name}
                  </p>
                  <p className="text-xs text-primary font-extrabold">₹{v.pricePerKg}/kg</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-earth flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">Want to list a new harvest batch?</span>
            <button
              onClick={() => navigate("farmer.produce")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-cream text-xs font-bold hover:bg-primary-hover transition-colors cursor-pointer"
            >
              <Plus size={14} /> Add Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
