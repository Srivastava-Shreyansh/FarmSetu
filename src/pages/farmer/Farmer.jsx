import { useState } from "react";
import { LayoutDashboard, ClipboardList, Sprout, Wallet, LogOut, Menu, Plus, Edit2, Trash2, Bell, TrendingUp, Package, CheckCircle, Leaf, ChevronRight, AlertCircle, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { farmers, farmerOrders, walletTransactions, getVegetablesByFarmer } from "../../constants/data";
import { Button, Card, Badge, StatusBadge, StatCard, Modal, EmptyState, ImageUpload } from "../../components/ui";

import { navItems } from "../../components/farmer/navItems";
import Sidebar from "../../components/farmer/Sidebar";
import FarmerHeader from "../../components/farmer/FarmerHeader";
import DashboardPage from "./DashboardPage";
import OrdersPage from "./OrdersPage";
import ProducePage from "./ProducePage";
import WalletPage from "./WalletPage";
import OnboardingPage, { pageTitles } from "./OnboardingPage";
 
export default function Farmer({ page, navigate, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (page === "farmer.onboarding") {
    return (
      <div className="min-h-screen bg-cream">
        <div className="bg-primary px-5 pt-14 pb-8 text-cream mb-6">
          <button
            type="button"
            onClick={() => navigate("auth")}
            className="flex items-center gap-2 mb-3 cursor-pointer hover:opacity-80 transition-opacity"
            title="Return to Landing Page"
          >
            <Leaf size={18} className="text-cream/80" />
            <span className="font-bold font-serif tracking-tight">FarmSetu</span>
          </button>
          <h1 className="text-2xl font-bold font-serif">Farmer Onboarding</h1>
          <p className="text-cream/70 text-sm mt-1">
            Set up your profile in 3 simple steps
          </p>
        </div>
        <OnboardingPage navigate={navigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex">
      <Sidebar
        page={page}
        navigate={navigate}
        onLogout={onLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <FarmerHeader
          title={pageTitles[page] ?? "FarmSetu"}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        <main className="flex-1 overflow-auto">
          {page === "farmer.orders" ? (
            <OrdersPage />
          ) : page === "farmer.produce" ? (
            <ProducePage />
          ) : page === "farmer.wallet" ? (
            <WalletPage />
          ) : (
            <DashboardPage navigate={navigate} />
          )}
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-earth flex z-30">
          {navItems.map(({ icon: Icon, label, page: p }) => {
            const active = page === p;
            return (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                  active ? "text-primary" : "text-muted hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                <span
                  className={`text-xs font-medium ${active ? "font-bold" : ""}`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="h-16 lg:h-0" />
      </div>
    </div>
  );
}
